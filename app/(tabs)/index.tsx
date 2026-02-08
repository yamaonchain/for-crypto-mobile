import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Sell. Cosell.{"\n"}For Crypto.</Text>
        <Text style={styles.heroSubtitle}>
          The marketplace for creators, builders, bots, and sellers who want
          instant payouts in USDC. No banks. No middlemen. Just your wallet and
          the internet.
        </Text>
        <View style={styles.heroButtons}>
          <Link href="/search" asChild>
            <Pressable style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>Browse</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.buttonFilled}>
            <Text style={styles.buttonFilledText}>Sell</Text>
          </Pressable>
        </View>
      </View>

      {/* Why Crypto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Crypto?</Text>
        <Text style={styles.sectionSubtitle}>Payments that just work.</Text>
        <Text style={styles.sectionDescription}>
          No waiting for payouts. No platform lock-in. No chargebacks.
        </Text>

        <View style={styles.cardGrid}>
          <WhyCard title="Instant Payouts" description="Get paid the moment something sells." />
          <WhyCard title="Self-Custody" description="You own the wallet, you control the money." />
          <WhyCard title="Global by Default" description="Sell to anyone, anywhere. No borders." />
          <WhyCard title="Smart Splits" description="Revenue split automatically between sellers and cosellers." />
        </View>
      </View>

      {/* How it works */}
      <View style={[styles.section, styles.sectionAlt]}>
        <Text style={styles.sectionTitle}>How it works.</Text>
        <Text style={styles.sectionSubtitle}>Instant transactions.</Text>
        <View style={styles.steps}>
          {[
            "Connect your wallet",
            "Create your listing",
            "Set your Coseller commission",
            "Add what buyers get",
            "Add sales assets",
            "Share your listing",
            "Get paid instantly",
          ].map((step, i) => (
            <Text key={i} style={styles.stepText}>
              {i + 1}. {step}
            </Text>
          ))}
        </View>
      </View>

      {/* Cosell */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cosell.</Text>
        <Text style={styles.sectionSubtitle}>Unlock the Internet.</Text>
        <Text style={styles.sectionDescription}>
          Cosell is not an affiliate link. It's a contract. A payout. A share of
          every sale.
        </Text>
        <View style={styles.cosellSteps}>
          <Text style={styles.cosellStep}>The seller sets the commission.</Text>
          <Text style={styles.cosellStep}>A Coseller activates the contract.</Text>
          <Text style={styles.cosellStep}>Sales are tracked on the blockchain.</Text>
          <Text style={styles.cosellStep}>Payouts happen instantly.</Text>
        </View>
      </View>

      {/* Networks */}
      <View style={[styles.section, styles.sectionDark]}>
        <Text style={[styles.sectionTitle, styles.textWhite]}>Backed by leading networks.</Text>
        <Text style={[styles.sectionDescription, styles.textMuted]}>
          Built on Base, powered by Ethereum, with automatic payouts to Solana.
        </Text>
        <View style={styles.networkLogos}>
          <Text style={styles.networkName}>Ethereum</Text>
          <Text style={styles.networkDot}>·</Text>
          <Text style={styles.networkName}>Base</Text>
          <Text style={styles.networkDot}>·</Text>
          <Text style={styles.networkName}>Solana</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function WhyCard({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.whyCard}>
      <Text style={styles.whyCardTitle}>{title}</Text>
      <Text style={styles.whyCardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFDFC" },
  content: { paddingBottom: 40 },

  // Hero
  hero: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40, alignItems: "center" },
  heroTitle: { fontSize: 32, fontWeight: "700", textAlign: "center", color: "#000", lineHeight: 40 },
  heroSubtitle: { fontSize: 16, color: "#737373", textAlign: "center", marginTop: 12, lineHeight: 24, paddingHorizontal: 8 },
  heroButtons: { flexDirection: "row", gap: 12, marginTop: 24, width: "100%" },
  buttonOutline: { flex: 1, borderWidth: 1, borderColor: "#000", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonOutlineText: { fontSize: 16, fontWeight: "500", color: "#000" },
  buttonFilled: { flex: 1, backgroundColor: "#000", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  buttonFilledText: { fontSize: 16, fontWeight: "500", color: "#fff" },

  // Sections
  section: { paddingHorizontal: 24, paddingVertical: 32 },
  sectionAlt: { backgroundColor: "#f5f5f5" },
  sectionDark: { backgroundColor: "#0a0a0a" },
  sectionTitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 4 },
  sectionSubtitle: { fontSize: 28, fontWeight: "600", color: "#000", marginBottom: 12 },
  sectionDescription: { fontSize: 16, color: "#737373", lineHeight: 24, marginBottom: 20 },

  // Why cards
  cardGrid: { gap: 12 },
  whyCard: { backgroundColor: "#f5f5f5", borderRadius: 12, padding: 20 },
  whyCardTitle: { fontSize: 20, fontWeight: "600", color: "#000", marginBottom: 6 },
  whyCardDescription: { fontSize: 15, color: "#737373", lineHeight: 22 },

  // Steps
  steps: { gap: 12, backgroundColor: "#fff", borderRadius: 12, padding: 24 },
  stepText: { fontSize: 17, color: "#000", lineHeight: 26 },

  // Cosell
  cosellSteps: { gap: 8 },
  cosellStep: { fontSize: 17, color: "#000", textAlign: "center", lineHeight: 26 },

  // Networks
  textWhite: { color: "#fff" },
  textMuted: { color: "#d4d4d4" },
  networkLogos: { flexDirection: "row", gap: 12, alignItems: "center", marginTop: 8 },
  networkName: { fontSize: 16, color: "#a3a3a3", fontWeight: "500" },
  networkDot: { fontSize: 16, color: "#525252" },
});
