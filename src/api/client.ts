/**
 * For Crypto Mobile API Client
 * 
 * Uses mock data in development. When the REST API is built,
 * swap MockApiClient for a real HttpApiClient that hits the endpoints.
 * All consumers import from this file - the implementation is hidden.
 */

import type {
  Category,
  PostListItem,
  Post,
  PostVariant,
  Media,
  PostRating,
  PostMeta,
  User,
  SearchResult,
  SortOption,
  CategoryTag,
} from "./types";

// -- Interface: what the app needs from the API --

export interface ApiClient {
  // Categories
  getCategories(): Promise<Category[]>;
  getTrendingTags(limit?: number): Promise<CategoryTag[]>;

  // Posts
  searchPosts(params: SearchParams): Promise<SearchResult>;
  getPost(id: string): Promise<Post | null>;
  getPostVariants(id: string): Promise<PostVariant[]>;
  getPostMedia(id: string): Promise<Media[]>;
  getPostRatings(id: string): Promise<{ items: PostRating[]; meta: PostMeta["ratings"] }>;
  getPostMeta(id: string): Promise<PostMeta>;

  // Users
  getUser(id: string): Promise<User | null>;
}

export interface SearchParams {
  search?: string;
  page?: number;
  categoryId?: string;
  tagId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
}

// -- Mock Implementation --

import { MOCK_CATEGORIES, MOCK_POSTS, MOCK_TAGS } from "./mock-data";

class MockApiClient implements ApiClient {
  private delay(ms = 200): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  async getCategories(): Promise<Category[]> {
    await this.delay();
    return MOCK_CATEGORIES;
  }

  async getTrendingTags(limit = 5): Promise<CategoryTag[]> {
    await this.delay();
    return MOCK_TAGS.slice(0, limit);
  }

  async searchPosts(params: SearchParams): Promise<SearchResult> {
    await this.delay(300);
    let items = [...MOCK_POSTS];

    if (params.categoryId) {
      items = items.filter((p) => p.categoryId === params.categoryId);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q)
      );
    }

    if (params.minPrice !== undefined) {
      items = items.filter((p) => parseFloat(p.price || "0") >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      items = items.filter((p) => parseFloat(p.price || "0") <= params.maxPrice!);
    }

    if (params.sortBy === "price_asc") {
      items.sort((a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0"));
    } else if (params.sortBy === "price_desc") {
      items.sort((a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0"));
    }

    const page = params.page || 1;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const paged = items.slice(start, start + perPage);

    return {
      items: paged,
      hasMore: start + perPage < items.length,
      page,
    };
  }

  async getPost(id: string): Promise<Post | null> {
    await this.delay();
    const item = MOCK_POSTS.find((p) => p.id === id);
    if (!item) return null;
    return {
      ...item,
      description: item.bio,
      content: "",
      bannerUrl: "",
      walletAddress: "0x0000000000000000000000000000000000000000",
      updatedAt: item.createdAt,
    };
  }

  async getPostVariants(id: string): Promise<PostVariant[]> {
    await this.delay();
    const post = MOCK_POSTS.find((p) => p.id === id);
    if (!post) return [];
    return [
      {
        id: `${id}-v1`,
        postId: id,
        name: "Default",
        description: "",
        price: post.price || "0",
        quantity: -1,
        content: "Digital download included",
        position: 0,
        isPwyw: false,
        suggestedPrice: null,
      },
    ];
  }

  async getPostMedia(id: string): Promise<Media[]> {
    await this.delay();
    return [
      {
        id: `${id}-m1`,
        url: "https://via.placeholder.com/800x450",
        code: "post-gallery",
        position: 0,
      },
    ];
  }

  async getPostRatings(id: string): Promise<{ items: PostRating[]; meta: PostMeta["ratings"] }> {
    await this.delay();
    return {
      items: [],
      meta: {
        average: 0,
        total: 0,
      },
    };
  }

  async getPostMeta(id: string): Promise<PostMeta> {
    await this.delay();
    return {
      ratings: { average: 0, total: 0 },
      sales: 0,
    };
  }

  async getUser(id: string): Promise<User | null> {
    await this.delay();
    return {
      id,
      nickname: `user-${id.slice(0, 6)}`,
      avatarUrl: "https://via.placeholder.com/80",
      bannerUrl: "",
      bio: null,
      about: null,
      website: "",
    };
  }
}

// -- Future: Real HTTP Implementation --
// class HttpApiClient implements ApiClient {
//   constructor(private baseUrl: string) {}
//   // ... implement with fetch() calls to REST endpoints
// }

// -- Export singleton --
// Switch to HttpApiClient when REST API is ready

import { HttpApiClient } from "./http-client";

// Configuration for API client
const USE_REAL_API = false; // Set to true once API endpoints are deployed
const API_BASE_URL = "https://for-crypto.vercel.app"; // Production API

export const api: ApiClient = USE_REAL_API 
  ? new HttpApiClient(API_BASE_URL)
  : new MockApiClient();
