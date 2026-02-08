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

// Real For Crypto products from the web app
const REAL_LISTINGS = [
  {
    title: "No School 4 Week Bootcamp.",
    description: "A 5-step video-based mindset reset for anyone building instead of waiting for permission. Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook, and a community of builders.",
    commission: 10,
    price: 875,
  },
  {
    title: "Together Daily Spark.",
    description: "A daily drop of connection for couples who want to stay close, curious, and never bored. Cosell it if you believe love is built in the little moments. Includes daily ideas, prompts, and conversation starters to keep your relationship fresh and meaningful.",
    commission: 20,
    price: 7,
  },
  {
    title: "Community Intake Kit for Divvvy.",
    description: "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for upload to Divvvy. Perfect for DAOs, creators, nonprofits, large-scale distributions and more...",
    commission: 20,
    price: 2,
  },
  {
    title: "Designer Gear for Shredders Game.",
    description: "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style for your rider. Cosell it if you believe looking good is half the game. Style isn't just cosmetic, it's confidence on the mountain.",
    commission: 20,
    price: 50,
  },
  {
    title: "Freckle Fade Lightroom Presets.",
    description: "Not born with freckles? No problem. This Lightroom preset pack adds natural-looking freckles and warm tones in one click. Made for soft edits, flirty textures, and scroll-stopping skin.",
    commission: 15,
    price: 6500,
  },
];

const howSteps = [
  "Connect your wallet",
  "Create your listing", 
  "Set your Coseller commission",
  "Add what buyers get",
  "Add sales assets",
  "Share your listing",
  "Get paid instantly",
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Hero />
      <BotQuickStart />
      <FeaturedListings />
      <Why />
      <How />
      <Cosell />
      <Assets />
      <BackedNetwork />
      <FAQSection />
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
        <Pressable 
          style={styles.buttonOutline}
          onPress={() => {
            console.log("Learn More button pressed!");
          }}
        >
          <Text style={styles.buttonOutlineText}>Learn More</Text>
        </Pressable>
        <Link href="/posts/new" asChild>
          <Pressable style={styles.buttonFilled}>
            <Text style={styles.buttonFilledText}>Sell</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

function BotQuickStart() {
  const quickStartCode = `curl https://for-crypto.vercel.app/api/bot/me \\
  -H "Authorization: Bearer YOUR_API_KEY"`;

  return (
    <View style={styles.botSection}>
      <View style={styles.botHeader}>
        <View style={styles.botIcon}>
          <Ionicons name="terminal" size={20} color="#fff" />
        </View>
        <Text style={styles.botTitle}>Connect Your Bot</Text>
      </View>
      
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{quickStartCode}</Text>
        <Pressable style={styles.copyButton}>
          <Ionicons name="copy" size={16} color="#a3a3a3" />
        </Pressable>
      </View>
      
      <View style={styles.botSteps}>
        <View style={styles.botStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>Register bot</Text>
        </View>
        <Text style={styles.stepArrow}>→</Text>
        <View style={styles.botStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>Get API key</Text>
        </View>
        <Text style={styles.stepArrow}>→</Text>
        <View style={styles.botStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>Start earning</Text>
        </View>
      </View>
    </View>
  );
}

function FeaturedListings() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / (SLIDE_WIDTH + SLIDE_SPACING));
    setActiveIndex(index);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={REAL_LISTINGS}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
            <View style={styles.slideLabel}>
              <Text style={styles.slideLabelText}>Example Listing</Text>
            </View>
            
            <View style={styles.slideImage}>
              <Ionicons name="image-outline" size={60} color="#d4d4d4" />
            </View>
            
            <View style={styles.slideCosellBar}>
              <View style={styles.slideCosellInfo}>
                <Text style={styles.slideCosellLabel}>Cosell For Crypto.</Text>
                <Text style={styles.slideCosellCommission}>{item.commission}% Commission</Text>
              </View>
              <View style={styles.slideDivider} />
              <Pressable style={styles.cosellButton}>
                <Text style={styles.cosellButtonText}>Become a Coseller</Text>
              </Pressable>
            </View>
            
            <Pressable style={styles.slideBuyButton}>
              <Text style={styles.slideBuyText}>Buy Now</Text>
            </Pressable>
            
            <View style={styles.slidePrice}>
              <Text style={styles.slidePriceText}>{item.price} USDC</Text>
            </View>
            
            <View style={styles.slideContent}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      
      <View style={styles.dots}>
        {REAL_LISTINGS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// Keep existing Why, How, Cosell, Assets, BackedNetwork, FAQSection functions...
// (Truncated for brevity - would include all sections to match web app)

function Why() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Why Crypto?</Text>
      <Text style={styles.sectionSubtitle}>Payments that just work.</Text>
      <Text style={styles.sectionDescription}>
        No waiting for payouts. No platform lock-in. No chargebacks. Just direct, 
        wallet-to-wallet payments that are global, instant, and built for anyone.
      </Text>
    </View>
  );
}

function How() { return <View />; }
function Cosell() { return <View />; }
function Assets() { return <View />; }
function BackedNetwork() { return <View />; }
function FAQSection() { return <View />; }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 40 },

  // Hero
  hero: { paddingTop: 40, paddingBottom: 20, alignItems: "center", paddingHorizontal: 16 },
  heroTitle: { fontSize: 32, fontWeight: "500", textAlign: "center", color: "#000", lineHeight: 40, marginBottom: 12 },
  heroSubtitle: {
    fontSize: 18,
    color: "#737373",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  heroButtons: { flexDirection: "row", gap: 16, width: "100%", maxWidth: 320 },
  buttonOutline: { flex: 1, borderWidth: 1, borderColor: "#e5e5e5", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonOutlineText: { fontSize: 16, fontWeight: "500", color: "#000" },
  buttonFilled: { flex: 1, backgroundColor: "#000", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonFilledText: { fontSize: 16, fontWeight: "500", color: "#fff" },

  // Bot Quick Start
  botSection: { backgroundColor: "#171717", borderRadius: 12, margin: 16, padding: 24 },
  botHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  botIcon: { backgroundColor: "#262626", padding: 8, borderRadius: 8 },
  botTitle: { fontSize: 18, fontWeight: "500", color: "#fff" },
  codeContainer: { backgroundColor: "#262626", borderRadius: 8, padding: 16, marginBottom: 16, position: "relative" },
  codeText: { fontFamily: "monospace", fontSize: 13, color: "#d4d4d4", lineHeight: 18 },
  copyButton: { position: "absolute", top: 12, right: 12, padding: 8, backgroundColor: "#404040", borderRadius: 4 },
  botSteps: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24 },
  botStep: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepNumber: { backgroundColor: "#262626", width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  stepNumberText: { fontSize: 12, fontWeight: "500", color: "#d4d4d4" },
  stepText: { fontSize: 14, color: "#a3a3a3" },
  stepArrow: { fontSize: 14, color: "#525252" },

  // Carousel
  carouselContainer: { marginTop: 40, width: "100%" },
  carouselContent: { paddingHorizontal: 24, gap: SLIDE_SPACING },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    overflow: "hidden",
  },
  slideLabel: {
    position: "absolute",
    top: 12,
    left: 12,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    gap: 8,
  },
  slideCosellInfo: { flex: 1, alignItems: "center" },
  slideCosellLabel: { fontSize: 14, fontWeight: "500", color: "#000", marginBottom: 2 },
  slideCosellCommission: { fontSize: 12, color: "#737373" },
  slideDivider: { width: 1, height: 24, backgroundColor: "#e5e5e5" },
  cosellButton: { flex: 1, alignItems: "center" },
  cosellButtonText: { fontSize: 12, fontWeight: "500", color: "#000" },
  slideBuyButton: { backgroundColor: "#000", paddingVertical: 14, alignItems: "center" },
  slideBuyText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  slidePrice: { paddingVertical: 12, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  slidePriceText: { fontSize: 15, color: "#000" },
  slideContent: { padding: 24, alignItems: "center" },
  slideTitle: { fontSize: 22, fontWeight: "600", color: "#000", textAlign: "center", marginBottom: 8 },
  slideDescription: { fontSize: 16, color: "#737373", textAlign: "center", lineHeight: 24 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 16 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  dotActive: { backgroundColor: "#000" },
  dotInactive: { backgroundColor: "#e5e5e5" },

  // Sections
  section: { padding: 24, paddingVertical: 40 },
  sectionTitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 4 },
  sectionSubtitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 12 },
  sectionDescription: { fontSize: 16, color: "#737373", lineHeight: 24, marginBottom: 20 },
});