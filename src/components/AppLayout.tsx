import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Bookmark, Calendar, Home, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bible", label: "Bible", icon: BookOpen },
  { to: "/search", label: "Search", icon: Search },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
  { to: "/daily", label: "Daily", icon: Calendar },
];

export const AppLayout = () => {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/auth");

  if (hideChrome) {
    return (
      <main className="min-h-screen">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container max-w-3xl mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-burgundy grid place-items-center shadow-soft">
              <Sparkles className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
              Lumen
            </span>
          </Link>
          <Link
            to="/pricing"
            className="text-xs font-ui font-medium px-3 py-1.5 rounded-full bg-gradient-gold text-secondary-foreground shadow-soft hover:shadow-gold transition-shadow"
          >
            Go Premium
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom nav (mobile-first) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/60">
        <div className="container max-w-3xl mx-auto grid grid-cols-5 h-16 px-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 text-[0.65rem] font-ui font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn("w-5 h-5", isActive && "stroke-[2.25]")} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
