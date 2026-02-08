/**
 * API client for For Crypto mobile app.
 * Fetches data from the production web app.
 * 
 * The web app uses TanStack Start server functions which are exposed
 * as HTTP POST endpoints. We call them directly.
 */

const BASE_URL = "https://for-crypto.vercel.app";

async function fetchAPI<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify({ data }) : undefined,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Posts
export async function fetchPostsBySearch(params: {
  search?: string;
  page?: number;
  categoryId?: string;
  tagId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular";
}) {
  // For now, fetch from the web app's search page and parse
  // TODO: Once we have a proper API, switch to that
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.page) searchParams.set("page", String(params.page));
  
  const res = await fetch(`${BASE_URL}/api/posts/search?${searchParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

// Categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error(`Categories failed: ${res.status}`);
  return res.json();
}

// Single post
export async function fetchPost(id: string) {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error(`Post fetch failed: ${res.status}`);
  return res.json();
}

export { BASE_URL };
