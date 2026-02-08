import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }} 
      />
    </Stack>
  );
}