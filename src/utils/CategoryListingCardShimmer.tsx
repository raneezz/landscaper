import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function CategoryListingCardShimmer() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          styles.imageSkeleton,
          {
            opacity,
          },
        ]}
      >
        <View style={styles.heartContainer}>
          <Ionicons name="heart-outline" size={30} color="#E0E0E0" />
        </View>

        <View style={styles.imageCountSkeleton} />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.priceSkeleton,
            {
              opacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.titleSkeleton,
            {
              opacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.quantitySkeleton,
            {
              opacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.locationSkeleton,
            {
              opacity,
            },
          ]}
        />

        <View style={styles.buttonsRow}>
          <Animated.View
            style={[
              styles.buttonSkeleton,
              {
                opacity,
              },
            ]}
          />

          <Animated.View
            style={[
              styles.buttonSkeleton,
              {
                opacity,
              },
            ]}
          />

          <Animated.View
            style={[
              styles.buttonSkeleton,
              {
                opacity,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  imageSkeleton: {
    height: 150,
    backgroundColor: "#E6E6E6",
    position: "relative",
  },

  heartContainer: {
    position: "absolute",
    right: 18,
    top: 20,
  },

  imageCountSkeleton: {
    position: "absolute",
    left: 16,
    bottom: 16,
    width: 40,
    height: 25,
    borderRadius: 7,
    backgroundColor: "#D2D2D2",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 22,
  },

  priceSkeleton: {
    width: 80,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginBottom: 12,
  },

  titleSkeleton: {
    width: "55%",
    height: 10,
    borderRadius: 6,
    backgroundColor: "#D9D9D9",
    marginBottom: 12,
  },

  quantitySkeleton: {
    width: "65%",
    height: 10,
    borderRadius: 6,
    backgroundColor: "#D9D9D9",
    marginBottom: 12,
  },

  locationSkeleton: {
    width: "75%",
    height: 8,
    borderRadius: 6,
    backgroundColor: "#D9D9D9",
    marginBottom: 20,
  },

  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },

  buttonSkeleton: {
    flex: 1,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#E2E2E2",
  },
});
