import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "Listing",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerBackTitle: "",
        }} 
      />
    </Stack>
  );
}