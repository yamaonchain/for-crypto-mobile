import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, Share, Alert } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Mock user data matching web app structure
const MOCK_USER = {
  id: "user1",
  nickname: "yama.eth",
  bio: "Building the future of crypto commerce. Sell. Cosell. For Crypto.",
  avatarUrl: "",
  bannerUrl: "",
  website: "https://for-crypto.vercel.app",
  socials: {
    x: { nickname: "yamaonchain" },
    instagram: { nickname: "yamaonchain" },
  },
  meta: {
    ratings: { average: 4.9, total: 127 },
    sales: 2840,
  },
  settings: {
    salesPublic: true,
    collectionPublic: true,
  },
  about: "I've been in crypto since 2017 and building products that make Web3 accessible to everyone. For Crypto is my latest project - a marketplace designed from the ground up for the decentralized economy.\n\nIf you're a creator, builder, or seller who wants to earn in crypto without the traditional platform bullshit, this is for you.",
};

// Mock user posts/listings
const MOCK_LISTINGS = [
  {
    id: "1",
    title: "No School 4 Week Bootcamp",
    bio: "A mindset reset for builders",
    price: "875",
    categoryName: "Product",
    thumbnailUrl: "",
    commission: "10",
  },
  {
    id: "2", 
    title: "For Crypto Mobile Template",
    bio: "React Native app template for crypto commerce",
    price: "199",
    categoryName: "Product",
    thumbnailUrl: "",
    commission: "20",
  }
];

const MOCK_COLLECTION = [
  {
    id: "3",
    title: "Together Daily Spark",
    bio: "Daily connection prompts for couples",
    price: "7",
    categoryName: "Service", 
    thumbnailUrl: "",
    commission: "20",
  }
];

const MOCK_BOOKMARKS = [
  {
    id: "4",
    title: "Designer Gear for Shredders", 
    bio: "Premium outerwear and style",
    price: "50",
    categoryName: "Experience",
    thumbnailUrl: "",
    commission: "20",
  }
];

type TabType = "listings" | "collection" | "bookmarks" | "about";

export default function ProfileScreen() {
  const [isConnected, setIsConnected] = useState(true); // Toggle this for demo
  const [activeTab, setActiveTab] = useState<TabType>("listings");
  const [user] = useState(MOCK_USER);
  const [showFullAbout, setShowFullAbout] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${user.nickname}'s profile on For Crypto`,
        url: `https://for-crypto.vercel.app/users/show/${user.id}`,
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleMoreOptions = () => {
    Alert.alert(
      "Profile Options",
      "Choose an action",
      [
        { text: "Edit Profile", onPress: () => console.log("Edit profile") },
        { text: "Settings", onPress: () => console.log("Settings") },
        { text: "Share Profile", onPress: handleShare },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <View style={styles.connectSection}>
          <View style={styles.walletIconCircle}>
            <Ionicons name="wallet-outline" size={40} color="#000" />
          </View>
          <Text style={styles.connectTitle}>Connect Wallet</Text>
          <Text style={styles.connectSubtitle}>
            Sign in with your wallet to access your listings, collection, and bookmarks.
          </Text>
          <Pressable 
            style={styles.connectButton}
            onPress={() => setIsConnected(true)} // Demo toggle
          >
            <Text style={styles.connectButtonText}>Connect Wallet</Text>
          </Pressable>
          <Text style={styles.connectNote}>
            No email or password needed. Your wallet is your identity.
          </Text>
        </View>
      </View>
    );
  }

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: "listings", label: "Listings", count: MOCK_LISTINGS.length },
    { key: "collection", label: "Collection", count: MOCK_COLLECTION.length },
    { key: "bookmarks", label: "Bookmarks", count: MOCK_BOOKMARKS.length },
    { key: "about", label: "About" },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "listings":
        return MOCK_LISTINGS;
      case "collection":
        return MOCK_COLLECTION;
      case "bookmarks":
        return MOCK_BOOKMARKS;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with actions */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#000" />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={handleMoreOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Banner (placeholder) */}
        {user.bannerUrl && (
          <View style={styles.banner}>
            <Ionicons name="image-outline" size={40} color="#d4d4d4" />
          </View>
        )}

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="#737373" />
            </View>
            <Text style={styles.nickname}>{user.nickname}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < Math.floor(user.meta.ratings.average) ? "star" : "star-outline"}
                  size={18}
                  color={i < Math.floor(user.meta.ratings.average) ? "#000" : "#d4d4d4"}
                />
              ))}
              <Text style={styles.ratingText}>{user.meta.ratings.total} Total Ratings</Text>
            </View>
            {user.settings.salesPublic && (
              <Text style={styles.salesText}>{user.meta.sales} Total Sales</Text>
            )}
          </View>

          {/* Bio */}
          {user.bio && (
            <Text style={styles.bio}>{user.bio}</Text>
          )}

          {/* Social Links */}
          <View style={styles.socialLinks}>
            {user.website && (
              <Pressable style={styles.socialButton}>
                <Ionicons name="globe-outline" size={20} color="#000" />
              </Pressable>
            )}
            {user.socials.x && (
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={20} color="#000" />
              </Pressable>
            )}
            {user.socials.instagram && (
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-instagram" size={20} color="#000" />
              </Pressable>
            )}
            <Pressable style={styles.socialButton} onPress={handleShare}>
              <Ionicons name="copy-outline" size={20} color="#000" />
            </Pressable>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {tabs.map((tab) => (
              <Pressable
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                  {tab.count !== undefined && ` (${tab.count})`}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {activeTab === "about" ? (
          <View style={styles.aboutSection}>
            {user.about ? (
              <>
                <Text 
                  style={styles.aboutText}
                  numberOfLines={showFullAbout ? undefined : 8}
                >
                  {user.about}
                </Text>
                {user.about.length > 300 && (
                  <Pressable onPress={() => setShowFullAbout(!showFullAbout)}>
                    <Text style={styles.showMoreText}>
                      {showFullAbout ? "Show less" : "Show more"}
                    </Text>
                  </Pressable>
                )}
              </>
            ) : (
              <View style={styles.emptyAbout}>
                <Ionicons name="document-text-outline" size={40} color="#e5e5e5" />
                <Text style={styles.emptyTitle}>No about yet</Text>
                <Text style={styles.emptyDescription}>
                  You haven't added an about section.
                </Text>
                <Pressable style={styles.addAboutButton}>
                  <Text style={styles.addAboutButtonText}>Add About</Text>
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.listSection}>
            {getCurrentData().length > 0 ? (
              <FlatList
                data={getCurrentData()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListingCard item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} // Let parent scroll handle it
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons 
                  name={
                    activeTab === "listings" ? "grid-outline" :
                    activeTab === "collection" ? "heart-outline" : "bookmark-outline"
                  } 
                  size={40} 
                  color="#e5e5e5" 
                />
                <Text style={styles.emptyTitle}>
                  No {activeTab} yet
                </Text>
                <Text style={styles.emptyDescription}>
                  {activeTab === "listings" 
                    ? "You haven't created any listings." 
                    : activeTab === "collection"
                    ? "You haven't collected any items."
                    : "You haven't bookmarked anything."
                  }
                </Text>
                {activeTab === "listings" && (
                  <Link href="/search" asChild>
                    <Pressable style={styles.emptyActionButton}>
                      <Text style={styles.emptyActionButtonText}>Create Listing</Text>
                    </Pressable>
                  </Link>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function ListingCard({ item }: { item: any }) {
  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.listingCard}>
        <View style={styles.listingImage}>
          <Ionicons name="image-outline" size={32} color="#d4d4d4" />
        </View>
        <View style={styles.listingContent}>
          <Text style={styles.listingTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.listingBio} numberOfLines={2}>{item.bio}</Text>
          <View style={styles.listingMeta}>
            <Text style={styles.listingPrice}>{item.price} USDC</Text>
            {item.categoryName && (
              <View style={styles.listingCategory}>
                <Text style={styles.listingCategoryText}>{item.categoryName}</Text>
              </View>
            )}
          </View>
          {item.commission && (
            <View style={styles.listingCommission}>
              <Text style={styles.listingCommissionText}>Cosell {item.commission}%</Text>
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
    backgroundColor: "#000" 
  },
  content: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    backgroundColor: "#000",
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

  // Connect State
  connectSection: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 32 
  },
  walletIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  connectTitle: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: "#000", 
    marginBottom: 12 
  },
  connectSubtitle: { 
    fontSize: 16, 
    color: "#737373", 
    textAlign: "center", 
    lineHeight: 24, 
    marginBottom: 32, 
    maxWidth: 300 
  },
  connectButton: { 
    backgroundColor: "#000", 
    paddingHorizontal: 32, 
    paddingVertical: 16, 
    borderRadius: 6, 
    width: "100%", 
    alignItems: "center" 
  },
  connectButtonText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#fff" 
  },
  connectNote: { 
    fontSize: 13, 
    color: "#a3a3a3", 
    textAlign: "center", 
    marginTop: 16, 
    maxWidth: 260 
  },

  // Banner
  banner: {
    height: 150,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  // Profile Section
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    alignItems: "center",
  },
  profileHeader: { 
    alignItems: "center", 
    marginBottom: 16 
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: "#f0f0f0", 
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nickname: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#000" 
  },
  statsSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#737373",
    marginLeft: 8,
  },
  salesText: {
    fontSize: 14,
    color: "#737373",
  },
  bio: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },

  // Tabs
  tabSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tab: { 
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabActive: { 
    borderBottomWidth: 2, 
    borderBottomColor: "#000" 
  },
  tabText: { 
    fontSize: 14, 
    fontWeight: "500", 
    color: "#a3a3a3" 
  },
  tabTextActive: { 
    color: "#000" 
  },

  // About Section
  aboutSection: {
    padding: 16,
  },
  aboutText: {
    fontSize: 16,
    color: "#737373",
    lineHeight: 24,
  },
  showMoreText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    textDecorationLine: "underline",
    marginTop: 8,
  },
  emptyAbout: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#737373",
    marginTop: 12,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#a3a3a3",
    textAlign: "center",
    marginBottom: 20,
  },
  addAboutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000",
    borderRadius: 6,
  },
  addAboutButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },

  // List Section
  listSection: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  listingCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    flexDirection: "row",
  },
  listingImage: {
    width: 100,
    height: 100,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  listingContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  listingBio: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 18,
    marginBottom: 8,
  },
  listingMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  listingPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  listingCategory: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  listingCategoryText: {
    fontSize: 12,
    color: "#737373",
  },
  listingCommission: {
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  listingCommissionText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
  },

  // Empty States
  emptyState: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyActionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000",
    borderRadius: 6,
    marginTop: 16,
  },
  emptyActionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});