import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Link } from "expo-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../../src/api/client";
import type { PostListItem, Category, SortOption } from "../../src/api/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
];

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  // Fetch posts when filters change
  useEffect(() => {
    setLoading(true);
    setPage(1);
    api
      .searchPosts({ search: debouncedSearch, categoryId, sortBy, page: 1 })
      .then((result) => {
        setPosts(result.items);
        setHasMore(result.hasMore);
        setLoading(false);
      });
  }, [categoryId, sortBy, debouncedSearch]);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    api
      .searchPosts({ search: debouncedSearch, categoryId, sortBy, page: 1 })
      .then((result) => {
        setPosts(result.items);
        setHasMore(result.hasMore);
        setRefreshing(false);
      });
  }, [debouncedSearch, categoryId, sortBy]);

  // Load more (infinite scroll)
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    api
      .searchPosts({ search: debouncedSearch, categoryId, sortBy, page: nextPage })
      .then((result) => {
        setPosts((prev) => [...prev, ...result.items]);
        setHasMore(result.hasMore);
        setPage(nextPage);
        setLoadingMore(false);
      });
  }, [loadingMore, hasMore, page, debouncedSearch, categoryId, sortBy]);

  return (
    <View style={styles.container}>
      {/* Search input */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search listings..."
          placeholderTextColor="#a3a3a3"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Category filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        <Pressable
          style={[styles.filterPill, !categoryId && styles.filterPillActive]}
          onPress={() => setCategoryId(undefined)}
        >
          <Text
            style={[
              styles.filterPillText,
              !categoryId && styles.filterPillTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[
              styles.filterPill,
              categoryId === cat.id && styles.filterPillActive,
            ]}
            onPress={() =>
              setCategoryId(categoryId === cat.id ? undefined : cat.id)
            }
          >
            <Text
              style={[
                styles.filterPillText,
                categoryId === cat.id && styles.filterPillTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Sort pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortBar}
        contentContainerStyle={styles.filterContent}
      >
        {SORT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            style={[
              styles.sortPill,
              sortBy === opt.value && styles.sortPillActive,
            ]}
            onPress={() => setSortBy(opt.value)}
          >
            <Text
              style={[
                styles.sortPillText,
                sortBy === opt.value && styles.sortPillTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Post list */}
      {loading ? (
        <SkeletonList />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <PostCard item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No listings found</Text>
              <Text style={styles.emptySubtext}>
                {search ? "Try a different search term" : "Check back soon for new listings"}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

// -- Skeleton Loading --

function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.cardImage, { opacity, backgroundColor: "#e5e5e5" }]} />
      <View style={styles.cosellBar}>
        <Animated.View style={[styles.skeletonLine, { opacity, width: 100 }]} />
        <Animated.View style={[styles.skeletonLine, { opacity, width: 70 }]} />
      </View>
      <View style={styles.cardBody}>
        <Animated.View style={[styles.skeletonLine, { opacity, width: "70%", height: 18 }]} />
        <Animated.View style={[styles.skeletonLine, { opacity, width: "100%", height: 14 }]} />
        <Animated.View style={[styles.skeletonLine, { opacity, width: "85%", height: 14 }]} />
        <View style={[styles.cardFooter, { marginTop: 12 }]}>
          <View style={styles.ownerRow}>
            <Animated.View style={[styles.ownerAvatar, { opacity }]} />
            <Animated.View style={[styles.skeletonLine, { opacity, width: 80 }]} />
          </View>
          <Animated.View style={[styles.skeletonLine, { opacity, width: 60, borderRadius: 12 }]} />
        </View>
      </View>
    </View>
  );
}

function SkeletonList() {
  return (
    <ScrollView>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </ScrollView>
  );
}

// -- Post Card --

function PostCard({ item }: { item: PostListItem }) {
  const price = item.price ? parseFloat(item.price) : 0;

  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.cardImage}>
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderIcon}>🖼</Text>
          </View>
        </View>

        <View style={styles.cosellBar}>
          <Text style={styles.cosellText}>
            Cosell: {item.commission || "0"}%
          </Text>
          <Text style={styles.priceText}>{price} USDC</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardBio} numberOfLines={2}>
            {item.bio}
          </Text>

          <View style={styles.cardFooter}>
            <View style={styles.ownerRow}>
              <View style={styles.ownerAvatar} />
              <Text style={styles.ownerName}>{item.nickname}</Text>
            </View>
            {item.categoryName && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                  {item.categoryName}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Search
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#000",
  },

  // Filters
  filterBar: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  filterContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  filterPillActive: { backgroundColor: "#000", borderColor: "#000" },
  filterPillText: { fontSize: 14, color: "#525252", fontWeight: "500" },
  filterPillTextActive: { color: "#fff" },

  // Sort
  sortBar: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  sortPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  sortPillActive: { backgroundColor: "#f5f5f5" },
  sortPillText: { fontSize: 13, color: "#a3a3a3", fontWeight: "500" },
  sortPillTextActive: { color: "#000" },

  // List
  listContent: { paddingBottom: 20 },

  // Card
  card: { borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  cardImage: { aspectRatio: 16 / 9, backgroundColor: "#f5f5f5" },
  cardImagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: { fontSize: 32, opacity: 0.3 },

  cosellBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    gap: 16,
  },
  cosellText: { fontSize: 14, color: "#525252" },
  priceText: { fontSize: 15, fontWeight: "600", color: "#000" },

  cardBody: { padding: 16, gap: 8 },
  cardTitle: { fontSize: 17, fontWeight: "600", color: "#000" },
  cardBio: { fontSize: 14, color: "#737373", lineHeight: 20 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ownerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e5e5",
  },
  ownerName: { fontSize: 14, color: "#000" },

  categoryBadge: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryBadgeText: { fontSize: 12, color: "#525252" },

  // Skeleton
  skeletonLine: {
    height: 14,
    backgroundColor: "#e5e5e5",
    borderRadius: 4,
  },

  // Loading more
  loadingMore: { paddingVertical: 20, alignItems: "center" },

  // Empty
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", color: "#000", marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: "#a3a3a3" },
});
