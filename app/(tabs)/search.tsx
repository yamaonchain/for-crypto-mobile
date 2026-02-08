import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { MOCK_CATEGORIES, MOCK_POSTS } from "../../src/api/mock-data";
import type { PostListItem, SortOption } from "../../src/api/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
];

export default function SearchScreen() {
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredPosts = MOCK_POSTS.filter((p) => !categoryId || p.categoryId === categoryId);

  return (
    <View style={styles.container}>
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
          <Text style={[styles.filterPillText, !categoryId && styles.filterPillTextActive]}>
            All
          </Text>
        </Pressable>
        {MOCK_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.filterPill, categoryId === cat.id && styles.filterPillActive]}
            onPress={() => setCategoryId(categoryId === cat.id ? undefined : cat.id)}
          >
            <Text style={[styles.filterPillText, categoryId === cat.id && styles.filterPillTextActive]}>
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
            style={[styles.sortPill, sortBy === opt.value && styles.sortPillActive]}
            onPress={() => setSortBy(opt.value)}
          >
            <Text style={[styles.sortPillText, sortBy === opt.value && styles.sortPillTextActive]}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Post list */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PostCard item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No listings found</Text>
          </View>
        }
      />
    </View>
  );
}

function PostCard({ item }: { item: PostListItem }) {
  const price = item.price ? parseFloat(item.price) : 0;

  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.card}>
        {/* Thumbnail */}
        <View style={styles.cardImage}>
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderIcon}>🖼</Text>
          </View>
        </View>

        {/* Cosell bar */}
        <View style={styles.cosellBar}>
          <Text style={styles.cosellText}>Cosell: {item.commission || "0"}%</Text>
          <Text style={styles.priceText}>{price} USDC</Text>
        </View>

        {/* Info */}
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cardBio} numberOfLines={2}>{item.bio}</Text>

          <View style={styles.cardFooter}>
            <View style={styles.ownerRow}>
              <View style={styles.ownerAvatar} />
              <Text style={styles.ownerName}>{item.nickname}</Text>
            </View>
            {item.categoryName && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.categoryName}</Text>
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

  // Filters
  filterBar: { flexGrow: 0, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  filterContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#e5e5e5" },
  filterPillActive: { backgroundColor: "#000", borderColor: "#000" },
  filterPillText: { fontSize: 14, color: "#525252", fontWeight: "500" },
  filterPillTextActive: { color: "#fff" },

  // Sort
  sortBar: { flexGrow: 0, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  sortPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  sortPillActive: { backgroundColor: "#f5f5f5" },
  sortPillText: { fontSize: 13, color: "#a3a3a3", fontWeight: "500" },
  sortPillTextActive: { color: "#000" },

  // List
  listContent: { padding: 0 },

  // Card (matches web post-card)
  card: { borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  cardImage: { aspectRatio: 16 / 9, backgroundColor: "#f5f5f5" },
  cardImagePlaceholder: { flex: 1, alignItems: "center", justifyContent: "center" },
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

  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  ownerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ownerAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#e5e5e5" },
  ownerName: { fontSize: 14, color: "#000" },

  categoryBadge: { backgroundColor: "#f5f5f5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  categoryBadgeText: { fontSize: 12, color: "#525252" },

  // Empty
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyText: { fontSize: 16, color: "#a3a3a3" },
});
