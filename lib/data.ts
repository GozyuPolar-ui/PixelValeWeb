export type Game = {
  id: string;
  title: string;
  genre: string;
  price: string;
  isFree?: boolean;
  rating?: number;
  image: string;
};

export const trendingGames: Game[] = [
  {
    id: "valley-of-mists",
    title: "Valley of Mists",
    genre: "Adventure • Exploration",
    price: "$14.99",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200&h=200&fit=crop",
  },
  {
    id: "market-tycoon",
    title: "Market Tycoon",
    genre: "Sim • Strategy",
    price: "Free",
    isFree: true,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop",
  },
  {
    id: "craft-co",
    title: "Craft & Co.",
    genre: "Indie • Cozy",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop",
  },
];

export const newReleases: Game[] = [
  { id: "autumn-tales", title: "Autumn Tales", genre: "RPG", price: "$12.50", rating: 4.9, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=530&fit=crop" },
  { id: "forest-spirit", title: "Forest Spirit", genre: "Adventure", price: "Free", isFree: true, rating: 4.7, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=530&fit=crop" },
  { id: "mystic-grove", title: "Mystic Grove", genre: "Puzzle", price: "$4.99", image: "" },
  { id: "pixel-peak", title: "Pixel Peak", genre: "Platformer", price: "$8.00", image: "" },
  { id: "valley-farm", title: "Valley Farm", genre: "Sim", price: "$19.99", image: "" },
  { id: "echo-quest", title: "Echo Quest", genre: "Mystery", price: "$11.99", image: "" },
];

export const genres = [
  { name: "Action", icon: "Swords" },
  { name: "RPG", icon: "Map" },
  { name: "Puzzle", icon: "PuzzleIcon" },
  { name: "Cozy", icon: "Leaf" },
  { name: "Strategy", icon: "Brain" },
  { name: "Indie", icon: "Sparkles" },
  { name: "Sim", icon: "Home" },
  { name: "World", icon: "Compass" },
] as const;

export const communityFavorites = [
  {
    id: "blacksmith-legends",
    title: "Blacksmith Legends",
    quote: '"The most detailed crafting system ever."',
    price: "$19.99",
    rating: 5,
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba7e9c4?w=600&h=340&fit=crop",
  },
  {
    id: "pixelvale-origins",
    title: "Pixelvale: Origins",
    quote: "The game that started it all.",
    price: "Free",
    isFree: true,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=340&fit=crop",
  },
  {
    id: "starlight-voyager",
    title: "Starlight Voyager",
    quote: "Retro space combat at its finest.",
    price: "$14.99",
    rating: 4,
    image: "",
  },
];

export const newsItems = [
  {
    id: "winter-sale",
    date: "Nov 20, 2024",
    title: "Winter Sale Coming Soon!",
    excerpt:
      "Prepare your wishlists. Our biggest sale of the year starts next week with up to 75% off indie favorites.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
  },
  {
    id: "pixel-art-jam",
    date: "Nov 15, 2024",
    title: "Developer Spotlight: Pixel Art Jam",
    excerpt:
      "Check out the winners of our latest community game jam. Over 50 new free titles added to the store today.",
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba7e9c4?w=200&h=200&fit=crop",
  },
];

export const gameDetail = {
  title: "Pixelvale: Origins",
  tags: ["RPG", "Adventure", "Cozy"],
  rating: 4.8,
  reviewCount: "1,245",
  price: "Free",
  heroImage:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600&h=700&fit=crop",
  gallery: [
    { type: "video", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=280&fit=crop" },
    { type: "image", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=280&fit=crop" },
    { type: "image", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=280&fit=crop" },
    { type: "image", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=280&fit=crop" },
  ],
  description: [
    "Welcome to the serene valleys of Pixelvale, a world where your only mandate is to discover, build, and belong. As a newly arrived traveler, you are gifted a small plot of land and the ancient tools of the Vale. What follows is a slow-paced adventure focused on meaningful connections and rhythmic growth.",
    "Fish in the crystal-clear rivers, cultivate rare moon-berries, and help your neighbors restore the village's lost history. Pixelvale: Origins is more than just a game; it's a digital sanctuary designed for those who seek the comfort of a life well-lived in pixels.",
  ],
  details: {
    developer: "Pixelvale Games",
    publisher: "Pixelvale Indie",
    releaseDate: "Oct 2024",
  },
  download: {
    size: "1.2 GB",
    version: "v1.2.4",
    updated: "Oct 12",
  },
  requirements: {
    minimum: { cpu: "Quad-core 2.4GHz", ram: "8GB", gpu: "GTX 1060 (2GB VRAM)", storage: "2GB Available Space" },
    recommended: { cpu: "Intel i5-11400 / Ryzen 5 5600", ram: "16GB", gpu: "RTX 2060 / RX 5600 XT", storage: "2GB (SSD Recommended)" },
  },
};

export const reviews = [
  { id: "1", initials: "AM", name: "Alex Moss", hours: "14.5 hours on record", rating: 5, text: '"The most relaxing experience I\'ve had in years. The pixel art is breathtaking at sunrise."' },
  { id: "2", initials: "SC", name: "Sarah Cloud", hours: "32.2 hours on record", rating: 4, text: '"Lovely mechanics and a very supportive community. Can\'t wait for more content updates!"' },
  { id: "3", initials: "RV", name: "River Vale", hours: "108 hours on record", rating: 5, text: '"Finally, a \'cozy\' game that actually feels deep. The crafting system is incredibly rewarding."' },
];

export const relatedGames: Game[] = [
  { id: "autumn-tales-2", title: "Autumn Tales", genre: "Farming Sim", price: "$14.99", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop" },
  { id: "forest-spirit-2", title: "Forest Spirit", genre: "Exploration", price: "$19.99", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=500&fit=crop" },
  { id: "mystic-grove-2", title: "Mystic Grove", genre: "Puzzle / Alchemy", price: "$9.99", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop" },
  { id: "pixel-peak-2", title: "Pixel Peak", genre: "Platformer", price: "Free", isFree: true, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop" },
];

export const libraryGames = [
  {
    id: "pixelvale-origins",
    title: "Pixelvale: Origins",
    genre: "Adventure • RPG",
    installed: true,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&h=280&fit=crop",
  },
  {
    id: "mystic-grove",
    title: "Mystic Grove",
    genre: "Exploration • Puzzle",
    installed: false,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=280&fit=crop",
  },
  {
    id: "forest-spirit",
    title: "Forest Spirit",
    genre: "Platformer • Magic",
    installed: true,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=280&fit=crop",
  },
  {
    id: "clockwork-heart",
    title: "Clockwork Heart",
    genre: "Narrative • Steampunk",
    installed: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=280&fit=crop",
  },
];

export const activeDownload = {
  title: "Autumn Tales",
  downloaded: "7.2 GB",
  total: "9.6 GB",
  percent: 75,
  speed: "1.2 MB/s",
  image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
};

export const recentlyPlayed = [
  { id: "pixelvale-origins", title: "Pixelvale: Origins", hours: "24 hours played", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=100&h=100&fit=crop" },
  { id: "mystic-grove", title: "Mystic Grove", hours: "8.5 hours played", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop" },
  { id: "forest-spirit", title: "Forest Spirit", hours: "12 hours played", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=100&h=100&fit=crop" },
];

export const categoryFilters = ["All", "Updates", "Devlogs", "Events", "Sales"];

export const featuredArticle = {
  tag: "SALE",
  title: "Winter Sale Coming Soon!",
  excerpt:
    "Cozy up with the best deals of the season. Our annual Winter Solstice festival brings massive discounts to the most beloved indie titles on the store.",
  date: "Nov 20, 2024",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=600&fit=crop",
};

export const newsArticles = [
  {
    id: "devlog-14",
    category: "Devlog",
    categoryColor: "text-tertiary",
    title: "Devlog #14: Building Our Community",
    excerpt:
      "Dive into our latest structural changes! We are introducing new ways for developers to interact directly with their players via integrated devlogs and nested feedback loops.",
    date: "Nov 18, 2024",
    image: "https://images.unsplash.com/photo-1594736797933-d0f06ba7e9c4?w=500&h=280&fit=crop",
  },
  {
    id: "pixel-art-jam",
    category: "Events",
    categoryColor: "text-secondary",
    title: "Developer Spotlight: Pixel Art Jam",
    excerpt:
      "Meet the visionaries behind the most stunning visuals this quarter. We recap the winners of our 48-hour art jam and showcase their incredible work.",
    date: "Nov 15, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=280&fit=crop",
  },
  {
    id: "v1-2-autumn",
    category: "Update",
    categoryColor: "text-secondary",
    title: "Version 1.2: The Autumn Update",
    excerpt:
      "New foraging mechanics, seasonal decay systems, and three new craftable recipes have arrived. The Vale is changing—make sure you're prepared for the frost.",
    date: "Nov 12, 2024",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=280&fit=crop",
  },
];

export const popularThisWeek = [
  { category: "Update", title: "Mastering the New Foraging System", reads: "12.4k reads" },
  { category: "Community", title: "Vale Fan Art Showcase #8", reads: "8.2k reads" },
  { category: "Sales", title: "Weekend Spotlight: Farmhand Simulator", reads: "7.9k reads" },
];

export const communityStats = [
  { icon: "Users", value: "12,400", label: "Members" },
  { icon: "MessageSquare", value: "3,200", label: "Discussions" },
  { icon: "Circle", value: "48", label: "Online Now" },
];

export const communityTabsList = [
  "All",
  "General Discussion",
  "Guides & Tips",
  "Fan Art",
  "Bug Reports",
  "Suggestions",
];

export const pinnedThreads = [
  {
    id: "guidelines",
    tagLabel: "Pinned • News",
    title: "Welcome to the Vale: Community Guidelines & Rules",
    excerpt: "Please read our updated community standards before posting your first journey log...",
    replies: 156,
    likes: 892,
    lastActive: "Last active 2h ago",
    avatar: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=100&h=100&fit=crop",
  },
  {
    id: "fanart-showcase",
    tagLabel: "Pinned • Events",
    title: "Community Showcase: Best Fan Art of the Season",
    excerpt: "Vote for your favorite entries in our monthly artistic challenge! Prize winners announced soon.",
    replies: 42,
    likes: 1200,
    lastActive: "Last active 5h ago",
    avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop",
  },
];

export const regularThreads = [
  {
    id: "hidden-clearing",
    author: "ForestWalker",
    badge: "Guides",
    badgeColor: "bg-secondary-fixed text-secondary",
    title: "How to find the hidden clearing in 'Mistborne'",
    excerpt: "Spent 3 hours tracking the fireflies and finally found the entrance to the legendary grove...",
    replies: 28,
    likes: 45,
    time: "8h ago",
    avatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
  },
  {
    id: "16bit-valecity",
    author: "PixelPainter",
    badge: "Fan Art",
    badgeColor: "bg-surface-container-highest text-on-surface-variant",
    title: "Check out my 16-bit interpretation of the Vale City",
    excerpt: "I wanted to capture the glow of the lanterns at night. Feedback is welcome!",
    replies: 12,
    likes: 112,
    time: "12h ago",
    avatar: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=100&h=100&fit=crop",
  },
  {
    id: "controller-bug",
    author: "BugSquasher",
    badge: "Bug Reports",
    badgeColor: "bg-red-100 text-red-800",
    title: "Issue with controller mapping in latest patch",
    excerpt: "Anyone else noticing the X button isn't responding in the menu after the v1.2 update?",
    replies: 8,
    likes: 3,
    time: "1d ago",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0f06ba7e9c4?w=100&h=100&fit=crop",
  },
];

export const topContributors = [
  { name: "ElderSprout", badge: "Sage", badgeColor: "bg-primary/10 text-primary", avatar: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=80&h=80&fit=crop", highlighted: true },
  { name: "WanderingSoul", badge: "Guide", badgeColor: "bg-secondary-fixed text-secondary", avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop", highlighted: false },
  { name: "MoonLark", badge: "Artist", badgeColor: "bg-surface-container-highest text-on-surface-variant", avatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop", highlighted: false },
];

export const helpCategories = [
  { icon: "DownloadCloud", title: "Download & Installation", desc: "Troubleshoot file errors, installer loops, and speed issues." },
  { icon: "CreditCard", title: "Account & Billing", desc: "Manage payment methods, subscriptions, and profile security." },
  { icon: "Wrench", title: "Technical Issues", desc: "Fix crashes, black screens, and hardware compatibility problems." },
  { icon: "ShoppingCart", title: "Refunds & Purchases", desc: "Learn about our refund policy and track recent orders." },
  { icon: "Rocket", title: "Launcher Help", desc: "Optimize your Pixelvale Launcher settings and library view." },
  { icon: "Bug", title: "Report a Bug", desc: "Submit feedback directly to our indie developers." },
];

export const popularArticles = [
  { title: "Troubleshooting DX11 Errors", desc: "A step-by-step guide for Windows users." },
  { title: "How to link your Steam account", desc: "Sync your library across platforms easily." },
  { title: "Pixelvale Refund Policy 2024", desc: "Everything you need to know before buying." },
  { title: "Offline Mode Configuration", desc: "Play your single-player favorites anywhere." },
  { title: "Minimum System Requirements", desc: "Check if your rig can handle our latest hits." },
  { title: "Two-Factor Authentication Setup", desc: "Keep your digital home safe and secure." },
];

export const faqItems = [
  {
    question: "Can I play games on multiple devices?",
    answer:
      "Yes! Your Pixelvale library is tied to your account. You can log in on any machine to download and play your games, though some titles may have specific DRM limits or simultaneous session restrictions.",
  },
  {
    question: "How do I request a refund for a game?",
    answer:
      'Refunds can be requested within 14 days of purchase if the game has been played for less than 2 hours. Simply navigate to your Purchase History in the Launcher and click "Request Refund."',
  },
  {
    question: "Does Pixelvale support Linux or Steam Deck?",
    answer:
      "We are currently beta-testing our native Linux launcher. Many of our games are already Deck Verified and can be played via Proton on the Steam Deck.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We currently accept all major credit cards, PayPal, and regional options like iDEAL and Sofort. We are also exploring the addition of digital wallet support later this year.",
  },
  {
    question: "Is there a family sharing feature?",
    answer:
      "Not yet, but it's on our 2024 Roadmap! We value community and understand the importance of sharing cozy experiences with your loved ones.",
  },
];

export const confirmationOrder = {
  gameTitle: "Pixelvale: Origins",
  platform: "PC / Mac",
  orderNumber: "PV-88294",
  date: "Nov 20, 2024",
  price: "$21.59",
  image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=450&fit=crop",
};

export const recommendedAfterPurchase = [
  { id: "misty-grove", title: "The Misty Grove", price: "$9.99", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop" },
  { id: "autumn-harvest", title: "Autumn Harvest", price: "$14.99", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop" },
  { id: "mountain-quest", title: "Mountain Quest", price: "$12.50", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop" },
];

export const profileUser = {
  username: "LeafyLegend",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  banner: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&h=400&fit=crop",
  gamesOwned: 12,
  reviews: 4,
  hoursPlayed: 340,
};

export const profileRecentlyPlayed = [
  { title: "Stardew Serenity", hours: "142 Hours", image: "https://images.unsplash.com/photo-1594736797933-d0f06ba7e9c4?w=400&h=225&fit=crop" },
  { title: "Crystal Isles", hours: "85 Hours", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop" },
  { title: "Isometry", hours: "24 Hours", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop" },
];

export const achievementBadges = [
  { icon: "Leaf", title: "First Harvest", unlocked: true },
  { icon: "Compass", title: "Explorer", unlocked: true },
  { icon: "Users", title: "Social Butterfly", unlocked: true },
  { icon: "Waves", title: "Deep Diver", unlocked: true },
  { icon: "Lock", title: "", unlocked: false },
  { icon: "Lock", title: "", unlocked: false },
  { icon: "Lock", title: "", unlocked: false },
  { icon: "Lock", title: "", unlocked: false },
];

export const profileReviews = [
  {
    game: "Meadow Tales",
    date: "Nov 12, 2024",
    rating: 5,
    text: "The most relaxing experience I've had in years. The music alone is worth the price of admission. Highly recommended for fans of slow-paced exploration.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
  },
  {
    game: "Cyber Logic",
    date: "Oct 28, 2024",
    rating: 4,
    text: "Challenging but fair. Some of the late-game puzzles are mind-bending. The aesthetic is clean and helps with focus.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
  },
];

export const profileFriends = [
  { name: "PixelPanda", online: true, avatar: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=80&h=80&fit=crop" },
  { name: "FoxFire", online: true, avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
  { name: "MistRunner", online: false, avatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop" },
];