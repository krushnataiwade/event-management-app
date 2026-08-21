import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, CalendarDays, IndianRupee, Ticket, Users } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  channelSplit,
  currency,
  events,
  formatDate,
  registrations,
  registrationTrend,
} from "@/lib/event-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eventide Dashboard — Event Management & Registration" },
      {
        name: "description",
        content:
          "Track live events, registrations, revenue and attendee growth from one operations dashboard.",
      },
      { property: "og:title", content: "Eventide Dashboard — Event Management" },
      {
        property: "og:description",
        content: "Live events, registrations, revenue and attendee insights in one place.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Active events", value: "8", delta: "+2 this month", icon: CalendarDays },
  { label: "Registrations", value: "1,776", delta: "+18.4% vs last month", icon: Ticket },
  { label: "Revenue", value: "₹1,64,58,000", delta: "+12.1% vs last month", icon: IndianRupee },
  { label: "Unique attendees", value: "1,204", delta: "+96 new", icon: Users },
];

function Dashboard() {
  const upcoming = events.filter((e) => e.status !== "completed").slice(0, 4);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Tuesday, 18 August 2026 — everything at a glance"
      action={
        <Button asChild>
          <Link to="/create-event">New event</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <ArrowUpRight className="size-3" />
              {delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="panel p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Registration momentum</h2>
              <p className="text-sm text-muted-foreground">Weekly sign-ups and revenue</p>
            </div>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend}>
                <defs>
                  <linearGradient id="fillReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-popover-foreground)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  fill="url(#fillReg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Acquisition channels</h2>
          <p className="text-sm text-muted-foreground">Share of registrations</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelSplit} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="channel"
                  type="category"
                  width={70}
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="value" fill="var(--color-chart-2)" radius={[0, 8, 8, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="panel p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Capacity watch</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/events">All events</Link>
            </Button>
          </div>
          <ul className="mt-4 space-y-4">
            {upcoming.map((e) => {
              const pct = Math.round((e.registered / e.capacity) * 100);
              return (
                <li key={e.id} className="rounded-xl bg-surface-2/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{e.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(e.date)} · {e.venue}, {e.city}
                      </p>
                    </div>
                    <StatusPill status={e.status} />
                  </div>
                  <Progress value={pct} className="mt-3 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {e.registered} / {e.capacity} seats · {pct}% filled · {currency(e.price)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Latest registrations</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/registrations">View</Link>
            </Button>
          </div>
          <ul className="mt-4 space-y-3">
            {registrations.slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold">
                  {r.attendee
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.attendee}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.event}</p>
                </div>
                <StatusPill status={r.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
