import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCategoriesQuery } from "../../redux/homeApi";
import CategoryGrid from "../components/CategoryGrid";
import Header from "../components/Header";
import ItemSection from "../components/ItemSection";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoryError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

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
    <SafeAreaView style={styles.container}>
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
              return <SearchBar />;

            case "categories":
              return (
                <CategoryGrid
                  categories={item.data}
                  onCategoryPress={(category) => {
                    console.log("Selected category:", category.id);
                  }}
                  onMorePress={() => {
                    console.log("Open all categories");
                  }}
                />
              );

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
});
