/**
 * Shared types mirroring the web app's data models.
 * These match the database schema in the web codebase.
 */

export interface Category {
  id: string;
  name: string;
  description: string;
  position: number;
}

export interface CategoryTag {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface PostListItem {
  id: string;
  title: string;
  bio: string;
  price: string | null;
  categoryId: string;
  categoryName?: string;
  userId: string;
  nickname: string;
  avatarUrl: string;
  thumbnailUrl: string;
  commission?: string;
  createdAt: string;
  isDraft: boolean;
  isActive: boolean;
  payoutChain: "base" | "solana";
}

export interface Post {
  id: string;
  title: string;
  bio: string;
  description: string;
  content: string;
  price: string | null;
  categoryId: string;
  categoryName?: string;
  userId: string;
  nickname: string;
  avatarUrl: string;
  bannerUrl: string;
  commission?: string;
  walletAddress: string;
  payoutChain: "base" | "solana";
  isDraft: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  promotion?: string;
  promotionExpiresAt?: string;
  promotionRank?: number;
  status?: string;
}

export interface PostVariant {
  id: string;
  postId: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  content: string;
  position: number;
  isPwyw: boolean;
  suggestedPrice: string | null;
}

export interface Media {
  id: string;
  url: string;
  code: string;
  position: number;
}

export interface PostRating {
  userId: string;
  nickname: string;
  avatarUrl: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface PostMeta {
  ratings: {
    average: number;
    total: number;
  };
  sales: number;
}

export interface User {
  id: string;
  nickname: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string | null;
  about: string | null;
  website: string;
}

export interface SearchResult {
  items: PostListItem[];
  hasMore: boolean;
  page: number;
}

export type SortOption = "newest" | "popular" | "price_asc" | "price_desc";
