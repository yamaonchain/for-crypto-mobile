import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../src/context/CartContext';
import { colors, spacing, fontSize } from '../src/constants/theme';

const PAYMENT_METHODS = [
  {
    id: 'phantom',
    name: 'Phantom Wallet',
    icon: 'wallet-outline',
    description: 'Base & Solana',
    recommended: true,
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'wallet-outline', 
    description: 'Base network',
    recommended: false,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: 'wallet-outline',
    description: 'Base network',
    recommended: false,
  }
];

export default function CheckoutScreen() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const platformFee = subtotal * 0.1; // 10% platform fee
  const total = subtotal + platformFee;

  const handleBackPress = () => {
    router.back();
  };

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty. Add some items to continue.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.replace('/order-confirmation');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Nothing to checkout</Text>
          <Text style={styles.emptyDescription}>
            Add some items to your cart first
          </Text>
          <Pressable style={styles.shopButton} onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.shopButtonText}>Browse Listings</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImage}>
                <Ionicons name="image-outline" size={24} color={colors.border} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemSeller}>by {item.sellerNickname}</Text>
                <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemTotal}>
                {(item.price * item.quantity).toFixed(2)} USDC
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.sectionDescription}>
            Choose your crypto wallet to complete the purchase
          </Text>
          
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod.id === method.id && styles.paymentMethodSelected
              ]}
              onPress={() => setSelectedPaymentMethod(method)}
            >
              <View style={styles.paymentMethodLeft}>
                <View style={styles.paymentIcon}>
                  <Ionicons name={method.icon as any} size={24} color={colors.text} />
                </View>
                <View style={styles.paymentInfo}>
                  <View style={styles.paymentNameRow}>
                    <Text style={styles.paymentName}>{method.name}</Text>
                    {method.recommended && (
                      <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedText}>Recommended</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                </View>
              </View>
              
              <View style={styles.radioButton}>
                {selectedPaymentMethod.id === method.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{subtotal.toFixed(2)} USDC</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Platform fee (10%)</Text>
            <Text style={styles.priceValue}>{platformFee.toFixed(2)} USDC</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} USDC</Text>
          </View>
          
          <Text style={styles.usdEquivalent}>≈ ${total.toFixed(2)} USD</Text>
        </View>

        {/* Terms */}
        <View style={styles.section}>
          <Text style={styles.termsText}>
            By completing this purchase, you agree to For Crypto's Terms of Service and Privacy Policy. 
            All sales are final and transactions are recorded on the blockchain.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable 
          style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]}
          onPress={handleConfirmOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <Ionicons name="hourglass-outline" size={20} color="#ffffff" />
              <Text style={styles.confirmButtonText}>Processing...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.confirmButtonText}>
                Complete Purchase • {total.toFixed(2)} USDC
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },

  // Order Items
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  itemSeller: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  // Payment Methods
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginBottom: 8,
  },
  paymentMethodSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceAlt,
  },
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  recommendedBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#ffffff",
  },
  paymentDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },

  // Price Breakdown
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  usdEquivalent: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "right",
    marginTop: 4,
  },

  // Terms
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});