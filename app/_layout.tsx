import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../src/context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          contentStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
          }}
        />
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
