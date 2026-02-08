import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            The Future of Selling is here.
          </Text>
          <Text style={styles.heroSubtitle}>
            And we don't need all the fluff to show you.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Feature
            title="Why"
            description="Selling online is broken. Clunky platforms, slow payments, endless forms. Built for platforms, not people. For Crypto flips the model. We built it to make selling as direct, instant, and borderless as sending crypto. No banks. No middlemen. No gatekeepers. Just people trading value with people."
          />
          
          <Feature
            title="What"
            description="For Crypto is a platform to sell anything digital, from services and experiences to content, products, and experiments. Sellers list in crypto, get paid in crypto, and define their own terms. Buyers can pay with crypto or card. Sellers always receive crypto. It's all tied to your wallet, not your identity."
          />
          
          <Feature
            title="How"
            description="Built on crypto infrastructure from day one. Listings show prices in both crypto and local currency so buyers get it, but everything runs native to crypto. The breakthrough: any seller can activate the world to help them sell. Sellers set a commission. Cosellers click &quot;Create Contract.&quot; That's it. The rest happens behind the scenes. No setup. No signup. No friction. Cosellers add their wallet and they're live. If they sell, they get paid instantly. Direct to their wallet. It's that simple."
          />
          
          <Feature
            title="The New Stack"
            description="There's a third player now: the coseller. A coseller sells listings they didn't create. No permission. No sign-up. Sellers upload assets, cosellers grab them and go. Commissions pay out instantly, on chain. It's seamless, trustless, and built for scale. Cosellers are what marketers were meant to be. Not influencers or advertisers, but closers. If you're good at driving action, you earn like a seller. No middleman. Just people selling for people."
          />
          
          <Feature
            title="What's Next"
            description="This isn't an upgrade. It's a new foundation. The infrastructure is here to change how people earn, collaborate, and move value online. If you've ever wanted to sell something, help someone sell, or get paid without asking permission, this is it."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  heroTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#000',
    lineHeight: 34,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 22,
    color: '#000',
    lineHeight: 28,
  },
  features: {
    gap: 24,
  },
  feature: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
    lineHeight: 26,
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});