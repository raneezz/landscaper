import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCategoriesQuery } from "../api/homeApi";
import CategoryGrid from "../components/CategoryGrid";
import Header from "../components/Header";
import ItemSection from "../components/ItemSection";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const { data: categories = [] } = useGetCategoriesQuery();

  const DATA = useMemo(() => {
    const list: any[] = [
      { type: "header" },
      { type: "search" },
      { type: "categories", data: categories },
    ];
    categories.forEach((category: any) => {
      list.push({
        type: "products",
        categoryId: category.id,
        title: category.category_en,
      });
    });

    return list;
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={DATA}
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
              return <CategoryGrid categories={item.data} />;

            case "products":
              return (
                <ItemSection title={item.title} categoryId={item.categoryId} />
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
  card: {
    height: 140,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },
});
