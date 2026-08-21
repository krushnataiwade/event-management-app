import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Search } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { attendees, currency } from "@/lib/event-data";

export const Route = createFileRoute("/attendees")({
  head: () => ({
    meta: [
      { title: "Attendees — Eventide Event Management" },
      {
        name: "description",
        content: "Attendee CRM with loyalty tiers, lifetime spend and event history.",
      },
      { property: "og:title", content: "Attendees — Eventide" },
      {
        property: "og:description",
        content: "Loyalty tiers, lifetime spend and event history for every attendee.",
      },
    ],
  }),
  component: AttendeesPage,
});

const tierTone: Record<string, string> = {
  Platinum: "bg-primary/15 text-primary border-primary/30",
  Gold: "bg-warning/15 text-warning border-warning/30",
  Silver: "bg-muted text-muted-foreground border-border",
};

function AttendeesPage() {
  const [query, setQuery] = useState("");
  const list = useMemo(
    () =>
      attendees.filter((a) =>
        (a.name + a.company + a.city + a.email).toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const totalSpend = attendees.reduce((s, a) => s + a.spend, 0);

  return (
    <AppShell
      title="Attendees"
      subtitle={`${attendees.length} people · ${currency(totalSpend)} lifetime value`}
      action={
        <Button onClick={() => toast.success("Campaign draft created for 8 attendees")}>
          <Mail className="size-4" /> Email all
        </Button>
      }
    >
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search attendees"
          className="pl-9"
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <article key={a.id} className="panel p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary font-display font-semibold">
                {a.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.email}</p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tierTone[a.tier]}`}
              >
                {a.tier}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface-2/60 p-3 text-center">
              <div>
                <p className="font-display text-lg font-semibold">{a.events}</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{currency(a.spend)}</p>
                <p className="text-xs text-muted-foreground">Spend</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{a.city}</p>
                <p className="text-xs text-muted-foreground">Base</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{a.company}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success(`Message drafted to ${a.name}`)}
              >
                Message
              </Button>
            </div>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <p className="panel mt-6 p-10 text-center text-muted-foreground">No attendees found.</p>
      )}
    </AppShell>
  );
}
