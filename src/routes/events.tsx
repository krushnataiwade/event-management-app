import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currency, events, formatDate, type EventStatus } from "@/lib/event-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Eventide Event Management" },
      {
        name: "description",
        content: "Browse, filter and manage every conference, workshop and networking event.",
      },
      { property: "og:title", content: "Events — Eventide" },
      { property: "og:description", content: "Browse and manage your full event portfolio." },
    ],
  }),
  component: EventsPage,
});

const filters = ["all", "live", "upcoming", "draft", "completed"] as const;

function EventsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(
    () =>
      events.filter(
        (e) =>
          (filter === "all" || e.status === (filter as EventStatus)) &&
          (e.name + e.city + e.category).toLowerCase().includes(query.toLowerCase()),
      ),
    [filter, query],
  );

  return (
    <AppShell
      title="Events"
      subtitle={`${events.length} events across 8 cities`}
      action={
        <Button asChild>
          <Link to="/create-event">New event</Link>
        </Button>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as (typeof filters)[number])}>
          <TabsList>
            {filters.map((f) => (
              <TabsTrigger key={f} value={f} className="capitalize">
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name, city or category"
          className="w-full sm:w-72"
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((e) => {
          const pct = Math.round((e.registered / e.capacity) * 100);
          return (
            <article key={e.id} className="panel flex flex-col p-5">
              <div className="hero-gradient -mx-5 -mt-5 mb-4 rounded-t-xl px-5 py-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      {e.category}
                    </p>
                    <h2 className="mt-1 font-display text-lg leading-tight font-semibold">
                      {e.name}
                    </h2>
                  </div>
                  <StatusPill status={e.status} />
                </div>
              </div>

              <dl className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  {formatDate(e.date)} · {e.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  {e.venue}, {e.city}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  {e.registered} of {e.capacity} registered
                </div>
              </dl>

              <Progress value={pct} className="mt-4 h-2" />

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display text-lg font-semibold">{currency(e.price)}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/registrations">Registrations</Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="panel mt-6 p-10 text-center text-muted-foreground">
          No events match this filter.
        </p>
      )}
    </AppShell>
  );
}
