import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MOCK_POSTS } from "../../src/api/mock-data";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <View style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Listing not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const price = post.price ? parseFloat(post.price) : 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Gallery placeholder */}
        <View style={styles.gallery}>
          <View style={styles.galleryPlaceholder}>
            <Text style={styles.placeholderIcon}>🖼</Text>
          </View>
        </View>

        {/* Cosell banner */}
        <View style={styles.cosellBanner}>
          <View style={styles.cosellLeft}>
            <Text style={styles.cosellLabel}>Cosell For Crypto.</Text>
            <Text style={styles.cosellPercent}>{post.commission || "0"}% Commission</Text>
          </View>
          <Pressable style={styles.cosellButton}>
            <Text style={styles.cosellButtonText}>Become a Coseller</Text>
          </Pressable>
        </View>

        {/* Buy button */}
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Pressable>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.priceAmount}>{price} USDC</Text>
        </View>

        {/* Title & description */}
        <View style={styles.bodySection}>
          {/* Owner */}
          <View style={styles.ownerBar}>
            <View style={styles.ownerAvatar} />
            <Text style={styles.ownerName}>{post.nickname}</Text>
          </View>

          <Text style={styles.title}>{post.title}</Text>
          {post.categoryName && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{post.categoryName}</Text>
            </View>
          )}
          <Text style={styles.bio}>{post.bio}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Bookmark</Text>
          </Pressable>
          <View style={styles.actionDivider} />
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
        </View>

        {/* Ratings placeholder */}
        <View style={styles.ratingsSection}>
          <View style={styles.ratingsHeader}>
            <Text style={styles.ratingsTitle}>Ratings</Text>
            <Text style={styles.ratingsScore}>⭐ 0.0 (0)</Text>
          </View>
          <Text style={styles.noRatings}>No ratings yet</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 40 },

  // Not found
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 },
  notFoundText: { fontSize: 18, color: "#737373", marginBottom: 16 },
  backButton: { paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: "#000", borderRadius: 6 },
  backButtonText: { fontSize: 14, fontWeight: "500" },

  // Gallery
  gallery: { aspectRatio: 16 / 9, backgroundColor: "#f5f5f5" },
  galleryPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center" },
  placeholderIcon: { fontSize: 48, opacity: 0.3 },

  // Cosell banner
  cosellBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#e5e5e5",
  },
  cosellLeft: { gap: 2 },
  cosellLabel: { fontSize: 14, fontWeight: "600", color: "#000" },
  cosellPercent: { fontSize: 13, color: "#525252" },
  cosellButton: { borderWidth: 1, borderColor: "#000", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  cosellButtonText: { fontSize: 13, fontWeight: "500" },

  // Buy
  buyButton: { backgroundColor: "#000", paddingVertical: 16, alignItems: "center" },
  buyButtonText: { fontSize: 17, fontWeight: "600", color: "#fff" },

  // Price
  priceRow: { paddingVertical: 14, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  priceAmount: { fontSize: 16, fontWeight: "500", color: "#000" },

  // Body
  bodySection: { padding: 20, gap: 12 },
  ownerBar: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#f5f5f5", marginBottom: 4 },
  ownerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#e5e5e5" },
  ownerName: { fontSize: 15, fontWeight: "500", color: "#000" },
  title: { fontSize: 28, fontWeight: "600", color: "#000" },
  categoryBadge: { backgroundColor: "#f5f5f5", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, alignSelf: "flex-start" },
  categoryBadgeText: { fontSize: 13, color: "#525252" },
  bio: { fontSize: 16, color: "#737373", lineHeight: 24 },

  // Actions
  actions: { flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#f5f5f5" },
  actionButton: { flex: 1, paddingVertical: 14, alignItems: "center" },
  actionText: { fontSize: 15, color: "#737373" },
  actionDivider: { width: 1, backgroundColor: "#e5e5e5" },

  // Ratings
  ratingsSection: { padding: 20 },
  ratingsHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  ratingsTitle: { fontSize: 16, fontWeight: "500", color: "#000" },
  ratingsScore: { fontSize: 14, color: "#000" },
  noRatings: { fontSize: 14, color: "#a3a3a3", textAlign: "center", paddingVertical: 20 },
});
