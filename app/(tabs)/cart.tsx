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
          <Ionicons name="bag-outline" size={64} color="#d4d4d4" />
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
            <Ionicons name="arrow-forward" size={20} color="#fff" />
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
        <Ionicons name="image-outline" size={32} color="#d4d4d4" />
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
            <Ionicons name="remove" size={16} color="#000" />
          </Pressable>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <Pressable 
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item, true)}
          >
            <Ionicons name="add" size={16} color="#000" />
          </Pressable>
        </View>

        <Text style={styles.itemTotal}>
          {(item.price * item.quantity).toFixed(2)} USDC
        </Text>

        <Pressable 
          style={styles.removeButton}
          onPress={() => onRemove(item)}
        >
          <Ionicons name="trash-outline" size={18} color="#dc2626" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  clearButton: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "500",
  },
  itemsList: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#f5f5f5",
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
    color: "#000",
    lineHeight: 20,
  },
  itemSeller: {
    fontSize: 14,
    color: "#737373",
  },
  itemCategory: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  itemCategoryText: {
    fontSize: 12,
    color: "#737373",
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
    color: "#000",
  },
  itemCommission: {
    fontSize: 12,
    color: "#525252",
    backgroundColor: "#e5e5e5",
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
    borderColor: "#e5e5e5",
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
    color: "#000",
    minWidth: 24,
    textAlign: "center",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
    backgroundColor: "#fff",
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
    color: "#000",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  totalUsd: {
    fontSize: 14,
    color: "#737373",
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#000",
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
    color: "#fff",
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
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#737373",
    textAlign: "center",
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});