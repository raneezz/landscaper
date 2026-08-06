import { StyleSheet, Text, View } from "react-native";
import AppIcon from "../../../assets/icons/logo.svg";

export default function Header() {
  return (
    <View style={styles.container}>
      <AppIcon width={135} />
      <Text style={styles.title}>
        Connecting the UAE Agricultural Ecosystem
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 15,
    color: "#222",
    fontFamily: "PoppinsBold",
  },
});
