import { useState } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  counter: {
    fontSize: 20,
    marginBottom: 20,
  },
});
