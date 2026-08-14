import Mappin from "@/assets/icons/map.svg";
import Verified from "@/assets/icons/verified.svg";
import {
  useGetAdByIdQuery,
  useGetBusinessByIdQuery,
  useGetProductsByCategoryQuery,
} from "@/redux/homeApi";
import { IMG_URL } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDate } from "../../utils/formatDate";
import ProductCard from "../components/ProductCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const getImageUrl = (imageId: string) => {
  return `${IMG_URL}${imageId}/content`;
};

export default function AdDetail() {
  const insets = useSafeAreaInsets();
  const { id, userId } = useLocalSearchParams<{ id: string; userId: string }>();

  const productId = Number(id);
  const UserId = Number(userId);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetAdByIdQuery(productId, {
    skip: !productId,
  });

  const { data: userBusinessData } = useGetBusinessByIdQuery(UserId, {
    skip: !UserId,
  });

  const initials =
    `${userBusinessData?.first_name_en?.charAt(0) ?? ""}${userBusinessData?.last_name_en?.charAt(0) ?? ""}`.toUpperCase();
  const [activeImage, setActiveImage] = useState(0);

  const imageList = useMemo(() => {
    if (!product?.images) {
      return [];
    }

    return product.images.filter(Boolean);
  }, [product?.images]);

  const categoryId = product?.category_id;

  const { data: otherProductsData, isLoading: otherProductsLoading } =
    useGetProductsByCategoryQuery(
      {
        categoryId: categoryId,
        limit: 6,
        index: 0,
        topFavorites: 9,
      },
      {
        skip: !categoryId,
      },
    );

  const otherProducts = useMemo(() => {
    return (
      otherProductsData?.data?.filter((item) => item.id !== product?.id) ?? []
    );
  }, [otherProductsData?.data, product?.id]);

  const handleImageScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / SCREEN_WIDTH);

    setActiveImage(index);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#08A91D" />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Unable to load product details.</Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { bottom: insets.bottom }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <FlatList
            data={imageList}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Image
                source={{ uri: getImageUrl(item) }}
                style={styles.productImage}
                contentFit="cover"
              />
            )}
          />

          <Pressable style={styles.backIcon} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={18} color="#bfc9d4" />
          </Pressable>

          <View style={styles.imageCount}>
            <Text style={styles.imageCountText}>
              {activeImage + 1} / {imageList.length}
            </Text>
            <Ionicons name="image-outline" size={15} color="#FFFFFF" />
          </View>

          <View style={styles.dotsContainer}>
            {imageList.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === activeImage && styles.activeDot]}
              />
            ))}
          </View>

          <Pressable style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={18} color="#183B63" />
          </Pressable>

          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={18} color="#183B63" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {product.title_en || product.title_ar}
          </Text>

          {!!product.description_en && (
            <Text style={styles.description}>{product.description_en}</Text>
          )}

          <View style={styles.divider} />

          <View style={styles.postedRow}>
            <Text style={styles.mainLabel}>Posted:</Text>

            <Text style={styles.postedDate}>
              {formatDate(product?.created_at)}
            </Text>
          </View>

          <View style={styles.businessSection}>
            <View style={styles.businessLogo}>
              {product.business_logo ? (
                <Image
                  source={{ uri: product.business_logo }}
                  style={styles.businessLogoImage}
                />
              ) : (
                <Text style={styles.businessInitial}>{initials}</Text>
              )}
            </View>

            <View>
              <View style={styles.businessNameRow}>
                <Text style={styles.businessName}>
                  {userBusinessData?.business_name ||
                    `${userBusinessData?.first_name_en} ${userBusinessData?.last_name_en}`}
                </Text>
                {userBusinessData?.is_verified && <Verified />}
              </View>

              <View style={styles.ratingRow}>
                <Text style={styles.rating}>
                  {userBusinessData?.average_rating}
                </Text>

                <Ionicons name="star" size={11} color="#FFB21D" />

                <Text style={styles.ratingCount}>
                  ({userBusinessData?.rating_count} Ratings)
                </Text>
              </View>

              <View style={styles.businessActions}>
                <Pressable>
                  <Text style={styles.greenAction}>Rate This Business</Text>
                </Pressable>

                <View style={styles.actionDivider} />

                <Pressable>
                  <Text style={styles.greenAction}>View All Listings</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationSection}>
            <Text style={styles.mainLabel}>Location</Text>

            <View style={styles.locationRow}>
              <Mappin />
              <Text style={styles.locationText}>
                {product.location_metadata.formatted_address}
              </Text>
            </View>

            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="location" size={16} color="#E53935" />

                <Text style={styles.mapText}>Map</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.otherListings}>
          <Text style={styles.otherListLabel}>Other Listings</Text>

          <FlashList
            horizontal
            data={otherProducts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ProductCard product={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar]}>
        <Pressable style={[styles.bottomButton, styles.callButton]}>
          <Ionicons name="call-outline" size={20} color="#F56C18" />

          <Text style={styles.actionText}>Call</Text>
        </Pressable>

        <Pressable style={[styles.bottomButton, styles.chatButton]}>
          <Ionicons name="logo-whatsapp" size={20} color="#078B25" />

          <Text style={styles.actionText}>Chat</Text>
        </Pressable>

        <Pressable style={[styles.bottomButton, styles.emailButton]}>
          <Ionicons name="mail-outline" size={20} color="#328BF4" />

          <Text style={styles.actionText}>Email</Text>
        </Pressable>

        <Pressable style={[styles.bottomButton, styles.visitButton]}>
          <Ionicons name="globe-outline" size={20} color="#FFBD16" />

          <Text style={styles.actionText}>Visit</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 110,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  errorText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
    marginBottom: 20,
  },

  backButton: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#08A91D",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsMedium",
  },

  imageContainer: {
    width: "100%",
    height: 400,
    position: "relative",
  },

  productImage: {
    width: SCREEN_WIDTH,
    height: 400,
  },

  backIcon: {
    position: "absolute",
    top: 65,
    left: 20,
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: "#17161675",
    alignItems: "center",
    justifyContent: "center",
  },

  imageCount: {
    position: "absolute",
    left: 15,
    bottom: 20,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  imageCountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontFamily: "PoppinsMedium",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    opacity: 0.6,
  },

  activeDot: {
    width: 8,
    height: 8,
    opacity: 1,
  },

  shareButton: {
    position: "absolute",
    right: 75,
    bottom: -20,
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  favoriteButton: {
    position: "absolute",
    right: 20,
    bottom: -20,
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 35,
  },

  title: {
    fontSize: 16,
    lineHeight: 34,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  description: {
    fontSize: 13,
    lineHeight: 28,
    fontFamily: "PoppinsRegular",
    color: "#183B63",
    marginTop: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },

  postedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  mainLabel: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  postedDate: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#888888",
  },

  businessSection: {
    flexDirection: "row",
    marginTop: 25,
    gap: 18,
  },

  businessLogo: {
    width: 65,
    height: 65,
    borderRadius: 80,
    backgroundColor: "#DDEDE1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  businessLogoImage: {
    width: "100%",
    height: "100%",
  },

  businessInitial: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
    color: "#078B25",
  },

  businessNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  businessName: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 8,
  },

  rating: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  ratingCount: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#46556D",
  },

  businessActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  greenAction: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#078B25",
  },

  actionDivider: {
    width: 1,
    height: 10,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 15,
  },

  locationSection: {
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 15,
    justifyContent: "center",
    gap: 10,
  },

  locationText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "PoppinsRegular",
    color: "#98A5B8",
  },

  mapContainer: {
    height: 175,
    marginTop: 15,
    borderRadius: 8,
    overflow: "hidden",
  },

  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#e3edef",
    alignItems: "center",
    justifyContent: "center",
  },

  mapText: {
    fontSize: 10,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
    marginTop: 10,
  },
  otherListLabel: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
    marginStart: 11,
  },

  otherListings: {
    marginTop: 20,
    paddingHorizontal: 9,
  },

  otherCard: {
    flex: 1,
    height: 170,
    borderRadius: 12,

    backgroundColor: "#E8EDF2",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 90,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  bottomButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  callButton: {
    backgroundColor: "#FFF1E8",
  },

  chatButton: {
    backgroundColor: "#EAF8E9",
  },

  emailButton: {
    backgroundColor: "#E9F3FF",
  },

  visitButton: {
    backgroundColor: "#FFF8E2",
  },

  actionText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },
});
