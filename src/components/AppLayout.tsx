import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Bookmark, Calendar, Home, LogIn, LogOut, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bible", label: "Bible", icon: BookOpen },
  { to: "/search", label: "Search", icon: Search },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
  { to: "/daily", label: "Daily", icon: Calendar },
];

export const AppLayout = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const hideChrome =
    location.pathname.startsWith("/auth") || location.pathname.startsWith("/~oauth");

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
      <header className="sticky top-0 z-40 bg-background border-b border-border/60">
        <div className="container max-w-3xl mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-burgundy grid place-items-center shadow-soft">
              <Sparkles className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="flex flex-col leading-none group-hover:text-primary transition-colors">
              <span className="font-display text-xl text-foreground">Lumen</span>
              <span className="font-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">The Catholic Bible</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={() => signOut()}
                className="text-xs font-ui font-medium px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-xs font-ui font-medium px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign in
              </Link>
            )}
            <Link
              to="/pricing"
              className="text-xs font-ui font-medium px-3 py-1.5 rounded-full bg-gradient-gold text-secondary-foreground shadow-soft hover:shadow-gold transition-shadow"
            >
              Go Premium
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-24">
        <Outlet />
      </main>

      {/* Bottom nav (mobile-first) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border/60" style={{ paddingBottom: "env(safe-area-inset-bottom)", transform: "translateZ(0)", willChange: "transform" }}>
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
