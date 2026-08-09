import { IMG_URL } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CategoryListingCardProps {
  product: any;
  onPress?: () => void;
}

export default function CategoryListingCard({
  product,
  onPress,
}: CategoryListingCardProps) {
  const firstImage = product.images?.[0];
  const imageUrl = firstImage ? `${IMG_URL}${firstImage}/content` : undefined;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* HEART */}
        <Pressable style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
        </Pressable>

        {/* IMAGE COUNT */}
        <View style={styles.imageCount}>
          <Text style={styles.imageCountText}>
            1 / {product?.images?.length || 1}
          </Text>

          <Ionicons name="image-outline" size={16} color="#FFFFFF" />
        </View>
      </View>

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

        {product?.fields?.Quantity?.original_value && (
          <Text style={styles.quantity} numberOfLines={1}>
            Quantity: {product.fields.Quantity.original_value} kg
          </Text>
        )}
        {/* LOCATION */}
        <Text style={styles.location} numberOfLines={1}>
          {product?.location_metadata.formatted_address}
        </Text>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <Pressable style={[styles.actionButton, styles.callButton]}>
            <Ionicons name="call-outline" size={20} color="#E87A1B" />
            <Text style={styles.actionText}>Call</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, styles.chatButton]}>
            <Ionicons name="logo-whatsapp" size={20} color="#159447" />
            <Text style={styles.actionText}>Chat</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, styles.mailButton]}>
            <Ionicons name="mail-outline" size={20} color="#2385D8" />
            <Text style={styles.actionText}>Mail</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 5,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  imageContainer: {
    width: "100%",
    height: 150,
    position: "relative",
    backgroundColor: "#F2F2F2",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,

    width: 18,
    height: 18,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.15)",
  },

  imageCount: {
    position: "absolute",
    bottom: 10,
    left: 10,
    height: 25,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.55)",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  imageCountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "PoppinsMedium",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18,
  },

  price: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#E87A1B",
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    lineHeight: 28,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
    textAlign: "right",
    marginBottom: 10,
  },

  quantity: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#172B4D",
    marginBottom: 8,
  },

  location: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#8A8A8A",

    marginBottom: 14,
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

  actionRow: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    height: 35,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  callButton: {
    backgroundColor: "#FFF0E6",
  },

  chatButton: {
    backgroundColor: "#EAF7EC",
  },

  mailButton: {
    backgroundColor: "#EAF4FD",
  },

  actionText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#26384F",
  },
});
