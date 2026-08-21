import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currency } from "@/lib/event-data";

export const Route = createFileRoute("/create-event")({
  head: () => ({
    meta: [
      { title: "Create Event — Eventide Event Management" },
      {
        name: "description",
        content:
          "Set up a new event with schedule, venue, capacity, ticket pricing and registration rules.",
      },
      { property: "og:title", content: "Create Event — Eventide" },
      {
        property: "og:description",
        content: "Schedule, venue, capacity and ticketing in one guided form.",
      },
    ],
  }),
  component: CreateEventPage,
});

function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "Conference",
    description: "",
    date: "",
    time: "18:00",
    venue: "",
    city: "",
    capacity: "150",
    price: "99",
    approval: true,
    waitlist: true,
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.venue) {
      toast.error("Name, date and venue are required");
      return;
    }
    toast.success(`${form.name} created and saved as draft`);
    navigate({ to: "/events" });
  };

  return (
    <AppShell title="Create event" subtitle="Publish a new event in under two minutes">
      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <section className="panel p-5">
            <h2 className="font-display text-lg font-semibold">Basics</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Event name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Nordic Product Summit 2027"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => set("category", v)}>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Conference", "Workshop", "Networking", "Competition", "Roundtable"].map(
                      (c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={(e) => set("capacity", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="What attendees will experience…"
                  className="mt-2"
                />
              </div>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="font-display text-lg font-semibold">Schedule & venue</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="time">Start time</Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  value={form.venue}
                  onChange={(e) => set("venue", e.target.value)}
                  placeholder="Aurora Hall"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Oslo"
                  className="mt-2"
                />
              </div>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="font-display text-lg font-semibold">Registration rules</h2>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="price">Ticket price (INR)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className="mt-2 sm:w-48"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-2/60 p-4">
                <div>
                  <p className="font-medium">Manual approval</p>
                  <p className="text-sm text-muted-foreground">
                    Review each registration before confirming.
                  </p>
                </div>
                <Switch checked={form.approval} onCheckedChange={(v) => set("approval", v)} />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-2/60 p-4">
                <div>
                  <p className="font-medium">Enable waitlist</p>
                  <p className="text-sm text-muted-foreground">
                    Keep collecting sign-ups once capacity is reached.
                  </p>
                </div>
                <Switch checked={form.waitlist} onCheckedChange={(v) => set("waitlist", v)} />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-28 xl:self-start">
          <div className="panel hero-gradient p-5">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Preview</p>
            <h3 className="mt-2 font-display text-xl font-semibold">
              {form.name || "Untitled event"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{form.category}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {form.date || "Date TBC"} · {form.time}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {form.venue || "Venue TBC"}
                {form.city ? `, ${form.city}` : ""}
              </li>
              <li className="flex items-center gap-2">
                <Ticket className="size-4 text-primary" />
                {currency(Number(form.price) || 0)} · {form.capacity} seats
              </li>
            </ul>
          </div>

          <div className="panel space-y-3 p-5">
            <p className="text-sm text-muted-foreground">
              Potential revenue at full capacity:{" "}
              <span className="font-display font-semibold text-foreground">
                {currency((Number(form.price) || 0) * (Number(form.capacity) || 0))}
              </span>
            </p>
            <Button type="submit" className="w-full">
              Create event
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => toast.success("Saved as draft")}
            >
              Save draft
            </Button>
          </div>
        </aside>
      </form>
    </AppShell>
  );
}
