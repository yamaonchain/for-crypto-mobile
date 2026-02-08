import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const isConnected = false;

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <View style={styles.connectSection}>
          <View style={styles.walletIconCircle}>
            <Ionicons name="wallet-outline" size={40} color="#000" />
          </View>
          <Text style={styles.connectTitle}>Connect Wallet</Text>
          <Text style={styles.connectSubtitle}>
            Sign in with your wallet to access your listings, collection, and bookmarks.
          </Text>
          <Pressable style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect Wallet</Text>
          </Pressable>
          <Text style={styles.connectNote}>
            No email or password needed. Your wallet is your identity.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar} />
        <Text style={styles.nickname}>wallet:0x...</Text>
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Listings</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Collection</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Bookmarks</Text>
        </Pressable>
      </View>

      <View style={styles.emptyState}>
        <Ionicons name="grid-outline" size={40} color="#e5e5e5" />
        <Text style={styles.emptyText}>No listings yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  connectSection: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  walletIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  connectTitle: { fontSize: 28, fontWeight: "700", color: "#000", marginBottom: 12 },
  connectSubtitle: { fontSize: 16, color: "#737373", textAlign: "center", lineHeight: 24, marginBottom: 32, maxWidth: 300 },
  connectButton: { backgroundColor: "#000", paddingHorizontal: 32, paddingVertical: 16, borderRadius: 6, width: "100%", alignItems: "center" },
  connectButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  connectNote: { fontSize: 13, color: "#a3a3a3", textAlign: "center", marginTop: 16, maxWidth: 260 },

  profileHeader: { alignItems: "center", paddingVertical: 32, borderBottomWidth: 0.5, borderBottomColor: "#e5e5e5" },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#f0f0f0", marginBottom: 12 },
  nickname: { fontSize: 16, fontWeight: "500", color: "#000" },

  tabs: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#e5e5e5" },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#000" },
  tabText: { fontSize: 14, fontWeight: "500", color: "#a3a3a3" },
  tabTextActive: { color: "#000" },

  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 16, color: "#a3a3a3" },
});
