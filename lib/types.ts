export type GameDetailData = {
  id: string;
  title: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  price: number;
  isFree: boolean;
  owned: boolean;
  heroImage: string;
  gallery: { type: "image" | "video"; image: string }[];
  description: string[];
  details: {
    developer: string;
    publisher: string;
    releaseDate: string;
  };
  download: {
    size: string;
    version: string;
  };
  downloadLinks: {
    windows: string | null;
    mac: string | null;
    android: string | null;
  };
  requirements: Record<string, { minimum?: Record<string, string>; recommended?: Record<string, string> }>;
};

export type GameSummary = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  price: number;
  isFree: boolean;
  image: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  owned: boolean;
};