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
// Matching web: w-[calc(100vw-32px)] sm:w-[600px] lg:w-[710px]
const SLIDE_WIDTH = SCREEN_WIDTH - 32; // calc(100vw-32px)
const SLIDE_SPACING = 16; // gap-4

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
    <View style={[styles.carouselSlide, { width: SLIDE_WIDTH }]}>
      <View style={styles.carouselBorder}>
        <View style={styles.exampleLabel}>
          <Text style={styles.exampleLabelText}>Example Listing</Text>
        </View>
        
        {/* Placeholder for video/image */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>{slide.thumbnail}</Text>
        </View>
        
        <View style={styles.cosellFooter}>
          <View style={styles.cosellInfoSection}>
            <Text style={styles.cosellTitle}>Cosell For Crypto.</Text>
            <View style={styles.cosellCommissionRow}>
              <Text style={styles.cosellCommissionText}>{slide.commission}% Commission</Text>
              <Text style={styles.cosellInfoIcon}>ⓘ</Text>
            </View>
          </View>
          <View style={styles.cosellDivider} />
          <View style={styles.cosellButtonSection}>
            <Pressable style={styles.cosellButton}>
              <Text style={styles.cosellButtonText}>Become a Coseller</Text>
            </Pressable>
          </View>
        </View>
        
        <Pressable style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </Pressable>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{slide.price} USDC</Text>
        </View>
        
        <View style={styles.contentSection}>
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideDescription} numberOfLines={3}>
            {slide.description}
          </Text>
        </View>

        {/* Gradient overlay at bottom */}
        <View style={styles.gradientOverlay} />
      </View>
    </View>
  );

  return (
    <View style={styles.heroSection}>
      {/* Text content matching web: max-w-3xl mx-auto text-center px-4 */}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>Sell. Cosell. For Crypto.</Text>
        <Text style={styles.heroSubtitle}>
          A crypto market for creators, artists, designers, influencers, and
          more. Instant payments. No banks. No middlemen. Just your wallet
          and the internet.
        </Text>
        <View style={styles.heroButtonsContainer}>
          <Pressable style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </Pressable>
          <Pressable style={styles.sellButton}>
            <Text style={styles.sellButtonText}>Sell</Text>
          </Pressable>
        </View>
      </View>

      {/* Carousel matching web: mt-10 md:mt-20 */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={scrollRef}
          data={slides}
          renderItem={renderSlide}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.carouselFlatList}
        />
        
        {/* Dots matching web: gap-2.5 mt-4 */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === selectedIndex ? "#171717" : "#e5e5e5" }
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

  return (
    <View style={styles.faqsWrapper}>
      <Container>
        <View style={styles.faqsContainer}>
          <View style={styles.faqsHeader}>
            <Text style={styles.faqsTitle}>
              Frequently Asked Questions
            </Text>
            <Text style={styles.faqsSubtitle}>
              Everything you need to know about For Crypto.
            </Text>
            <Text style={styles.faqsSubtitle}>
              And if you have an idea, feedback, or want to request a feature,
              let us know.
            </Text>
            <Pressable style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>Feedback</Text>
            </Pressable>
          </View>
          
          <View style={styles.faqItemsList}>
            <FaqItem
              question="Why For Crypto?"
              expanded={expandedFAQ === 0}
              onToggle={() => setExpandedFAQ(expandedFAQ === 0 ? null : 0)}
            >
              <Text style={styles.faqAnswerText}>
                The creator economy is evolving, but most platforms haven't
                caught up.
              </Text>
              <Text style={styles.faqAnswerText}>Payout delays and legacy systems hold people back.</Text>
              <Text style={styles.faqAnswerText}>
                For Crypto is the first crypto-native marketplace designed for
                wallet-connected commerce.
              </Text>
              <Text style={styles.faqAnswerText}>
                Sell digital. Cosell with anyone. Get paid instantly in crypto.
              </Text>
              <Text style={styles.faqAnswerText}>No middlemen. No waiting. Just create, list, and earn.</Text>
            </FaqItem>
            
            <FaqItem
              question="What is For Crypto?"
              expanded={expandedFAQ === 1}
              onToggle={() => setExpandedFAQ(expandedFAQ === 1 ? null : 1)}
            >
              <Text style={styles.faqAnswerText}>
                For Crypto is a wallet-native marketplace where anyone can list,
                sell, and Cosell anything digital.
              </Text>
              <Text style={styles.faqAnswerText}>
                You can sell solo or invite Cosellers and split earnings
                automatically using smart contracts.
              </Text>
              <Text style={styles.faqAnswerText}>
                Think of it like a traditional sales platform, rebuilt for the
                onchain era.
              </Text>
            </FaqItem>
            
            <FaqItem
              question="What does \"Cosell\" mean?"
              expanded={expandedFAQ === 2}
              onToggle={() => setExpandedFAQ(expandedFAQ === 2 ? null : 2)}
            >
              <Text style={styles.faqAnswerText}>
                Cosell lets anyone earn real crypto by helping sell something
                they believe in.
              </Text>
              <Text style={styles.faqAnswerText}>
                When a seller enables Cosell, they set a public commission rate.
                Anyone can click Cosell, generate a unique link, and start
                earning immediately.
              </Text>
              <Text style={styles.faqAnswerText}>
                The moment you Cosell, a smart contract is created that locks in
                your commission rate for 30 days.
              </Text>
              <Text style={styles.faqAnswerText}>
                Every time someone makes a purchase through your link, you get
                paid instantly and directly to your wallet. No middlemen. No
                payout delays. No waiting period.
              </Text>
            </FaqItem>
            
            <FaqItem
              question="What networks and wallets are supported?"
              expanded={expandedFAQ === 3}
              onToggle={() => setExpandedFAQ(expandedFAQ === 3 ? null : 3)}
            >
              <Text style={styles.faqAnswerText}>
                For Crypto runs on Base, a fast and low-cost Ethereum Layer 2.
                All payments are made in USDC.
              </Text>
              <Text style={styles.faqAnswerText}>You can connect with:</Text>
              <Text style={styles.faqAnswerText}>• Phantom</Text>
              <Text style={styles.faqAnswerText}>• MetaMask</Text>
            </FaqItem>
          </View>
        </View>
      </Container>
    </View>
  );
}

function FaqItem({
  question,
  expanded,
  onToggle,
  children,
}: {
  question: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.faqItem}>
      <Pressable style={styles.faqQuestionButton} onPress={onToggle}>
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#fff"
          style={styles.faqChevron}
        />
      </Pressable>
      {expanded && (
        <View style={styles.faqAnswerContainer}>
          {children}
        </View>
      )}
    </View>
  );
}

function Why() {
  return (
    <Container>
      <View style={styles.whySection}>
        <SectionHeader
          title="Why Crypto?"
          subtitle="It's better in every way."
          description="No waiting for payouts. No platform lock-in. No chargebacks or third-party control. Just direct, wallet-to-wallet commerce that's global, instant, and built for anyone."
        />
        <View style={styles.whyCardsGrid}>
          <WhyCard
            thumbnail="/videos/instant-payouts.mp4"
            title="Instant Payouts"
            description="Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
          />
          <WhyCard
            thumbnail="/videos/self-custody-2.mp4"
            title="Self-Custody"
            description="You own the wallet, you control the money. No platforms holding your funds."
          />
          <WhyCard
            thumbnail="/videos/global.mp4"
            title="Global by Default"
            description="Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
          />
          <WhyCard
            thumbnail="/videos/smart-splits.mp4"
            title="Smart Splits"
            description="Revenue is split automatically between sellers and cosellers. No chasing payments."
          />
        </View>
      </View>
    </Container>
  );
}

function WhyCard({
  thumbnail,
  title,
  description,
}: {
  thumbnail: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.whyCard}>
      <View style={styles.whyCardVideoContainer}>
        <Text style={styles.whyCardVideoPlaceholder}>{thumbnail}</Text>
      </View>
      <Text style={styles.whyCardTitle}>{title}</Text>
      <Text style={styles.whyCardDescription}>{description}</Text>
    </View>
  );
}

// Container component matching web
function Container({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.containerWrapper}>
      {children}
    </View>
  );
}

// SectionHeader component matching web
function SectionHeader({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string | string[];
  description: string;
}) {
  return (
    <View style={styles.sectionHeaderContainer}>
      <View style={styles.sectionHeaderContent}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
        {Array.isArray(subtitle) ? (
          subtitle.map((sub, index) => (
            <Text key={index} style={styles.sectionHeaderSubtitle}>
              {sub}
            </Text>
          ))
        ) : (
          <Text style={styles.sectionHeaderSubtitle}>{subtitle}</Text>
        )}
        <Text style={styles.sectionHeaderDescription}>{description}</Text>
      </View>
      <ButtonsCTA />
    </View>
  );
}

// ButtonsCTA component matching web
function ButtonsCTA() {
  return (
    <View style={styles.buttonsCTA}>
      <Pressable style={styles.learnMoreButton}>
        <Text style={styles.learnMoreText}>Learn More</Text>
      </Pressable>
      <Pressable style={styles.sellButton}>
        <Text style={styles.sellButtonText}>Sell</Text>
      </Pressable>
    </View>
  );
}

function How() {
  return (
    <View style={styles.howWrapper}>
      <Container>
        <View style={styles.howSection}>
          <SectionHeader
            title="How it works."
            subtitle={["Instant transactions.", "No banks. No delays."]}
            description="Simple, secure, and built for the way you create. From wallet connect to payout,
everything happens directly. No signups, no waiting, no middlemen."
          />
          <View style={styles.howCard}>
            <View style={styles.howCardContent}>
              <View style={styles.howCardTextSection}>
                <Text style={styles.howCardTitle}>Getting started is simple</Text>
                <View style={styles.howStepsList}>
                  {howSteps.map((step, index) => (
                    <Text key={index} style={styles.howStepText}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.howIllustrationSection}>
              <View style={styles.howIllustrationPlaceholder}>
                <Text style={styles.howIllustrationText}>/homepage/how.png</Text>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}
function Cosell() {
  return (
    <View style={styles.cosellWrapper}>
      <Container>
        <View style={styles.cosellSection}>
          <SectionHeader
            title="Cosell."
            subtitle="Unlock the Internet."
            description="Cosell is not an affiliate link. It's a contract. A payout. A piece of the upside. It turns attention into income for anyone, anywhere."
          />
          <View style={styles.cosellGrid}>
            <View style={styles.cosellVideoCard}>
              <View style={styles.cosellVideoPlaceholder}>
                <Text style={styles.cosellVideoText}>/videos/cosell.mp4</Text>
              </View>
            </View>
            <View style={styles.cosellTextCard}>
              <View style={styles.cosellPointsContainer}>
                <Text style={styles.cosellPointText}>The seller sets the commission.</Text>
                <Text style={styles.cosellPointText}>A Coseller activates the contract.</Text>
                <Text style={styles.cosellPointText}>Sales are tracked onchain.</Text>
                <Text style={styles.cosellPointText}>Payouts happen instantly.</Text>
              </View>
              <Pressable style={styles.cosellActionButton}>
                <Text style={styles.cosellActionButtonText}>Become a Coseller</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.cosellBigCard}>
            <View style={styles.cosellHeroImageContainer}>
              <Text style={styles.cosellHeroImageText}>/homepage/cosell.png</Text>
            </View>
            <Text style={styles.cosellBigTitle}>No excuse this time.</Text>
            <Text style={styles.cosellBigDescription}>
              If you have a device, you can Cosell For Crypto. Go get it.
              Nothing is stopping you now.
            </Text>
          </View>
        </View>
      </Container>
    </View>
  );
}
function Assets() {
  return (
    <View style={styles.assetsWrapper}>
      <Container>
        <SectionHeader
          title="Sales Assets."
          subtitle="Give Cosellers the tools to sell."
          description="Official photos, videos, and creative material uploaded by sellers and unlocked by Cosellers. Aligned promotion at internet scale."
        />
      </Container>
      
      <View style={styles.assetsHeroImageContainer}>
        <Text style={styles.assetsHeroImageText}>/homepage/assets.png</Text>
      </View>

      <Container>
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
            thumbnail="/homepage/assets-001.png"
          />
          <AssetCard
            title="Films, Ads, Interviews..."
            description="Let the story do the selling. Trailers, interviews, edits, and reels. Built by Sellers or remixable by Cosellers. The better the content, the further it travels."
            thumbnail="/homepage/assets-002.png"
          />
          <AssetCard
            title="Photos, Text, Documentation..."
            description="Everything needed to list, describe, and post. Product shots. Specs. Descriptions. Quotes. Clear tools for anyone helping push the product forward."
            thumbnail="/homepage/assets-003.png"
          />
        </View>
      </Container>
    </View>
  );
}

function AssetCard({
  title,
  description,
  thumbnail,
}: {
  title: string;
  description: string;
  thumbnail: string;
}) {
  return (
    <View style={styles.assetCard}>
      <View style={styles.assetCardImageContainer}>
        <Text style={styles.assetCardImageText}>{thumbnail}</Text>
      </View>
      <Text style={styles.assetCardTitle}>{title}</Text>
      <Text style={styles.assetCardDescription}>{description}</Text>
    </View>
  );
}
function BackedNetwork() {
  return (
    <View style={styles.backedNetworkWrapper}>
      <Container>
        <View style={styles.backedNetworkContainer}>
          <View style={styles.backedNetworkContent}>
            <Text style={styles.backedNetworkTitle}>
              Backed by the leading Networks.
            </Text>
            <Text style={styles.backedNetworkDescription}>
              Built on Base, an Ethereum Layer 2 and leading network for onchain
              innovation. For Crypto supports secure, scalable distributions
              with more integrations soon.
            </Text>
            <View style={styles.backedNetworkLogos}>
              <View style={styles.backedNetworkLogo}>
                <Text style={styles.backedNetworkLogoText}>ETH</Text>
              </View>
              <View style={styles.backedNetworkLogo}>
                <Text style={styles.backedNetworkLogoText}>BASE</Text>
              </View>
            </View>
          </View>
          <ButtonsCTA />
        </View>
      </Container>
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

  // Hero Section - matching web: py-10 md:py-20 bg-[#FFFDFC] overflow-x-hidden
  heroSection: {
    paddingTop: 40,
    paddingBottom: 80,
    backgroundColor: "#FFFDFC",
  },

  // Hero Text Container - matching web: max-w-3xl mx-auto text-center px-4
  heroTextContainer: {
    maxWidth: 768, // max-w-3xl
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 16, // px-4
  },

  // Hero Title - matching web: text-3xl md:text-5xl max-w-2xl mx-auto font-medium mb-3 text-balance leading-[1.2]
  heroTitle: {
    fontSize: 36, // text-3xl (mobile), will be larger on tablet
    fontWeight: "500", // font-medium
    textAlign: "center",
    color: "#000",
    lineHeight: 43, // leading-[1.2] = fontSize * 1.2
    marginBottom: 12, // mb-3
    maxWidth: 672, // max-w-2xl
  },

  // Hero Subtitle - matching web: text-lg md:text-xl text-neutral-500 mb-8 leading-[1.6] px-4 md:px-0
  heroSubtitle: {
    fontSize: 18, // text-lg
    color: "#737373", // text-neutral-500
    textAlign: "center",
    lineHeight: 29, // leading-[1.6] = fontSize * 1.6
    marginBottom: 32, // mb-8
    paddingHorizontal: 16, // px-4 (mobile)
  },

  // Hero Buttons - matching web: flex flex-col sm:grid sm:grid-cols-2 gap-4 max-w-lg mx-auto px-4
  heroButtonsContainer: {
    flexDirection: "row", // grid on web, but row works for mobile
    gap: 16, // gap-4
    maxWidth: 512, // max-w-lg
    width: "100%",
    paddingHorizontal: 16, // px-4
  },

  // Learn More Button - matching web: Button variant="outline"
  learnMoreButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  // Sell Button - matching web: Button (default)
  sellButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  sellButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },

  // Carousel Wrapper - matching web: relative mt-10 md:mt-20 overflow-hidden
  carouselWrapper: {
    position: "relative",
    marginTop: 40, // mt-10 (mobile), md:mt-20 would be 80 on tablet
  },

  // Carousel FlatList - matching web: flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 hide-scrollbar
  carouselFlatList: {
    paddingBottom: 16, // pb-4
  },
  carouselContent: {
    paddingHorizontal: 16, // px-4
    gap: 16, // gap-4
  },

  // Carousel Slide - matching web: carousel-slide flex-shrink-0 w-[calc(100vw-32px)] sm:w-[600px] lg:w-[710px] relative
  carouselSlide: {
    marginRight: 16, // gap-4 spacing
  },

  // Carousel Border - matching web: border relative
  carouselBorder: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    position: "relative",
  },

  // Example Label - matching web: absolute top-3 left-3 z-10 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded
  exampleLabel: {
    position: "absolute",
    top: 12, // top-3
    left: 12, // left-3
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)", // bg-black/70
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
    borderRadius: 4,
  },
  exampleLabelText: {
    fontSize: 12, // text-xs
    color: "#fff", // text-white
    fontWeight: "500", // font-medium
  },

  // Video Placeholder - matching web: aspect-[16/9] object-cover w-full
  videoPlaceholder: {
    aspectRatio: 16 / 9,
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  videoText: {
    fontSize: 12,
    color: "#737373",
  },

  // Cosell Footer - matching web: p-3 md:p-4 bg-neutral-200 flex items-center
  cosellFooter: {
    padding: 12, // p-3 (mobile)
    backgroundColor: "#e5e5e5", // bg-neutral-200
    flexDirection: "row",
    alignItems: "center",
  },

  // Cosell Info Section - matching web: flex-1 justify-center
  cosellInfoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellTitle: {
    fontSize: 14, // text-sm (mobile), md:text-base would be 16
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 4, // mb-1
    textAlign: "center",
  },
  cosellCommissionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6, // gap-1.5
  },
  cosellCommissionText: {
    fontSize: 12, // text-xs (mobile), md:text-sm would be 14
    fontWeight: "500", // font-medium
    color: "#525252", // text-neutral-600
  },
  cosellInfoIcon: {
    fontSize: 12,
    color: "#525252",
  },

  // Cosell Divider - matching web: w-0.25 bg-neutral-300 h-11
  cosellDivider: {
    width: 1, // w-0.25 = 1px
    height: 44, // h-11
    backgroundColor: "#d1d5db", // bg-neutral-300
  },

  // Cosell Button Section - matching web: flex-1 flex items-center justify-center
  cosellButtonSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellButton: {
    // Button variant="outline" with size="sm"
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cosellButtonText: {
    fontSize: 12, // text-xs (mobile), md:text-sm would be 14
    fontWeight: "500",
    color: "#000",
  },

  // Buy Now Button - matching web: w-full rounded-none text-base md:text-lg pointer-events-none variant="foreground"
  buyNowButton: {
    width: "100%",
    backgroundColor: "#000", // variant="foreground"
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 0, // rounded-none
  },
  buyNowText: {
    fontSize: 16, // text-base (mobile), md:text-lg would be 18
    fontWeight: "500",
    color: "#fff",
  },

  // Price Row - matching web: border-b p-3 md:p-4 text-center text-sm md:text-base
  priceRow: {
    borderBottomWidth: 1, // border-b
    borderBottomColor: "#e5e5e5",
    padding: 12, // p-3 (mobile)
    alignItems: "center", // text-center
  },
  priceText: {
    fontSize: 14, // text-sm (mobile), md:text-base would be 16
    color: "#000",
  },

  // Content Section - matching web: p-4 md:p-6 text-center
  contentSection: {
    padding: 16, // p-4 (mobile)
    alignItems: "center", // text-center
  },
  slideTitle: {
    fontSize: 20, // text-2xl (mobile), md:text-3xl would be 30
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 8, // mb-2
    textAlign: "center",
    // line-clamp-2 - we'll use numberOfLines in React Native
  },
  slideDescription: {
    fontSize: 16, // text-base (mobile), md:text-xl would be 20
    color: "#737373", // text-neutral-500
    textAlign: "center",
    lineHeight: 24, // leading-[1.6] for 16px = 25.6, rounded to 24
    maxWidth: 512, // max-w-2xl approximation
    // line-clamp-3 sm:line-clamp-none - we'll use numberOfLines conditionally
  },

  // Gradient Overlay - matching web: absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-background to-transparent
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%", // h-1/5
    // React Native doesn't have CSS gradients, we could use a library or just omit this
  },

  // Dots Container - matching web: flex items-center justify-center gap-2.5 mt-4
  dotsContainer: {
    flexDirection: "row", // flex
    alignItems: "center", // items-center
    justifyContent: "center", // justify-center
    gap: 10, // gap-2.5 = 10px
    marginTop: 16, // mt-4
  },

  // Dot - matching web: size-3.5 bg-muted rounded-full cursor-pointer hover:opacity-80 transition-opacity
  dot: {
    width: 14, // size-3.5 = 14px
    height: 14,
    borderRadius: 7, // rounded-full
    // backgroundColor set dynamically
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

  // Container - matching web: max-w-[1200px] w-full mx-auto px-4 md:px-8 lg:px-16
  containerWrapper: {
    maxWidth: 1200, // max-w-[1200px]
    width: "100%", // w-full
    alignSelf: "center", // mx-auto
    paddingHorizontal: 16, // px-4 (mobile), md:px-8, lg:px-16 for larger screens
  },

  // Why Section - matching web: my-10 md:my-20
  whySection: {
    marginVertical: 40, // my-10 (mobile), md:my-20 would be 80
  },

  // Section Header Container - matching web: flex flex-col lg:flex-row gap-8 md:gap-16 justify-between mb-8 md:mb-14
  sectionHeaderContainer: {
    flexDirection: "column", // flex-col (mobile), lg:flex-row for large screens
    gap: 32, // gap-8 (mobile), md:gap-16 would be 64
    justifyContent: "space-between",
    marginBottom: 32, // mb-8 (mobile), md:mb-14 would be 56
  },

  // Section Header Content
  sectionHeaderContent: {
    flex: 1,
  },

  // Section Header Title - matching web: text-3xl md:text-4xl font-medium mb-2
  sectionHeaderTitle: {
    fontSize: 30, // text-3xl (mobile), md:text-4xl would be 36
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 8, // mb-2
  },

  // Section Header Subtitle - matching web: text-3xl md:text-4xl font-medium mb-2.5 md:mb-2.5 text-balance
  sectionHeaderSubtitle: {
    fontSize: 30, // text-3xl (mobile), md:text-4xl would be 36
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 10, // mb-2.5
    lineHeight: 36, // text-balance approximation
  },

  // Section Header Description - matching web: text-lg md:text-xl text-neutral-500 max-w-prose leading-[1.6] text-balance
  sectionHeaderDescription: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#737373", // text-neutral-500
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    maxWidth: 600, // max-w-prose approximation
  },

  // Why Cards Grid - matching web: grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10
  whyCardsGrid: {
    gap: 24, // gap-6 (mobile), md:gap-10 would be 40
  },

  // Why Card - matching web: bg-neutral-100 rounded-xl p-6 md:p-8
  whyCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6 (mobile), md:p-8 would be 32
    marginBottom: 16,
  },

  // Why Card Video Container - matching web: w-full aspect-[16/9] object-cover mb-6 md:mb-8
  whyCardVideoContainer: {
    width: "100%", // w-full
    aspectRatio: 16 / 9, // aspect-[16/9]
    backgroundColor: "#e5e5e5", // placeholder background
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24, // mb-6 (mobile), md:mb-8 would be 32
    borderRadius: 8,
  },
  whyCardVideoPlaceholder: {
    fontSize: 12,
    color: "#737373",
  },

  // Why Card Title - matching web: text-2xl md:text-2xl font-medium mb-1.5
  whyCardTitle: {
    fontSize: 20, // text-2xl (mobile)
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 6, // mb-1.5
  },

  // Why Card Description - matching web: text-neutral-500 max-w-prose leading-[1.6] text-lg md:text-lg text-balance
  whyCardDescription: {
    fontSize: 18, // text-lg
    color: "#737373", // text-neutral-500
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    maxWidth: 600, // max-w-prose approximation
  },

  // Buttons CTA - matching web: flex-shrink-0 flex flex-col sm:grid sm:grid-cols-2 gap-4 max-w-lg w-full mr-auto lg:mx-auto
  buttonsCTA: {
    flexDirection: "row", // sm:grid sm:grid-cols-2 approximated as row
    gap: 16, // gap-4
    maxWidth: 512, // max-w-lg
    width: "100%",
    alignSelf: "flex-start", // mr-auto (mobile), lg:mx-auto would center on large screens
  },

  // How Wrapper - matching web: bg-[#FFFDFC]
  howWrapper: {
    backgroundColor: "#FFFDFC", // bg-[#FFFDFC]
  },

  // How Section - matching web: py-10 md:py-20
  howSection: {
    paddingVertical: 40, // py-10 (mobile), md:py-20 would be 80
  },

  // How Card - matching web: flex flex-col lg:flex-row bg-neutral-100 rounded-xl
  howCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    flexDirection: "column", // flex-col (mobile), lg:flex-row for large screens
    overflow: "hidden",
  },

  // How Card Content - matching web: flex-1 text-center flex flex-col justify-center items-center pt-10 lg:pt-0 lg:items-end lg:pr-32 max-w-3xl px-4 lg:px-0
  howCardContent: {
    flex: 1, // flex-1
    alignItems: "center", // items-center (mobile)
    justifyContent: "center", // justify-center
    paddingTop: 40, // pt-10 (mobile), lg:pt-0 would be 0 on large screens
    maxWidth: 768, // max-w-3xl
    paddingHorizontal: 16, // px-4 (mobile), lg:px-0 would be 0 on large screens
  },

  // How Card Text Section - matching web: flex flex-col items-center justify-center
  howCardTextSection: {
    alignItems: "center", // items-center
    justifyContent: "center", // justify-center
  },

  // How Card Title - matching web: text-2xl md:text-3xl font-medium mb-6 md:mb-4
  howCardTitle: {
    fontSize: 24, // text-2xl (mobile), md:text-3xl would be 30
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 24, // mb-6 (mobile), md:mb-4 would be 16
    textAlign: "center",
  },

  // How Steps List - matching web: space-y-4 md:space-y-4
  howStepsList: {
    gap: 16, // space-y-4
  },

  // How Step Text - matching web: text-lg md:text-xl
  howStepText: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#000",
    lineHeight: 29, // approximation
    textAlign: "center",
  },

  // How Illustration Section - matching web: flex-1 flex items-center lg:items-end justify-center p-4 pr-0 lg:p-0
  howIllustrationSection: {
    flex: 1, // flex-1
    alignItems: "center", // items-center (mobile), lg:items-end for large screens
    justifyContent: "center", // justify-center
    padding: 16, // p-4 (mobile), lg:p-0 would be 0
    paddingRight: 0, // pr-0
  },

  // How Illustration Placeholder - matching web: aspect-square object-contain max-w-full
  howIllustrationPlaceholder: {
    aspectRatio: 1, // aspect-square
    width: "100%", // max-w-full
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  howIllustrationText: {
    fontSize: 12,
    color: "#737373",
  },

  // Cosell Wrapper - matching web: bg-neutral-200
  cosellWrapper: {
    backgroundColor: "#e5e5e5", // bg-neutral-200
  },

  // Cosell Section - matching web: my-10 md:my-20
  cosellSection: {
    marginVertical: 40, // my-10 (mobile), md:my-20 would be 80
  },

  // Cosell Grid - matching web: grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16
  cosellGrid: {
    gap: 24, // gap-6 (mobile), md:gap-10 would be 40
    marginBottom: 40, // mb-10 (mobile), md:mb-16 would be 64
  },

  // Cosell Video Card - matching web: bg-neutral-100 rounded-xl p-6 md:p-8
  cosellVideoCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6 (mobile), md:p-8 would be 32
  },

  // Cosell Video Placeholder - matching web: w-full aspect-[16/9]
  cosellVideoPlaceholder: {
    width: "100%", // w-full
    aspectRatio: 16 / 9, // aspect-[16/9]
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cosellVideoText: {
    fontSize: 12,
    color: "#737373",
  },

  // Cosell Text Card - matching web: bg-neutral-100 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center
  cosellTextCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6 (mobile), md:p-8 would be 32
    alignItems: "center", // items-center
    justifyContent: "center", // justify-center
  },

  // Cosell Points Container - matching web: space-y-2 text-center mb-8 text-lg md:text-xl
  cosellPointsContainer: {
    gap: 8, // space-y-2
    alignItems: "center", // text-center
    marginBottom: 32, // mb-8
  },

  // Cosell Point Text - matching web: text-lg md:text-xl
  cosellPointText: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#000",
    textAlign: "center",
  },

  // Cosell Action Button - matching web: Button variant="outline" className="border-none px-8"
  cosellActionButton: {
    borderWidth: 1,
    borderColor: "transparent", // border-none
    paddingHorizontal: 32, // px-8
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  cosellActionButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  // Cosell Big Card - matching web: bg-neutral-100 rounded-xl p-6 md:p-8 text-center
  cosellBigCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6 (mobile), md:p-8 would be 32
    alignItems: "center", // text-center
  },

  // Cosell Hero Image Container - matching web: w-full max-w-[1440px] mx-auto object-contain mb-8 md:mb-18
  cosellHeroImageContainer: {
    width: "100%", // w-full
    maxWidth: 1440, // max-w-[1440px]
    alignSelf: "center", // mx-auto
    height: 200, // approximate
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32, // mb-8 (mobile), md:mb-18 would be 72
    borderRadius: 8,
  },
  cosellHeroImageText: {
    fontSize: 12,
    color: "#737373",
  },

  // Cosell Big Title - matching web: text-2xl md:text-3xl font-medium mb-2
  cosellBigTitle: {
    fontSize: 24, // text-2xl (mobile), md:text-3xl would be 30
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 8, // mb-2
    textAlign: "center",
  },

  // Cosell Big Description - matching web: text-lg md:text-xl leading-[1.6] text-balance text-neutral-500
  cosellBigDescription: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#737373", // text-neutral-500
    textAlign: "center",
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    maxWidth: 600, // text-balance approximation
  },

  // Assets Wrapper - matching web: my-10 md:my-20
  assetsWrapper: {
    marginVertical: 40, // my-10 (mobile), md:my-20 would be 80
  },

  // Assets Hero Image Container - matching web: w-full (no container wrapper)
  assetsHeroImageContainer: {
    width: "100%", // w-full
    height: 200,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  assetsHeroImageText: {
    fontSize: 12,
    color: "#737373",
  },

  // Assets Desc Section - matching web: my-8 md:my-16 text-lg md:text-xl max-w-prose leading-[1.6] text-balance text-neutral-500
  assetsDescSection: {
    marginVertical: 32, // my-8 (mobile), md:my-16 would be 64
  },

  // Assets Desc Title - matching web: text-2xl md:text-3xl text-foreground font-medium md:mb-2.5
  assetsDescTitle: {
    fontSize: 24, // text-2xl (mobile), md:text-3xl would be 30
    color: "#000", // text-foreground
    fontWeight: "500", // font-medium
    marginBottom: 10, // md:mb-2.5
    lineHeight: 29,
  },

  // Assets Desc Text - matching web: text-lg md:text-xl leading-[1.6] text-balance text-neutral-500 mb-6 md:mb-5
  assetsDescText: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#737373", // text-neutral-500
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    marginBottom: 20, // mb-6 (mobile), md:mb-5 would be 20
    maxWidth: 600, // max-w-prose approximation
  },

  // Assets Grid - matching web: grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10
  assetsGrid: {
    gap: 24, // gap-6 (mobile), md:gap-10 would be 40
  },

  // Asset Card - matching web: bg-neutral-100 rounded-xl p-6 md:p-8
  assetCard: {
    backgroundColor: "#f5f5f5", // bg-neutral-100
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6 (mobile), md:p-8 would be 32
  },

  // Asset Card Image Container - matching web: mb-6 md:mb-8 w-full
  assetCardImageContainer: {
    width: "100%", // w-full
    height: 120,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24, // mb-6 (mobile), md:mb-8 would be 32
    borderRadius: 8,
  },
  assetCardImageText: {
    fontSize: 12,
    color: "#737373",
  },

  // Asset Card Title - matching web: text-xl md:text-xl font-medium mb-1.5
  assetCardTitle: {
    fontSize: 18, // text-xl
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 6, // mb-1.5
  },

  // Asset Card Description - matching web: text-lg md:text-lg leading-[1.6] text-balance text-neutral-500
  assetCardDescription: {
    fontSize: 18, // text-lg
    color: "#737373", // text-neutral-500
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    maxWidth: 600, // text-balance approximation
  },

  // Backed Network Wrapper - matching web: py-10 md:py-20 bg-neutral-200
  backedNetworkWrapper: {
    paddingVertical: 40, // py-10 (mobile), md:py-20 would be 80
    backgroundColor: "#e5e5e5", // bg-neutral-200
  },

  // Backed Network Container - matching web: flex flex-col lg:flex-row gap-8 md:gap-16 lg:justify-between
  backedNetworkContainer: {
    flexDirection: "column", // flex-col (mobile), lg:flex-row for large screens
    gap: 32, // gap-8 (mobile), md:gap-16 would be 64
    justifyContent: "space-between", // lg:justify-between
  },

  // Backed Network Content - matching web: flex-1
  backedNetworkContent: {
    flex: 1, // flex-1
  },

  // Backed Network Title - matching web: text-3xl md:text-4xl font-medium mb-2.5 md:mb-2.5
  backedNetworkTitle: {
    fontSize: 30, // text-3xl (mobile), md:text-4xl would be 36
    fontWeight: "500", // font-medium
    color: "#000",
    marginBottom: 10, // mb-2.5
    lineHeight: 36,
  },

  // Backed Network Description - matching web: text-lg md:text-xl text-neutral-500 max-w-4xl leading-[1.6] text-balance mb-6 md:mb-8
  backedNetworkDescription: {
    fontSize: 18, // text-lg (mobile), md:text-xl would be 20
    color: "#737373", // text-neutral-500
    lineHeight: 29, // leading-[1.6] = 18 * 1.6
    maxWidth: 896, // max-w-4xl
    marginBottom: 24, // mb-6 (mobile), md:mb-8 would be 32
  },

  // Backed Network Logos - matching web: flex gap-4 md:gap-8 [&>img]:size-6 md:[&>img]:size-8 [&>img]:object-contain
  backedNetworkLogos: {
    flexDirection: "row", // flex
    gap: 16, // gap-4 (mobile), md:gap-8 would be 32
    alignItems: "center",
  },

  // Backed Network Logo - matching web: size-6 md:size-8 object-contain
  backedNetworkLogo: {
    width: 24, // size-6 (mobile), md:size-8 would be 32
    height: 24,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  backedNetworkLogoText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#737373",
  },

  // FAQs Wrapper - matching web: py-10 md:py-20 bg-neutral-950 text-white
  faqsWrapper: {
    paddingVertical: 40, // py-10 (mobile), md:py-20 would be 80
    backgroundColor: "#0a0a0a", // bg-neutral-950
  },

  // FAQs Container - matching web: max-w-5xl mx-auto w-full
  faqsContainer: {
    maxWidth: 1024, // max-w-5xl
    alignSelf: "center", // mx-auto
    width: "100%", // w-full
  },

  // FAQs Header - matching web: text-center text-lg md:text-xl leading-[1.6] max-w-3xl mx-auto mb-10 md:mb-20
  faqsHeader: {
    alignItems: "center", // text-center
    maxWidth: 768, // max-w-3xl
    alignSelf: "center", // mx-auto
    marginBottom: 40, // mb-10 (mobile), md:mb-20 would be 80
  },

  // FAQs Title - matching web: text-3xl md:text-4xl font-medium mb-4 md:mb-2.5
  faqsTitle: {
    fontSize: 30, // text-3xl (mobile), md:text-4xl would be 36
    fontWeight: "500", // font-medium
    color: "#fff", // text-white
    marginBottom: 16, // mb-4 (mobile), md:mb-2.5 would be 10
    textAlign: "center",
    lineHeight: 36,
  },

  // FAQs Subtitle - matching web: text-neutral-100 mb-6 md:mb-10
  faqsSubtitle: {
    fontSize: 18, // text-lg md:text-xl
    color: "#f5f5f5", // text-neutral-100
    textAlign: "center",
    lineHeight: 29, // leading-[1.6]
    marginBottom: 8,
    maxWidth: 768,
  },

  // Feedback Button - matching web: Button variant="ghost" className="text-white border-white w-full max-w-3xs"
  feedbackButton: {
    borderWidth: 1,
    borderColor: "#fff", // border-white
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "transparent", // variant="ghost"
    marginTop: 32,
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff", // text-white
  },

  // FAQ Items List - matching web: space-y-6 md:space-y-8
  faqItemsList: {
    gap: 24, // space-y-6 (mobile), md:space-y-8 would be 32
  },

  // FAQ Item - matching web: border border-neutral-500 rounded-md px-4 md:px-8 py-6 cursor-pointer hover:border-white transition-colors
  faqItem: {
    borderWidth: 1,
    borderColor: "#737373", // border-neutral-500
    borderRadius: 6, // rounded-md
    overflow: "hidden",
  },

  // FAQ Question Button - matching web: text-xl md:text-xl font-medium flex items-center justify-between
  faqQuestionButton: {
    flexDirection: "row", // flex
    alignItems: "center", // items-center
    justifyContent: "space-between", // justify-between
    padding: 16, // px-4 md:px-8 py-6 (simplified for mobile)
  },

  // FAQ Question Text - matching web: text-xl md:text-xl font-medium
  faqQuestionText: {
    fontSize: 18, // text-xl
    fontWeight: "500", // font-medium
    color: "#fff", // text-white
    flex: 1,
    paddingRight: 8,
  },

  // FAQ Chevron - matching web: size-5 md:size-6 transition-transform stroke-1
  faqChevron: {
    // Chevron styling handled by Ionicons
  },

  // FAQ Answer Container - matching web: expander expanded
  faqAnswerContainer: {
    padding: 16, // pt-3 md:pt-3
  },

  // FAQ Answer Text - matching web: text-lg md:text-xl leading-[1.7] text-balance text-neutral-300
  faqAnswerText: {
    fontSize: 18, // text-lg md:text-xl
    color: "#d1d5db", // text-neutral-300
    lineHeight: 31, // leading-[1.7] = 18 * 1.7
    marginBottom: 8,
  },
});