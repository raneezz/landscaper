import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCategoriesQuery, useGetCitiesQuery } from "../../redux/homeApi";
import CategoryGrid from "../components/CategoryGrid";
import Header from "../components/Header";
import ItemCities from "../components/ItemCities";
import ItemSection from "../components/ItemSection";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const [showStickySearch, setShowStickySearch] = useState(false);

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
  }, [categories]);

  if (categoriesLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3E8E41" />
      </SafeAreaView>
    );
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
    <FlashList
      data={homeData}
      keyExtractor={(_, index) => index.toString()}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        switch (item.type) {
          case "header":
            return <Header />;

          case "search":
            return (
              <View style={styles.searchSticky}>
                <SearchBar />
              </View>
            );

          case "categories":
            return (
              <CategoryGrid
                categories={item.data}
                onCategoryPress={(category) => {
                  console.log("Selected category:", category.id);
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
  },
});
