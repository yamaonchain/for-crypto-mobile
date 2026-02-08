import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Alert 
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import type { CartItem } from '../../src/context/CartContext';
import { colors, spacing, fontSize } from '../../src/constants/theme';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleRemoveItem = (item: CartItem) => {
    Alert.alert(
      "Remove Item",
      `Remove "${item.title}" from cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => removeFromCart(item.id), style: "destructive" }
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Remove all items from cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: clearCart, style: "destructive" }
      ]
    );
  };

  const handleQuantityChange = (item: CartItem, increment: boolean) => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    updateQuantity(item.id, newQuantity);
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyCart}>
          <Ionicons name="bag-outline" size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDescription}>
            Add some items to get started
          </Text>
          <Link href="/search" asChild>
            <Pressable style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Browse Listings</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with clear button */}
      <View style={styles.header}>
        <Text style={styles.itemCount}>{items.length} item{items.length !== 1 ? 's' : ''}</Text>
        <Pressable onPress={handleClearCart}>
          <Text style={styles.clearButton}>Clear All</Text>
        </Pressable>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemRow item={item} onRemove={handleRemoveItem} onQuantityChange={handleQuantityChange} />}
        contentContainerStyle={styles.itemsList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Footer with total and checkout */}
      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalPrice}>{getTotalPrice().toFixed(2)} USDC</Text>
          </View>
          <Text style={styles.totalUsd}>≈ ${getTotalPrice().toFixed(2)} USD</Text>
        </View>
        
        <Link href="/checkout" asChild>
          <Pressable style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

function CartItemRow({ 
  item, 
  onRemove, 
  onQuantityChange 
}: { 
  item: CartItem; 
  onRemove: (item: CartItem) => void;
  onQuantityChange: (item: CartItem, increment: boolean) => void;
}) {
  return (
    <View style={styles.cartItem}>
      {/* Item Image */}
      <View style={styles.itemImage}>
        <Ionicons name="image-outline" size={32} color={colors.border} />
      </View>

      {/* Item Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        {item.sellerNickname && (
          <Text style={styles.itemSeller}>by {item.sellerNickname}</Text>
        )}
        {item.categoryName && (
          <View style={styles.itemCategory}>
            <Text style={styles.itemCategoryText}>{item.categoryName}</Text>
          </View>
        )}
        <View style={styles.itemPriceRow}>
          <Text style={styles.itemPrice}>{item.price} USDC</Text>
          {item.commission && (
            <Text style={styles.itemCommission}>Cosell {item.commission}%</Text>
          )}
        </View>
      </View>

      {/* Quantity Controls */}
      <View style={styles.itemControls}>
        <View style={styles.quantityControls}>
          <Pressable 
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item, false)}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </Pressable>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <Pressable 
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item, true)}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </Pressable>
        </View>

        <Text style={styles.itemTotal}>
          {(item.price * item.quantity).toFixed(2)} USDC
        </Text>

        <Pressable 
          style={styles.removeButton}
          onPress={() => onRemove(item)}
        >
          <Ionicons name="trash-outline" size={18} color={colors.error} />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  clearButton: {
    fontSize: 14,
    color: colors.error,
    fontWeight: "500",
  },
  itemsList: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 20,
  },
  itemSeller: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  itemCategory: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  itemCategoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  itemPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  itemCommission: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
  },
  itemControls: {
    alignItems: "center",
    gap: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    minWidth: 24,
    textAlign: "center",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    backgroundColor: colors.background,
  },
  totalSection: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  totalUsd: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  emptyCart: {
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