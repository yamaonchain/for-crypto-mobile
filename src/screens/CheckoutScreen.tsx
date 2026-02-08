import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
  isPwyw?: boolean;
  suggestedPrice?: number;
}

interface CheckoutProduct {
  id: string;
  title: string;
  bio: string;
  sellerName: string;
  thumbnailUrl: string;
  variants: ProductVariant[];
}

// Mock data - in real app this would come from route params
const mockProduct: CheckoutProduct = {
  id: '1',
  title: 'Complete Crypto Trading Course',
  bio: 'Learn to trade crypto like a pro with our comprehensive course',
  sellerName: 'cryptoexpert',
  thumbnailUrl: 'https://placehold.co/400x300',
  variants: [
    {
      id: '1',
      name: 'Basic Course',
      price: 49,
      description: 'Core trading fundamentals',
    },
    {
      id: '2',
      name: 'Pro Course',
      price: 99,
      description: 'Advanced strategies + 1-on-1 session',
    },
    {
      id: '3',
      name: 'Support the Creator',
      price: 10,
      isPwyw: true,
      suggestedPrice: 25,
      description: 'Pay what you want (minimum $10)',
    },
  ],
};

export default function CheckoutScreen({ route, navigation }: { route: any; navigation: any }) {
  const { productId } = route.params || { productId: '1' };
  
  // In real app, fetch product data based on productId
  const product = mockProduct;
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // PWYW pricing logic
  const isPwyw = selectedVariant.isPwyw || false;
  const minPrice = selectedVariant.price;
  const suggestedPrice = selectedVariant.suggestedPrice || minPrice;
  
  // Set initial custom price for PWYW
  React.useEffect(() => {
    if (isPwyw) {
      setCustomPrice(suggestedPrice);
    } else {
      setCustomPrice(null);
    }
  }, [selectedVariant.id, isPwyw, suggestedPrice]);

  const finalPrice = isPwyw ? (customPrice || minPrice) : selectedVariant.price;
  const isValidCustomPrice = !isPwyw || (customPrice !== null && customPrice >= minPrice);

  const handlePurchase = async () => {
    if (!isValidCustomPrice) {
      Alert.alert('Invalid Price', `Minimum amount is $${minPrice.toFixed(2)}`);
      return;
    }

    setIsProcessing(true);

    // Mock purchase process
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
      Alert.alert(
        'Purchase Complete!', 
        'Your content is now available in your collection.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  const handleFreePurchase = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
      Alert.alert(
        'Success!', 
        'Content added to your collection.',
        [
          {
            text: 'OK', 
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1000);
  };

  if (isPurchased) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
          <Text style={styles.successTitle}>Purchase Complete!</Text>
          <Text style={styles.successText}>
            Your content is now available in your collection.
          </Text>
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.successButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Preview */}
        <View style={styles.productSection}>
          <Image source={{ uri: product.thumbnailUrl }} style={styles.productImage} />
          
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            {product.bio && (
              <Text style={styles.productBio}>{product.bio}</Text>
            )}
            
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerLabel}>Sold by</Text>
              <Text style={styles.sellerName}>{product.sellerName}</Text>
            </View>
          </View>
        </View>

        {/* Variant Selection */}
        {product.variants.length > 1 && (
          <View style={styles.variantSection}>
            <Text style={styles.sectionTitle}>Select Option</Text>
            {product.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              const variantPrice = variant.price;
              const variantIsPwyw = variant.isPwyw || false;
              const priceText = variantIsPwyw
                ? variantPrice === 0
                  ? "Pay what you want"
                  : `$${variantPrice.toFixed(2)}+`
                : variantPrice === 0
                  ? "Free"
                  : `$${variantPrice.toFixed(2)}`;

              return (
                <TouchableOpacity
                  key={variant.id}
                  style={[styles.variantCard, isSelected && styles.variantCardSelected]}
                  onPress={() => setSelectedVariant(variant)}
                >
                  <View style={styles.variantHeader}>
                    <Text style={styles.variantName}>{variant.name}</Text>
                    <Text style={styles.variantPrice}>{priceText}</Text>
                  </View>
                  {variant.description && (
                    <Text style={styles.variantDescription}>{variant.description}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Single variant display */}
        {product.variants.length === 1 && !isPwyw && (
          <View style={styles.singleVariantSection}>
            <View style={styles.singleVariantCard}>
              <View style={styles.variantHeader}>
                <Text style={styles.variantName}>{selectedVariant.name}</Text>
                <Text style={styles.singleVariantPrice}>
                  {finalPrice === 0 ? "Free" : `$${finalPrice.toFixed(2)}`}
                </Text>
              </View>
              {selectedVariant.description && (
                <Text style={styles.variantDescription}>{selectedVariant.description}</Text>
              )}
            </View>
          </View>
        )}

        {/* PWYW Price Input */}
        {isPwyw && (
          <View style={styles.pwywaSection}>
            <View style={styles.pwyaCard}>
              <View style={styles.pwywaHeader}>
                <Text style={styles.variantName}>{selectedVariant.name}</Text>
                {selectedVariant.description && (
                  <Text style={styles.variantDescription}>{selectedVariant.description}</Text>
                )}
              </View>

              <View style={styles.priceInputSection}>
                <Text style={styles.priceInputLabel}>
                  {minPrice === 0 ? "Pay what you want" : `Enter amount ($${minPrice.toFixed(2)} minimum)`}
                </Text>
                
                <View style={styles.priceInputContainer}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={[
                      styles.priceInput,
                      customPrice !== null && customPrice < minPrice && styles.priceInputError
                    ]}
                    value={customPrice?.toFixed(2) || ''}
                    onChangeText={(text) => {
                      const val = parseFloat(text);
                      setCustomPrice(isNaN(val) ? null : val);
                    }}
                    placeholder={minPrice.toFixed(2)}
                    keyboardType="decimal-pad"
                    selectTextOnFocus
                  />
                  <Text style={styles.currencyLabel}>USDC</Text>
                </View>

                {customPrice !== null && customPrice < minPrice && (
                  <Text style={styles.errorText}>
                    Minimum amount is ${minPrice.toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Purchase Button */}
        <View style={styles.purchaseSection}>
          <TouchableOpacity
            style={[
              styles.purchaseButton,
              (!isValidCustomPrice || isProcessing) && styles.purchaseButtonDisabled
            ]}
            disabled={!isValidCustomPrice || isProcessing}
            onPress={finalPrice === 0 ? handleFreePurchase : handlePurchase}
          >
            {isProcessing ? (
              <View style={styles.loadingContainer}>
                <Ionicons name="refresh" size={20} color="#fff" style={styles.loadingIcon} />
                <Text style={styles.purchaseButtonText}>Processing...</Text>
              </View>
            ) : (
              <Text style={styles.purchaseButtonText}>
                {finalPrice === 0 ? "Get for Free" : `Pay $${finalPrice.toFixed(2)} USDC`}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Trust Signals */}
        <View style={styles.trustSignals}>
          <View style={styles.trustSignal}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.trustText}>Instant delivery after payment</Text>
          </View>
          <View style={styles.trustSignal}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.trustText}>Secure payment with USDC on Base</Text>
          </View>
          <View style={styles.trustSignal}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.trustText}>Funds go directly to seller</Text>
          </View>
        </View>

        {/* Powered by */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by <Text style={styles.footerTextBold}>For Crypto</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  productSection: {
    paddingTop: 16,
    marginBottom: 24,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  productInfo: {
    gap: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  productBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  sellerInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  sellerLabel: {
    fontSize: 14,
    color: '#999',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  variantSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  variantCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  variantCardSelected: {
    borderColor: '#000',
    backgroundColor: '#f8f9fa',
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  variantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  variantDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  singleVariantSection: {
    marginBottom: 24,
  },
  singleVariantCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  singleVariantPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  pwywaSection: {
    marginBottom: 24,
  },
  pwyaCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  pwywaHeader: {
    marginBottom: 16,
  },
  priceInputSection: {
    gap: 8,
  },
  priceInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dollarSign: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#666',
  },
  priceInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  priceInputError: {
    color: '#ef4444',
  },
  currencyLabel: {
    paddingRight: 12,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
  },
  purchaseSection: {
    marginBottom: 24,
  },
  purchaseButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#ccc',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingIcon: {
    transform: [{ rotate: '45deg' }],
  },
  trustSignals: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 24,
    marginBottom: 24,
    gap: 12,
  },
  trustSignal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  footerTextBold: {
    fontWeight: '500',
    color: '#000',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  successButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});