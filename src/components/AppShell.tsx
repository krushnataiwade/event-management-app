import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  LayoutDashboard,
  PlusCircle,
  Ticket,
  Users,
  Search,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/registrations", label: "Registrations", icon: Ticket },
  { to: "/attendees", label: "Attendees", icon: Users },
  { to: "/create-event", label: "Create event", icon: PlusCircle },
] as const;

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="border-b border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
            E
          </div>
          <div>
            <p className="font-display text-sm font-bold tracking-tight">Eventide</p>
            <p className="text-xs text-muted-foreground">Event operations</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden px-5 lg:mt-6 lg:block">
          <div className="panel hero-gradient p-4">
            <p className="font-display text-sm font-semibold">Season pass</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bundle 4 events and lift conversion by 28%.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Configure
            </Button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-xl font-bold md:text-2xl">{title}</h1>
            <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search events, people…" className="w-60 pl-9" />
          </div>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          {action}
        </header>
        <main className="px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    live: "bg-success/15 text-success border-success/30",
    confirmed: "bg-success/15 text-success border-success/30",
    upcoming: "bg-accent/15 text-accent border-accent/30",
    pending: "bg-warning/15 text-warning border-warning/30",
    waitlist: "bg-warning/15 text-warning border-warning/30",
    draft: "bg-muted text-muted-foreground border-border",
    completed: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${tone[status] ?? tone["draft"]}`}
    >
      {status}
    </span>
  );
}
