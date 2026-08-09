import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { setCategory } from "@/redux/filterSlice";
import { AppDispatch } from "@/redux/store";
import ProductItemShimmer from "@/utils/ProductItemShimmer";
import { router } from "expo-router";
import { memo } from "react";
import { useDispatch } from "react-redux";
import RightIcon from "../../../assets/icons/chevronRight.svg";
import { useGetProductsByCategoryQuery } from "../../redux/homeApi";
import ProductCard from "../components/ProductCard";

interface Props {
  categoryId: number;
  title: string;
}

function ItemSection({ categoryId, title }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useGetProductsByCategoryQuery({
    categoryId: categoryId,
    limit: 6,
    topFavorites: 9,
  });

  if (isLoading) {
    return <ProductItemShimmer />;
  }

  if (error) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Popular in {title}</Text>
        <Text style={styles.error}>Failed to load products</Text>
      </View>
    );
  }

  if (response?.data.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <TouchableOpacity
        key={categoryId}
        style={styles.titleview}
        activeOpacity={0.8}
        onPress={() => {
          dispatch(
            setCategory({
              id: categoryId,
              name: title,
            }),
          );

          router.push("/screens/categoryFilterList");
        }}
      >
        <Text style={styles.title}>Popular in {title}</Text>
        <RightIcon height={22} color="#0a0a0a" />
      </TouchableOpacity>

      <FlashList
        horizontal
        data={response?.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
export default memo(ItemSection);

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    marginStart: 8,
  },
  titleview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    marginStart: 11,
    fontFamily: "PoppinsMedium",
  },

  error: {
    color: "red",
    marginHorizontal: 16,
  },
});
