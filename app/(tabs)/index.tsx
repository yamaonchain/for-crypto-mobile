import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Link } from "expo-router";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_WIDTH = SCREEN_WIDTH - 48;
const SLIDE_SPACING = 12;

const EXAMPLE_LISTINGS = [
  {
    title: "No School 4 Week Bootcamp.",
    description: "A 5-step video-based mindset reset for anyone building instead of waiting for permission.",
    commission: 10,
    price: 875,
  },
  {
    title: "Together Daily Spark.",
    description: "A daily drop of connection for couples who want to stay close, curious, and never bored.",
    commission: 20,
    price: 7,
  },
  {
    title: "Community Intake Kit for Divvvy.",
    description: "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for Divvvy.",
    commission: 20,
    price: 2,
  },
  {
    title: "Designer Gear for Shredders Game.",
    description: "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style.",
    commission: 20,
    price: 50,
  },
  {
    title: "Freckle Fade Lightroom Presets.",
    description: "Natural-looking freckles and warm tones in one click. Made for soft edits and scroll-stopping skin.",
    commission: 15,
    price: 6500,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Hero />
      <FeaturedListings />
      <Categories />
      <HowCosellWorks />
      <TrendingCosellers />
      <WhySection />
      <NetworkSection />
    </ScrollView>
  );
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / (SLIDE_WIDTH + SLIDE_SPACING));
    setActiveIndex(index);
  }, []);

  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>Sell. Cosell.{"\n"}For Crypto.</Text>
      <Text style={styles.heroSubtitle}>
        The marketplace for creators, builders, bots, and sellers who want
        instant payouts in USDC, a digital dollar that's always worth $1.
        No banks. No middlemen. Just your wallet and the internet.
      </Text>
      <View style={styles.heroButtons}>
        <Pressable style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Learn More</Text>
        </Pressable>
        <Link href="/search" asChild>
          <Pressable style={styles.buttonFilled}>
            <Text style={styles.buttonFilledText}>Sell</Text>
          </Pressable>
        </Link>
      </View>

      {/* Product Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={EXAMPLE_LISTINGS}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              {/* Label */}
              <View style={styles.slideLabel}>
                <Text style={styles.slideLabelText}>Example Listing</Text>
              </View>
              {/* Image placeholder */}
              <View style={styles.slideImage}>
                <Ionicons name="image-outline" size={40} color="#d4d4d4" />
              </View>
              {/* Cosell bar */}
              <View style={styles.slideCosellBar}>
                <Text style={styles.slideCosellLabel}>Cosell For Crypto.</Text>
                <View style={styles.slideCosellRight}>
                  <Text style={styles.slideCosellPercent}>{item.commission}% Commission</Text>
                </View>
              </View>
              {/* Buy button */}
              <View style={styles.slideBuyButton}>
                <Text style={styles.slideBuyText}>Buy Now</Text>
              </View>
              {/* Price */}
              <View style={styles.slidePrice}>
                <Text style={styles.slidePriceText}>{item.price} USDC</Text>
              </View>
              {/* Info */}
              <View style={styles.slideInfo}>
                <Text style={styles.slideTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.slideDescription} numberOfLines={3}>{item.description}</Text>
              </View>
            </View>
          )}
        />
        {/* Dots */}
        <View style={styles.dots}>
          {EXAMPLE_LISTINGS.map((_, i) => (
            <Pressable
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index: i, animated: true });
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

// -- Featured Listings (horizontal scroll) --

const FEATURED = [
  { id: "1", title: "No School 4 Week Bootcamp", price: "875", commission: 10, category: "Product" },
  { id: "2", title: "Together Daily Spark", price: "7", commission: 20, category: "Service" },
  { id: "3", title: "Community Intake Kit for Divvvy", price: "2", commission: 20, category: "Product" },
  { id: "4", title: "Designer Gear for Shredders", price: "50", commission: 20, category: "Experience" },
  { id: "5", title: "Freckle Fade Lightroom Presets", price: "6500", commission: 15, category: "Product" },
];

function FeaturedListings() {
  return (
    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Listings</Text>
        <Link href="/search" asChild>
          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={FEATURED}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Pressable style={styles.featuredCard}>
              <View style={styles.featuredImage}>
                <Ionicons name="image-outline" size={28} color="#d4d4d4" />
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredPrice}>{item.price} USDC</Text>
                  <Text style={styles.featuredCosell}>Cosell {item.commission}%</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

// -- Categories (chips) --

const CATEGORY_LIST = [
  { id: "product", name: "Product", icon: "cube-outline" as const },
  { id: "service", name: "Service", icon: "briefcase-outline" as const },
  { id: "experience", name: "Experience", icon: "sparkles-outline" as const },
  { id: "membership", name: "Membership", icon: "people-outline" as const },
  { id: "bot", name: "Bot", icon: "hardware-chip-outline" as const },
];

function Categories() {
  return (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitleSmall}>Browse by Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
      >
        {CATEGORY_LIST.map((cat) => (
          <Link href="/search" key={cat.id} asChild>
            <Pressable style={styles.categoryChip}>
              <Ionicons name={cat.icon} size={18} color="#000" />
              <Text style={styles.categoryChipText}>{cat.name}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

// -- How Cosell Works (3 steps) --

function HowCosellWorks() {
  const steps = [
    { num: "1", title: "Find a listing", desc: "Browse products and services you believe in." },
    { num: "2", title: "Cosell it", desc: "Generate your unique link. A smart contract locks your commission for 30 days." },
    { num: "3", title: "Get paid instantly", desc: "Every sale through your link pays out USDC directly to your wallet." },
  ];

  return (
    <View style={styles.howCosellSection}>
      <Text style={styles.sectionTitle}>How Cosell Works</Text>
      <Text style={styles.sectionDescription}>
        Earn real crypto by helping sell things you believe in.
      </Text>
      {steps.map((step) => (
        <View key={step.num} style={styles.cosellStep}>
          <View style={styles.cosellStepNum}>
            <Text style={styles.cosellStepNumText}>{step.num}</Text>
          </View>
          <View style={styles.cosellStepContent}>
            <Text style={styles.cosellStepTitle}>{step.title}</Text>
            <Text style={styles.cosellStepDesc}>{step.desc}</Text>
          </View>
        </View>
      ))}
      <Pressable style={styles.cosellCTA}>
        <Text style={styles.cosellCTAText}>Start Coselling</Text>
      </Pressable>
    </View>
  );
}

// -- Trending Cosellers --

const TRENDING_COSELLERS = [
  { id: "1", name: "alex.eth", earnings: "12,450 USDC", sales: 89 },
  { id: "2", name: "maya.sol", earnings: "8,200 USDC", sales: 64 },
  { id: "3", name: "dev_chad", earnings: "5,870 USDC", sales: 42 },
  { id: "4", name: "nft_queen", earnings: "4,100 USDC", sales: 31 },
];

function TrendingCosellers() {
  return (
    <View style={styles.trendingSection}>
      <Text style={styles.sectionTitle}>Trending Cosellers</Text>
      <Text style={styles.sectionDescription}>
        Top earners this month on For Crypto.
      </Text>
      {TRENDING_COSELLERS.map((coseller, i) => (
        <View key={coseller.id} style={styles.cosellRow}>
          <View style={styles.cosellRank}>
            <Text style={styles.cosellRankText}>#{i + 1}</Text>
          </View>
          <View style={styles.cosellAvatar}>
            <Ionicons name="person" size={18} color="#a3a3a3" />
          </View>
          <View style={styles.cosellInfo}>
            <Text style={styles.cosellName}>{coseller.name}</Text>
            <Text style={styles.cosellStats}>{coseller.sales} sales</Text>
          </View>
          <Text style={styles.cosellEarnings}>{coseller.earnings}</Text>
        </View>
      ))}
    </View>
  );
}

function WhySection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Why Crypto?</Text>
      <Text style={styles.sectionSubtitle}>Payments that just work.</Text>
      <Text style={styles.sectionDescription}>
        No waiting for payouts. No platform lock-in. No chargebacks. Just direct, wallet-to-wallet payments.
      </Text>
      <View style={styles.cardGrid}>
        <WhyCard
          icon="flash-outline"
          title="Instant Payouts"
          description="Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
        />
        <WhyCard
          icon="shield-checkmark-outline"
          title="Self-Custody"
          description="You own the wallet, you control the money. No platforms holding your funds."
        />
        <WhyCard
          icon="globe-outline"
          title="Global by Default"
          description="Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
        />
        <WhyCard
          icon="git-branch-outline"
          title="Smart Splits"
          description="Revenue is split automatically between sellers and cosellers. No chasing payments."
        />
      </View>
    </View>
  );
}

function WhyCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.whyCard}>
      <View style={styles.whyCardHeader}>
        <Ionicons name={icon as any} size={22} color="#000" />
        <Text style={styles.whyCardTitle}>{title}</Text>
      </View>
      <Text style={styles.whyCardDescription}>{description}</Text>
    </View>
  );
}

function HowSection() {
  const steps = [
    "Connect your wallet",
    "Create your listing",
    "Set your Coseller commission",
    "Add what buyers get",
    "Add sales assets",
    "Share your listing",
    "Get paid instantly",
  ];

  return (
    <View style={[styles.section, styles.sectionAlt]}>
      <Text style={styles.sectionTitle}>How it works.</Text>
      <Text style={styles.sectionSubtitle}>Instant transactions.</Text>
      <Text style={styles.sectionDescription}>
        From wallet connect to payout, everything happens directly. No signups, no waiting, no middlemen.
      </Text>
      <View style={styles.stepsCard}>
        <Text style={styles.stepsCardTitle}>Getting started is simple</Text>
        {steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function CosellSection() {
  return (
    <View style={[styles.section, styles.sectionCosell]}>
      <Text style={styles.sectionTitle}>Cosell.</Text>
      <Text style={styles.sectionSubtitle}>Unlock the Internet.</Text>
      <Text style={styles.sectionDescription}>
        Cosell is not an affiliate link. It's a contract. A payout. A share of every sale.
      </Text>
      <View style={styles.cosellCard}>
        <Text style={styles.cosellStep}>The seller sets the commission.</Text>
        <Text style={styles.cosellStep}>A Coseller activates the contract.</Text>
        <Text style={styles.cosellStep}>Sales are tracked on the blockchain.</Text>
        <Text style={styles.cosellStep}>Payouts happen instantly.</Text>
        <Pressable style={styles.cosellCTA}>
          <Text style={styles.cosellCTAText}>Become a Coseller</Text>
        </Pressable>
      </View>
      <View style={styles.cosellMotivation}>
        <Text style={styles.cosellMotivationTitle}>No excuse this time.</Text>
        <Text style={styles.cosellMotivationText}>
          If you have a device, you can Cosell For Crypto. Go get it. Nothing is stopping you now.
        </Text>
      </View>
    </View>
  );
}

function NetworkSection() {
  return (
    <View style={[styles.section, styles.sectionDark]}>
      <Text style={[styles.sectionTitle, styles.textWhite]}>Backed by leading networks.</Text>
      <Text style={[styles.sectionDescription, styles.textMuted]}>
        Built on Base, powered by Ethereum, with automatic payouts to Solana.
      </Text>
      <View style={styles.networkRow}>
        <View style={styles.networkItem}>
          <Ionicons name="diamond-outline" size={24} color="#a3a3a3" />
          <Text style={styles.networkName}>Ethereum</Text>
        </View>
        <View style={styles.networkDivider} />
        <View style={styles.networkItem}>
          <Ionicons name="cube-outline" size={24} color="#a3a3a3" />
          <Text style={styles.networkName}>Base</Text>
        </View>
        <View style={styles.networkDivider} />
        <View style={styles.networkItem}>
          <Ionicons name="sunny-outline" size={24} color="#a3a3a3" />
          <Text style={styles.networkName}>Solana</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFDFC" },
  content: { paddingBottom: 40 },

  // Hero
  hero: { paddingTop: 40, paddingBottom: 20, alignItems: "center" },
  heroTitle: { fontSize: 32, fontWeight: "700", textAlign: "center", color: "#000", lineHeight: 40 },
  heroSubtitle: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  heroButtons: { flexDirection: "row", gap: 12, marginTop: 24, paddingHorizontal: 24, width: "100%" },
  buttonOutline: { flex: 1, borderWidth: 1, borderColor: "#000", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonOutlineText: { fontSize: 16, fontWeight: "500", color: "#000" },
  buttonFilled: { flex: 1, backgroundColor: "#000", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonFilledText: { fontSize: 16, fontWeight: "500", color: "#fff" },

  // Carousel
  carouselContainer: { marginTop: 32, width: "100%" },
  carouselContent: { paddingHorizontal: 24, gap: SLIDE_SPACING },
  slide: {
    width: SLIDE_WIDTH,
    borderWidth: 0.5,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  slideLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  slideLabelText: { fontSize: 11, color: "#fff", fontWeight: "500" },
  slideImage: {
    aspectRatio: 16 / 9,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  slideCosellBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#e5e5e5",
    gap: 8,
  },
  slideCosellLabel: { fontSize: 14, fontWeight: "500", color: "#000" },
  slideCosellRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  slideCosellPercent: { fontSize: 13, color: "#525252" },
  slideBuyButton: { backgroundColor: "#000", paddingVertical: 14, alignItems: "center" },
  slideBuyText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  slidePrice: { paddingVertical: 12, alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#e5e5e5" },
  slidePriceText: { fontSize: 15, color: "#000" },
  slideInfo: { padding: 16, alignItems: "center" },
  slideTitle: { fontSize: 22, fontWeight: "600", color: "#000", textAlign: "center", marginBottom: 8 },
  slideDescription: { fontSize: 15, color: "#737373", textAlign: "center", lineHeight: 22 },

  // Dots
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#f2f2f2" },
  dotActive: { backgroundColor: "#171717" },

  // Sections
  section: { paddingHorizontal: 24, paddingVertical: 32 },
  sectionAlt: { backgroundColor: "#FFFDFC" },
  sectionCosell: { backgroundColor: "#e5e5e5" },
  sectionDark: { backgroundColor: "#0a0a0a" },
  sectionTitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 4 },
  sectionSubtitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 12 },
  sectionDescription: { fontSize: 16, color: "#737373", lineHeight: 24, marginBottom: 20 },

  // Why cards
  cardGrid: { gap: 12 },
  whyCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  whyCardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  whyCardTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  whyCardDescription: { fontSize: 15, color: "#737373", lineHeight: 22 },

  // How steps
  stepsCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 24, gap: 16 },
  stepsCardTitle: { fontSize: 22, fontWeight: "600", color: "#000", textAlign: "center", marginBottom: 4 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: { fontSize: 13, fontWeight: "600", color: "#fff" },
  stepText: { fontSize: 17, color: "#000", flex: 1 },

  // Legacy (unused, kept for reference)
  cosellCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 24, alignItems: "center", gap: 8, marginBottom: 16 },
  cosellMotivation: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 24, alignItems: "center" },
  cosellMotivationTitle: { fontSize: 22, fontWeight: "600", color: "#000", marginBottom: 8 },
  cosellMotivationText: { fontSize: 16, color: "#737373", textAlign: "center", lineHeight: 24 },

  // Featured Listings
  featuredSection: { paddingVertical: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 16 },
  seeAll: { fontSize: 14, color: "#737373", fontWeight: "500" },
  featuredCard: { width: 200, borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", borderWidth: 0.5, borderColor: "#e5e5e5" },
  featuredImage: { height: 120, backgroundColor: "#f5f5f5", alignItems: "center", justifyContent: "center" },
  featuredInfo: { padding: 12, gap: 6 },
  featuredTitle: { fontSize: 14, fontWeight: "600", color: "#000" },
  featuredMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  featuredPrice: { fontSize: 13, fontWeight: "500", color: "#000" },
  featuredCosell: { fontSize: 12, color: "#525252" },

  // Categories
  categoriesSection: { paddingVertical: 20 },
  sectionTitleSmall: { fontSize: 18, fontWeight: "600", color: "#000", paddingHorizontal: 24, marginBottom: 12 },
  categoryChip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, backgroundColor: "#f5f5f5" },
  categoryChipText: { fontSize: 14, fontWeight: "500", color: "#000" },

  // How Cosell Works
  howCosellSection: { paddingHorizontal: 24, paddingVertical: 32 },
  cosellStep: { flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 20 },
  cosellStepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  cosellStepNumText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  cosellStepContent: { flex: 1, paddingTop: 4 },
  cosellStepTitle: { fontSize: 16, fontWeight: "600", color: "#000", marginBottom: 4 },
  cosellStepDesc: { fontSize: 14, color: "#737373", lineHeight: 20 },
  cosellCTA: { backgroundColor: "#000", paddingVertical: 14, borderRadius: 8, alignItems: "center", marginTop: 8 },
  cosellCTAText: { fontSize: 16, fontWeight: "600", color: "#fff" },

  // Trending Cosellers
  trendingSection: { paddingHorizontal: 24, paddingVertical: 32, backgroundColor: "#f5f5f5" },
  cosellRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 10, gap: 12 },
  cosellRank: { width: 28, alignItems: "center" },
  cosellRankText: { fontSize: 14, fontWeight: "700", color: "#a3a3a3" },
  cosellAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#f0f0f0", alignItems: "center", justifyContent: "center" },
  cosellInfo: { flex: 1 },
  cosellName: { fontSize: 15, fontWeight: "600", color: "#000" },
  cosellStats: { fontSize: 12, color: "#737373" },
  cosellEarnings: { fontSize: 14, fontWeight: "600", color: "#000" },

  // Networks
  textWhite: { color: "#fff" },
  textMuted: { color: "#d4d4d4" },
  networkRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 8 },
  networkItem: { alignItems: "center", gap: 8 },
  networkName: { fontSize: 14, color: "#a3a3a3", fontWeight: "500" },
  networkDivider: { width: 1, height: 24, backgroundColor: "#333" },
});
