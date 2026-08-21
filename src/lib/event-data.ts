export type EventStatus = "live" | "upcoming" | "draft" | "completed";
export type RegistrationStatus = "confirmed" | "pending" | "waitlist" | "cancelled";

export type EventItem = {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  capacity: number;
  registered: number;
  price: number;
  status: EventStatus;
  organizer: string;
};

export type Registration = {
  id: string;
  attendee: string;
  email: string;
  event: string;
  ticket: "General" | "VIP" | "Student" | "Speaker";
  amount: number;
  status: RegistrationStatus;
  date: string;
};

export type Attendee = {
  id: string;
  name: string;
  email: string;
  company: string;
  events: number;
  spend: number;
  tier: "Platinum" | "Gold" | "Silver";
  city: string;
};

export const events: EventItem[] = [
  { id: "EV-1041", name: "Nordic Product Summit", category: "Conference", date: "2026-09-04", time: "09:30", venue: "Aurora Hall", city: "Oslo", capacity: 800, registered: 742, price: 249, status: "live", organizer: "Mira Solberg" },
  { id: "EV-1042", name: "AI Builders Bootcamp", category: "Workshop", date: "2026-09-12", time: "10:00", venue: "Loft 22", city: "Berlin", capacity: 120, registered: 118, price: 89, status: "live", organizer: "Jonas Weber" },
  { id: "EV-1043", name: "Founders Night Mixer", category: "Networking", date: "2026-09-19", time: "18:30", venue: "The Glasshouse", city: "Amsterdam", capacity: 300, registered: 164, price: 0, status: "upcoming", organizer: "Ayo Bakare" },
  { id: "EV-1044", name: "DesignOps Masterclass", category: "Workshop", date: "2026-10-02", time: "13:00", venue: "Studio Nine", city: "Lisbon", capacity: 90, registered: 41, price: 149, status: "upcoming", organizer: "Clara Pinto" },
  { id: "EV-1045", name: "Fintech Regulation Forum", category: "Conference", date: "2026-10-15", time: "08:45", venue: "Canary Centre", city: "London", capacity: 500, registered: 0, price: 320, status: "draft", organizer: "Dev Sharma" },
  { id: "EV-1046", name: "Data Engineering Day", category: "Conference", date: "2026-07-22", time: "09:00", venue: "Techpark A2", city: "Dublin", capacity: 450, registered: 438, price: 199, status: "completed", organizer: "Niamh Byrne" },
  { id: "EV-1047", name: "Startup Pitch Arena", category: "Competition", date: "2026-08-08", time: "16:00", venue: "Arena Loft", city: "Paris", capacity: 260, registered: 251, price: 35, status: "completed", organizer: "Léa Moreau" },
  { id: "EV-1048", name: "Cloud Security Roundtable", category: "Roundtable", date: "2026-11-05", time: "11:00", venue: "Suite 7", city: "Zurich", capacity: 60, registered: 22, price: 0, status: "upcoming", organizer: "Tom Frei" },
];

export const registrations: Registration[] = [
  { id: "RG-9001", attendee: "Amara Diallo", email: "amara.d@northwind.io", event: "Nordic Product Summit", ticket: "VIP", amount: 499, status: "confirmed", date: "2026-08-14" },
  { id: "RG-9002", attendee: "Ben Kowalski", email: "ben@kowalski.dev", event: "AI Builders Bootcamp", ticket: "General", amount: 89, status: "confirmed", date: "2026-08-14" },
  { id: "RG-9003", attendee: "Chen Yu", email: "chen.yu@lumen.co", event: "Nordic Product Summit", ticket: "General", amount: 249, status: "pending", date: "2026-08-15" },
  { id: "RG-9004", attendee: "Divya Rao", email: "divya@studio-rao.com", event: "DesignOps Masterclass", ticket: "Student", amount: 59, status: "confirmed", date: "2026-08-15" },
  { id: "RG-9005", attendee: "Erik Lund", email: "erik.lund@pivot.no", event: "Founders Night Mixer", ticket: "General", amount: 0, status: "waitlist", date: "2026-08-16" },
  { id: "RG-9006", attendee: "Farah Nasser", email: "farah@brightpath.ae", event: "AI Builders Bootcamp", ticket: "Speaker", amount: 0, status: "confirmed", date: "2026-08-16" },
  { id: "RG-9007", attendee: "Gustavo Lima", email: "g.lima@vertex.br", event: "Nordic Product Summit", ticket: "General", amount: 249, status: "cancelled", date: "2026-08-17" },
  { id: "RG-9008", attendee: "Hanna Vogt", email: "hanna.vogt@arc.de", event: "Cloud Security Roundtable", ticket: "VIP", amount: 0, status: "pending", date: "2026-08-17" },
  { id: "RG-9009", attendee: "Ivan Petrov", email: "ivan@petrovlabs.com", event: "DesignOps Masterclass", ticket: "General", amount: 149, status: "confirmed", date: "2026-08-18" },
  { id: "RG-9010", attendee: "Julia Santos", email: "julia@fluxpay.pt", event: "Founders Night Mixer", ticket: "General", amount: 0, status: "confirmed", date: "2026-08-18" },
];

export const attendees: Attendee[] = [
  { id: "AT-201", name: "Amara Diallo", email: "amara.d@northwind.io", company: "Northwind", events: 7, spend: 2140, tier: "Platinum", city: "Oslo" },
  { id: "AT-202", name: "Ben Kowalski", email: "ben@kowalski.dev", company: "Freelance", events: 4, spend: 620, tier: "Gold", city: "Berlin" },
  { id: "AT-203", name: "Chen Yu", email: "chen.yu@lumen.co", company: "Lumen", events: 3, spend: 540, tier: "Silver", city: "Rotterdam" },
  { id: "AT-204", name: "Divya Rao", email: "divya@studio-rao.com", company: "Studio Rao", events: 6, spend: 1180, tier: "Gold", city: "Lisbon" },
  { id: "AT-205", name: "Farah Nasser", email: "farah@brightpath.ae", company: "Brightpath", events: 9, spend: 2980, tier: "Platinum", city: "Dubai" },
  { id: "AT-206", name: "Ivan Petrov", email: "ivan@petrovlabs.com", company: "Petrov Labs", events: 2, spend: 298, tier: "Silver", city: "Prague" },
  { id: "AT-207", name: "Julia Santos", email: "julia@fluxpay.pt", company: "FluxPay", events: 5, spend: 870, tier: "Gold", city: "Porto" },
  { id: "AT-208", name: "Hanna Vogt", email: "hanna.vogt@arc.de", company: "Arc Systems", events: 8, spend: 2410, tier: "Platinum", city: "Munich" },
];

export const registrationTrend = [
  { week: "W22", registrations: 180, revenue: 12400 },
  { week: "W23", registrations: 240, revenue: 16800 },
  { week: "W24", registrations: 205, revenue: 14100 },
  { week: "W25", registrations: 310, revenue: 22600 },
  { week: "W26", registrations: 386, revenue: 28900 },
  { week: "W27", registrations: 342, revenue: 25400 },
  { week: "W28", registrations: 465, revenue: 36200 },
  { week: "W29", registrations: 512, revenue: 41800 },
];

export const channelSplit = [
  { channel: "Direct", value: 42 },
  { channel: "Partner", value: 23 },
  { channel: "Social", value: 19 },
  { channel: "Email", value: 16 },
];

export const currency = (n: number) =>
  n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
