import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency, formatDate, registrations } from "@/lib/event-data";

export const Route = createFileRoute("/registrations")({
  head: () => ({
    meta: [
      { title: "Registrations — Eventide Event Management" },
      {
        name: "description",
        content: "Review, approve and export every ticket registration across your events.",
      },
      { property: "og:title", content: "Registrations — Eventide" },
      {
        property: "og:description",
        content: "Approve, filter and export ticket registrations in seconds.",
      },
    ],
  }),
  component: RegistrationsPage,
});

function RegistrationsPage() {
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      registrations.filter(
        (r) =>
          (status === "all" || r.status === status) &&
          (r.attendee + r.email + r.event).toLowerCase().includes(query.toLowerCase()),
      ),
    [status, query],
  );

  const totals = {
    confirmed: registrations.filter((r) => r.status === "confirmed").length,
    pending: registrations.filter((r) => r.status === "pending").length,
    revenue: registrations
      .filter((r) => r.status !== "cancelled")
      .reduce((s, r) => s + r.amount, 0),
  };

  const exportCsv = () => {
    const headers = ["Attendee", "Email", "Event", "Ticket", "Date", "Amount", "Status"];
    const lines = rows.map((r) =>
      [r.attendee, r.email, r.event, r.ticket, formatDate(r.date), r.amount, r.status]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  };

  return (
    <AppShell
      title="Registrations"
      subtitle="Every ticket, in one queue"
      action={
        <Button variant="outline" onClick={exportCsv}>
          <Download className="size-4" /> Export
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Confirmed", value: totals.confirmed },
          { label: "Awaiting approval", value: totals.pending },
          { label: "Collected revenue", value: currency(totals.revenue) },
        ].map((s) => (
          <div key={s.label} className="panel p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative flex-1 min-w-52">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search attendee, email or event"
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="waitlist">Waitlist</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attendee</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <p className="font-medium">{r.attendee}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.event}</TableCell>
                  <TableCell>{r.ticket}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(r.date)}</TableCell>
                  <TableCell>{currency(r.amount)}</TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={r.status === "pending" ? "default" : "outline"}
                      onClick={() =>
                        toast.success(
                          r.status === "pending"
                            ? `${r.attendee} approved`
                            : `Ticket resent to ${r.email}`,
                        )
                      }
                    >
                      {r.status === "pending" ? "Approve" : "Resend"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {rows.length === 0 && (
          <p className="p-10 text-center text-muted-foreground">No registrations found.</p>
        )}
      </div>
    </AppShell>
  );
}
