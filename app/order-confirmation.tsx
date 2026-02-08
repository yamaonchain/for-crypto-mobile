import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OrderConfirmationScreen() {
  const handleContinueShopping = () => {
    router.replace('/(tabs)');
  };

  const handleViewProfile = () => {
    router.replace('/(tabs)/profile');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.checkIconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
        </View>
        
        <Text style={styles.successTitle}>Purchase Complete!</Text>
        <Text style={styles.successMessage}>
          Your order has been processed successfully. You'll receive your items shortly.
        </Text>
        
        <View style={styles.orderDetails}>
          <Text style={styles.orderDetailsTitle}>Order Summary</Text>
          <View style={styles.orderDetailItem}>
            <Text style={styles.orderDetailLabel}>Payment Method</Text>
            <Text style={styles.orderDetailValue}>Crypto Wallet</Text>
          </View>
          <View style={styles.orderDetailItem}>
            <Text style={styles.orderDetailLabel}>Status</Text>
            <Text style={[styles.orderDetailValue, styles.statusCompleted]}>
              Completed
            </Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <Pressable 
            style={[styles.button, styles.primaryButton]}
            onPress={handleContinueShopping}
          >
            <Text style={styles.primaryButtonText}>Continue Shopping</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.button, styles.secondaryButton]}
            onPress={handleViewProfile}
          >
            <Text style={styles.secondaryButtonText}>View Profile</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successContainer: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  checkIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e5e5e5',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#a3a3a3',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#262626',
  },
  orderDetailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e5e5e5',
    marginBottom: 16,
  },
  orderDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#a3a3a3',
  },
  orderDetailValue: {
    fontSize: 14,
    color: '#e5e5e5',
    fontWeight: '500',
  },
  statusCompleted: {
    color: '#22c55e',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#ff6000',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#262626',
  },
  secondaryButtonText: {
    color: '#e5e5e5',
    fontSize: 16,
    fontWeight: '500',
  },
});