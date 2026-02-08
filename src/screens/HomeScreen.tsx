import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>For Crypto</Text>
          <Text style={styles.heroSubtitle}>
            Buy and sell digital goods with crypto
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.actionText}>Browse Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => navigation.navigate('CreateListing')}
          >
            <Text style={[styles.actionText, styles.actionTextSecondary]}>
              Sell Something
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Links */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.learnButton}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.learnButtonText}>📚 Getting Started Guide</Text>
            <Text style={styles.learnButtonSubtext}>
              Learn about crypto wallets, USDC, and how to start coselling
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.learnButton, styles.aboutButton]}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={[styles.learnButtonText, styles.aboutButtonText]}>💡 About For Crypto</Text>
            <Text style={styles.learnButtonSubtext}>
              The future of selling is here. Built different.
            </Text>
          </TouchableOpacity>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Connect your wallet or create one</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Browse or list digital products</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Pay with USDC, get instant delivery</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
  },
  hero: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
  },
  actions: {
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  actionTextSecondary: {
    color: '#f97316',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f97316',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 16,
    color: '#cccccc',
    flex: 1,
  },
  learnButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 16,
  },
  learnButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f97316',
    marginBottom: 4,
  },
  learnButtonSubtext: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 18,
  },
  aboutButton: {
    marginTop: 12,
  },
  aboutButtonText: {
    color: '#ffffff',
  },
});
