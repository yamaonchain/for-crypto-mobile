import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileScreen({ navigation }: any) {
  // TODO: Get auth state from wallet/Privy
  const isConnected = false;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isConnected ? (
          <>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🗻</Text>
            </View>
            <Text style={styles.address}>0x...1234</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Listings</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Sales</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>$0</Text>
                <Text style={styles.statLabel}>Earned</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.connectSection}>
            <Text style={styles.connectTitle}>Connect to For Crypto</Text>
            <Text style={styles.connectSubtitle}>
              Connect your wallet or create one to start buying and selling
            </Text>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create New Wallet</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
  },
  address: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  connectSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  connectSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  connectButton: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  createButton: {
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f97316',
  },
});
