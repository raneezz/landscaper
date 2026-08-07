import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  product: any;
  onPress?: () => void;
}

function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{
          uri: product.image ?? "https://via.placeholder.com/150",
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.price}>
        {product.price_sale ?? product.price_sale ?? ""}
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        {product.title ?? product.title_en ?? ""}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginLeft: 16,
    marginBottom: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 120,
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "PoppinsRegular",
    marginTop: 8,
    marginHorizontal: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
