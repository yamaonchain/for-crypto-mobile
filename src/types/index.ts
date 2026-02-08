// Shared types ported from web codebase (for-crypto)
// These represent the API/domain layer - no DB-specific types

export type PayoutChain = "base" | "solana";

export interface User {
  id: string;
  nickname: string;
  bio: string | null;
  about: string | null;
  avatarUrl: string;
  bannerUrl: string;
  website: string;
  role: string;
  createdAt: string;
}

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

export interface Post {
  id: string;
  title: string;
  description: string;
  bio: string;
  content: string;
  price: string | null;
  isActive: boolean;
  isDraft: boolean;
  payoutChain: PayoutChain;
  categoryId: string;
  currencyId: string;
  userId: string;
  walletAddress: string;
  assets: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostVariant {
  id: string;
  postId: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  position: number;
  isPwyw: boolean;
  suggestedPrice: string | null;
}

export interface Media {
  id: string;
  itemId: string;
  url: string;
  mimeType: string;
  position: number;
  code: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  position: number;
}

export interface Transaction {
  id: string;
  code: string;
  amount: string;
  chain: string;
  hash: string | null;
  status: string;
  from: string;
  to: string;
  itemId: string;
  userId: string;
  createdAt: string;
}

export interface PostRating {
  postId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface UserWallet {
  id: string;
  userId: string;
  walletAddress: string;
  walletType: string;
  chain: string;
}
