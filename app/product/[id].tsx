import { View, Text, StyleSheet, ScrollView, Pressable, Animated, Share, Alert } from "react-native";
import { useLocalSearchParams, router, Link } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../src/api/client";
import type { Post, PostVariant, PostRating, Media, PostMeta } from "../../src/api/types";
import { formatDate } from "date-fns";
import { useCart } from "../../src/context/CartContext";

// Mock variants for example listings
const MOCK_VARIANTS: PostVariant[] = [
  {
    id: "variant-1",
    postId: "1",
    name: "Full Access",
    description: "Complete 4-week bootcamp with all materials",
    price: "875",
    quantity: 100,
    content: "Digital download link will be provided",
    position: 1,
    isPwyw: false,
    suggestedPrice: null,
  }
];

// Mock ratings
const MOCK_RATINGS: PostRating[] = [
  {
    userId: "user1",
    nickname: "early_adopter",
    avatarUrl: "",
    rating: 5,
    comment: "Changed my perspective completely. Worth every penny.",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    userId: "user2", 
    nickname: "builder_123",
    avatarUrl: "",
    rating: 5,
    comment: "Finally someone who gets it. No fluff, just actionable insights.",
    createdAt: "2024-01-09T10:00:00Z",
  }
];

// Mock media
const MOCK_MEDIA: Media[] = [
  {
    id: "media-1",
    url: "/placeholder-image-1.jpg",
    code: "post-thumbnail",
    position: 1,
  },
  {
    id: "media-2",
    url: "/placeholder-image-2.jpg", 
    code: "post-gallery",
    position: 2,
  }
];

// Mock post meta
const MOCK_POST_META: PostMeta = {
  ratings: {
    average: 4.8,
    total: 24,
  },
  sales: 89,
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  const [post, setPost] = useState<Post | null>(null);
  const [variants, setVariants] = useState<PostVariant[]>(MOCK_VARIANTS);
  const [selectedVariant, setSelectedVariant] = useState<PostVariant | null>(MOCK_VARIANTS[0]);
  const [ratings, setRatings] = useState<PostRating[]>(MOCK_RATINGS);
  const [media, setMedia] = useState<Media[]>(MOCK_MEDIA);
  const [postMeta, setPostMeta] = useState<PostMeta>(MOCK_POST_META);
  const [loading, setLoading] = useState(true);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      api.getPost(id).then((p) => {
        setPost(p);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <ProductSkeleton />;

  if (!post) {
    return (
      <View style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={48} color="#d4d4d4" />
          <Text style={styles.notFoundText}>Listing not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const price = selectedVariant?.price ? parseFloat(selectedVariant.price) : 0;
  const commission = post.commission ? parseFloat(post.commission) : 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${post.title}" on For Crypto`,
        url: `https://for-crypto.vercel.app/posts/show/${post.id}`,
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleCosell = () => {
    Alert.alert(
      "Become a Coseller",
      `Earn ${commission}% commission on every sale through your link.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Create Link", onPress: () => console.log("Create cosell link") }
      ]
    );
  };

  const handleAddToCart = () => {
    if (!post || !selectedVariant) return;
    
    addToCart({
      id: post.id,
      title: post.title,
      price: price,
      categoryName: post.categoryName,
      sellerNickname: post.nickname,
      commission: post.commission,
    });

    Alert.alert(
      "Added to Cart",
      `"${post.title}" has been added to your cart.`,
      [
        { text: "Continue Shopping", style: "cancel" },
        { text: "View Cart", onPress: () => router.push("/(tabs)/cart") }
      ]
    );
  };

  const handleBuy = () => {
    Alert.alert(
      "Purchase Listing",
      `Buy "${selectedVariant?.name}" for ${price} USDC?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => console.log("Process purchase") }
      ]
    );
  };

  const averageRating = postMeta.ratings.average;
  const totalRatings = postMeta.ratings.total;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Link href="/search" asChild>
            <Pressable>
              <Text style={styles.breadcrumbLink}>{post.categoryName || "Browse"}</Text>
            </Pressable>
          </Link>
          <Ionicons name="chevron-forward" size={16} color="#737373" />
          <Text style={styles.breadcrumbCurrent} numberOfLines={1}>{post.title}</Text>
        </View>

        {/* Status Badges (matching web app) */}
        <View style={styles.statusBadges}>
          {/* Placeholder for promoted/status badges */}
        </View>

        {/* Media Carousel */}
        <View style={styles.mediaContainer}>
          <View style={styles.mediaPlaceholder}>
            <Ionicons name="image-outline" size={64} color="#d4d4d4" />
          </View>
          {media.length > 1 && (
            <View style={styles.mediaIndicator}>
              <Text style={styles.mediaIndicatorText}>
                {currentImageIndex + 1} / {media.length}
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {/* Title and Meta */}
          <View style={styles.titleSection}>
            <Text style={styles.productTitle}>{post.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#000" />
                <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>({totalRatings} reviews)</Text>
              </View>
              <Text style={styles.salesCount}>{postMeta.sales} sales</Text>
            </View>
          </View>

          {/* Bio */}
          <Text style={styles.productBio}>{post.bio}</Text>

          {/* Seller Info */}
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar} />
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{post.nickname}</Text>
              <Text style={styles.sellerMeta}>Seller • {post.payoutChain.toUpperCase()}</Text>
            </View>
            <Pressable style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
          </View>

          {/* Variants (if multiple) */}
          {variants.length > 1 && (
            <View style={styles.variantsSection}>
              <Text style={styles.variantsTitle}>Choose an option:</Text>
              {variants.map((variant) => (
                <Pressable
                  key={variant.id}
                  style={[
                    styles.variantOption,
                    selectedVariant?.id === variant.id && styles.variantOptionSelected
                  ]}
                  onPress={() => setSelectedVariant(variant)}
                >
                  <View style={styles.variantHeader}>
                    <Text style={styles.variantName}>{variant.name}</Text>
                    <Text style={styles.variantPrice}>{variant.price} USDC</Text>
                  </View>
                  <Text style={styles.variantDescription}>{variant.description}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Purchase Section */}
          <View style={styles.purchaseSection}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{price} USDC</Text>
              <Text style={styles.usdEquivalent}>≈ ${price} USD</Text>
            </View>
            
            <View style={styles.buttonGroup}>
              <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                <Ionicons name="bag-add" size={20} color="#000" />
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </Pressable>
              
              <Pressable style={styles.buyButton} onPress={handleBuy}>
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </Pressable>
            </View>

            {commission > 0 && (
              <View style={styles.cosellSection}>
                <View style={styles.cosellInfo}>
                  <Text style={styles.cosellLabel}>Cosell For Crypto.</Text>
                  <Text style={styles.cosellCommission}>{commission}% Commission</Text>
                </View>
                <Pressable style={styles.cosellButton} onPress={handleCosell}>
                  <Text style={styles.cosellButtonText}>Become a Coseller</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this listing</Text>
            <Text
              style={styles.description}
              numberOfLines={showAllDescription ? undefined : 5}
            >
              {post.description}
            </Text>
            {post.description && post.description.length > 200 && (
              <Pressable onPress={() => setShowAllDescription(!showAllDescription)}>
                <Text style={styles.showMoreText}>
                  {showAllDescription ? "Show less" : "Show more"}
                </Text>
              </Pressable>
            )}
          </View>

          {/* What you get */}
          {selectedVariant?.content && (
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>What you get</Text>
              <Text style={styles.contentText}>{selectedVariant.content}</Text>
            </View>
          )}

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.reviewsSummary}>
                <Ionicons name="star" size={16} color="#000" />
                <Text style={styles.reviewsSummaryText}>
                  {averageRating.toFixed(1)} ({totalRatings} reviews)
                </Text>
              </View>
            </View>
            
            {ratings.slice(0, 3).map((rating, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerAvatar} />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{rating.nickname}</Text>
                    <View style={styles.reviewRating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < rating.rating ? "star" : "star-outline"}
                          size={12}
                          color={i < rating.rating ? "#000" : "#d4d4d4"}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>
                    {formatDate(new Date(rating.createdAt), "MMM d")}
                  </Text>
                </View>
                {rating.comment && (
                  <Text style={styles.reviewComment}>{rating.comment}</Text>
                )}
              </View>
            ))}

            {totalRatings > 3 && (
              <Pressable style={styles.viewAllReviews}>
                <Text style={styles.viewAllReviewsText}>
                  View all {totalRatings} reviews
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ProductSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  const line = (w: number | `${number}%`, h = 14) => (
    <Animated.View style={{ opacity, width: w, height: h, backgroundColor: "#e5e5e5", borderRadius: 4 }} />
  );

  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <View style={styles.skeletonButton} />
        <View style={styles.headerActions}>
          <View style={styles.skeletonButton} />
          <View style={styles.skeletonButton} />
          <View style={styles.skeletonButton} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Breadcrumb skeleton */}
        <View style={styles.breadcrumb}>
          {line(80)}
          <View style={{ width: 16 }} />
          {line(120)}
        </View>

        {/* Media skeleton */}
        <View style={styles.mediaContainer}>
          <Animated.View style={[styles.mediaPlaceholder, { opacity }]} />
        </View>

        {/* Content skeleton */}
        <View style={styles.productInfo}>
          {line("90%", 24)}
          <View style={{ height: 8 }} />
          {line("60%", 16)}
          <View style={{ height: 16 }} />
          {line("100%")}
          <View style={{ height: 4 }} />
          {line("80%")}
          <View style={{ height: 16 }} />
          
          {/* Seller row skeleton */}
          <View style={styles.sellerInfo}>
            <Animated.View style={[styles.sellerAvatar, { opacity }]} />
            <View style={styles.sellerDetails}>
              {line(100)}
              <View style={{ height: 4 }} />
              {line(60)}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  content: {
    paddingBottom: 40,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  breadcrumbLink: {
    fontSize: 14,
    color: "#000",
    textDecorationLine: "underline",
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: "#737373",
    flex: 1,
  },

  // Status badges
  statusBadges: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  // Media
  mediaContainer: {
    position: "relative",
    aspectRatio: 16 / 9,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  mediaPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  mediaIndicator: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mediaIndicatorText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },

  // Product Info
  productInfo: {
    padding: 16,
    gap: 20,
  },
  titleSection: {
    gap: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  ratingCount: {
    fontSize: 14,
    color: "#737373",
  },
  salesCount: {
    fontSize: 14,
    color: "#737373",
  },
  productBio: {
    fontSize: 16,
    color: "#737373",
    lineHeight: 24,
  },

  // Seller
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sellerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sellerMeta: {
    fontSize: 14,
    color: "#737373",
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },

  // Variants
  variantsSection: {
    gap: 12,
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  variantOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  variantOptionSelected: {
    borderColor: "#000",
    backgroundColor: "#f9f9f9",
  },
  variantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  variantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  variantDescription: {
    fontSize: 14,
    color: "#737373",
  },

  // Purchase
  purchaseSection: {
    gap: 16,
    paddingTop: 8,
  },
  priceRow: {
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
  },
  usdEquivalent: {
    fontSize: 16,
    color: "#737373",
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  // Cosell
  cosellSection: {
    padding: 16,
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
    gap: 12,
  },
  cosellInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cosellLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  cosellCommission: {
    fontSize: 14,
    color: "#525252",
  },
  cosellButton: {
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cosellButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  descriptionSection: {
    gap: 8,
  },
  description: {
    fontSize: 16,
    color: "#737373",
    lineHeight: 24,
  },
  showMoreText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  contentSection: {
    gap: 8,
  },
  contentText: {
    fontSize: 16,
    color: "#737373",
    lineHeight: 24,
  },

  // Reviews
  reviewsSection: {
    gap: 16,
  },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewsSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reviewsSummaryText: {
    fontSize: 14,
    color: "#737373",
  },
  reviewCard: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  reviewerInfo: {
    flex: 1,
    gap: 2,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  reviewRating: {
    flexDirection: "row",
    gap: 1,
  },
  reviewDate: {
    fontSize: 12,
    color: "#737373",
  },
  reviewComment: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 20,
    paddingLeft: 40,
  },
  viewAllReviews: {
    alignItems: "center",
    paddingVertical: 8,
  },
  viewAllReviewsText: {
    fontSize: 14,
    color: "#000",
    textDecorationLine: "underline",
  },

  // Skeleton
  skeletonButton: {
    width: 40,
    height: 40,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
  },

  // Not Found
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#737373",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});