export type LotCategory =
  | "Games & Play"
  | "Tools & Home"
  | "Outdoor & Nature"
  | "Electronics"
  | "Wellness & Music"
  | "In-Library Only";

export type LotItem = {
  name: string;
  category: LotCategory;
  image: string;
  description: string;
  inLibraryOnly?: boolean;
};

export const LOT_CATEGORIES: LotCategory[] = [
  "Games & Play",
  "Tools & Home",
  "Outdoor & Nature",
  "Electronics",
  "Wellness & Music",
  "In-Library Only",
];

const WP = "https://otislibrarynorwich.org/wp-content/uploads";

export const lotItems: LotItem[] = [
  // Games & Play
  {
    name: "Chess Set",
    category: "Games & Play",
    image: `${WP}/2025/09/b27960894-chessset-1022x1024.jpg`,
    description: "Standard chess set for 2 players.",
  },
  {
    name: "Mah-Jongg Game Set",
    category: "Games & Play",
    image: `${WP}/2026/09/b28208791-mahjongg-1024x1011.jpg`,
    description: "Full Mah-Jongg tile set.",
  },
  {
    name: "Kan-Jam",
    category: "Games & Play",
    image: `${WP}/2025/09/b27956775-kanjam-1024x870.jpg`,
    description: "Outdoor flying disc game — teams of two.",
  },
  {
    name: "Pickleball Set",
    category: "Games & Play",
    image: `${WP}/2025/09/b27960791-pickleball-1024x1022.jpg`,
    description: "2 paddles and a ball for court play.",
  },
  {
    name: "Roundnet Game Set",
    category: "Games & Play",
    image: `${WP}/2025/09/b27957494-roundnet-1024x974.jpg`,
    description: "Spikeball-style net and ball set — 4 players.",
  },
  {
    name: "Tumble Tower Game Set",
    category: "Games & Play",
    image: `${WP}/2026/09/b2820878x-GiantTower-1024x1001.jpg`,
    description: "Giant Jenga-style stacking tower.",
  },
  // Tools & Home
  {
    name: "Screwdriver Set",
    category: "Tools & Home",
    image: `${WP}/2025/09/b27960699-screwdrivers-1024x969.jpg`,
    description: "Multi-piece screwdriver set for household tasks.",
  },
  {
    name: "Paper Shredder",
    category: "Tools & Home",
    image: `${WP}/2026/09/b28218231-PaperShredder-824x1024.jpg`,
    description: "Cross-cut shredder for secure document disposal.",
  },
  {
    name: "Stud Finder",
    category: "Tools & Home",
    image: "https://images.thdstatic.com/productImages/5a4b2781-9356-43a9-8ddc-d5df9bcaf0c8/svn/franklin-sensors-stud-finders-fsm21012hd-64_600.jpg",
    description: "Locates wall studs behind drywall.",
  },
  {
    name: "Tire Inflator / Air Compressor",
    category: "Tools & Home",
    image: `${WP}/2025/09/b2786327x-tireinflator-1009x1024.jpg`,
    description: "Portable electric air compressor for tires and inflatables.",
  },
  {
    name: "Outdoor Extension Cord",
    category: "Tools & Home",
    image: `${WP}/2026/09/b28208316-extensioncord-e1788898717796-1024x831.jpg`,
    description: "Heavy-duty outdoor-rated extension cord.",
  },
  // Outdoor & Nature
  {
    name: "Birdwatching Kit",
    category: "Outdoor & Nature",
    image: `${WP}/2025/09/b27963123-birdwatching-1024x1017.jpg`,
    description: "Binoculars and field guide for bird enthusiasts.",
  },
  {
    name: "Metal Detector",
    category: "Outdoor & Nature",
    image: `${WP}/2025/09/b27958218-metaldetector-1024x1013.jpg`,
    description: "Entry-level detector for outdoor exploration.",
  },
  {
    name: "Trekking Poles",
    category: "Outdoor & Nature",
    image: `${WP}/2025/09/b27957779-trekkingpoles-1024x1014.jpg`,
    description: "Adjustable poles for hiking and trail walking.",
  },
  {
    name: "Trail Camera",
    category: "Outdoor & Nature",
    image: `${WP}/2026/09/b28208808-trailcamera.jpg`,
    description: "Motion-triggered wildlife camera for outdoor monitoring.",
  },
  {
    name: "Garden Tool Set",
    category: "Outdoor & Nature",
    image: `${WP}/2025/09/b27960663-gardeningtools-1024x928.jpg`,
    description: "Trowel, fork, and pruner for garden work.",
  },
  {
    name: "Soil Tester",
    category: "Outdoor & Nature",
    image: `${WP}/2026/09/b28218061-SoilTester-1024x960.jpg`,
    description: "Tests pH, moisture, and light levels for garden soil.",
  },
  // Electronics
  {
    name: "Diagnostic Car Code Reader",
    category: "Electronics",
    image: `${WP}/2025/09/b27960626-vehiclecodereader-1018x1024.jpg`,
    description: "Reads and clears OBD-II vehicle fault codes.",
  },
  {
    name: "EMF / Ghost Hunting Detector",
    category: "Electronics",
    image: `${WP}/2025/09/b27967591-emfmeter-1024x1024.jpg`,
    description: "Electromagnetic field detector.",
  },
  {
    name: "Smartphone Vlogging Kit",
    category: "Electronics",
    image: `${WP}/2025/09/b27963093-vlogging-1020x1024.jpg`,
    description: "Ring light, mini tripod, and phone mount.",
  },
  {
    name: "Portable DVD Player",
    category: "Electronics",
    image: `${WP}/2025/09/b27962933-dvdplayer-1024x885.jpg`,
    description: "Compact player with built-in 10\" screen.",
  },
  {
    name: "Radon Detector",
    category: "Electronics",
    image: `${WP}/2026/09/b28217925-RadonDetector-1024x1024.jpg`,
    description: "Monitors radon gas levels in your home.",
  },
  {
    name: "Thermal Leak Detector",
    category: "Electronics",
    image: `${WP}/2026/09/b28218048-LeakDetector-1.jpg`,
    description: "Infrared sensor identifies heat loss and drafts.",
  },
  {
    name: "Magnifying Sheets",
    category: "Electronics",
    image: `${WP}/2026/03/b27397270-magnifier.jpg`,
    description: "Large-format magnifying sheets for low-vision reading.",
  },
  // Wellness & Music
  {
    name: "Resistance Bands Set",
    category: "Wellness & Music",
    image: `${WP}/2025/09/b27960973-resistancebands-1024x1024.jpg`,
    description: "Graduated resistance bands for strength training.",
  },
  {
    name: "Ukulele",
    category: "Wellness & Music",
    image: `${WP}/2025/09/b27611401-ukulele-944x1024.jpg`,
    description: "Soprano ukulele with case and tuner.",
  },
  // In-Library Only
  {
    name: "Nintendo Switch",
    category: "In-Library Only",
    image: `${WP}/2024/03/Switch-2-scaled.jpeg`,
    description: "Nintendo Switch with Joy-Con controllers — in-library use only.",
    inLibraryOnly: true,
  },
];
