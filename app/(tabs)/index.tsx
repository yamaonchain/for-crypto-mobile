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
      <WhySection />
      <HowSection />
      <CosellSection />
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

  // Cosell
  cosellCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 24, alignItems: "center", gap: 8, marginBottom: 16 },
  cosellStep: { fontSize: 17, color: "#000", textAlign: "center", lineHeight: 26 },
  cosellCTA: { borderWidth: 1, borderColor: "#000", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, marginTop: 12 },
  cosellCTAText: { fontSize: 14, fontWeight: "500", color: "#000" },
  cosellMotivation: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 24, alignItems: "center" },
  cosellMotivationTitle: { fontSize: 22, fontWeight: "600", color: "#000", marginBottom: 8 },
  cosellMotivationText: { fontSize: 16, color: "#737373", textAlign: "center", lineHeight: 24 },

  // Networks
  textWhite: { color: "#fff" },
  textMuted: { color: "#d4d4d4" },
  networkRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 8 },
  networkItem: { alignItems: "center", gap: 8 },
  networkName: { fontSize: 14, color: "#a3a3a3", fontWeight: "500" },
  networkDivider: { width: 1, height: 24, backgroundColor: "#333" },
});
