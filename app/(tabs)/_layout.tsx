import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useCart } from "../../src/context/CartContext";

function CartIcon({ focused, color }: { focused: boolean; color: string }) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <View style={{ position: "relative" }}>
      <Ionicons 
        name={focused ? "bag" : "bag-outline"} 
        size={24} 
        color={color} 
      />
      {totalItems > 0 && (
        <View style={{
          position: "absolute",
          top: -6,
          right: -8,
          backgroundColor: "#fff",
          borderRadius: 10,
          minWidth: 18,
          height: 18,
          justifyContent: "center",
          alignItems: "center",
        }} pointerEvents="none">
          <Text style={{
            color: "#000",
            fontSize: 10,
            fontWeight: "600",
            textAlign: "center",
          }}>
            {totalItems > 99 ? "99+" : totalItems}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: "#000", 
          borderTopColor: "#333",
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "For Crypto",
          headerTitleStyle: { fontSize: 20, fontWeight: "600" },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerTitle: "Browse Listings",
          headerTitleStyle: { fontSize: 20, fontWeight: "600" },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerTitle: "Shopping Cart",
          headerTitleStyle: { fontSize: 20, fontWeight: "600" },
          tabBarIcon: ({ focused, color }) => (
            <CartIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          headerTitleStyle: { fontSize: 20, fontWeight: "600" },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
