import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, Alert } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Mock user data matching web app structure exactly
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
  flag: undefined, // For report functionality
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
  const [openFlag, setOpenFlag] = useState(false);
  const isMe = true; // For demo purposes - would come from auth

  const formatNickname = (nickname: string) => {
    return nickname.startsWith("@") ? nickname : nickname;
  };

  const handleMoreOptions = () => {
    const options = [];
    
    if (isMe) {
      options.push(
        { text: "Edit Profile", onPress: () => console.log("Edit profile") },
        { text: "Settings", onPress: () => console.log("Settings") }
      );
    } else {
      options.push({ text: "Report", onPress: () => setOpenFlag(true) });
    }
    
    options.push({ text: "Cancel", style: "cancel" as const });

    Alert.alert("Profile Options", "Choose an action", options);
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

  // Available tabs - hide collection if not public and not me
  const availableTabs = ["listings", "collection", "bookmarks", "about"];
  if (!user.settings.collectionPublic && !isMe) {
    availableTabs.splice(availableTabs.indexOf("collection"), 1);
  }

  const tabs: { key: TabType; label: string }[] = availableTabs.map(tab => ({
    key: tab as TabType,
    label: tab.charAt(0).toUpperCase() + tab.slice(1)
  }));

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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header Background - matching web app */}
        <View style={styles.headerBackground}>
          {/* Breadcrumb - matching web app */}
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbText}>{formatNickname(user.nickname)}</Text>
          </View>

          {/* Profile Toolbar - matching web app */}
          <View style={styles.profileToolbar}>
            <Pressable style={styles.moreButton} onPress={handleMoreOptions}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
            </Pressable>
          </View>

          {/* Banner Section - matching web app */}
          {user.bannerUrl && (
            <View style={styles.bannerContainer}>
              <Ionicons name="image-outline" size={60} color="#d4d4d4" />
            </View>
          )}

          {/* Profile Section - centered like web app */}
          <View style={styles.profileSection}>
            <View style={styles.profileContent}>
              {/* Avatar */}
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#737373" />
              </View>
              
              {/* Name */}
              <Text style={styles.nickname}>{formatNickname(user.nickname)}</Text>

              {/* Stats Section */}
              <View style={styles.statsSection}>
                {/* Ratings */}
                <View style={styles.ratingRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.floor(user.meta.ratings.average) ? "star" : "star-outline"}
                      size={20}
                      color={i < Math.floor(user.meta.ratings.average) ? "#000" : "#737373"}
                    />
                  ))}
                  <Text style={styles.ratingText}>{user.meta.ratings.total} Total Ratings</Text>
                </View>
                
                {/* Sales */}
                {(user.settings.salesPublic || isMe) && (
                  <Text style={styles.salesText}>{user.meta.sales} Total Sales</Text>
                )}
              </View>

              {/* Bio */}
              {user.bio && (
                <Text style={styles.bio}>{user.bio}</Text>
              )}

              {/* Social Links */}
              <View style={styles.socialSection}>
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
              </View>
            </View>
          </View>

          {/* Tab Navigation - matching web app */}
          <View style={styles.tabNavigation}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Tab Content Sections - matching web app structure */}
        {/* Listings */}
        {activeTab === "listings" && (
          <View style={styles.contentSection}>
            <PostList items={MOCK_LISTINGS} />
          </View>
        )}

        {/* Collection */}
        {activeTab === "collection" && (
          <View style={styles.contentSection}>
            <PostList items={MOCK_COLLECTION} />
          </View>
        )}

        {/* Bookmarks */}
        {activeTab === "bookmarks" && (
          <View style={styles.contentSection}>
            <PostList items={MOCK_BOOKMARKS} />
          </View>
        )}

        {/* About Section - matching web app */}
        {activeTab === "about" && (
          <View style={styles.aboutSection}>
            {user.about ? (
              <Text style={styles.aboutText}>{user.about}</Text>
            ) : (
              <View style={styles.emptyAbout}>
                <View style={styles.emptyAboutCard}>
                  <Text style={styles.emptyAboutTitle}>No about yet</Text>
                  <Text style={styles.emptyAboutDescription}>
                    This user hasn't added an about section.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PostList({ items }: { items: any[] }) {
  if (items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="grid-outline" size={48} color="#e5e5e5" />
        <Text style={styles.emptyTitle}>No items</Text>
        <Text style={styles.emptyDescription}>Nothing to show here yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.postList}>
      {items.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}
    </View>
  );
}

function PostCard({ item }: { item: any }) {
  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.postCard}>
        <View style={styles.postImage}>
          <Ionicons name="image-outline" size={40} color="#d4d4d4" />
        </View>
        <View style={styles.postContent}>
          <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.postBio} numberOfLines={2}>{item.bio}</Text>
          <View style={styles.postMeta}>
            <Text style={styles.postPrice}>{item.price} USDC</Text>
            {item.categoryName && (
              <View style={styles.postCategory}>
                <Text style={styles.postCategoryText}>{item.categoryName}</Text>
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
    backgroundColor: "#FFFDFC" 
  },
  
  // Scroll view
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  // Header background - matching web app
  headerBackground: {
    backgroundColor: "#FFFDFC",
  },
  
  // Breadcrumb - matching web app
  breadcrumb: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60, // Account for safe area
  },
  breadcrumbText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  
  // Profile toolbar - matching web app
  profileToolbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Banner container - matching web app
  bannerContainer: {
    aspectRatio: 16/4,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  
  // Profile section - centered like web app
  profileSection: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  profileContent: {
    alignItems: "center",
  },
  
  // Avatar - matching web app size
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  
  // Nickname - matching web app
  nickname: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 20,
  },
  
  // Stats section - matching web app layout
  statsSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 12,
  },
  salesText: {
    fontSize: 16,
    color: "#000",
  },
  
  // Bio - matching web app
  bio: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  
  // Social section - matching web app
  socialSection: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Tab navigation - matching web app
  tabNavigation: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    borderTopWidth: 0,
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f5f5f5",
  },
  tabActive: {
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#737373",
  },
  tabTextActive: {
    color: "#fff",
  },
  
  // Content sections
  contentSection: {
    backgroundColor: "#fff",
  },
  
  // About section - matching web app
  aboutSection: {
    maxWidth: 960,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  aboutText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
    padding: 20,
  },
  emptyAbout: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyAboutCard: {
    maxWidth: 400,
    paddingHorizontal: 40,
    paddingVertical: 32,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    alignItems: "center",
  },
  emptyAboutTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#404040",
    marginBottom: 8,
  },
  emptyAboutDescription: {
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
  },
  
  // Post list
  postList: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 16,
  },
  postCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    aspectRatio: 16/9,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  postBio: {
    fontSize: 14,
    color: "#737373",
    lineHeight: 18,
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  postCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  postCategoryText: {
    fontSize: 12,
    color: "#737373",
  },
  
  // Empty state
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#404040",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    lineHeight: 20,
  },
  
  // Connect section
  connectSection: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 24 
  },
  walletIconCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: "#f5f5f5", 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 24 
  },
  connectTitle: { 
    fontSize: 24, 
    fontWeight: "600", 
    color: "#000", 
    marginBottom: 8 
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
});