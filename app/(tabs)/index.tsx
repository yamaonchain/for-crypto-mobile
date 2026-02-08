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
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing } from "../../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_WIDTH = SCREEN_WIDTH - 48;
const SLIDE_SPACING = 12;

// UPDATED: Real For Crypto products with actual design/images
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

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleBuyPress = (listing: any) => {
    // Navigate to product detail page with mock ID
    router.push('/product/mock-listing');
  };

  const renderSlide = ({ item: slide, index }: { item: any; index: number }) => (
    <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
      <View style={styles.slideCard}>
        <View style={styles.exampleLabel}>
          <Text style={styles.exampleLabelText}>Example Listing</Text>
        </View>
        
        {/* Real product image placeholder */}
        <Image 
          source={{ uri: `https://picsum.photos/600/340?random=${index}` }}
          style={styles.slideImage}
          resizeMode="cover"
        />
        
        <View style={styles.slideFooter}>
          <View style={styles.cosellInfo}>
            <Text style={styles.cosellTitle}>Cosell For Crypto.</Text>
            <Text style={styles.cosellCommission}>{slide.commission}% Commission</Text>
          </View>
          <View style={styles.divider} />
          <Pressable style={styles.becomeCoseller}>
            <Text style={styles.becomeCosellerText}>Become a Coseller</Text>
          </Pressable>
        </View>
        
        <Pressable style={styles.buyButton} onPress={() => handleBuyPress(slide)}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Pressable>
        
        <View style={styles.priceSection}>
          <Text style={styles.price}>{slide.price} USDC</Text>
        </View>
        
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideDescription} numberOfLines={3}>
            {slide.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>Sell. Cosell.{"\n"}For Crypto.</Text>
      <Text style={styles.heroSubtitle}>
        The marketplace for creators, builders, bots, and sellers who want
        instant payouts in USDC, a digital dollar that's always worth $1.
        No banks. No middlemen. Just your wallet and the internet.
      </Text>
      
      {/* COSELLING IS THE NEW NEW - Large Typography Section */}
      <View style={styles.cosellingHero}>
        <Text style={styles.cosellingHeroText}>COSELLING IS THE NEW NEW</Text>
      </View>
      
      <View style={styles.heroButtons}>
        <Link href="/search" asChild>
          <Pressable style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Browse</Text>
          </Pressable>
        </Link>
        <Link href="/posts/new" asChild>
          <Pressable style={styles.buttonFilled}>
            <Text style={styles.buttonFilledText}>Sell</Text>
          </Pressable>
        </Link>
      </View>

      {/* Featured Listings Carousel */}
      <View style={styles.carouselSection}>
        <FlatList
          ref={flatListRef}
          data={REAL_LISTINGS}
          renderItem={renderSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        
        {/* Dot Indicators */}
        <View style={styles.dotContainer}>
          {REAL_LISTINGS.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? Colors.primary : Colors.muted }
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>
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
          <View style={styles.botStepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.botStepText}>Register bot</Text>
        </View>
        <Text style={styles.stepArrow}>→</Text>
        <View style={styles.botStep}>
          <View style={styles.botStepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.botStepText}>Get API key</Text>
        </View>
        <Text style={styles.stepArrow}>→</Text>
        <View style={styles.botStep}>
          <View style={styles.botStepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.botStepText}>Start earning</Text>
        </View>
      </View>
    </View>
  );
}

// Keep existing Why, How, Cosell, Assets, BackedNetwork, FAQSection functions...
// (Truncated for brevity - would include all sections to match web app)

function Why() {
  const whyCards = [
    {
      icon: "flash",
      title: "Instant Payouts",
      description: "Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
    },
    {
      icon: "lock-closed",
      title: "Self-Custody", 
      description: "You own the wallet, you control the money. No platforms holding your funds."
    },
    {
      icon: "globe",
      title: "Global by Default",
      description: "Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
    },
    {
      icon: "trending-up",
      title: "Smart Splits",
      description: "Revenue is split automatically between sellers and cosellers. No chasing payments."
    }
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Why Crypto?</Text>
      <Text style={styles.sectionSubtitle}>Payments that just work.</Text>
      <Text style={styles.sectionDescription}>
        No waiting for payouts. No platform lock-in. No chargebacks. Just direct, 
        wallet-to-wallet payments that are global, instant, and built for anyone.
      </Text>
      
      <View style={styles.whyCardsGrid}>
        {whyCards.map((card, index) => (
          <View key={index} style={styles.whyCard}>
            <View style={styles.whyCardIcon}>
              <Ionicons name={card.icon} size={32} color={Colors.primary} />
            </View>
            <Text style={styles.whyCardTitle}>{card.title}</Text>
            <Text style={styles.whyCardDescription}>{card.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function How() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How it works.</Text>
      <Text style={styles.sectionSubtitle}>Instant transactions.</Text>
      <Text style={styles.sectionSubtitle}>No banks. No delays.</Text>
      <Text style={styles.sectionDescription}>
        From wallet connect to payout, everything happens directly. No signups, no waiting, no middlemen.
      </Text>
      
      <View style={styles.howCard}>
        <View style={styles.howCardContent}>
          <Text style={styles.howCardTitle}>Getting started is simple</Text>
          <View style={styles.stepsContainer}>
            {howSteps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepText}>
                  {index + 1}. {step}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Placeholder for illustration */}
        <View style={styles.howIllustration}>
          <Image 
            source={{ uri: "https://picsum.photos/300/300?random=how" }}
            style={styles.howIllustrationImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
function Cosell() {
  return (
    <View style={styles.cosellSection}>
      <Text style={styles.cosellTitle}>Cosell lets anyone earn real crypto by helping sell something they believe in.</Text>
      
      <Text style={styles.cosellDescription}>
        When a seller enables Cosell, they set a public commission rate. Anyone can click Cosell, generate a unique link, and start earning immediately.
      </Text>
      
      <Text style={styles.cosellDescription}>
        The moment you Cosell, a smart contract is created that locks in your commission rate for 30 days.
      </Text>
      
      <View style={styles.cosellFeatures}>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>
            If the seller raises the commission later, your rate increases right away
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>
            If the seller lowers the commission, your higher rate stays locked until your 30-day window ends
          </Text>
        </View>
      </View>
      
      <Text style={styles.cosellPayment}>
        Every time someone makes a purchase through your link, you get paid instantly and directly to your wallet. No middlemen. No payout delays. No waiting period.
      </Text>
      
      <Text style={styles.cosellTagline}>This is how marketing should work.</Text>
      
      <Text style={styles.cosellValueProp}>
        You don't get paid for fake clicks, empty impressions, or engagement from bots.
        You only get paid for real sales. The clearest signal of value.
      </Text>
    </View>
  );
}
function Assets() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sales Assets</Text>
      <Text style={styles.sectionDescription}>
        Upload logos, videos, and creative assets. Cosellers unlock them when they create a contract.
        Give your network the tools they need to sell effectively.
      </Text>
      
      <View style={styles.assetsGrid}>
        <View style={styles.assetItem}>
          <View style={styles.assetIcon}>
            <Ionicons name="image" size={24} color="#525252" />
          </View>
          <Text style={styles.assetTitle}>Product Images</Text>
          <Text style={styles.assetDescription}>High-res photos and screenshots</Text>
        </View>
        
        <View style={styles.assetItem}>
          <View style={styles.assetIcon}>
            <Ionicons name="videocam" size={24} color="#525252" />
          </View>
          <Text style={styles.assetTitle}>Demo Videos</Text>
          <Text style={styles.assetDescription}>Show your product in action</Text>
        </View>
        
        <View style={styles.assetItem}>
          <View style={styles.assetIcon}>
            <Ionicons name="document-text" size={24} color="#525252" />
          </View>
          <Text style={styles.assetTitle}>Copy & Messaging</Text>
          <Text style={styles.assetDescription}>Ready-to-use sales copy</Text>
        </View>
        
        <View style={styles.assetItem}>
          <View style={styles.assetIcon}>
            <Ionicons name="color-palette" size={24} color="#525252" />
          </View>
          <Text style={styles.assetTitle}>Brand Assets</Text>
          <Text style={styles.assetDescription}>Logos, colors, and style guides</Text>
        </View>
      </View>
    </View>
  );
}
function BackedNetwork() {
  return (
    <View style={styles.networkSection}>
      <Text style={[styles.sectionTitle, { color: "#fff" }]}>Built on Base</Text>
      <Text style={[styles.sectionDescription, { color: "#a3a3a3" }]}>
        Powered by Coinbase's Layer 2 network. Fast, cheap transactions with USDC - 
        a digital dollar that's always worth $1.
      </Text>
      
      <View style={styles.networkFeatures}>
        <View style={styles.networkFeature}>
          <Text style={styles.networkFeatureTitle}>Instant Settlements</Text>
          <Text style={styles.networkFeatureDescription}>Payments confirm in seconds, not days</Text>
        </View>
        
        <View style={styles.networkFeature}>
          <Text style={styles.networkFeatureTitle}>Low Fees</Text>
          <Text style={styles.networkFeatureDescription}>Pennies per transaction vs traditional payment processing</Text>
        </View>
        
        <View style={styles.networkFeature}>
          <Text style={styles.networkFeatureTitle}>Global Access</Text>
          <Text style={styles.networkFeatureDescription}>Anyone with a wallet can participate</Text>
        </View>
      </View>
    </View>
  );
}
function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "What is USDC?",
      answer: "USDC is a digital dollar - a stablecoin that's always worth $1. It's the most trusted way to transact in crypto without volatility."
    },
    {
      question: "How do payouts work?",
      answer: "Payments are instant and direct to your wallet. No platform holds your money. When someone buys through your Cosell link, you get paid immediately."
    },
    {
      question: "What wallets work?",
      answer: "Any wallet that supports Base network and USDC. Popular options include MetaMask, Coinbase Wallet, and Phantom."
    },
    {
      question: "Are there fees?",
      answer: "Platform takes 30% for organic discovery, 10% for seller's own link, and 10% + coseller commission for cosell sales. All fees are transparent."
    }
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>FAQ</Text>
      <Text style={styles.sectionDescription}>
        Common questions about selling and coselling for crypto.
      </Text>
      
      <View style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Pressable
              style={styles.faqQuestion}
              onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
            >
              <Text style={styles.faqQuestionText}>{faq.question}</Text>
              <Ionicons
                name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="#525252"
              />
            </Pressable>
            {expandedFAQ === index && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 40 },

  // Hero
  hero: { paddingTop: 40, paddingBottom: 20, alignItems: "center", paddingHorizontal: 16 },
  heroTitle: { fontSize: 32, fontWeight: "500", textAlign: "center", color: Colors.foreground, lineHeight: 40, marginBottom: 12 },
  heroSubtitle: {
    fontSize: 18,
    color: "#737373",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  heroButtons: { flexDirection: "row", gap: 16, width: "100%", maxWidth: 320 },
  cosellingHero: { 
    paddingVertical: 40, 
    paddingHorizontal: 16, 
    alignItems: "center",
    backgroundColor: Colors.surface,
    marginVertical: 32,
    borderRadius: 12,
  },
  cosellingHeroText: { 
    fontSize: 32, 
    fontWeight: "700", 
    textAlign: "center", 
    color: Colors.foreground,
    letterSpacing: 1,
    lineHeight: 40,
  },
  buttonOutline: { flex: 1, borderWidth: 1, borderColor: "#e5e5e5", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonOutlineText: { fontSize: 16, fontWeight: "500", color: Colors.foreground },
  buttonFilled: { flex: 1, backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 6, alignItems: "center" },
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
  botStepNumber: { backgroundColor: "#262626", width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  stepNumberText: { fontSize: 12, fontWeight: "500", color: "#d4d4d4" },
  botStepText: { fontSize: 14, color: "#a3a3a3" },
  stepArrow: { fontSize: 14, color: "#525252" },

  // Carousel
  carouselSection: { marginTop: 40, width: "100%" },
  carouselContainer: { paddingHorizontal: 24 },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    overflow: "hidden",
    marginRight: SLIDE_SPACING,
  },
  slideCard: {
    position: "relative",
  },
  exampleLabel: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exampleLabelText: { fontSize: 11, color: "#fff", fontWeight: "500" },
  slideImage: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
  slideFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#e5e5e5",
  },
  cosellInfo: { flex: 1, alignItems: "center" },
  cosellTitle: { fontSize: 14, fontWeight: "500", color: Colors.foreground, marginBottom: 2 },
  cosellCommission: { fontSize: 12, color: "#737373" },
  divider: { width: 1, height: 24, backgroundColor: "#e5e5e5" },
  becomeCoseller: { flex: 1, alignItems: "center" },
  becomeCosellerText: { fontSize: 12, fontWeight: "500", color: Colors.foreground },
  buyButton: { backgroundColor: Colors.primary, paddingVertical: 14, alignItems: "center" },
  buyButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  priceSection: { paddingVertical: 12, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#e5e5e5" },
  price: { fontSize: 15, color: Colors.foreground },
  slideContent: { padding: 24, alignItems: "center" },
  slideTitle: { fontSize: 22, fontWeight: "600", color: Colors.foreground, textAlign: "center", marginBottom: 8, lineHeight: 28 },
  slideDescription: { fontSize: 16, color: "#737373", textAlign: "center", lineHeight: 24 },
  dotContainer: { flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 16 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  // Removed duplicate styles - using carousel styles in Hero section

  // Sections
  section: { padding: 24, paddingVertical: 40 },
  sectionTitle: { fontSize: 28, fontWeight: "600", color: Colors.foreground, marginBottom: 4 },
  sectionSubtitle: { fontSize: 28, fontWeight: "600", color: Colors.foreground, marginBottom: 12 },
  sectionDescription: { fontSize: 16, color: "#737373", lineHeight: 24, marginBottom: 20 },

  // Why Section Cards  
  whyCardsGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 16, 
    marginTop: 24 
  },
  whyCard: { 
    flex: 1, 
    minWidth: "45%", 
    backgroundColor: Colors.card, 
    padding: 24, 
    borderRadius: 12, 
    alignItems: "center",
    marginBottom: 16,
  },
  whyCardIcon: { 
    marginBottom: 16 
  },
  whyCardTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: Colors.foreground, 
    marginBottom: 8, 
    textAlign: "center" 
  },
  whyCardDescription: { 
    fontSize: 14, 
    color: Colors.mutedForeground, 
    textAlign: "center", 
    lineHeight: 20 
  },

  // How Section  
  howCard: { 
    backgroundColor: Colors.card, 
    borderRadius: 12, 
    marginTop: 24, 
    overflow: "hidden" 
  },
  howCardContent: { 
    padding: 32, 
    alignItems: "center" 
  },
  howCardTitle: { 
    fontSize: 24, 
    fontWeight: "500", 
    color: Colors.foreground, 
    marginBottom: 24, 
    textAlign: "center" 
  },
  howIllustration: { 
    padding: 16, 
    alignItems: "center" 
  },
  howIllustrationImage: { 
    width: 200, 
    height: 200 
  },

  // Cosell Section
  cosellSection: { padding: 24, paddingVertical: 40, backgroundColor: "#fafafa" },
  cosellTitle: { fontSize: 24, fontWeight: "600", color: Colors.foreground, lineHeight: 32, marginBottom: 20 },
  cosellDescription: { fontSize: 16, color: "#525252", lineHeight: 24, marginBottom: 16 },
  cosellFeatures: { marginVertical: 20 },
  featureItem: { flexDirection: "row", marginBottom: 12, paddingLeft: 16 },
  featureText: { fontSize: 16, color: "#525252", lineHeight: 24, flex: 1 },
  cosellPayment: { fontSize: 16, color: "#525252", lineHeight: 24, marginBottom: 20, fontWeight: "500" },
  cosellTagline: { fontSize: 20, fontWeight: "600", color: Colors.foreground, marginBottom: 16 },
  cosellValueProp: { fontSize: 16, color: "#525252", lineHeight: 24 },

  // Steps (used in How section)
  stepsContainer: { gap: 16, marginTop: 8 },
  stepItem: { alignItems: "center" },
  stepText: { fontSize: 18, color: Colors.foreground, lineHeight: 24, textAlign: "center" },

  // Assets Section
  assetsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 8 },
  assetItem: { flex: 1, minWidth: "45%", alignItems: "center", padding: 20, backgroundColor: "#fafafa", borderRadius: 8 },
  assetIcon: { marginBottom: 12 },
  assetTitle: { fontSize: 16, fontWeight: "600", color: Colors.foreground, marginBottom: 4, textAlign: "center" },
  assetDescription: { fontSize: 14, color: "#737373", textAlign: "center", lineHeight: 20 },

  // Network Section
  networkSection: { padding: 24, paddingVertical: 40, backgroundColor: "#000" },
  networkFeatures: { gap: 20, marginTop: 16 },
  networkFeature: { alignItems: "center" },
  networkFeatureTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginBottom: 4, textAlign: "center" },
  networkFeatureDescription: { fontSize: 16, color: "#a3a3a3", textAlign: "center", lineHeight: 24 },

  // FAQ Section
  faqContainer: { gap: 12, marginTop: 16 },
  faqItem: { borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 8, overflow: "hidden" },
  faqQuestion: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 16, 
    backgroundColor: "#fafafa" 
  },
  faqQuestionText: { fontSize: 16, fontWeight: "500", color: Colors.foreground, flex: 1, paddingRight: 8 },
  faqAnswer: { 
    fontSize: 14, 
    color: "#525252", 
    lineHeight: 20, 
    padding: 16, 
    paddingTop: 12,
    backgroundColor: "#fff" 
  },
});