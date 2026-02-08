/**
 * HTTP API Client for For Crypto Mobile
 * 
 * Makes HTTP requests to the For Crypto web app API endpoints.
 * Replaces MockApiClient when real data integration is needed.
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

import type { ApiClient, SearchParams } from "./client";

export class HttpApiClient implements ApiClient {
  constructor(private baseUrl: string) {}

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/api/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const data = await response.json();
    return data.categories;
  }

  async getTrendingTags(limit = 5): Promise<CategoryTag[]> {
    // TODO: Implement tags API endpoint
    // For now, return empty array
    return [];
  }

  async searchPosts(params: SearchParams): Promise<SearchResult> {
    const urlParams = new URLSearchParams();
    
    if (params.search) urlParams.append("search", params.search);
    if (params.page) urlParams.append("page", params.page.toString());
    if (params.categoryId) urlParams.append("categoryId", params.categoryId);
    if (params.tagId) urlParams.append("tagId", params.tagId);
    if (params.minPrice !== undefined) urlParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice !== undefined) urlParams.append("maxPrice", params.maxPrice.toString());
    if (params.sortBy) urlParams.append("sortBy", params.sortBy);

    const response = await fetch(`${this.baseUrl}/api/posts/search?${urlParams}`);
    if (!response.ok) {
      throw new Error(`Failed to search posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      items: data.items,
      hasMore: data.hasMore,
      page: data.page,
    };
  }

  async getPost(id: string): Promise<Post | null> {
    const response = await fetch(`${this.baseUrl}/api/posts/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.post;
  }

  async getPostVariants(id: string): Promise<PostVariant[]> {
    const response = await fetch(`${this.baseUrl}/api/posts/${id}`);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post variants: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.variants || [];
  }

  async getPostMedia(id: string): Promise<Media[]> {
    const response = await fetch(`${this.baseUrl}/api/posts/${id}`);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post media: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.media || [];
  }

  async getPostRatings(id: string): Promise<{ items: PostRating[]; meta: PostMeta["ratings"] }> {
    const response = await fetch(`${this.baseUrl}/api/posts/${id}`);
    if (response.status === 404) {
      return { items: [], meta: { average: 0, total: 0 } };
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post ratings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      items: [], // TODO: Add ratings API if needed
      meta: data.meta?.ratings || { average: 0, total: 0 },
    };
  }

  async getPostMeta(id: string): Promise<PostMeta> {
    const response = await fetch(`${this.baseUrl}/api/posts/${id}`);
    if (response.status === 404) {
      return { ratings: { average: 0, total: 0 }, sales: 0 };
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch post meta: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      ratings: data.meta?.ratings || { average: 0, total: 0 },
      sales: data.meta?.sales || 0,
    };
  }

  async getUser(id: string): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/api/users/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.user;
  }
}