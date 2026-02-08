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
const SLIDE_WIDTH = SCREEN_WIDTH - 32;
const SLIDE_SPACING = 16;

const IMG = "https://forcrypto.fun";

const slides = [
  {
    thumbnail: `${IMG}/homepage/product-001.gif`,
    title: "No School 4 Week Bootcamp.",
    description:
      "A 5-step video-based mindset reset for anyone building instead of waiting for permission. Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook,",
    commission: 10,
    price: 875,
  },
  {
    thumbnail: `${IMG}/homepage/product-002.gif`,
    title: "Together Daily Spark.",
    description:
      "A daily drop of connection for couples who want to stay close, curious, and never bored. Cosell it if you believe love is built in the little moments. Includes daily ideas, prompts, and conversation starters to keep your relationship fresh and meaningful.",
    commission: 20,
    price: 7,
  },
  {
    thumbnail: `${IMG}/homepage/product-003.gif`,
    title: "Community Intake Kit for Divvvy.",
    description:
      "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for upload to Divvvy. Perfect for DAOs, creators, nonprofits, large-scale distributions and more...",
    commission: 20,
    price: 2,
  },
  {
    thumbnail: `${IMG}/homepage/product-004.gif`,
    title: "Designer Gear for Shredders Game.",
    description:
      "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style for your rider. Cosell it if you believe looking good is half the game. Style isn't just cosmetic, it's confidence on...",
    commission: 20,
    price: 50,
  },
  {
    thumbnail: `${IMG}/homepage/hero-001.gif`,
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

const faqData: { question: string; answer: string }[] = [
  {
    question: "Why For Crypto?",
    answer: "The creator economy is evolving, but most platforms haven't caught up. Payout delays and legacy systems hold people back. For Crypto is the first crypto-native marketplace designed for wallet-connected commerce. Sell digital. Cosell with anyone. Get paid instantly in crypto. No middlemen. No waiting. Just create, list, and earn.",
  },
  {
    question: "What is For Crypto?",
    answer: "For Crypto is a wallet-native marketplace where anyone can list, sell, and Cosell anything digital. You can sell solo or invite Cosellers and split earnings automatically using smart contracts. Think of it like a traditional sales platform, rebuilt for the onchain era.",
  },
  {
    question: "Who is For Crypto for?",
    answer: "For Crypto is for creators, builders, sellers, influencers, and anyone who wants to sell digital goods and get paid in crypto. Whether you're an artist selling presets, a developer selling templates, or a coach selling courses — if you want instant payouts and global reach, For Crypto is for you.",
  },
  {
    question: "What can I sell?",
    answer: "Anything digital. Courses, templates, presets, ebooks, guides, software, design assets, music, memberships, services, and more. If it can be delivered digitally, you can sell it on For Crypto.",
  },
  {
    question: 'What does "Cosell" mean?',
    answer: "Cosell lets anyone earn real crypto by helping sell something they believe in. When a seller enables Cosell, they set a public commission rate. Anyone can click Cosell, generate a unique link, and start earning immediately. The moment you Cosell, a smart contract is created that locks in your commission rate for 30 days. Every time someone makes a purchase through your link, you get paid instantly and directly to your wallet. No middlemen. No payout delays. No waiting period.",
  },
  {
    question: "What are Sales Assets?",
    answer: "Sales Assets are official promotional materials — logos, photos, videos, and creative content — uploaded by sellers and unlocked by Cosellers. When you become a Coseller, you get instant access to the seller's approved marketing materials so you can promote effectively and authentically.",
  },
  {
    question: "How does payout work?",
    answer: "Payouts are instant and automatic. The moment a sale is made, the smart contract splits the payment between the seller and coseller (if applicable) and sends funds directly to their wallets. No invoicing. No waiting. No minimum thresholds. You get paid in USDC the second a transaction completes.",
  },
  {
    question: "What networks and wallets are supported?",
    answer: "For Crypto runs on Base, a fast and low-cost Ethereum Layer 2. All payments are made in USDC. Payouts can be received on Base or Solana. You can connect with Phantom or MetaMask.",
  },
  {
    question: "Do I need to be technical?",
    answer: "No. If you can connect a wallet and fill out a form, you can use For Crypto. Listing a product takes minutes. Coselling takes seconds. Everything is designed to be simple, fast, and intuitive — no coding or crypto experience required.",
  },
  {
    question: "How does authentication work?",
    answer: "For Crypto uses wallet-based authentication. There are no emails, passwords, or accounts. You sign in by connecting your wallet. Your wallet is your identity, your login, and your payment method — all in one.",
  },
  {
    question: "What makes For Crypto different from Web2 platforms?",
    answer: "Traditional platforms hold your money, take weeks to pay out, and lock you into their ecosystem. For Crypto is non-custodial — we never hold your funds. Payments go directly from buyer to seller via smart contracts. There are no payout delays, no account freezes, and no platform risk. You own your wallet, you own your money.",
  },
  {
    question: "What makes For Crypto culturally different?",
    answer: "For Crypto isn't a tech company pretending to care about creators. It's built by people who believe the internet should pay people directly. No gatekeepers. No algorithms deciding who wins. Just a level playing field where anyone with a wallet and a product can earn.",
  },
  {
    question: "Can I embed or share my listings?",
    answer: "Yes. Every listing has a shareable link that works anywhere on the internet. You can also use Embed Checkout to embed a buy button directly on your own website, blog, or landing page — so customers can purchase without ever leaving your site.",
  },
  {
    question: "Can I track my sales?",
    answer: "Yes. Your dashboard shows real-time sales data, including total revenue, individual transactions, Coseller performance, and payout history. Everything is also verifiable onchain.",
  },
  {
    question: "Can I make edits after publishing?",
    answer: "Yes. You can update your listing title, description, price, media, and sales assets at any time. Changes take effect immediately. Active Cosell contracts are not affected by listing edits.",
  },
  {
    question: "Is For Crypto non-custodial?",
    answer: "Yes. For Crypto never holds your funds. All payments are processed through smart contracts that route funds directly to wallets. We cannot freeze, withhold, or access your money at any point.",
  },
  {
    question: "Is it safe?",
    answer: "Yes. For Crypto is built on Base, a secure Ethereum Layer 2 network. All transactions are processed through audited smart contracts. Your wallet is your identity — we don't store passwords or sensitive data. You maintain full control of your funds at all times.",
  },
  {
    question: "What about copyright or stolen content?",
    answer: "For Crypto takes intellectual property seriously. If you believe content on the platform infringes your copyright, you can report it and we'll review and take action. Sellers are responsible for ensuring they have the rights to sell what they list.",
  },
  {
    question: "Can I offer refunds?",
    answer: "Refund policies are set by individual sellers. Because payments are processed onchain and are instant, For Crypto does not process refunds directly. Sellers and buyers can arrange refunds independently if needed.",
  },
  {
    question: "How do I get started?",
    answer: "Connect your wallet, create a listing, set your price, upload your content, and hit publish. That's it. Your listing is live and ready to sell. If you want to Cosell instead, just find a listing you like, click Cosell, and share your unique link.",
  },
  {
    question: "How does For Crypto sustain itself?",
    answer: "For Crypto takes a small platform fee on each transaction. The fee structure is transparent: 30% on organic discovery, 10% on the seller's own link, and 10% plus the coseller commission on Cosell sales. These fees are built into the smart contract and deducted automatically.",
  },
  {
    question: "What is the Bot API?",
    answer: "The Bot API lets developers programmatically create listings, manage inventory, and process sales. You can build automated storefronts, integrate with existing tools, or create entirely new commerce experiences — all powered by For Crypto's onchain infrastructure.",
  },
  {
    question: "What is Embed Checkout?",
    answer: "Embed Checkout lets you place a buy button on any website. When a customer clicks it, they can complete the purchase without leaving your site. It's the easiest way to sell crypto-native products from your own platform, blog, or landing page.",
  },
  {
    question: "Have more questions?",
    answer: "We'd love to hear from you. Use the Feedback button above to send us your questions, ideas, or feature requests. We read everything.",
  },
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

  const renderSlide = ({ item: slide, index }: { item: (typeof slides)[0]; index: number }) => (
    <View style={[styles.carouselSlide, { width: SLIDE_WIDTH }]}>
      <View style={styles.carouselBorder}>
        <View style={styles.exampleLabel}>
          <Text style={styles.exampleLabelText}>Example Listing</Text>
        </View>
        
        <Image
          source={{ uri: slide.thumbnail }}
          style={styles.slideImage}
          resizeMode="cover"
        />
        
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
      </View>
    </View>
  );

  return (
    <View style={styles.heroSection}>
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>Sell. Cosell. For Crypto.</Text>
        <Text style={styles.heroSubtitle}>
          The marketplace for creators, builders, bots, and sellers who want
          instant payouts in USDC, a digital dollar that's always worth $1. No
          banks. No middlemen. Just your wallet and the internet.
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
        
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === selectedIndex ? "#e5e5e5" : "#1a1a1a" },
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
            <Text style={styles.faqsTitle}>Frequently Asked Questions</Text>
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
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                expanded={expandedFAQ === index}
                onToggle={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              </FaqItem>
            ))}
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
      {expanded && <View style={styles.faqAnswerContainer}>{children}</View>}
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
            thumbnail={`${IMG}/homepage/why-001.gif`}
            title="Instant Payouts"
            description="Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
          />
          <WhyCard
            thumbnail={`${IMG}/homepage/why-002.gif`}
            title="Self-Custody"
            description="You own the wallet, you control the money. No platforms holding your funds."
          />
          <WhyCard
            thumbnail={`${IMG}/homepage/why-003.gif`}
            title="Global by Default"
            description="Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
          />
          <WhyCard
            thumbnail={`${IMG}/homepage/why-004.gif`}
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
      <Image
        source={{ uri: thumbnail }}
        style={styles.whyCardImage}
        resizeMode="cover"
      />
      <Text style={styles.whyCardTitle}>{title}</Text>
      <Text style={styles.whyCardDescription}>{description}</Text>
    </View>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <View style={styles.containerWrapper}>{children}</View>;
}

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
            description="Simple, secure, and built for the way you create. From wallet connect to payout, everything happens directly. No signups, no waiting, no middlemen."
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
              <Image
                source={{ uri: `${IMG}/homepage/how.png` }}
                style={styles.howImage}
                resizeMode="contain"
              />
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
                <Ionicons name="play-circle-outline" size={48} color="#a3a3a3" />
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
            <Image
              source={{ uri: `${IMG}/homepage/cosell.png` }}
              style={styles.cosellHeroImage}
              resizeMode="contain"
            />
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
      
      <Image
        source={{ uri: `${IMG}/homepage/assets.png` }}
        style={styles.assetsHeroImage}
        resizeMode="cover"
      />

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
            thumbnail={`${IMG}/homepage/assets-001.png`}
          />
          <AssetCard
            title="Films, Ads, Interviews..."
            description="Let the story do the selling. Trailers, interviews, edits, and reels. Built by Sellers or remixable by Cosellers. The better the content, the further it travels."
            thumbnail={`${IMG}/homepage/assets-002.png`}
          />
          <AssetCard
            title="Photos, Text, Documentation..."
            description="Everything needed to list, describe, and post. Product shots. Specs. Descriptions. Quotes. Clear tools for anyone helping push the product forward."
            thumbnail={`${IMG}/homepage/assets-003.png`}
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
      <Image
        source={{ uri: thumbnail }}
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
    <View style={styles.backedNetworkWrapper}>
      <Container>
        <View style={styles.backedNetworkContainer}>
          <View style={styles.backedNetworkContent}>
            <Text style={styles.backedNetworkTitle}>
              Backed by the leading Networks.
            </Text>
            <Text style={styles.backedNetworkDescription}>
              Built on Base, a faster and cheaper network powered by Ethereum,
              with automatic payouts to Solana. Fast, low-cost, and built for
              global commerce.
            </Text>
            <View style={styles.backedNetworkLogos}>
              <Image
                source={{ uri: `${IMG}/homepage/eth-logo.png` }}
                style={styles.networkLogo}
                resizeMode="contain"
              />
              <Image
                source={{ uri: `${IMG}/homepage/base-logo.png` }}
                style={styles.networkLogo}
                resizeMode="contain"
              />
              <Image
                source={{ uri: `${IMG}/homepage/solana-logo.png` }}
                style={styles.networkLogo}
                resizeMode="contain"
              />
            </View>
          </View>
          <ButtonsCTA />
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    paddingBottom: 40,
  },

  // Hero
  heroSection: {
    paddingTop: 40,
    paddingBottom: 80,
    backgroundColor: "#0a0a0a",
  },
  heroTextContainer: {
    maxWidth: 768,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "500",
    textAlign: "center",
    color: "#e5e5e5",
    lineHeight: 43,
    marginBottom: 12,
    maxWidth: 672,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#a3a3a3",
    textAlign: "center",
    lineHeight: 29,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  heroButtonsContainer: {
    flexDirection: "row",
    gap: 16,
    maxWidth: 512,
    width: "100%",
    paddingHorizontal: 16,
  },
  learnMoreButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#262626",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  sellButton: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  sellButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0a0a0a",
  },

  // Carousel
  carouselWrapper: {
    position: "relative",
    marginTop: 40,
  },
  carouselFlatList: {
    paddingBottom: 16,
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  carouselSlide: {
    marginRight: 16,
  },
  carouselBorder: {
    borderWidth: 1,
    borderColor: "#262626",
    position: "relative",
    backgroundColor: "#0a0a0a",
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
    fontWeight: "500",
  },
  slideImage: {
    aspectRatio: 16 / 9,
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
  cosellFooter: {
    padding: 12,
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
  },
  cosellInfoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 4,
    textAlign: "center",
  },
  cosellCommissionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  cosellCommissionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#a3a3a3",
  },
  cosellInfoIcon: {
    fontSize: 12,
    color: "#a3a3a3",
  },
  cosellDivider: {
    width: 1,
    height: 44,
    backgroundColor: "#737373",
  },
  cosellButtonSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellButton: {
    borderWidth: 1,
    borderColor: "#262626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cosellButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  buyNowButton: {
    width: "100%",
    backgroundColor: "#e5e5e5",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 0,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0a0a0a",
  },
  priceRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
    padding: 12,
    alignItems: "center",
  },
  priceText: {
    fontSize: 14,
    color: "#e5e5e5",
  },
  contentSection: {
    padding: 16,
    alignItems: "center",
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 8,
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 16,
    color: "#a3a3a3",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 512,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  // Container
  containerWrapper: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
  },

  // Section Header
  sectionHeaderContainer: {
    flexDirection: "column",
    gap: 32,
    justifyContent: "space-between",
    marginBottom: 32,
  },
  sectionHeaderContent: {
    flex: 1,
  },
  sectionHeaderTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 8,
  },
  sectionHeaderSubtitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 10,
    lineHeight: 36,
  },
  sectionHeaderDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    maxWidth: 600,
  },
  buttonsCTA: {
    flexDirection: "row",
    gap: 16,
    maxWidth: 512,
    width: "100%",
    alignSelf: "flex-start",
  },

  // Why
  whySection: {
    marginVertical: 40,
  },
  whyCardsGrid: {
    gap: 24,
  },
  whyCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },
  whyCardImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: "#262626",
  },
  whyCardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 6,
  },
  whyCardDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    maxWidth: 600,
  },

  // How
  howWrapper: {
    backgroundColor: "#0a0a0a",
  },
  howSection: {
    paddingVertical: 40,
  },
  howCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    flexDirection: "column",
    overflow: "hidden",
  },
  howCardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    maxWidth: 768,
    paddingHorizontal: 16,
  },
  howCardTextSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  howCardTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 24,
    textAlign: "center",
  },
  howStepsList: {
    gap: 16,
  },
  howStepText: {
    fontSize: 18,
    color: "#e5e5e5",
    lineHeight: 29,
    textAlign: "center",
  },
  howIllustrationSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingRight: 0,
  },
  howImage: {
    width: "100%",
    aspectRatio: 1,
  },

  // Cosell
  cosellWrapper: {
    backgroundColor: "#262626",
  },
  cosellSection: {
    marginVertical: 40,
  },
  cosellGrid: {
    gap: 24,
    marginBottom: 40,
  },
  cosellVideoCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
  },
  cosellVideoPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cosellTextCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellPointsContainer: {
    gap: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  cosellPointText: {
    fontSize: 18,
    color: "#e5e5e5",
    textAlign: "center",
  },
  cosellActionButton: {
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  cosellActionButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  cosellBigCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  cosellHeroImage: {
    width: "100%",
    height: 200,
    marginBottom: 32,
    borderRadius: 8,
  },
  cosellBigTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 8,
    textAlign: "center",
  },
  cosellBigDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    textAlign: "center",
    lineHeight: 29,
    maxWidth: 600,
  },

  // Assets
  assetsWrapper: {
    marginVertical: 40,
  },
  assetsHeroImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#1a1a1a",
  },
  assetsDescSection: {
    marginVertical: 32,
  },
  assetsDescTitle: {
    fontSize: 24,
    color: "#e5e5e5",
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 29,
  },
  assetsDescText: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    marginBottom: 20,
    maxWidth: 600,
  },
  assetsGrid: {
    gap: 24,
  },
  assetCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
  },
  assetCardImage: {
    width: "100%",
    height: 120,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: "#262626",
  },
  assetCardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 6,
  },
  assetCardDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    maxWidth: 600,
  },

  // Backed Network
  backedNetworkWrapper: {
    paddingVertical: 40,
    backgroundColor: "#1a1a1a",
  },
  backedNetworkContainer: {
    flexDirection: "column",
    gap: 32,
    justifyContent: "space-between",
  },
  backedNetworkContent: {
    flex: 1,
  },
  backedNetworkTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 10,
    lineHeight: 36,
  },
  backedNetworkDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    maxWidth: 896,
    marginBottom: 24,
  },
  backedNetworkLogos: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  networkLogo: {
    width: 32,
    height: 32,
  },

  // FAQs
  faqsWrapper: {
    paddingVertical: 40,
    backgroundColor: "#0a0a0a",
  },
  faqsContainer: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%",
  },
  faqsHeader: {
    alignItems: "center",
    maxWidth: 768,
    alignSelf: "center",
    marginBottom: 40,
  },
  faqsTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 36,
  },
  faqsSubtitle: {
    fontSize: 18,
    color: "#f5f5f5",
    textAlign: "center",
    lineHeight: 29,
    marginBottom: 8,
    maxWidth: 768,
  },
  feedbackButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginTop: 32,
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  faqItemsList: {
    gap: 24,
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 6,
    overflow: "hidden",
  },
  faqQuestionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    flex: 1,
    paddingRight: 8,
  },
  faqChevron: {},
  faqAnswerContainer: {
    padding: 16,
    paddingTop: 0,
  },
  faqAnswerText: {
    fontSize: 18,
    color: "#d1d5db",
    lineHeight: 31,
    marginBottom: 8,
  },
});
