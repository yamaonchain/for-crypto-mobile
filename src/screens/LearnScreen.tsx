import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LearnScreen() {
  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <Ionicons name="book-outline" size={32} color="#000" />
            <Text style={styles.heroTitle}>Getting Started</Text>
          </View>
          <Text style={styles.heroSubtitle}>
            Everything you need to know to buy and sell on For Crypto.
          </Text>
        </View>

        {/* Section 1: What is a Crypto Wallet */}
        <Section
          icon="wallet-outline"
          title="What is a Crypto Wallet?"
        >
          <Text style={styles.sectionText}>
            A crypto wallet is like a digital account that holds your cryptocurrency. Unlike a physical wallet, it doesn't actually store money. Instead, it stores the keys that prove you own your crypto.
          </Text>
          
          <View style={styles.stepsContainer}>
            <Step number={1} text="It's your identity on the blockchain. When you connect your wallet, you're proving who you are." />
            <Step number={2} text="You control it completely. No bank or company can freeze your account." />
            <Step number={3} text="It holds your crypto assets like USDC, the currency we use for payments." />
          </View>

          <Text style={styles.subsectionTitle}>Recommended Wallets</Text>
          <View style={styles.grid}>
            <WalletLink
              name="MetaMask"
              description="Most popular browser wallet"
              url="https://metamask.io/download/"
              onPress={() => openURL('https://metamask.io/download/')}
            />
            <WalletLink
              name="Coinbase Wallet"
              description="Easy for Coinbase users"
              url="https://www.coinbase.com/wallet"
              onPress={() => openURL('https://www.coinbase.com/wallet')}
            />
            <WalletLink
              name="Phantom"
              description="Great mobile experience"
              url="https://phantom.app/download"
              onPress={() => openURL('https://phantom.app/download')}
            />
          </View>
        </Section>

        {/* Section 2: How to Get USDC */}
        <Section
          icon="logo-usd"
          title="How to Get USDC"
        >
          <Text style={styles.sectionText}>
            USDC is a stablecoin that's always worth $1 USD. It's the currency used for all payments on For Crypto. Here's how to get some:
          </Text>

          <View style={styles.stepsContainer}>
            <Step number={1} text="Create an account on a crypto exchange like Coinbase or Kraken" />
            <Step number={2} text="Buy USDC using your debit card or bank transfer" />
            <Step number={3} text="Withdraw USDC to your wallet on the Base network" />
          </View>

          <Text style={styles.subsectionTitle}>Where to Buy USDC</Text>
          <View style={styles.grid}>
            <ExchangeLink
              name="Coinbase"
              description="Easiest option. Supports direct withdrawal to Base."
              url="https://www.coinbase.com"
              recommended
              onPress={() => openURL('https://www.coinbase.com')}
            />
            <ExchangeLink
              name="Kraken"
              description="Low fees, trusted exchange"
              url="https://www.kraken.com"
              onPress={() => openURL('https://www.kraken.com')}
            />
          </View>

          <View style={styles.proTip}>
            <Text style={styles.proTipLabel}>Pro Tip</Text>
            <Text style={styles.proTipText}>
              If you already have crypto on Ethereum, you can bridge it to Base using the{" "}
              <Text style={styles.link} onPress={() => openURL('https://bridge.base.org')}>
                Base Bridge
              </Text>
            </Text>
          </View>
        </Section>

        {/* Section 3: Understanding Base Network */}
        <Section
          icon="layers-outline"
          title="Understanding Base Network"
        >
          <Text style={styles.sectionText}>
            Base is a Layer 2 network built on Ethereum. Think of it as a faster, cheaper lane on the Ethereum highway.
          </Text>

          <View style={styles.featuresGrid}>
            <Feature
              title="Faster Transactions"
              description="Transactions confirm in seconds, not minutes"
            />
            <Feature
              title="Lower Fees"
              description="Pay cents instead of dollars for each transaction"
            />
            <Feature
              title="Built by Coinbase"
              description="Trusted infrastructure from a public company"
            />
            <Feature
              title="Ethereum Security"
              description="Secured by the Ethereum network"
            />
          </View>

          <Text style={styles.subsectionTitle}>How to Add Base to Your Wallet</Text>
          <View style={styles.stepsContainer}>
            <Step number={1} text="When you make a payment on For Crypto, we'll automatically prompt you to add Base" />
            <Step number={2} text="Click 'Approve' in your wallet to add the network" />
            <Step number={3} text="That's it! Your wallet will switch to Base automatically" />
          </View>

          <Text style={styles.footnote}>
            You can also add Base manually using{" "}
            <Text style={styles.link} onPress={() => openURL('https://chainlist.org/chain/8453')}>
              Chainlist
            </Text>
          </Text>
        </Section>

        {/* Section 4: What Are Gas Fees */}
        <Section
          icon="flash-outline"
          title="What Are Gas Fees?"
        >
          <Text style={styles.sectionText}>
            Gas fees are small payments to the network for processing your transactions. Think of it like a tiny processing fee.
          </Text>

          <View style={styles.featuresGrid}>
            <Feature
              title="Very Low on Base"
              description="Usually just $0.01 to $0.10 per transaction"
            />
            <Feature
              title="Paid in ETH"
              description="You need a tiny bit of ETH on Base for fees"
            />
          </View>

          <Text style={styles.subsectionTitle}>When You Pay Gas</Text>
          <View style={styles.stepsContainer}>
            <Step number={1} text="When you buy something (the transaction fee)" />
            <Step number={2} text="When you publish a listing (one-time setup)" />
          </View>

          <Text style={styles.subsectionTitle}>When You Don't Pay Gas</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Uploading photos and content (stored on our servers)</Text>
            <Text style={styles.bulletItem}>• Signing in with your wallet (just a signature, no transaction)</Text>
            <Text style={styles.bulletItem}>• Authorizing a payment (off-chain signature using EIP-3009)</Text>
          </View>

          <View style={styles.proTip}>
            <Text style={styles.proTipLabel}>Need ETH for Gas?</Text>
            <Text style={styles.proTipText}>
              Get a small amount of ETH on Base from{" "}
              <Text style={styles.link} onPress={() => openURL('https://www.coinbase.com')}>
                Coinbase
              </Text>
              {" "}or bridge from Ethereum using the{" "}
              <Text style={styles.link} onPress={() => openURL('https://bridge.base.org')}>
                Base Bridge
              </Text>
            </Text>
          </View>
        </Section>

        {/* Section 5: How Coselling Works */}
        <Section
          icon="people-outline"
          title="How Coselling Works"
        >
          <Text style={styles.sectionText}>
            Coselling lets anyone earn crypto by promoting products they believe in. When someone buys through your link, you get paid instantly.
          </Text>

          <View style={styles.featuresGrid}>
            <Feature
              title="Seller Sets the Rate"
              description="Each listing has a public commission percentage set by the seller"
            />
            <Feature
              title="Instant Payouts"
              description="Your commission is sent directly to your wallet the moment a sale happens"
            />
            <Feature
              title="30-Day Rate Lock"
              description="Your commission rate is protected for 30 days, even if the seller lowers it"
            />
            <Feature
              title="Smart Contract Enforced"
              description="Payments are automatic and trustless, no chasing invoices"
            />
          </View>

          <Text style={styles.subsectionTitle}>How to Become a Coseller</Text>
          <View style={styles.stepsContainer}>
            <Step number={1} text="Browse listings on For Crypto and find something you want to promote" />
            <Step number={2} text="Click 'Become a Coseller' on any listing page" />
            <Step number={3} text="A smart contract is created that locks in your commission rate" />
            <Step number={4} text="Share your unique link on social media, your website, or with friends" />
            <Step number={5} text="Get paid instantly when someone buys through your link" />
          </View>

          <View style={styles.proTip}>
            <Text style={styles.proTipLabel}>Ready to Start?</Text>
            <Text style={styles.proTipText}>
              Browse listings and find products you believe in. No approval needed.
            </Text>
          </View>
        </Section>

        {/* FAQ Callout */}
        <View style={styles.faqCallout}>
          <Ionicons name="flash" size={32} color="#000" style={styles.faqIcon} />
          <Text style={styles.faqTitle}>Still have questions?</Text>
          <Text style={styles.faqText}>
            Check out our FAQ for more detailed answers.
          </Text>
          <TouchableOpacity
            style={styles.faqButton}
            onPress={() => openURL('https://for-crypto.vercel.app/#faq')}
          >
            <Text style={styles.faqButtonText}>View FAQ</Text>
            <Ionicons name="open-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon as any} size={24} color="#000" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

function WalletLink({ name, description, onPress }: { name: string; description: string; url: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.walletLink} onPress={onPress}>
      <View style={styles.walletLinkHeader}>
        <Text style={styles.walletLinkName}>{name}</Text>
        <Ionicons name="open-outline" size={16} color="#666" />
      </View>
      <Text style={styles.walletLinkDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

function ExchangeLink({ 
  name, 
  description, 
  recommended = false, 
  onPress 
}: { 
  name: string; 
  description: string; 
  recommended?: boolean; 
  url: string; 
  onPress: () => void 
}) {
  return (
    <TouchableOpacity style={[styles.exchangeLink, recommended && styles.exchangeLinkRecommended]} onPress={onPress}>
      <View style={styles.exchangeLinkHeader}>
        <View style={styles.exchangeLinkNameContainer}>
          <Text style={styles.exchangeLinkName}>{name}</Text>
          {recommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
        <Ionicons name="open-outline" size={16} color="#666" />
      </View>
      <Text style={styles.exchangeLinkDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  hero: {
    paddingTop: 24,
    marginBottom: 32,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#000',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
    marginTop: 16,
  },
  stepsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    paddingTop: 2,
  },
  featuresGrid: {
    gap: 12,
    marginBottom: 16,
  },
  feature: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  grid: {
    gap: 12,
    marginBottom: 16,
  },
  walletLink: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  walletLinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  walletLinkName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  walletLinkDescription: {
    fontSize: 14,
    color: '#666',
  },
  exchangeLink: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  exchangeLinkRecommended: {
    borderColor: '#000',
    backgroundColor: '#f8f9fa',
  },
  exchangeLinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exchangeLinkNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exchangeLinkName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  recommendedBadge: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  exchangeLinkDescription: {
    fontSize: 14,
    color: '#666',
  },
  bulletList: {
    marginBottom: 16,
    gap: 4,
  },
  bulletItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  proTip: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  proTipLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  proTipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footnote: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
  },
  link: {
    color: '#000',
    fontWeight: '500',
  },
  faqCallout: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    textAlign: 'center',
  },
  faqIcon: {
    marginBottom: 12,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  faqText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  faqButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});