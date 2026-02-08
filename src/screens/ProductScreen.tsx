import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProductScreen({ route, navigation }: any) {
  const { id } = route.params || {};

  // TODO: Fetch product details from API
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>📦</Text>
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          <Text style={styles.title}>Product #{id}</Text>
          <Text style={styles.seller}>By seller</Text>
          <Text style={styles.description}>
            Product details will load from the For Crypto API.
          </Text>
        </View>

        {/* Price + Buy */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>$0.00 USDC</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Cosell */}
        <TouchableOpacity style={styles.cosellButton}>
          <Text style={styles.cosellText}>Cosell This Product</Text>
        </TouchableOpacity>
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
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 48,
  },
  info: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  seller: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f97316',
  },
  buyButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  cosellButton: {
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cosellText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f97316',
  },
});
