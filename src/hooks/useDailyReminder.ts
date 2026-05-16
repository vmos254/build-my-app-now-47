import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

const NOTIFICATION_ID = 1001;
const PREF_KEY = "daily_reminder_scheduled";

const messages = [
  "Good morning! Open the Word and start your day with God. 📖",
  "A new day, a new blessing. Read the Bible this morning. ✝️",
  "Begin today with Scripture. Lumen is ready for you. 🌅",
  "\"Your word is a lamp to my feet.\" — Psalm 119:105",
  "Take a moment with God this morning. Open Lumen. 🙏",
];

export function useDailyReminder() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    if (localStorage.getItem(PREF_KEY)) return;

    // Delay the permission prompt so it doesn't fire on first render
    const timer = setTimeout(async () => {
      try {
        const { LocalNotifications } = await import("@capacitor/local-notifications");

        const { display } = await LocalNotifications.requestPermissions();
        if (display !== "granted") return;

        // Cancel any existing daily reminder before scheduling fresh
        await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });

        // Pick a message rotation — schedule 30 days of notifications
        const notifications = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          date.setHours(8, 0, 0, 0);
          return {
            id: NOTIFICATION_ID + i,
            title: "Lumen — The Catholic Bible",
            body: messages[i % messages.length],
            schedule: { at: date, allowWhileIdle: true },
            smallIcon: "ic_stat_lumen",
          };
        });

        await LocalNotifications.schedule({ notifications });
        localStorage.setItem(PREF_KEY, "true");
      } catch {
        // Silently fail on web or if notifications unavailable
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
}
