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
  Linking,
} from "react-native";
import { Link } from "expo-router";
import { useState, useRef, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_WIDTH = SCREEN_WIDTH - 32;
const SLIDE_SPACING = 16;
const BASE_URL = "https://forcrypto.fun";

// Exact slides from web source
const slides = [
  {
    fallback: `${BASE_URL}/homepage/product-001.gif`,
    title: "No School 4 Week Bootcamp.",
    description:
      "A 5-step video-based mindset reset for anyone building instead of waiting for permission. Cosell it if you're done with degrees and ready to make real money online. Includes short videos, a playbook, and a community of builders.",
    commission: 10,
    price: 875,
  },
  {
    fallback: `${BASE_URL}/homepage/product-002.gif`,
    title: "Together Daily Spark.",
    description:
      "A daily drop of connection for couples who want to stay close, curious, and never bored. Cosell it if you believe love is built in the little moments. Includes daily ideas, prompts, and conversation starters to keep your relationship fresh and meaningful.",
    commission: 20,
    price: 7,
  },
  {
    fallback: `${BASE_URL}/homepage/product-003.gif`,
    title: "Community Intake Kit for Divvvy.",
    description:
      "Collect wallet addresses and percentage distributions at scale. Export a clean CSV for upload to Divvvy. Perfect for DAOs, creators, nonprofits, large-scale distributions and more...",
    commission: 20,
    price: 2,
  },
  {
    fallback: `${BASE_URL}/homepage/product-004.gif`,
    title: "Designer Gear for Shredders Game.",
    description:
      "Look steezy while you send it. New outerwear, fresh colorways, and pro-level style for your rider. Cosell it if you believe looking good is half the game. Style isn't just cosmetic, it's confidence on the mountain.",
    commission: 20,
    price: 50,
  },
  {
    fallback: `${BASE_URL}/homepage/hero-001.gif`,
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

const faqData = [
  {
    question: "Why For Crypto?",
    answer: "Most digital sales platforms were built for a different era. Slow payouts. High fees. Endless forms. Built for the platform, not the seller.\n\nCrypto changes the equation. Payments settle in seconds instead of days. There are no banks in the middle. And anyone in the world can buy or sell without signing up for another account.\n\nFor Crypto was built from the ground up for this new model. Direct. Instant. Global.",
  },
  {
    question: "What is For Crypto?",
    answer: "For Crypto is a wallet-connected marketplace where anyone can list, sell, and Cosell anything digital.\n\nYou can sell solo or invite Cosellers and split earnings automatically using smart contracts (programs that handle payments for you).\n\nThink of it like a traditional sales platform, rebuilt for the internet.",
  },
  {
    question: "Who is For Crypto for?",
    answer: "Anyone with a wallet and something digital to sell.\n\nSome Examples:\n\u2022 Creators and artists sharing downloads or templates\n\u2022 Coaches offering classes or private sessions\n\u2022 Developers launching tools or code packs\n\u2022 Influencers sharing behind-the-scenes content\n\u2022 Communities hosting event signups or gated access\n\u2022 Founders testing ideas before full product launches\n\nIf you can create it, you can sell it For Crypto.",
  },
  {
    question: "What can I sell?",
    answer: "Anything Digital\n\nThink:\n\u2022 Lightroom presets\n\u2022 Notion templates\n\u2022 Music packs\n\u2022 Fonts and typefaces\n\u2022 Digital art or wallpapers\n\u2022 PDFs, courses, or guides\n\u2022 Links to exclusive Discords or private access\n\nWe host the content. You get paid instantly in crypto.",
  },
  {
    question: 'What does "Cosell" mean?',
    answer: "Cosell lets anyone earn real crypto by helping sell something they believe in.\n\nWhen a seller enables Cosell, they set a public commission rate. Anyone can click Cosell, generate a unique link, and start earning immediately.\n\nThe moment you Cosell, a smart contract is created that locks in your commission rate for 30 days.\n\n\u2022 If the seller raises the commission later, your rate increases right away\n\u2022 If the seller lowers the commission, your higher rate stays locked until your 30-day window ends\n\nEvery time someone makes a purchase through your link, you get paid instantly and directly to your wallet. No middlemen. No payout delays. No waiting period.\n\nThis is how marketing should work.\n\nYou don't get paid for fake clicks, empty impressions, or engagement from bots.\n\nYou only get paid for real sales. The clearest signal of value.\n\nIf you're a digital influencer, creator, or community builder, this is your moment.\n\nFor the first time, you can instantly earn from the things you promote.\n\nBrowse anything on For Crypto, Cosell what you believe in, and start earning right away.\n\nThis is the missing piece of the digital economy.\n\nOne link. One sale. Real value flows to everyone who helped make it happen.",
  },
  {
    question: "What are Sales Assets?",
    answer: "Sales Assets are materials sellers provide to help cosellers promote their listing.\n\nThink:\n\u2022 Logos and banners\n\u2022 Product images\n\u2022 Video clips\n\u2022 Copy and talking points\n\nWhen you become a coseller, you unlock these assets instantly.\n\nThe more a seller provides, the easier it is for you to share and earn.",
  },
  {
    question: "How does payout work?",
    answer: "Buyers pay in USDC (a stablecoin worth $1), and funds are routed instantly to your wallet and any Cosellers' wallets.\n\nNo waiting. No withdrawal process. No payout requests.\n\nThe split is enforced by a smart contract, so everyone gets paid automatically.",
  },
  {
    question: "What networks and wallets are supported?",
    answer: "Buyers can pay with USDC on Base or Solana. Sellers choose whether to receive payouts on Base or Solana when they create a listing. Cross-chain payments are bridged automatically via Circle CCTP.\n\nYou can connect with:\n\u2022 Phantom (Base and Solana)\n\u2022 MetaMask (Base)\n\u2022 Coinbase Wallet (Base)\n\nAny Ethereum-compatible wallet works for Base. Solana wallets like Phantom, Solflare, and Backpack are supported for Solana payments.",
  },
  {
    question: "Do I need to be technical?",
    answer: "Not at all.\n\nIf you can:\n1. Connect a wallet\n2. Upload a file\n3. Paste a product description\n\nYou're good to go.\n\nThe Coseller flow is also simple. Just add their wallet and percentage. That's it.",
  },
  {
    question: "How does authentication work?",
    answer: "There are no usernames or passwords on For Crypto.\n\nInstead, you connect your wallet, and that becomes your login.\n\nIt's like signing in, but without giving up your email, name, or personal data.\n\nYour wallet proves who you are, and once you make a purchase, the content unlocks instantly.\n\nNo forms. No waiting. You stay in control.",
  },
  {
    question: "What makes For Crypto different from Web2 platforms?",
    answer: "\u2022 Wallet-native: No signups, just connect your wallet\n\u2022 Instant payouts: No withdrawal delays\n\u2022 Fair revenue splits: Set custom percentages with Cosellers\n\u2022 Built for creators: No gatekeeping, open to everyone\n\u2022 Stable payments: All transactions in USDC, a digital dollar pegged 1:1 to USD\n\u2022 Modular design: Your storefront grows and adapts with you\n\nWe're building a better system for value exchange that favors creators over platforms.",
  },
  {
    question: "What makes For Crypto culturally different?",
    answer: "For Crypto is wallet-connected, open to anonymous creators, and built for the new internet.\n\nWe're not rebuilding old platforms with new tech. We're giving dreamers, builders, and side hustlers a new home where crypto is the default.\n\nThis isn't the next Etsy or Gumroad. It's the marketplace built for people who move fast and own their work.",
  },
  {
    question: "Can I embed or share my listings?",
    answer: "Yes. Each product has its own public page with a shareable link.\n\nYou can also embed a checkout button directly on your own website or landing page. Just copy the embed code from your listing and paste it in. No dev work required.",
  },
  {
    question: "Can I track my sales?",
    answer: "Yes.\n\nYour metrics area shows:\n\u2022 Total sales\n\u2022 Total Profit\n\nWe also show earnings per product, buyer wallet activity, and other blockchain stats.",
  },
  {
    question: "Can I make edits after publishing?",
    answer: "Yes. You can edit the description, price, preview image, and the listing.",
  },
  {
    question: "Is For Crypto non-custodial?",
    answer: "Yes. We never touch your funds.\n\nPayments go straight to your wallet and your Cosellers' wallets through smart contract splits.",
  },
  {
    question: "Is it safe?",
    answer: "Yes. All transactions are on the blockchain, transparent, and verifiable.\n\nWe use audited infrastructure and never store your assets or private keys.",
  },
  {
    question: "What about copyright or stolen content?",
    answer: "Sellers are responsible for the content they upload. By listing, you confirm you have the rights to distribute them.\n\nIf you see stolen content or copyright infringement, you can report it directly through our platform. We review each case and will take appropriate action.",
  },
  {
    question: "Can I offer refunds?",
    answer: "Crypto payments are final by default.\n\nHowever, you can handle customer support or issue manual refunds at your discretion.",
  },
  {
    question: "How do I get started?",
    answer: "1. Connect your wallet - This is your login. No email, no password.\n\n2. Click \"Sell\" - Start a new listing from the top nav at any time.\n\n3. Add details - Title, description, price, the basics.\n\n4. Set Coseller Commission - Set a percentage others earn when they help sell.\n\n5. Add What Buyers Get - Upload your files, access links, or whatever you're offering.\n\n6. Add Sales Assets - Drop in a logo, banner, or images to give cosellers what they need to help you sell.\n\n7. Publish - Your listing goes live instantly and is ready to be sold.\n\nThat's it. It's simple, fast, and you're given all the tools to succeed in today's online world.",
  },
  {
    question: "How does For Crypto sustain itself?",
    answer: "For Crypto charges a fee based on how a sale happens.\n\n\u2022 30% if someone discovers and purchases your listing directly through the For Crypto site\n\u2022 10% if the sale comes from your own shared link (like from your YouTube, X, or personal site)\n\u2022 10% if a coseller makes the sale, plus whatever commission percentage you set for them\n\nThis model rewards creators for promoting their own work and empowers cosellers to earn alongside you.\n\nOur fee helps fund the platform, cover infrastructure, and keep the system open to everyone. It allows For Crypto to grow independently while giving creators and communities more ownership, reach, and control.",
  },
  {
    question: "What is the Bot API?",
    answer: "The Bot API lets you automate sales on For Crypto. You can create listings, manage inventory, and process payments programmatically.\n\nBots are first-class citizens on For Crypto. They get their own profile, can list and sell just like any other user, and earn instant payouts to their connected wallet.\n\nUse cases include:\n\u2022 Automated storefronts that list and sell without manual work\n\u2022 Integrations with external platforms or services\n\u2022 Dynamic pricing or inventory management\n\u2022 Programmatic content delivery at scale",
  },
  {
    question: "What is Embed Checkout?",
    answer: "Embed Checkout lets you add a \"Buy with Crypto\" button to any website. Your visitors can purchase directly without leaving your page.\n\nJust paste a small script tag and a div on your site. The button handles wallet connection, payment, and content delivery automatically.\n\nIt works on:\n\u2022 Personal websites and landing pages\n\u2022 Blog posts and articles\n\u2022 Notion pages and link-in-bio tools\n\u2022 Any site where you can add HTML",
  },
  {
    question: "Have more questions?",
    answer: "Reach out on X (@forcryptomarket) or email us at feedback@forcrypto.market.\n\nYou can also suggest new features or integrations directly on the site.",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Hero />
      <Why />
      <How />
      <CosellSection />
      <Assets />
      <BackedNetwork />
      <FAQs />
    </ScrollView>
  );
}

function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const container = e.nativeEvent;
      const containerCenter =
        container.contentOffset.x + container.layoutMeasurement.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((_, index) => {
        const slideCenter =
          index * (SLIDE_WIDTH + SLIDE_SPACING) + SLIDE_WIDTH / 2;
        const distance = Math.abs(containerCenter - slideCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setSelectedIndex(closestIndex);
    },
    []
  );

  const handleDotClick = useCallback((index: number) => {
    scrollRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const renderSlide = ({ item: slide }: { item: (typeof slides)[0] }) => (
    <View style={[styles.carouselSlide, { width: SLIDE_WIDTH }]}>
      <View style={styles.carouselBorder}>
        <View style={styles.exampleLabel}>
          <Text style={styles.exampleLabelText}>Example Listing</Text>
        </View>

        <Image
          source={{ uri: slide.fallback }}
          style={styles.slideImage}
          resizeMode="cover"
        />

        <View style={styles.cosellFooter}>
          <View style={styles.cosellInfoSection}>
            <Text style={styles.cosellTitle}>Cosell For Crypto.</Text>
            <View style={styles.cosellCommissionRow}>
              <Text style={styles.cosellCommissionText}>
                {slide.commission}% Commission
              </Text>
              <Text style={styles.cosellInfoIcon}>\u24D8</Text>
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
          <Text style={styles.slideTitle} numberOfLines={2}>
            {slide.title}
          </Text>
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
          <Pressable style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Learn More</Text>
          </Pressable>
          <Pressable style={styles.foregroundButton}>
            <Text style={styles.foregroundButtonText}>Sell</Text>
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
        />

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === selectedIndex ? "#e5e5e5" : "#1a1a1a",
                },
              ]}
              onPress={() => handleDotClick(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function Why() {
  return (
    <Container>
      <View style={styles.whySection}>
        <SectionHeader
          title="Why Crypto?"
          subtitle="Payments that just work."
          description="No waiting for payouts. No platform lock-in. No chargebacks. Just direct, wallet-to-wallet payments that are global, instant, and built for anyone."
        />
        <View style={styles.cardsGrid}>
          <WhyCard
            image={`${BASE_URL}/homepage/why-001.gif`}
            title="Instant Payouts"
            description="Get paid the moment something sells. No delays, no waiting, just crypto in your wallet."
          />
          <WhyCard
            image={`${BASE_URL}/homepage/why-002.gif`}
            title="Self-Custody"
            description="You own the wallet, you control the money. No platforms holding your funds."
          />
          <WhyCard
            image={`${BASE_URL}/homepage/why-003.gif`}
            title="Global by Default"
            description="Sell and cosell to anyone, anywhere. No banks, no borders, no currency restrictions."
          />
          <WhyCard
            image={`${BASE_URL}/homepage/why-004.gif`}
            title="Smart Splits"
            description="Revenue is split automatically between sellers and cosellers. No chasing payments."
          />
        </View>
      </View>
    </Container>
  );
}

function WhyCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

function How() {
  return (
    <View style={styles.sectionBg}>
      <Container>
        <View style={styles.sectionPadding}>
          <SectionHeader
            title="How it works."
            subtitle={["Instant transactions.", "No banks. No delays."]}
            description="From wallet connect to payout, everything happens directly. No signups, no waiting, no middlemen."
          />
          <View style={styles.card}>
            <View style={styles.howCardContent}>
              <Text style={styles.howCardTitle}>
                Getting started is simple
              </Text>
              <View style={styles.howStepsList}>
                {howSteps.map((step, index) => (
                  <Text key={index} style={styles.howStepText}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>
            </View>
            <Image
              source={{ uri: `${BASE_URL}/homepage/how.png` }}
              style={styles.howImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Container>
    </View>
  );
}

function CosellSection() {
  return (
    <View style={styles.sectionBorder}>
      <Container>
        <View style={styles.sectionPadding}>
          <SectionHeader
            title="Cosell."
            subtitle="Unlock the Internet."
            description="Cosell is not an affiliate link. It's a contract. A payout. A share of every sale. It turns attention into income for anyone, anywhere."
          />
          <View style={styles.cosellGrid}>
            <View style={styles.card}>
              <View style={styles.cosellVideoPlaceholder}>
                <Ionicons name="play-circle-outline" size={48} color="#a3a3a3" />
              </View>
            </View>
            <View style={[styles.card, styles.cosellTextCard]}>
              <View style={styles.cosellPointsContainer}>
                <Text style={styles.cosellPointText}>
                  The seller sets the commission.
                </Text>
                <Text style={styles.cosellPointText}>
                  A Coseller activates the contract.
                </Text>
                <Text style={styles.cosellPointText}>
                  Sales are tracked on the blockchain.
                </Text>
                <Text style={styles.cosellPointText}>
                  Payouts happen instantly.
                </Text>
              </View>
              <Pressable style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>
                  Become a Coseller
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.card, { alignItems: "center" }]}>
            <Image
              source={{ uri: `${BASE_URL}/homepage/cosell.png` }}
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
    <View style={styles.sectionPadding}>
      <Container>
        <SectionHeader
          title="Sales Assets."
          subtitle="Give Cosellers the tools to sell."
          description="Official photos, videos, and creative material uploaded by sellers and unlocked by Cosellers. Quality promotion that scales with you."
        />
      </Container>
      <Image
        source={{ uri: `${BASE_URL}/homepage/assets.png` }}
        style={styles.assetsHeroImage}
        resizeMode="cover"
      />
      <Container>
        <View style={styles.assetsDescSection}>
          <Text style={styles.assetsDescTitle}>
            Your sales materials, your way
          </Text>
          <Text style={styles.mutedText}>
            Every listing includes a dedicated sales assets section: a space to
            upload the logos, videos, and creative tools that help your product
            sell.
          </Text>
          <Text style={styles.mutedText}>
            Sellers upload. Cosellers get access the moment they create a
            contract.
          </Text>
          <Text style={styles.mutedText}>
            The result is aligned promotion and wider reach from day one.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          <AssetCard
            title="Logos, Marks, Tags..."
            description="The scroll stops when you stand out. Upload clean logos, badges, and marks Cosellers can drop into any format. Whether you're selling or Coselling, identity matters."
            image={`${BASE_URL}/homepage/assets-001.png`}
          />
          <AssetCard
            title="Films, Ads, Interviews..."
            description="Let the story do the selling. Trailers, interviews, edits, and reels. Built by Sellers or remixable by Cosellers. The better the content, the further it travels."
            image={`${BASE_URL}/homepage/assets-002.png`}
          />
          <AssetCard
            title="Photos, Text, Documentation..."
            description="Everything needed to list, describe, and post. Product shots. Specs. Descriptions. Quotes. Clear tools for anyone helping push the product forward."
            image={`${BASE_URL}/homepage/assets-003.png`}
          />
        </View>
      </Container>
    </View>
  );
}

function AssetCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.assetCardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

function BackedNetwork() {
  return (
    <View style={styles.sectionBorder}>
      <Container>
        <View style={styles.backedNetworkContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>
              Backed by leading networks.
            </Text>
            <Text style={styles.mutedText}>
              Built on Base, a faster and cheaper network powered by Ethereum,
              with automatic payouts to Solana. Fast, low-cost, and built for
              global commerce.
            </Text>
            <View style={styles.networkLogos}>
              <Image
                source={{ uri: `${BASE_URL}/homepage/eth-logo.png` }}
                style={styles.networkLogo}
                resizeMode="contain"
              />
              <Image
                source={{ uri: `${BASE_URL}/homepage/base-logo.png` }}
                style={styles.networkLogo}
                resizeMode="contain"
              />
              <Image
                source={{ uri: `${BASE_URL}/homepage/solana-logo.png` }}
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

function FAQs() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <View style={styles.faqsWrapper}>
      <Container>
        <View style={styles.faqsHeader}>
          <Text style={styles.faqsTitle}>Frequently Asked Questions</Text>
          <Text style={styles.faqsSubtitle}>
            Everything you need to know about For Crypto.
          </Text>
          <Text style={styles.faqsSubtitle}>
            And if you have an idea, feedback, or want to request a feature, let
            us know.
          </Text>
          <Pressable
            style={styles.feedbackButton}
            onPress={() =>
              Linking.openURL("mailto:feedback@forcrypto.market")
            }
          >
            <Text style={styles.feedbackButtonText}>Feedback</Text>
          </Pressable>
        </View>

        <View style={styles.faqItemsList}>
          {faqData.map((faq, index) => (
            <Pressable
              key={index}
              style={styles.faqItem}
              onPress={() =>
                setExpandedFAQ(expandedFAQ === index ? null : index)
              }
            >
              <View style={styles.faqQuestionRow}>
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Ionicons
                  name={
                    expandedFAQ === index ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color="#fff"
                />
              </View>
              {expandedFAQ === index && (
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </Container>
    </View>
  );
}

// Shared components

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
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {Array.isArray(subtitle) ? (
          subtitle.map((sub, index) => (
            <Text key={index} style={styles.sectionTitle}>
              {sub}
            </Text>
          ))
        ) : (
          <Text style={styles.sectionTitle}>{subtitle}</Text>
        )}
        <Text style={[styles.mutedText, { marginTop: 10 }]}>
          {description}
        </Text>
      </View>
      <ButtonsCTA />
    </View>
  );
}

function ButtonsCTA() {
  return (
    <View style={styles.buttonsCTA}>
      <Pressable style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Learn More</Text>
      </Pressable>
      <Pressable style={styles.foregroundButton}>
        <Text style={styles.foregroundButtonText}>Sell</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Base
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    paddingBottom: 40,
  },

  // Container
  containerWrapper: {
    width: "100%",
    paddingHorizontal: 16,
  },

  // Section backgrounds
  sectionBg: {
    backgroundColor: "#0a0a0a",
  },
  sectionBorder: {
    backgroundColor: "#262626",
  },
  sectionPadding: {
    paddingVertical: 40,
  },

  // Hero
  heroSection: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#0a0a0a",
  },
  heroTextContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#e5e5e5",
    lineHeight: 36,
    marginBottom: 12,
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
    width: "100%",
    paddingHorizontal: 16,
  },

  // Buttons
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#262626",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e5e5e5",
  },
  foregroundButton: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  foregroundButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0a0a0a",
  },

  // Carousel
  carouselWrapper: {
    marginTop: 40,
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  carouselSlide: {
    // width set dynamically
  },
  carouselBorder: {
    borderWidth: 1,
    borderColor: "#262626",
    overflow: "hidden",
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
    width: "100%",
    aspectRatio: 16 / 9,
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
    backgroundColor: "#262626",
  },
  cosellButtonSection: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 24,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 8,
    textAlign: "center",
  },
  slideDescription: {
    fontSize: 16,
    color: "#a3a3a3",
    textAlign: "center",
    lineHeight: 26,
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

  // Section header
  sectionHeaderContainer: {
    marginBottom: 32,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 4,
    lineHeight: 36,
  },
  mutedText: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
    marginBottom: 16,
  },

  // Cards
  cardsGrid: {
    gap: 24,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 24,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 18,
    color: "#a3a3a3",
    lineHeight: 29,
  },

  // Why
  whySection: {
    paddingVertical: 40,
  },

  // How
  howCardContent: {
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
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
    marginBottom: 24,
  },
  howStepText: {
    fontSize: 18,
    color: "#e5e5e5",
    textAlign: "center",
    lineHeight: 29,
  },
  howImage: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 16,
  },

  // Cosell
  cosellGrid: {
    gap: 24,
    marginBottom: 24,
  },
  cosellVideoPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#171717",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cosellTextCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  cosellPointsContainer: {
    gap: 8,
    marginBottom: 32,
  },
  cosellPointText: {
    fontSize: 18,
    color: "#e5e5e5",
    textAlign: "center",
  },
  cosellHeroImage: {
    width: "100%",
    height: 200,
    marginBottom: 32,
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
  },

  // Assets
  assetsHeroImage: {
    width: "100%",
    height: 200,
  },
  assetsDescSection: {
    paddingVertical: 32,
  },
  assetsDescTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#e5e5e5",
    marginBottom: 10,
  },
  assetCardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 24,
  },

  // Backed Network
  backedNetworkContainer: {
    paddingVertical: 40,
    gap: 32,
  },
  networkLogos: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  networkLogo: {
    width: 24,
    height: 24,
  },

  // Buttons CTA
  buttonsCTA: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },

  // FAQs
  faqsWrapper: {
    paddingVertical: 40,
    backgroundColor: "#0a0a0a",
  },
  faqsHeader: {
    alignItems: "center",
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
  },
  feedbackButton: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 6,
    marginTop: 24,
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    flex: 1,
    paddingRight: 8,
  },
  faqAnswerText: {
    fontSize: 18,
    color: "#d4d4d4",
    lineHeight: 31,
    marginTop: 12,
  },
});
