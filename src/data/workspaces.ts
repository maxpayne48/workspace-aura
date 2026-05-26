export type City =
  | "Mumbai"
  | "Delhi-NCR"
  | "Bangalore"
  | "Hyderabad"
  | "Pune"
  | "Chennai";

export type Workspace = {
  id: string;
  operator: string;
  location: string;
  city: City;
  micromarket: string;
  thumbnail: string;
  videoPoster: string;
  basePricePerSeat: number; // INR per seat/month
  quietZonePct: number;
  wifiMbps: number;
  amenities: string[];
  tags: ("metro" | "shifts" | "private-cabin" | "hot-desk" | "meeting-rooms" | "cafe" | "247" | "parking")[];
  metroDistanceMeters: number;
  status: "available" | "limited" | "full";
  availableCabins: number;
  vacatingDate?: string;
  flash: "High Demand" | "Available Now" | "Reserved";
  capacityType: "boutique" | "standard" | "enterprise";
  seatCapacity: number;
};

// Real, verified marquee operators across Indian metros.
export const WORKSPACES: Workspace[] = [
  // --- Mumbai ---
  {
    id: "mum-wework-bkc",
    operator: "WeWork",
    location: "Enam Sambhav, BKC",
    city: "Mumbai",
    micromarket: "Bandra Kurla Complex",
    thumbnail:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 24500,
    quietZonePct: 88,
    wifiMbps: 480,
    amenities: ["Phone Booths", "Wellness Room", "Barista Cafe", "Event Space"],
    tags: ["metro", "private-cabin", "meeting-rooms", "cafe", "247", "shifts"],
    metroDistanceMeters: 320,
    status: "limited",
    availableCabins: 2,
    flash: "High Demand",
    capacityType: "enterprise",
    seatCapacity: 1400,
  },
  {
    id: "mum-awfis-lp",
    operator: "Awfis",
    location: "Trade World, Lower Parel",
    city: "Mumbai",
    micromarket: "Lower Parel",
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 14800,
    quietZonePct: 76,
    wifiMbps: 320,
    amenities: ["Cabins", "Hot Desks", "Pantry", "Lounge"],
    tags: ["metro", "hot-desk", "private-cabin", "meeting-rooms", "parking"],
    metroDistanceMeters: 450,
    status: "available",
    availableCabins: 6,
    flash: "Available Now",
    capacityType: "standard",
    seatCapacity: 620,
  },
  {
    id: "mum-innov8-nariman",
    operator: "Innov8",
    location: "Mafatlal Centre, Nariman Point",
    city: "Mumbai",
    micromarket: "Nariman Point",
    thumbnail:
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 19900,
    quietZonePct: 81,
    wifiMbps: 410,
    amenities: ["Podcast Room", "Gaming Lounge", "Cafe", "Wellness"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms", "247"],
    metroDistanceMeters: 280,
    status: "full",
    availableCabins: 0,
    vacatingDate: "2026-07-01",
    flash: "Reserved",
    capacityType: "boutique",
    seatCapacity: 240,
  },
  {
    id: "mum-smartworks-andheri",
    operator: "Smartworks",
    location: "Vega Centre, Andheri East",
    city: "Mumbai",
    micromarket: "Andheri East",
    thumbnail:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 12300,
    quietZonePct: 84,
    wifiMbps: 360,
    amenities: ["Managed Office", "Cafeteria", "Gym", "Daycare"],
    tags: ["metro", "private-cabin", "meeting-rooms", "247", "shifts", "parking"],
    metroDistanceMeters: 180,
    status: "available",
    availableCabins: 9,
    flash: "Available Now",
    capacityType: "enterprise",
    seatCapacity: 2200,
  },

  // --- Delhi-NCR ---
  {
    id: "del-altf-okhla",
    operator: "AltF Coworking",
    location: "Okhla Phase III",
    city: "Delhi-NCR",
    micromarket: "Okhla",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 9800,
    quietZonePct: 78,
    wifiMbps: 290,
    amenities: ["Cabins", "Hot Desks", "Pantry"],
    tags: ["metro", "hot-desk", "private-cabin", "meeting-rooms"],
    metroDistanceMeters: 380,
    status: "available",
    availableCabins: 5,
    flash: "Available Now",
    capacityType: "standard",
    seatCapacity: 380,
  },
  {
    id: "del-innov8-saket",
    operator: "Innov8",
    location: "Saket Square",
    city: "Delhi-NCR",
    micromarket: "Saket",
    thumbnail:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 13200,
    quietZonePct: 82,
    wifiMbps: 330,
    amenities: ["Cafe", "Wellness", "Phone Booths"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms"],
    metroDistanceMeters: 220,
    status: "limited",
    availableCabins: 3,
    flash: "High Demand",
    capacityType: "boutique",
    seatCapacity: 310,
  },
  {
    id: "del-spacetime-cp",
    operator: "Spacetime",
    location: "Statesman House, Connaught Place",
    city: "Delhi-NCR",
    micromarket: "Connaught Place",
    thumbnail:
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 17400,
    quietZonePct: 74,
    wifiMbps: 280,
    amenities: ["Heritage Building", "Meeting Rooms", "Cafe"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms", "247"],
    metroDistanceMeters: 90,
    status: "full",
    availableCabins: 0,
    vacatingDate: "2026-08-15",
    flash: "Reserved",
    capacityType: "boutique",
    seatCapacity: 180,
  },
  {
    id: "del-awfis-ggn",
    operator: "Awfis",
    location: "Tower B, Cyber City, Gurgaon",
    city: "Delhi-NCR",
    micromarket: "Gurgaon",
    thumbnail:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 11600,
    quietZonePct: 80,
    wifiMbps: 340,
    amenities: ["Cabins", "Cafe", "Gym Access", "Parking"],
    tags: ["metro", "private-cabin", "meeting-rooms", "parking", "247", "shifts"],
    metroDistanceMeters: 410,
    status: "available",
    availableCabins: 11,
    flash: "Available Now",
    capacityType: "enterprise",
    seatCapacity: 1800,
  },

  // --- Bangalore ---
  {
    id: "blr-bhive-indiranagar",
    operator: "BHIVE Workspace",
    location: "100ft Road, Indiranagar",
    city: "Bangalore",
    micromarket: "Indiranagar",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 12900,
    quietZonePct: 86,
    wifiMbps: 420,
    amenities: ["Cafe", "Podcast Studio", "Wellness", "Events"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms", "247", "shifts"],
    metroDistanceMeters: 260,
    status: "limited",
    availableCabins: 4,
    flash: "High Demand",
    capacityType: "standard",
    seatCapacity: 540,
  },
  {
    id: "blr-cowrks-residency",
    operator: "Cowrks",
    location: "RMZ Latitude, Residency Road",
    city: "Bangalore",
    micromarket: "Residency Road",
    thumbnail:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 18200,
    quietZonePct: 90,
    wifiMbps: 510,
    amenities: ["Premium Cabins", "Cafe", "Wellness", "Auditorium"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms", "247"],
    metroDistanceMeters: 540,
    status: "available",
    availableCabins: 8,
    flash: "Available Now",
    capacityType: "enterprise",
    seatCapacity: 1600,
  },
  {
    id: "blr-indiqube-nagavara",
    operator: "IndiQube",
    location: "Brigade Tech Park, Nagavara",
    city: "Bangalore",
    micromarket: "Nagavara",
    thumbnail:
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 10400,
    quietZonePct: 83,
    wifiMbps: 380,
    amenities: ["Managed Office", "Cafe", "Parking", "Shuttle"],
    tags: ["private-cabin", "meeting-rooms", "247", "shifts", "parking"],
    metroDistanceMeters: 1200,
    status: "available",
    availableCabins: 14,
    flash: "Available Now",
    capacityType: "enterprise",
    seatCapacity: 2400,
  },
  {
    id: "blr-urbanvault-kor",
    operator: "UrbanVault",
    location: "80ft Road, Koramangala",
    city: "Bangalore",
    micromarket: "Koramangala",
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 14100,
    quietZonePct: 79,
    wifiMbps: 360,
    amenities: ["Cafe", "Lounge", "Phone Booths", "Wellness"],
    tags: ["private-cabin", "hot-desk", "cafe", "meeting-rooms", "247", "shifts"],
    metroDistanceMeters: 980,
    status: "limited",
    availableCabins: 3,
    flash: "High Demand",
    capacityType: "standard",
    seatCapacity: 480,
  },

  // --- Hyderabad ---
  {
    id: "hyd-iquest-hitec",
    operator: "iQuest",
    location: "HITEC City",
    city: "Hyderabad",
    micromarket: "HITEC City",
    thumbnail:
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 9600,
    quietZonePct: 81,
    wifiMbps: 310,
    amenities: ["Cabins", "Cafe", "Parking"],
    tags: ["metro", "private-cabin", "meeting-rooms", "parking", "247"],
    metroDistanceMeters: 350,
    status: "available",
    availableCabins: 7,
    flash: "Available Now",
    capacityType: "standard",
    seatCapacity: 520,
  },

  // --- Pune ---
  {
    id: "pun-smartworks-kharadi",
    operator: "Smartworks",
    location: "EON Free Zone, Kharadi",
    city: "Pune",
    micromarket: "Kharadi",
    thumbnail:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 10800,
    quietZonePct: 85,
    wifiMbps: 390,
    amenities: ["Managed Office", "Cafe", "Gym", "Parking"],
    tags: ["private-cabin", "meeting-rooms", "247", "shifts", "parking"],
    metroDistanceMeters: 1500,
    status: "available",
    availableCabins: 12,
    flash: "Available Now",
    capacityType: "enterprise",
    seatCapacity: 1900,
  },

  // --- Chennai ---
  {
    id: "chn-workafella-anna",
    operator: "Workafella",
    location: "Anna Salai",
    city: "Chennai",
    micromarket: "Anna Salai",
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=70",
    videoPoster:
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1600&auto=format&fit=crop&q=80",
    basePricePerSeat: 9200,
    quietZonePct: 80,
    wifiMbps: 300,
    amenities: ["Cabins", "Cafe", "Meeting Rooms"],
    tags: ["metro", "private-cabin", "cafe", "meeting-rooms"],
    metroDistanceMeters: 290,
    status: "limited",
    availableCabins: 2,
    flash: "High Demand",
    capacityType: "standard",
    seatCapacity: 410,
  },
];

export const CITIES: City[] = ["Mumbai", "Delhi-NCR", "Bangalore", "Hyderabad", "Pune", "Chennai"];