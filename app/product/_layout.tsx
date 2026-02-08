import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "Listing",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerShadowVisible: false,
          headerBackTitle: "",
        }} 
      />
    </Stack>
  );
}