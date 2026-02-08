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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_WIDTH = SCREEN_WIDTH - 48;
const SLIDE_SPACING = 16;

// Exact slides from web source
const slides = [
  {
    thumbnail: "/videos/bootcamp.mp4",
    title: "No School 4 Week Bootcamp.",
    description:
      "A 5-step video-based mindset reset for anyone building instead of waiting for permission. Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook,",
    commission: 10,
    price: 875,
  },
  {
    thumbnail: "/videos/daily.mp4",
    title: "Together Daily Spark.",
    description:
      "A daily drop of connection for couples who want to stay close, curious, and never bored. Cosell it if you believe love is built in the little moments. Includes daily ideas, prompts, and conversation starters to keep your relationship fresh and meaningful.",
    commission: 20,
    price: 7,
  },
  {
    thumbnail: "/videos/divvvy.mp4",
    title: "Community Intake Kit for Divvvy.",
    description:
      "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for upload to Divvvy. Perfect for DAOs, creators, nonprofits, large-scale distributions and more...",
    commission: 20,
    price: 2,
  },
  {
    thumbnail: "/videos/designer-gear.mp4",
    title: "Designer Gear for Shredders Game.",
    description:
      "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style for your rider. Cosell it if you believe looking good is half the game. Style isn't just cosmetic, it's confidence on...",
    commission: 20,
    price: 50,
  },
  {
    thumbnail: "/videos/freckle-fade.mp4",
    title: "Freckle Fade Lightroom Presets.",
    description:
      "Not born with freckles? No problem. This Lightroom preset pack adds natural-looking freckles and warm tones in one click. Made for soft edits, flirty textures, and scroll-stopping skin.",
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
      <Why />
      <How />
      <Cosell />
      <Assets />
      <BackedNetwork />
      <FAQs />
    </ScrollView>
  );
}

function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const container = e.nativeEvent;
    const containerCenter = container.contentOffset.x + container.layoutMeasurement.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((_, index) => {
      const slideCenter = index * (SLIDE_WIDTH + SLIDE_SPACING) + SLIDE_WIDTH / 2;
      const distance = Math.abs(containerCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setSelectedIndex(closestIndex);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    scrollRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const renderSlide = ({ item: slide, index }: { item: any; index: number }) => (
    <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
      <View style={styles.slideCard}>
        <View style={styles.exampleLabel}>
          <Text style={styles.exampleLabelText}>Example Listing</Text>
        </View>
        
        <Image 
          source={{ uri: `https://picsum.photos/710/400?random=${index}` }}
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
        
        <Pressable style={styles.buyButton}>
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
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>
          Sell. Cosell. For Crypto.
        </Text>
        <Text style={styles.heroSubtitle}>
          A crypto market for creators, artists, designers, influencers, and
          more. Instant payments. No banks. No middlemen. Just your wallet
          and the internet.
        </Text>
        <View style={styles.heroButtons}>
          <Pressable style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Learn More</Text>
          </Pressable>
          <Pressable style={styles.buttonFilled}>
            <Text style={styles.buttonFilledText}>Sell</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.carouselSection}>
        <FlatList
          ref={scrollRef}
          data={slides}
          renderItem={renderSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        
        <View style={styles.dotContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === selectedIndex ? "#171717" : "#d4d4d4" }
              ]}
              onPress={() => handleDotClick(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function FAQs() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "Why For Crypto?",
      answer: "The creator economy is evolving, but most platforms haven't caught up.\n\nPayout delays and legacy systems hold people back.\n\nFor Crypto is the first crypto-native marketplace designed for wallet-connected commerce.\n\nSell digital. Cosell with anyone. Get paid instantly in crypto.\n\nNo middlemen. No waiting. Just create, list, and earn."
    },
    {
      question: "What is For Crypto?",
      answer: "For Crypto is a wallet-native marketplace where anyone can list, sell, and Cosell anything digital.\n\nYou can sell solo or invite Cosellers and split earnings automatically using smart contracts.\n\nThink of it like a traditional sales platform, rebuilt for the onchain era."
    },
    {
      question: "How does Cosell work?",
      answer: "Cosell lets anyone earn real crypto by helping sell something they believe in.\n\nWhen a seller enables Cosell, they set a public commission rate. Anyone can click Cosell, generate a unique link, and start earning immediately.\n\nThe moment you Cosell, a smart contract is created that locks in your commission rate for 30 days.\n\nEvery time someone makes a purchase through your link, you get paid instantly and directly to your wallet."
    },
    {
      question: "What networks and wallets are supported?",
      answer: "For Crypto runs on Base, a fast and low-cost Ethereum Layer 2. All payments are made in USDC.\n\nYou can connect with:\n• Phantom\n• MetaMask"
    }
  ];

  return (
    <View style={styles.faqSection}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        <Text style={styles.faqDescription}>
          Everything you need to know about For Crypto.
        </Text>
        <Text style={styles.faqDescription}>
          And if you have an idea, feedback, or want to request a feature,
          let us know.
        </Text>
        
        <Pressable style={styles.feedbackButton}>
          <Text style={styles.feedbackButtonText}>Feedback</Text>
        </Pressable>
      </View>
      
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
                size={24}
                color="#fff"
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

function Why() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Why Crypto?</Text>
        <Text style={styles.sectionSubtitle}>It's better in every way.</Text>
        <Text style={styles.sectionDescription}>
          No waiting for payouts. No platform lock-in. No chargebacks or third-party control. Just direct, wallet-to-wallet commerce that's global, instant, and built for anyone.
        </Text>
      </View>
      
      <View style={styles.whyCardsGrid}>
        <WhyCard
          title="Instant Payouts"
          description="Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
        />
        <WhyCard
          title="Self-Custody"
          description="You own the wallet, you control the money. No platforms holding your funds."
        />
        <WhyCard
          title="Global by Default"
          description="Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
        />
        <WhyCard
          title="Smart Splits"
          description="Revenue is split automatically between sellers and cosellers. No chasing payments."
        />
      </View>
    </View>
  );
}

function WhyCard({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.whyCard}>
      <Image 
        source={{ uri: `https://picsum.photos/400/225?random=${title}` }}
        style={styles.whyCardVideo}
        resizeMode="cover"
      />
      <Text style={styles.whyCardTitle}>{title}</Text>
      <Text style={styles.whyCardDescription}>{description}</Text>
    </View>
  );
}

function How() {
  return (
    <View style={styles.howSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>How it works.</Text>
        <Text style={styles.sectionSubtitle}>Instant transactions.</Text>
        <Text style={styles.sectionSubtitle}>No banks. No delays.</Text>
        <Text style={styles.sectionDescription}>
          Simple, secure, and built for the way you create. From wallet connect to payout,
          everything happens directly. No signups, no waiting, no middlemen.
        </Text>
      </View>
      
      <View style={styles.howCard}>
        <View style={styles.howCardContent}>
          <Text style={styles.howCardTitle}>Getting started is simple</Text>
          <View style={styles.stepsContainer}>
            {howSteps.map((step, index) => (
              <Text key={index} style={styles.stepText}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        </View>
        
        <View style={styles.howIllustration}>
          <Image 
            source={{ uri: "https://picsum.photos/400/400?random=how" }}
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
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cosell.</Text>
        <Text style={styles.sectionSubtitle}>Unlock the Internet.</Text>
        <Text style={styles.sectionDescription}>
          Cosell is not an affiliate link. It's a contract. A payout. A piece of the upside. It turns attention into income for anyone, anywhere.
        </Text>
      </View>
      
      <View style={styles.cosellGrid}>
        <View style={styles.cosellVideoCard}>
          <Image 
            source={{ uri: "https://picsum.photos/400/225?random=cosell" }}
            style={styles.cosellVideo}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.cosellTextCard}>
          <View style={styles.cosellPoints}>
            <Text style={styles.cosellPointText}>The seller sets the commission.</Text>
            <Text style={styles.cosellPointText}>A Coseller activates the contract.</Text>
            <Text style={styles.cosellPointText}>Sales are tracked onchain.</Text>
            <Text style={styles.cosellPointText}>Payouts happen instantly.</Text>
          </View>
          
          <Pressable style={styles.cosellButton}>
            <Text style={styles.cosellButtonText}>Become a Coseller</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.cosellBigCard}>
        <Image 
          source={{ uri: "https://picsum.photos/1440/400?random=cosell-hero" }}
          style={styles.cosellHeroImage}
          resizeMode="contain"
        />
        <Text style={styles.cosellHeroTitle}>No excuse this time.</Text>
        <Text style={styles.cosellHeroDescription}>
          If you have a device, you can Cosell For Crypto. Go get it.
          Nothing is stopping you now.
        </Text>
      </View>
    </View>
  );
}
function Assets() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sales Assets.</Text>
        <Text style={styles.sectionSubtitle}>Give Cosellers the tools to sell.</Text>
        <Text style={styles.sectionDescription}>
          Official photos, videos, and creative material uploaded by sellers and unlocked by Cosellers. Aligned promotion at internet scale.
        </Text>
      </View>
      
      <Image 
        source={{ uri: "https://picsum.photos/800/400?random=assets-hero" }}
        style={styles.assetsHeroImage}
        resizeMode="cover"
      />
      
      <View style={styles.assetsDescSection}>
        <Text style={styles.assetsDescTitle}>Your sales materials, your way</Text>
        <Text style={styles.assetsDescText}>
          Every listing includes a dedicated sales assets section: a space to
          upload the logos, videos, and creative tools that help your product
          sell.
        </Text>
        <Text style={styles.assetsDescText}>
          Sellers upload. Cosellers get access the moment they create a
          contract.
        </Text>
        <Text style={styles.assetsDescText}>
          The result is aligned promotion and wider reach from day one.
        </Text>
      </View>
      
      <View style={styles.assetsGrid}>
        <AssetCard
          title="Logos, Marks, Tags..."
          description="The scroll stops when you stand out. Upload clean logos, badges, and marks Cosellers can drop into any format. Whether you're selling or Coselling, identity matters."
          thumbnail="assets-001"
        />
        <AssetCard
          title="Films, Ads, Interviews..."
          description="Let the story do the selling. Trailers, interviews, edits, and reels. Built by Sellers or remixable by Cosellers. The better the content, the further it travels."
          thumbnail="assets-002"
        />
        <AssetCard
          title="Photos, Text, Documentation..."
          description="Everything needed to list, describe, and post. Product shots. Specs. Descriptions. Quotes. Clear tools for anyone helping push the product forward."
          thumbnail="assets-003"
        />
      </View>
    </View>
  );
}

function AssetCard({ title, description, thumbnail }: { title: string; description: string; thumbnail: string }) {
  return (
    <View style={styles.assetCard}>
      <Image 
        source={{ uri: `https://picsum.photos/400/250?random=${thumbnail}` }}
        style={styles.assetCardImage}
        resizeMode="cover"
      />
      <Text style={styles.assetCardTitle}>{title}</Text>
      <Text style={styles.assetCardDescription}>{description}</Text>
    </View>
  );
}
function BackedNetwork() {
  return (
    <View style={styles.networkSection}>
      <View style={styles.networkContent}>
        <Text style={styles.networkTitle}>
          Backed by the leading Networks.
        </Text>
        <Text style={styles.networkDescription}>
          Built on Base, an Ethereum Layer 2 and leading network for onchain
          innovation. For Crypto supports secure, scalable distributions
          with more integrations soon.
        </Text>
        <View style={styles.networkLogos}>
          <Image 
            source={{ uri: "https://cryptologos.cc/logos/ethereum-eth-logo.png" }}
            style={styles.networkLogo}
            resizeMode="contain"
          />
          <Image 
            source={{ uri: "https://cryptologos.cc/logos/base-base-logo.png" }}
            style={styles.networkLogo}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.networkCTA}>
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
    <View style={styles.faqSection}>
      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      <Text style={styles.faqSubtitle}>Everything you need to know about For Crypto.</Text>
      <Text style={styles.faqSubtitle}>And if you have an idea, feedback, or want to request a feature, let us know.</Text>
      
      <Pressable style={styles.feedbackButton}>
        <Text style={styles.feedbackButtonText}>Feedback</Text>
      </Pressable>
      
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
                color="#ffffff"
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
  container: { 
    flex: 1, 
    backgroundColor: "#FFFDFC" 
  },
  content: { 
    paddingBottom: 40 
  },

  // Hero - matching web app exactly
  hero: { 
    paddingVertical: 40, 
    backgroundColor: "#FFFDFC" 
  },
  heroContent: {
    maxWidth: 768,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  heroTitle: { 
    fontSize: 30, 
    fontWeight: "500", 
    textAlign: "center", 
    color: "#000", 
    lineHeight: 38,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#737373",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 16,
    marginBottom: 32,
    maxWidth: 600,
  },
  heroButtons: { 
    flexDirection: "row", 
    gap: 16, 
    width: "100%", 
    maxWidth: 320 
  },
  buttonOutline: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#e5e5e5", 
    paddingVertical: 14, 
    borderRadius: 6, 
    alignItems: "center" 
  },
  buttonOutlineText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#000" 
  },
  buttonFilled: { 
    flex: 1, 
    backgroundColor: "#000", 
    paddingVertical: 14, 
    borderRadius: 6, 
    alignItems: "center" 
  },
  buttonFilledText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#fff" 
  },

  // Carousel - matching web app
  carouselSection: { 
    marginTop: 40, 
    width: "100%" 
  },
  carouselContainer: { 
    paddingHorizontal: 24 
  },
  slide: {
    backgroundColor: "#fff",
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
  exampleLabelText: { 
    fontSize: 12, 
    color: "#fff", 
    fontWeight: "500" 
  },
  slideImage: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
  slideFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#e5e5e5",
  },
  cosellInfo: { 
    flex: 1, 
    alignItems: "center" 
  },
  cosellTitle: { 
    fontSize: 14, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 4,
  },
  cosellCommission: { 
    fontSize: 12, 
    color: "#737373",
  },
  divider: { 
    width: 1, 
    height: 44, 
    backgroundColor: "#a3a3a3",
  },
  becomeCoseller: { 
    flex: 1, 
    alignItems: "center" 
  },
  becomeCosellerText: { 
    fontSize: 12, 
    fontWeight: "500", 
    color: "#000" 
  },
  buyButton: { 
    backgroundColor: "#000", 
    paddingVertical: 14, 
    alignItems: "center" 
  },
  buyButtonText: { 
    fontSize: 18, 
    fontWeight: "500", 
    color: "#fff" 
  },
  priceSection: { 
    paddingVertical: 12, 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#e5e5e5" 
  },
  price: { 
    fontSize: 16, 
    color: "#000" 
  },
  slideContent: { 
    padding: 24, 
    alignItems: "center" 
  },
  slideTitle: { 
    fontSize: 20, 
    fontWeight: "500", 
    color: "#000", 
    textAlign: "center", 
    marginBottom: 8, 
    lineHeight: 26 
  },
  slideDescription: { 
    fontSize: 16, 
    color: "#737373", 
    textAlign: "center", 
    lineHeight: 24,
    maxWidth: 600,
  },
  dotContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    gap: 10, 
    marginTop: 16 
  },
  dot: { 
    width: 14, 
    height: 14, 
    borderRadius: 7 
  },

  // Sections
  section: { 
    paddingHorizontal: 16,
    paddingVertical: 40 
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: { 
    fontSize: 32, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 8 
  },
  sectionSubtitle: { 
    fontSize: 32, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 12,
    lineHeight: 38,
  },
  sectionDescription: { 
    fontSize: 18, 
    color: "#737373", 
    lineHeight: 26, 
    marginBottom: 20,
    maxWidth: 600,
  },

  // Why Section
  whyCardsGrid: { 
    gap: 20,
  },
  whyCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    padding: 24,
    marginBottom: 16,
  },
  whyCardVideo: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 16,
    borderRadius: 8,
  },
  whyCardTitle: { 
    fontSize: 20, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 6 
  },
  whyCardDescription: { 
    fontSize: 16, 
    color: "#737373", 
    lineHeight: 24,
    maxWidth: 600,
  },

  // How Section
  howSection: {
    backgroundColor: "#FFFDFC",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  howCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    overflow: "hidden",
  },
  howCardContent: { 
    padding: 32, 
    alignItems: "center" 
  },
  howCardTitle: { 
    fontSize: 24, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 24, 
    textAlign: "center" 
  },
  stepsContainer: { 
    gap: 16 
  },
  stepText: { 
    fontSize: 18, 
    color: "#000", 
    lineHeight: 26, 
    textAlign: "center" 
  },
  howIllustration: { 
    padding: 16, 
    alignItems: "center" 
  },
  howIllustrationImage: { 
    width: "100%",
    aspectRatio: 1,
    maxWidth: 400,
  },

  // Cosell Section
  cosellSection: { 
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  cosellGrid: {
    gap: 16,
  },
  cosellVideoCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    padding: 24 
  },
  cosellVideo: { 
    width: "100%", 
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  cosellTextCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    padding: 24,
    alignItems: "center", 
    justifyContent: "center" 
  },
  cosellPoints: {
    marginBottom: 32,
  },
  cosellPointText: { 
    fontSize: 18, 
    color: "#000", 
    textAlign: "center", 
    marginBottom: 8, 
    lineHeight: 26 
  },
  cosellButton: { 
    paddingVertical: 16, 
    paddingHorizontal: 32, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#000",
    backgroundColor: "transparent",
  },
  cosellButtonText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#000" 
  },
  cosellBigCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    padding: 24, 
    alignItems: "center",
    marginTop: 16,
  },
  cosellHeroImage: { 
    width: "100%", 
    height: 200, 
    marginBottom: 32,
    borderRadius: 8,
  },
  cosellHeroTitle: { 
    fontSize: 28, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 8, 
    textAlign: "center" 
  },
  cosellHeroDescription: { 
    fontSize: 18, 
    color: "#737373", 
    textAlign: "center", 
    lineHeight: 26,
    maxWidth: 600,
  },

  // Assets Section
  assetsHeroImage: { 
    width: "100%", 
    height: 200, 
    marginVertical: 32,
    borderRadius: 8,
  },
  assetsDescSection: { 
    marginBottom: 32 
  },
  assetsDescTitle: { 
    fontSize: 28, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 16,
    lineHeight: 34,
  },
  assetsDescText: { 
    fontSize: 18, 
    color: "#737373", 
    lineHeight: 26, 
    marginBottom: 12,
    maxWidth: 600,
  },
  assetsGrid: { 
    gap: 24 
  },
  assetCard: { 
    backgroundColor: "#f5f5f5", 
    borderRadius: 12, 
    padding: 24 
  },
  assetCardImage: { 
    width: "100%", 
    height: 120, 
    borderRadius: 8, 
    marginBottom: 16 
  },
  assetCardTitle: { 
    fontSize: 18, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 6 
  },
  assetCardDescription: { 
    fontSize: 16, 
    color: "#737373", 
    lineHeight: 24,
    maxWidth: 600,
  },

  // Network Section
  networkSection: { 
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 16,
    paddingVertical: 40,
    flexDirection: "column",
    gap: 32,
  },
  networkContent: {
    flex: 1,
  },
  networkTitle: { 
    fontSize: 32, 
    fontWeight: "500", 
    color: "#000", 
    marginBottom: 16,
    lineHeight: 38,
  },
  networkDescription: { 
    fontSize: 18, 
    color: "#737373", 
    lineHeight: 26, 
    marginBottom: 32,
    maxWidth: 600,
  },
  networkLogos: { 
    flexDirection: "row", 
    gap: 32, 
    alignItems: "center" 
  },
  networkLogo: { 
    width: 32, 
    height: 32 
  },
  networkCTA: { 
    flexDirection: "row", 
    gap: 16, 
    maxWidth: 320 
  },

  // FAQ Section
  faqSection: { 
    backgroundColor: "#171717",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  faqHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  faqTitle: { 
    fontSize: 32, 
    fontWeight: "500", 
    color: "#fff", 
    marginBottom: 16, 
    textAlign: "center",
    lineHeight: 38,
  },
  faqDescription: { 
    fontSize: 18, 
    color: "#f5f5f5", 
    textAlign: "center", 
    lineHeight: 26, 
    marginBottom: 8,
    maxWidth: 600,
  },
  feedbackButton: { 
    borderWidth: 1, 
    borderColor: "#fff", 
    paddingVertical: 16, 
    paddingHorizontal: 32, 
    borderRadius: 8, 
    marginTop: 32,
  },
  feedbackButtonText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#fff" 
  },
  faqContainer: { 
    gap: 24 
  },
  faqItem: { 
    borderWidth: 1, 
    borderColor: "#737373", 
    borderRadius: 8, 
    overflow: "hidden" 
  },
  faqQuestion: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 16,
  },
  faqQuestionText: { 
    fontSize: 18, 
    fontWeight: "500", 
    color: "#fff", 
    flex: 1, 
    paddingRight: 8 
  },
  faqAnswer: { 
    fontSize: 18, 
    color: "#a3a3a3", 
    lineHeight: 28, 
    padding: 16, 
    paddingTop: 12,
  },
});