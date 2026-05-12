import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Capacitor } from "@capacitor/core";

async function initNative() {
  if (!Capacitor.isNativePlatform()) return;
  const { StatusBar, Style } = await import("@capacitor/status-bar");
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setBackgroundColor({ color: "#5b1a1f" });
  const { initializeAdMob } = await import("@/lib/admob");
  await initializeAdMob();
}

initNative();

createRoot(document.getElementById("root")!).render(<App />);
