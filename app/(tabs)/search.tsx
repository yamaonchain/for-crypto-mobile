import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useState, useCallback, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// Mock data structures matching web app
interface Category {
  id: string;
  name: string;
  description: string;
  position: number;
}

interface PostListItem {
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

type SortOption = "newest" | "popular" | "price_asc" | "price_desc";

// Mock categories matching web app
const CATEGORIES: Category[] = [
  { id: "1", name: "Product", description: "Digital products and downloads", position: 1 },
  { id: "2", name: "Service", description: "Professional services", position: 2 },
  { id: "3", name: "Experience", description: "Events and experiences", position: 3 },
  { id: "4", name: "Membership", description: "Subscriptions and memberships", position: 4 },
  { id: "5", name: "Bot", description: "API access and bots", position: 5 },
];

// Mock trending tags
const TRENDING_TAGS = [
  { id: "1", name: "AI", slug: "ai" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Templates", slug: "templates" },
  { id: "4", name: "Courses", slug: "courses" },
  { id: "5", name: "Tools", slug: "tools" },
];

// Price ranges matching web app
const PRICE_RANGES = [
  { label: "Any Price", min: undefined, max: undefined },
  { label: "Under 10", min: undefined, max: 10 },
  { label: "10-50", min: 10, max: 50 },
  { label: "50-100", min: 50, max: 100 },
  { label: "100+", min: 100, max: undefined },
];

// Sort options matching web app
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

// Mock posts data
const MOCK_POSTS: PostListItem[] = [
  {
    id: "1",
    title: "No School 4 Week Bootcamp.",
    bio: "A 5-step video-based mindset reset for anyone building instead of waiting for permission.",
    price: "875",
    categoryId: "1",
    categoryName: "Product",
    userId: "user1",
    nickname: "builder.eth",
    avatarUrl: "",
    thumbnailUrl: "",
    commission: "10",
    createdAt: "2024-01-15T10:00:00Z",
    isDraft: false,
    isActive: true,
    payoutChain: "base",
  },
  {
    id: "2", 
    title: "Together Daily Spark.",
    bio: "A daily drop of connection for couples who want to stay close, curious, and never bored.",
    price: "7",
    categoryId: "2",
    categoryName: "Service",
    userId: "user2",
    nickname: "love.sol",
    avatarUrl: "",
    thumbnailUrl: "",
    commission: "20",
    createdAt: "2024-01-14T10:00:00Z",
    isDraft: false,
    isActive: true,
    payoutChain: "solana",
  },
  {
    id: "3",
    title: "Community Intake Kit for Divvvy.",
    bio: "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for upload to Divvvy.",
    price: "2",
    categoryId: "1",
    categoryName: "Product",
    userId: "user3", 
    nickname: "divvvy.app",
    avatarUrl: "",
    thumbnailUrl: "",
    commission: "20",
    createdAt: "2024-01-13T10:00:00Z",
    isDraft: false,
    isActive: true,
    payoutChain: "base",
  },
  {
    id: "4",
    title: "Designer Gear for Shredders Game.",
    bio: "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style for your rider.",
    price: "50",
    categoryId: "3",
    categoryName: "Experience", 
    userId: "user4",
    nickname: "shredders.game",
    avatarUrl: "",
    thumbnailUrl: "",
    commission: "20",
    createdAt: "2024-01-12T10:00:00Z",
    isDraft: false,
    isActive: true,
    payoutChain: "base",
  },
  {
    id: "5",
    title: "Freckle Fade Lightroom Presets.",
    bio: "Not born with freckles? No problem. This Lightroom preset pack adds natural-looking freckles and warm tones.",
    price: "65",
    categoryId: "1",
    categoryName: "Product",
    userId: "user5",
    nickname: "preset.studio",
    avatarUrl: "",
    thumbnailUrl: "",
    commission: "15",
    createdAt: "2024-01-11T10:00:00Z",
    isDraft: false,
    isActive: true,
    payoutChain: "base",
  },
];

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  
  // Filter state matching web app
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [tagId, setTagId] = useState<string | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Handle deep link parameters
  useEffect(() => {
    if (params.category) {
      // Map category names to IDs
      const categoryMap: Record<string, string> = {
        product: "1",
        service: "2", 
        experience: "3",
        membership: "4",
        bot: "5",
      };
      const categoryIdFromParam = categoryMap[String(params.category).toLowerCase()];
      if (categoryIdFromParam) {
        setCategoryId(categoryIdFromParam);
      }
    }
  }, [params.category]);
  
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [hasMore, setHasMore] = useState(true);

  const hasActiveFilters = categoryId || tagId || minPrice !== undefined || maxPrice !== undefined || sortBy !== "newest";

  // Mock search function
  const performSearch = useCallback(() => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      let filteredPosts = [...MOCK_POSTS];
      
      if (searchText) {
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchText.toLowerCase()) ||
          post.bio.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      if (categoryId) {
        filteredPosts = filteredPosts.filter(post => post.categoryId === categoryId);
      }
      
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredPosts = filteredPosts.filter(post => {
          const price = post.price ? parseFloat(post.price) : 0;
          const meetsMin = minPrice === undefined || price >= minPrice;
          const meetsMax = maxPrice === undefined || price <= maxPrice;
          return meetsMin && meetsMax;
        });
      }
      
      // Sort
      filteredPosts.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return (parseFloat(a.price || "0")) - (parseFloat(b.price || "0"));
          case "price_desc":
            return (parseFloat(b.price || "0")) - (parseFloat(a.price || "0"));
          case "popular":
            return b.title.localeCompare(a.title); // Mock popularity
          case "newest":
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
      
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 500);
  }, [searchText, categoryId, tagId, minPrice, maxPrice, sortBy]);

  // Trigger search when filters change
  useFocusEffect(
    useCallback(() => {
      performSearch();
    }, [performSearch])
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      performSearch();
      setIsRefreshing(false);
    }, 1000);
  }, [performSearch]);

  const clearAllFilters = () => {
    setCategoryId(undefined);
    setTagId(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy("newest");
  };

  const setPriceRange = (min?: number, max?: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const isActivePriceRange = (min?: number, max?: number) => {
    return minPrice === min && maxPrice === max;
  };

  const getPriceLabel = () => {
    if (minPrice !== undefined && maxPrice !== undefined) return `$${minPrice}-$${maxPrice}`;
    if (minPrice !== undefined) return `$${minPrice}+`;
    if (maxPrice !== undefined) return `Under $${maxPrice}`;
    return null;
  };

  const activeCategory = CATEGORIES.find((c) => c.id === categoryId);
  const activeTag = TRENDING_TAGS.find((t) => t.id === tagId);
  const activeSortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label;
  const priceLabel = getPriceLabel();

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#737373" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search listings..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={performSearch}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")} style={styles.clearButton}>
              <Ionicons name="close" size={20} color="#737373" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter/Sort Bar - matching web app layout */}
      <View style={styles.filterBar}>
        {/* Filter Button */}
        <Pressable
          style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <View style={styles.filterIconContainer}>
            {/* Custom filter icon matching web */}
            <View style={styles.filterIcon}>
              <View style={[styles.filterLine, { top: 2 }]} />
              <View style={[styles.filterLine, { top: 10 }]} />
              <View style={[styles.filterLine, { top: 18 }]} />
              <View style={[styles.filterSlider, { top: 0, left: 3 }]} />
              <View style={[styles.filterSlider, { top: 8, left: 14 }]} />
              <View style={[styles.filterSlider, { top: 16, left: 3 }]} />
            </View>
          </View>
          <Text style={[styles.filterButtonText, hasActiveFilters && styles.filterButtonTextActive]}>
            Filter
          </Text>
        </Pressable>

        {/* Trending Tags (hidden on small screens like web) */}
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingLabel}>Trending:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingTags}>
            {TRENDING_TAGS.map((tag) => (
              <Pressable
                key={tag.id}
                onPress={() => setTagId(tagId === tag.id ? undefined : tag.id)}
                style={styles.trendingTag}
              >
                <Text style={[styles.trendingTagText, tagId === tag.id && styles.trendingTagTextActive]}>
                  {tag.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Sort Button */}
        <Pressable
          style={styles.sortButton}
          onPress={() => setShowSort(!showSort)}
        >
          <Text style={styles.sortButtonText}>Sort</Text>
          <View style={styles.sortIcon}>
            <Ionicons name="chevron-up" size={12} color="#000" style={{ marginBottom: -2 }} />
            <Ionicons name="chevron-down" size={12} color="#000" style={{ marginTop: -2 }} />
          </View>
        </Pressable>
      </View>

      {/* Active Filters (matching web app) */}
      {hasActiveFilters && (
        <View style={styles.activeFiltersBar}>
          <Text style={styles.activeFiltersLabel}>Active filters:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeFiltersScroll}>
            {activeCategory && (
              <FilterChip label={activeCategory.name} onRemove={() => setCategoryId(undefined)} />
            )}
            {activeTag && (
              <FilterChip label={activeTag.name} onRemove={() => setTagId(undefined)} />
            )}
            {priceLabel && (
              <FilterChip label={priceLabel} onRemove={() => setPriceRange(undefined, undefined)} />
            )}
            {sortBy !== "newest" && (
              <FilterChip label={activeSortLabel || sortBy} onRemove={() => setSortBy("newest")} />
            )}
          </ScrollView>
          <Pressable onPress={clearAllFilters}>
            <Text style={styles.clearAllButton}>Clear all</Text>
          </Pressable>
        </View>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
          {/* Category Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.filterOptions}>
              <Pressable
                style={[styles.filterOption, !categoryId && styles.filterOptionActive]}
                onPress={() => setCategoryId(undefined)}
              >
                <Text style={[styles.filterOptionText, !categoryId && styles.filterOptionTextActive]}>
                  All
                </Text>
              </Pressable>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[styles.filterOption, categoryId === cat.id && styles.filterOptionActive]}
                  onPress={() => setCategoryId(cat.id)}
                >
                  <Text style={[styles.filterOptionText, categoryId === cat.id && styles.filterOptionTextActive]}>
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Price Range Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.filterOptions}>
              {PRICE_RANGES.map((range) => (
                <Pressable
                  key={range.label}
                  style={[styles.filterOption, isActivePriceRange(range.min, range.max) && styles.filterOptionActive]}
                  onPress={() => setPriceRange(range.min, range.max)}
                >
                  <Text style={[styles.filterOptionText, isActivePriceRange(range.min, range.max) && styles.filterOptionTextActive]}>
                    {range.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Pressable style={styles.clearFiltersButton} onPress={clearAllFilters}>
              <Text style={styles.clearFiltersButtonText}>Clear all filters</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Sort Panel */}
      {showSort && (
        <View style={styles.sortPanel}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              style={[styles.sortOption, sortBy === option.value && styles.sortOptionActive]}
              onPress={() => {
                setSortBy(option.value);
                setShowSort(false);
              }}
            >
              <Text style={[styles.sortOptionText, sortBy === option.value && styles.sortOptionTextActive]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <>
                <Ionicons name="search-outline" size={48} color="#d4d4d4" />
                <Text style={styles.emptyTitle}>No listings found</Text>
                <Text style={styles.emptyDescription}>
                  Try adjusting your search terms or filters
                </Text>
              </>
            )}
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          // Mock pagination
          if (hasMore && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setHasMore(false);
            }, 1000);
          }
        }}
        ListFooterComponent={() =>
          isLoading && posts.length > 0 ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={styles.loadingFooterText}>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Pressable style={styles.filterChip} onPress={onRemove}>
      <Text style={styles.filterChipText}>{label}</Text>
      <Ionicons name="close" size={14} color="#000" />
    </Pressable>
  );
}

function PostCard({ item }: { item: PostListItem }) {
  const price = item.price ? parseFloat(item.price) : 0;

  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.postCard}>
        {/* Thumbnail */}
        <View style={styles.cardImage}>
          <Ionicons name="image-outline" size={40} color="#d4d4d4" />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardBio} numberOfLines={2}>
            {item.bio || "No description"}
          </Text>

          {/* Owner row */}
          <Pressable style={styles.ownerRow}>
            <View style={styles.ownerAvatar} />
            <Text style={styles.ownerName}>{item.nickname}</Text>
          </Pressable>

          {/* Price and Category */}
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{price} USDC</Text>
            {item.categoryName && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.categoryName}</Text>
              </View>
            )}
          </View>

          {/* Commission */}
          {item.commission && (
            <View style={styles.commissionBadge}>
              <Text style={styles.commissionText}>Cosell {item.commission}%</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  // Search Header
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    padding: 4,
  },

  // Filter Bar (matching web layout)
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  filterButtonActive: {
    borderColor: "#000",
    backgroundColor: "#f5f5f5",
  },
  filterIconContainer: {
    width: 25,
    height: 22,
  },
  filterIcon: {
    position: "relative",
    width: 25,
    height: 22,
  },
  filterLine: {
    position: "absolute",
    width: 25,
    height: 2,
    backgroundColor: "#000",
  },
  filterSlider: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  filterButtonTextActive: {
    color: "#000",
  },
  trendingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  trendingLabel: {
    fontSize: 14,
    color: "#737373",
    marginRight: 8,
  },
  trendingTags: {
    flex: 1,
  },
  trendingTag: {
    marginRight: 12,
  },
  trendingTagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  trendingTagTextActive: {
    textDecorationLine: "underline",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  sortIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -2,
  },

  // Active Filters
  activeFiltersBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  activeFiltersLabel: {
    fontSize: 12,
    color: "#737373",
    marginRight: 8,
  },
  activeFiltersScroll: {
    flex: 1,
  },
  clearAllButton: {
    fontSize: 12,
    color: "#737373",
    marginLeft: 8,
  },

  // Filter Chip
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },

  // Filter Panel
  filterPanel: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    padding: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  filterOptionActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  filterOptionTextActive: {
    color: "#fff",
  },
  clearFiltersButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  clearFiltersButtonText: {
    fontSize: 14,
    color: "#737373",
  },

  // Sort Panel
  sortPanel: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    padding: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
  },
  sortOptionActive: {
    backgroundColor: "#000",
  },
  sortOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  sortOptionTextActive: {
    color: "#fff",
  },

  // Posts List
  postsList: {
    padding: 16,
    gap: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardImage: {
    height: 200,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  cardBio: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 20,
    marginBottom: 12,
  },
  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  ownerName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#525252",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  categoryBadge: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: "#737373",
  },
  commissionBadge: {
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  commissionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    paddingHorizontal: 32,
  },

  // Loading Footer
  loadingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  loadingFooterText: {
    fontSize: 14,
    color: "#737373",
  },
});