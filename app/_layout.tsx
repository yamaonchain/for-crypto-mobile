import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../src/context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0a0a0a" },
          headerTintColor: "#e5e5e5",
          contentStyle: { backgroundColor: "#0a0a0a" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="checkout"
          options={{
            title: "Checkout",
            headerBackTitle: "",
          }}
        />
        <Stack.Screen
          name="order-confirmation"
          options={{
            title: "Order Complete",
            headerBackTitle: "",
            gestureEnabled: false,
          }}
        />
      </Stack>
    </CartProvider>
  );
}
