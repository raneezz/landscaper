import { IMG_URL } from "@/utils/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  product: any;
  onPress?: () => void;
}

function ProductCard({ product, onPress }: Props) {
  const firstImage = product.images?.[0];
  const imageUrl = firstImage ? `${IMG_URL}${firstImage}/content` : undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        router.push({
          pathname: "/screens/AdDetail",
          params: {
            id: product.id.toString(),
            userId: product.created_by.toString(),
          },
        });
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={0}
      />
      <View style={styles.content}>
        {product?.price_sale !== null && product?.price_sale !== undefined && (
          <Text style={styles.price}>{`Ð ${product.price_sale}`}</Text>
        )}

        {product.title_en ? (
          <View>
            <Text style={styles.title_en} numberOfLines={1}>
              {product.title_en}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.title_ar} numberOfLines={1}>
              {product.title_ar}
            </Text>
          </View>
        )}

        {product?.price_sale == null && product?.price_sale == undefined && (
          <Text style={styles.title_en} numberOfLines={1}>
            {product.description_en}
          </Text>
        )}

        <Text style={styles.location} numberOfLines={1}>
          {product.location_metadata.formatted_address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: 9,
    margin: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },

  image: {
    width: "100%",
    height: 105,
  },

  content: {
    paddingHorizontal: 9,
    paddingTop: 6,
    paddingBottom: 6,
  },

  price: {
    flexDirection: "row",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    color: "#FF6B00",

    marginBottom: 2,
  },

  title_en: {
    fontFamily: "PoppinsMedium",
    fontSize: 13,
    color: "#222222",
    marginBottom: 1,
  },
  title_ar: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#222222",
    marginBottom: 1,
    textAlign: "right",
  },

  location: {
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: "#777777",
  },
});
