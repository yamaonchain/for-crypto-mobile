import { View, Text, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator, Share, Animated } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

// Mock types matching web app exactly
interface Post {
  id: string;
  title: string;
  bio: string;
  description: string;
  categoryName: string;
  categoryId: string;
  nickname: string;
  avatarUrl: string;
  commission: string;
  payoutChain: string;
  status: "draft" | "active";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface PostVariant {
  id: string;
  postId: string;
  name: string;
  description: string | null;
  price: string | null;
  quantity: number;
  content: string | null;
  position: number;
  isPwyw: boolean;
  suggestedPrice: string | null;
}

interface PostRating {
  userId: string;
  nickname: string;
  avatarUrl: string | null;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface Media {
  id: string;
  url: string;
  code: string;
  position: number;
}

interface PostMeta {
  ratings: {
    average: number;
    total: number;
  };
  sales: number;
}
// Simple date formatter
const formatDate = (date: Date, format: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};
// Mock cart functionality for now
const useCart = () => ({
  addToCart: (item: any) => console.log('Added to cart:', item)
});

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
  const [post, setPost] = useState<Post | null>(null);
  const [variants, setVariants] = useState<PostVariant[]>(MOCK_VARIANTS);
  const [selectedVariant, setSelectedVariant] = useState<PostVariant | null>(MOCK_VARIANTS[0]);
  const [ratings, setRatings] = useState<PostRating[]>(MOCK_RATINGS);
  const [media, setMedia] = useState<Media[]>(MOCK_MEDIA);
  const [postMeta, setPostMeta] = useState<PostMeta>(MOCK_POST_META);
  const [loading, setLoading] = useState(true);
  const [customPwywPrice, setCustomPwywPrice] = useState<number | null>(null);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setTimeout(() => {
      const mockPost: Post = {
        id: id || "1",
        title: "No School 4 Week Bootcamp.",
        bio: "A 5-step video-based mindset reset for anyone building instead of waiting for permission.",
        description: "Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook, and a community of builders.\n\nThis comprehensive bootcamp challenges traditional education paths and provides practical tools for independent success in the digital economy.\n\n**What you get:**\n- 5 core video lessons\n- Digital playbook\n- Community access\n- Building frameworks\n- Real-world examples",
        categoryName: "Product",
        categoryId: "1",
        nickname: "builder.eth",
        avatarUrl: "",
        commission: "10",
        payoutChain: "base",
        status: "active",
        userId: "user1",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z"
      };
      setPost(mockPost);
      
      // Set custom price for PWYW
      if (selectedVariant?.isPwyw) {
        const price = selectedVariant.suggestedPrice 
          ? parseFloat(selectedVariant.suggestedPrice)
          : parseFloat(selectedVariant.price || "0");
        setCustomPwywPrice(price);
      }
      
      setLoading(false);
    }, 100);
  }, [id, selectedVariant]);

  if (loading) return <ProductSkeleton />;

  if (!post) {
    return (
      <View style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#737373" />
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
    // Navigate to checkout page
    router.push("/checkout");
  };

  const averageRating = postMeta.ratings.average;
  const totalRatings = postMeta.ratings.total;

  const handleVariantChange = (variant: PostVariant) => {
    setSelectedVariant(variant);
    if (variant.isPwyw) {
      const price = variant.suggestedPrice 
        ? parseFloat(variant.suggestedPrice)
        : parseFloat(variant.price || "0");
      setCustomPwywPrice(price);
    } else {
      setCustomPwywPrice(null);
    }
  };

  const handleBuyNow = () => {
    if (!post || !selectedVariant) return;
    // Navigate to checkout page
    router.push("/checkout");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e5e5e5" />
        </View>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#737373" />
          <Text style={styles.notFoundText}>Listing not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#e5e5e5" />
        </Pressable>
        <Pressable style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#e5e5e5" />
        </Pressable>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Breadcrumb - matching web app */}
        <View style={styles.breadcrumb}>
          <Pressable 
            onPress={() => {
              // Navigate to search with category filter like web app
              router.push(`/search?category=${post.categoryName?.toLowerCase()}`);
            }}
          >
            <Text style={styles.breadcrumbLink}>{post.categoryName}</Text>
          </Pressable>
          <Text style={styles.breadcrumbSeparator}> / </Text>
          <Text style={styles.breadcrumbCurrent} numberOfLines={1}>{post.title}</Text>
        </View>

        {/* Media Section - matching web app */}
        <View style={styles.mediaSection}>
          <View style={styles.mediaContainer}>
            <Ionicons name="image-outline" size={80} color="#737373" />
          </View>
        </View>

        {/* Main Content - two column layout like web */}
        <View style={styles.mainContent}>
          {/* Left Content */}
          <View style={styles.leftContent}>
            {/* User Banner - matching web app */}
            <View style={styles.userBanner}>
              <View style={styles.userAvatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{post.nickname}</Text>
                <View style={styles.userMeta}>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#e5e5e5" />
                    <Text style={styles.ratingText}>
                      {postMeta.ratings.average.toFixed(1)} ({postMeta.ratings.total})
                    </Text>
                  </View>
                  <Text style={styles.salesText}>{postMeta.sales} sales</Text>
                </View>
              </View>
            </View>

            {/* Product Title and Category */}
            <View style={styles.titleSection}>
              <Text style={styles.productTitle}>{post.title}</Text>
              {post.categoryName && (
                <Pressable 
                  style={styles.categoryButton}
                  onPress={() => {
                    router.push(`/search?category=${post.categoryName?.toLowerCase()}`);
                  }}
                >
                  <Text style={styles.categoryButtonText}>{post.categoryName}</Text>
                </Pressable>
              )}
            </View>

            {/* Description - matching web editor view */}
            <View style={styles.descriptionSection}>
              <Text style={styles.description}>{post.description}</Text>
            </View>
          </View>

          {/* Right Content */}
          <View style={styles.rightContent}>
            {/* Variants - matching web app */}
            {variants.length > 1 && (
              <View style={styles.variantsSection}>
                <Text style={styles.variantsTitle}>Choose an option:</Text>
                {variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const priceDisplay = variant.isPwyw 
                    ? (variant.price && parseFloat(variant.price) > 0 ? `$${parseFloat(variant.price).toFixed(2)}+` : "Name your price")
                    : (variant.price && parseFloat(variant.price) > 0 ? `$${parseFloat(variant.price).toFixed(2)}` : "Free");
                  
                  return (
                    <Pressable
                      key={variant.id}
                      style={[styles.variantOption, isSelected && styles.variantOptionSelected]}
                      onPress={() => handleVariantChange(variant)}
                    >
                      <View style={styles.variantHeader}>
                        <View style={styles.variantNameContainer}>
                          <Text style={[styles.variantName, isSelected && styles.variantNameSelected]}>
                            {variant.name}
                          </Text>
                          {variant.description && (
                            <Text style={styles.variantDescription} numberOfLines={2}>
                              {variant.description}
                            </Text>
                          )}
                        </View>
                        <Text style={[styles.variantPrice, isSelected && styles.variantPriceSelected]}>
                          {priceDisplay}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Cosell Section - matching web app */}
            <View style={styles.cosellSection}>
              <View style={styles.cosellInfo}>
                <View style={styles.cosellLeft}>
                  <Text style={styles.cosellTitle}>Cosell For Crypto.</Text>
                  <Text style={styles.cosellCommission}>{post.commission}% Commission</Text>
                </View>
                <View style={styles.cosellDivider} />
                <Pressable style={styles.cosellButton} onPress={handleCosell}>
                  <Text style={styles.cosellButtonText}>Become a Coseller</Text>
                </Pressable>
              </View>
            </View>

            {/* PWYW Price Input */}
            {selectedVariant?.isPwyw && (
              <View style={styles.pwywSection}>
                <Text style={styles.pwywLabel}>Name your price</Text>
                <Text style={styles.pwywNote}>
                  Minimum: ${selectedVariant.price} USDC
                  {selectedVariant.suggestedPrice && ` • Suggested: $${selectedVariant.suggestedPrice} USDC`}
                </Text>
                {/* Add price input component here */}
              </View>
            )}

            {/* Purchase Section */}
            <View style={styles.purchaseSection}>
              <Pressable style={styles.buyButton} onPress={handleBuyNow}>
                <Text style={styles.buyButtonText}>
                  Buy Now - {selectedVariant?.isPwyw && customPwywPrice 
                    ? customPwywPrice 
                    : selectedVariant?.price || "0"} USDC
                </Text>
              </Pressable>
            </View>

            {/* Ratings Section */}
            <View style={styles.ratingsSection}>
              <Text style={styles.sectionTitle}>Ratings</Text>
              {ratings.slice(0, 3).map((rating, index) => (
                <View key={index} style={styles.ratingCard}>
                  <View style={styles.ratingHeader}>
                    <View style={styles.reviewerAvatar} />
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{rating.nickname}</Text>
                      <View style={styles.ratingStars}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < rating.rating ? "star" : "star-outline"}
                            size={12}
                            color={i < rating.rating ? "#e5e5e5" : "#737373"}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                  {rating.comment && (
                    <Text style={styles.ratingComment} numberOfLines={3}>
                      {rating.comment}
                    </Text>
                  )}
                </View>
              ))}
            </View>
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
    <Animated.View style={{ opacity, width: w, height: h, backgroundColor: "#262626", borderRadius: 4 }} />
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
    backgroundColor: "#0a0a0a",
  },
  
  // Loading/Error states
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: "#a3a3a3",
    marginTop: 16,
    marginBottom: 24,
  },
  
  // Header - matching web app
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    backgroundColor: "#0a0a0a",
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Content
  content: {
    paddingBottom: 40,
  },

  // Breadcrumb - matching web app
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  breadcrumbLink: {
    fontSize: 14,
    color: "#e5e5e5",
    textDecorationLine: "underline",
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: "#a3a3a3",
    flex: 1,
  },

  // Media section - matching web app
  mediaSection: {
    borderWidth: 1,
    borderColor: "#262626",
    marginHorizontal: 20,
  },
  mediaContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  // Main content - two column like web app
  mainContent: {
    borderWidth: 1,
    borderColor: "#262626",
    borderTopWidth: 0,
    marginHorizontal: 20,
  },
  
  // Left content
  leftContent: {
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  
  // User banner - matching web app
  userBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
    backgroundColor: "#171717",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#262626",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e5e5",
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  salesText: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  
  // Title section
  titleSection: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
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
    color: "#fff",
  },
  ratingCount: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  salesCount: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  productBio: {
    fontSize: 16,
    color: "#a3a3a3",
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
    backgroundColor: "#1a1a1a",
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  sellerMeta: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#262626",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e5e5e5",
  },

  // Variants
  variantsSection: {
    gap: 12,
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  variantOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#262626",
    backgroundColor: "#0a0a0a",
  },
  variantOptionSelected: {
    borderColor: "#e5e5e5",
    backgroundColor: "#171717",
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
    color: "#e5e5e5",
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e5e5",
  },
  variantDescription: {
    fontSize: 14,
    color: "#a3a3a3",
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
    color: "#fff",
  },
  usdEquivalent: {
    fontSize: 16,
    color: "#a3a3a3",
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
    borderColor: "#e5e5e5",
    backgroundColor: "#0a0a0a",
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e5e5",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#ff6000",
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
    backgroundColor: "#262626",
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
    color: "#e5e5e5",
  },
  cosellCommission: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  cosellButton: {
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#0a0a0a",
    alignItems: "center",
  },
  cosellButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e5e5e5",
  },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  descriptionSection: {
    gap: 8,
  },
  description: {
    fontSize: 16,
    color: "#a3a3a3",
    lineHeight: 24,
  },
  showMoreText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  contentSection: {
    gap: 8,
  },
  contentText: {
    fontSize: 16,
    color: "#a3a3a3",
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
    color: "#a3a3a3",
  },
  reviewCard: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
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
    backgroundColor: "#1a1a1a",
  },
  reviewerInfo: {
    flex: 1,
    gap: 2,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  reviewRating: {
    flexDirection: "row",
    gap: 1,
  },
  reviewDate: {
    fontSize: 12,
    color: "#a3a3a3",
  },
  reviewComment: {
    fontSize: 14,
    color: "#a3a3a3",
    lineHeight: 20,
    paddingLeft: 40,
  },
  viewAllReviews: {
    alignItems: "center",
    paddingVertical: 8,
  },
  viewAllReviewsText: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },

  // Skeleton
  skeletonButton: {
    width: 40,
    height: 40,
    backgroundColor: "#262626",
    borderRadius: 20,
  },

  // Variants section
  variantsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  variantsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a3a3a3",
    marginBottom: 12,
  },
  variantOption: {
    borderWidth: 2,
    borderColor: "#262626",
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#0a0a0a",
  },
  variantOptionSelected: {
    borderColor: "#e5e5e5",
    backgroundColor: "#171717",
  },
  variantHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  variantNameContainer: {
    flex: 1,
    marginRight: 12,
  },
  variantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 4,
  },
  variantNameSelected: {
    color: "#e5e5e5",
  },
  variantDescription: {
    fontSize: 14,
    color: "#a3a3a3",
    lineHeight: 18,
  },
  variantPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e5e5e5",
  },
  variantPriceSelected: {
    color: "#e5e5e5",
  },

  // Cosell section - matching web app
  cosellSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  cosellInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#262626",
  },
  cosellLeft: {
    flex: 1,
    alignItems: "center",
  },
  cosellTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 2,
  },
  cosellCommission: {
    fontSize: 12,
    color: "#a3a3a3",
  },
  cosellDivider: {
    width: 1,
    height: 44,
    backgroundColor: "#262626",
  },
  cosellButton: {
    flex: 1,
    alignItems: "center",
  },
  cosellButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#e5e5e5",
  },

  // PWYW section
  pwywSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  pwywLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e5e5",
    marginBottom: 8,
  },
  pwywNote: {
    fontSize: 14,
    color: "#a3a3a3",
  },

  // Purchase section
  purchaseSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  buyButton: {
    backgroundColor: "#ff6000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  // Ratings section
  ratingsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e5e5e5",
    marginBottom: 16,
  },
  ratingCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#262626",
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 2,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingComment: {
    fontSize: 14,
    color: "#a3a3a3",
    lineHeight: 20,
  },
});