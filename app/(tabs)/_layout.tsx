import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: "#fff", 
          borderTopColor: "#e5e5e5",
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#737373",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
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
