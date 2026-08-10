import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function ProductSkeleton() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.image}
      />

      <View style={styles.content}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.price}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.title}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.location}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 205,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: 12,
  },

  image: {
    width: "100%",
    height: 105,
  },

  content: {
    paddingHorizontal: 9,
    paddingTop: 8,
  },

  price: {
    width: 70,
    height: 15,
    borderRadius: 4,
    marginBottom: 7,
  },

  title: {
    width: 120,
    height: 13,
    borderRadius: 4,
    marginBottom: 7,
  },

  location: {
    width: 95,
    height: 11,
    borderRadius: 4,
  },
});
