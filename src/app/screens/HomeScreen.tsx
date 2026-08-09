import { setCategory } from "@/redux/filterSlice";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery, useGetCitiesQuery } from "../../redux/homeApi";
import type { AppDispatch } from "../../redux/store";

import CategoryGrid from "../components/Category/CategoryGrid";
import Header from "../components/Header";
import ItemCities from "../components/ItemCities";
import ItemSection from "../components/ItemSection";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoryError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const { data: cities = [] } = useGetCitiesQuery();

  const homeData: any[] = useMemo(() => {
    return [
      {
        type: "header",
      },

      {
        type: "search",
      },

      {
        type: "categories",
        data: categories,
      },

      {
        type: "cities",
        data: cities,
      },

      ...categories.map((item: any) => ({
        type: "categoryProducts",
        category: item,
      })),
    ];
  }, [categories, cities]);

  if (categoriesLoading) {
    return <SafeAreaView style={styles.loaderContainer}></SafeAreaView>;
  }

  if (categoryError) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Button
          title="Retry"
          onPress={() => {
            refetchCategories();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlashList
        data={homeData}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        stickyHeaderIndices={[1]}
        getItemType={(item) => item.type}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          switch (item.type) {
            case "header":
              return <Header />;

            case "search":
              return (
                <View style={styles.searchSticky}>
                  <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              );

            case "categories":
              return (
                <CategoryGrid
                  categories={item.data}
                  onCategoryPress={(category) => {
                    dispatch(
                      setCategory({
                        id: category.id,
                        name: category.category_en,
                      }),
                    );

                    router.push("/screens/categoryFilterList");
                  }}
                  onMorePress={() => {
                    router.push("/screens/categories");
                  }}
                />
              );
            case "cities":
              return <ItemCities cities={item.data} />;

            case "categoryProducts":
              return (
                <ItemSection
                  categoryId={item.category.id}
                  title={item.category.category_en}
                />
              );

            default:
              return null;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSticky: {
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    zIndex: 10,
  },
});
