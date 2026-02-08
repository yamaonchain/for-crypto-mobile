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

// Exact data from web app
const EXAMPLE_LISTINGS = [
  {
    title: "No School 4 Week Bootcamp.",
    description: "A 5-step video-based mindset reset for anyone building instead of waiting for permission. Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook, and a community of builders.",
    commission: 10,
    price: 875,
  },
  {
    title: "Together Daily Spark. ",
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
      <FeaturedListings />
      <Categories />
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
            console.log("🔥 TOUCH EVENT: Learn More button pressed!");
            alert("Touch works! Learn More pressed");
          }}
        >
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
          renderItem={({ item, index }) => (
            <Link href={`/product/${index + 1}`} asChild>
              <Pressable style={styles.slide}>
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
              </Pressable>
            </Link>
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
  { id: "5", title: "Freckle Fade Lightroom Presets", price: "65", commission: 15, category: "Product" },
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
          <Link 
            href={{
              pathname: "/search",
              params: { category: cat.id }
            }} 
            key={cat.id} 
            asChild
          >
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

function Why() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Why Crypto?</Text>
      <Text style={styles.sectionSubtitle}>Payments that just work.</Text>
      <Text style={styles.sectionDescription}>
        No waiting for payouts. No platform lock-in. No chargebacks. Just direct, wallet-to-wallet payments that are global, instant, and built for anyone.
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

function How() {
  return (
    <View style={[styles.section, styles.sectionAlt]}>
      <Text style={styles.sectionTitle}>How it works.</Text>
      <Text style={styles.sectionSubtitle}>Instant transactions.</Text>
      <Text style={styles.sectionSubtitle}>No banks. No delays.</Text>
      <Text style={styles.sectionDescription}>
        From wallet connect to payout, everything happens directly. No signups, no waiting, no middlemen.
      </Text>
      <View style={styles.howContainer}>
        <View style={styles.howSteps}>
          <Text style={styles.howStepsTitle}>Getting started is simple</Text>
          {howSteps.map((step, index) => (
            <Text key={index} style={styles.howStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
        {/* Placeholder for image */}
        <View style={styles.howImage}>
          <Ionicons name="phone-portrait-outline" size={120} color="#d4d4d4" />
        </View>
      </View>
    </View>
  );
}

function Cosell() {
  return (
    <View style={[styles.section, styles.sectionGray]}>
      <Text style={styles.sectionTitle}>Cosell.</Text>
      <Text style={styles.sectionSubtitle}>Unlock the Internet.</Text>
      <Text style={styles.sectionDescription}>
        Cosell is not an affiliate link. It's a contract. A payout. A share of every sale. It turns attention into income for anyone, anywhere.
      </Text>
      
      <View style={styles.cosellGrid}>
        <View style={styles.cosellVideoCard}>
          <View style={styles.cosellVideoPlaceholder}>
            <Ionicons name="play-outline" size={40} color="#d4d4d4" />
          </View>
        </View>
        <View style={styles.cosellInfoCard}>
          <View style={styles.cosellInfoContent}>
            <Text style={styles.cosellInfoText}>The seller sets the commission.</Text>
            <Text style={styles.cosellInfoText}>A Coseller activates the contract.</Text>
            <Text style={styles.cosellInfoText}>Sales are tracked on the blockchain.</Text>
            <Text style={styles.cosellInfoText}>Payouts happen instantly.</Text>
          </View>
          <Pressable style={styles.cosellButton}>
            <Text style={styles.cosellButtonText}>Become a Coseller</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.cosellFinalCard}>
        <View style={styles.cosellFinalImage}>
          <Ionicons name="trending-up-outline" size={80} color="#d4d4d4" />
        </View>
        <Text style={styles.cosellFinalTitle}>No excuse this time.</Text>
        <Text style={styles.cosellFinalDescription}>
          If you have a device, you can Cosell For Crypto. Go get it. Nothing is stopping you now.
        </Text>
      </View>
    </View>
  );
}

function Assets() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sales Assets.</Text>
      <Text style={styles.sectionSubtitle}>Give Cosellers the tools to sell.</Text>
      <Text style={styles.sectionDescription}>
        Official photos, videos, and creative material uploaded by sellers and unlocked by Cosellers. Quality promotion that scales with you.
      </Text>

      {/* Assets hero image placeholder */}
      <View style={styles.assetsHeroImage}>
        <Ionicons name="images-outline" size={80} color="#d4d4d4" />
      </View>

      <View style={styles.assetsContent}>
        <Text style={styles.assetsContentTitle}>Your sales materials, your way</Text>
        <Text style={styles.assetsContentDescription}>
          Every listing includes a dedicated sales assets section: a space to upload the logos, videos, and creative tools that help your product sell.
        </Text>
        <Text style={styles.assetsContentDescription}>
          Sellers upload. Cosellers get access the moment they create a contract.
        </Text>
        <Text style={styles.assetsContentDescription}>
          The result is aligned promotion and wider reach from day one.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        <AssetCard
          title="Logos, Marks, Tags..."
          description="The scroll stops when you stand out. Upload clean logos, badges, and marks Cosellers can drop into any format. Whether you're selling or Coselling, identity matters."
          icon="pricetag-outline"
        />
        <AssetCard
          title="Films, Ads, Interviews... "
          description="Let the story do the selling. Trailers, interviews, edits, and reels. Built by Sellers or remixable by Cosellers. The better the content, the further it travels."
          icon="videocam-outline"
        />
        <AssetCard
          title="Photos, Text, Documentation..."
          description="Everything needed to list, describe, and post. Product shots. Specs. Descriptions. Quotes. Clear tools for anyone helping push the product forward."
          icon="document-text-outline"
        />
      </View>
    </View>
  );
}

function BackedNetwork() {
  return (
    <View style={[styles.section, styles.sectionGray]}>
      <Text style={styles.sectionTitle}>Backed by leading networks.</Text>
      <Text style={styles.sectionDescription}>
        Built on Base, a faster and cheaper network powered by Ethereum, with automatic payouts to Solana. Fast, low-cost, and built for global commerce.
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
      <View style={styles.heroButtons}>
        <Pressable style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Learn More</Text>
        </Pressable>
        <Pressable style={styles.buttonFilled}>
          <Text style={styles.buttonFilledText}>Sell</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Simplified FAQ for mobile (key questions only)
const FAQ_DATA = [
  { q: "What is For Crypto?", a: "For Crypto is a wallet-connected marketplace where anyone can list, sell, and Cosell anything digital. You can sell solo or invite Cosellers and split earnings automatically using smart contracts. Think of it like a traditional sales platform, rebuilt for the internet." },
  { q: 'What does "Cosell" mean?', a: "Cosell lets anyone earn real crypto by helping sell something they believe in. When a seller enables Cosell, they set a public commission rate. Anyone can click Cosell, generate a unique link, and start earning immediately. Every time someone makes a purchase through your link, you get paid instantly." },
  { q: "How does payout work?", a: "Buyers pay in USDC (a stablecoin worth $1), and funds are routed instantly to your wallet and any Cosellers' wallets. No waiting. No withdrawal process. No payout requests. The split is enforced by a smart contract, so everyone gets paid automatically." },
  { q: "What wallets are supported?", a: "You can connect with Phantom (Base and Solana), MetaMask (Base), and Coinbase Wallet (Base). Any Ethereum-compatible wallet works for Base." },
  { q: "Do I need to be technical?", a: "Not at all. If you can connect a wallet, upload a file, and paste a product description, you're good to go. The Coseller flow is also simple. Just add their wallet and percentage. That's it." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View style={styles.faqSection}>
      <Text style={[styles.sectionTitle, styles.textWhite]}>Frequently Asked Questions</Text>
      <Text style={[styles.sectionDescription, styles.textMuted]}>
        Everything you need to know about For Crypto.
      </Text>
      <Text style={[styles.sectionDescription, styles.textMuted]}>
        And if you have an idea, feedback, or want to request a feature, let us know.
      </Text>
      <Pressable style={styles.feedbackButton}>
        <Text style={styles.feedbackButtonText}>Feedback</Text>
      </Pressable>
      
      {FAQ_DATA.map((faq, i) => (
        <Pressable
          key={i}
          style={styles.faqItem}
          onPress={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <View style={styles.faqHeader}>
            <Text style={styles.faqQuestion}>{faq.q}</Text>
            <Ionicons
              name={openIndex === i ? "chevron-up" : "chevron-down"}
              size={18}
              color="#a3a3a3"
            />
          </View>
          {openIndex === i && (
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          )}
        </Pressable>
      ))}
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

function AssetCard({ title, description, icon }: { title: string; description: string; icon: string }) {
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { paddingBottom: 40 },

  // Hero
  hero: { paddingTop: 40, paddingBottom: 20, alignItems: "center" },
  heroTitle: { fontSize: 32, fontWeight: "700", textAlign: "center", color: "#fff", lineHeight: 40 },
  heroSubtitle: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  heroButtons: { flexDirection: "row", gap: 12, marginTop: 24, paddingHorizontal: 24, width: "100%" },
  buttonOutline: { flex: 1, borderWidth: 1, borderColor: "#fff", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonOutlineText: { fontSize: 16, fontWeight: "500", color: "#fff" },
  buttonFilled: { flex: 1, backgroundColor: "#fff", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonFilledText: { fontSize: 16, fontWeight: "500", color: "#000" },

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
  sectionGray: { backgroundColor: "#e5e5e5" },
  sectionDark: { backgroundColor: "#0a0a0a" },
  sectionTitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 4 },
  sectionSubtitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 12 },
  sectionDescription: { fontSize: 16, color: "#737373", lineHeight: 24, marginBottom: 20 },

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

  // Why cards
  cardGrid: { gap: 12 },
  whyCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  whyCardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  whyCardTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  whyCardDescription: { fontSize: 15, color: "#737373", lineHeight: 22 },

  // How
  howContainer: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  howSteps: { marginBottom: 20 },
  howStepsTitle: { fontSize: 22, fontWeight: "600", color: "#000", marginBottom: 16, textAlign: "center" },
  howStep: { fontSize: 16, color: "#000", marginBottom: 12, lineHeight: 24 },
  howImage: { alignItems: "center", justifyContent: "center", paddingVertical: 20 },

  // Cosell
  cosellGrid: { gap: 12, marginBottom: 20 },
  cosellVideoCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  cosellVideoPlaceholder: { aspectRatio: 16 / 9, backgroundColor: "#e5e5e5", alignItems: "center", justifyContent: "center", borderRadius: 8 },
  cosellInfoCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  cosellInfoContent: { marginBottom: 20 },
  cosellInfoText: { fontSize: 16, color: "#000", marginBottom: 8, textAlign: "center" },
  cosellButton: { backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6, alignItems: "center", borderWidth: 1, borderColor: "#e5e5e5" },
  cosellButtonText: { fontSize: 14, fontWeight: "500", color: "#000" },
  cosellFinalCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20, alignItems: "center" },
  cosellFinalImage: { marginBottom: 16 },
  cosellFinalTitle: { fontSize: 22, fontWeight: "600", color: "#000", marginBottom: 8, textAlign: "center" },
  cosellFinalDescription: { fontSize: 16, color: "#737373", lineHeight: 22, textAlign: "center" },

  // Assets
  assetsHeroImage: { backgroundColor: "#f5f5f5", aspectRatio: 16 / 9, alignItems: "center", justifyContent: "center", borderRadius: 12, marginBottom: 20 },
  assetsContent: { marginBottom: 20 },
  assetsContentTitle: { fontSize: 22, fontWeight: "600", color: "#000", marginBottom: 12 },
  assetsContentDescription: { fontSize: 16, color: "#737373", lineHeight: 22, marginBottom: 12 },

  // Networks
  textWhite: { color: "#fff" },
  textMuted: { color: "#d4d4d4" },
  networkRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 24 },
  networkItem: { alignItems: "center", gap: 8 },
  networkName: { fontSize: 14, color: "#a3a3a3", fontWeight: "500" },
  networkDivider: { width: 1, height: 24, backgroundColor: "#d4d4d4" },

  // FAQs
  faqSection: { paddingHorizontal: 24, paddingVertical: 32, backgroundColor: "#0a0a0a" },
  faqItem: { borderBottomWidth: 0.5, borderBottomColor: "#333", paddingVertical: 16 },
  faqHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  faqQuestion: { fontSize: 15, fontWeight: "600", color: "#fff", flex: 1, marginRight: 12 },
  faqAnswer: { fontSize: 14, color: "#a3a3a3", lineHeight: 22, marginTop: 10 },
  feedbackButton: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#fff", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6, alignItems: "center", marginBottom: 20 },
  feedbackButtonText: { fontSize: 14, fontWeight: "500", color: "#fff" },
});