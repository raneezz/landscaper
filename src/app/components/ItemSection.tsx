import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useGetProductsByCategoryQuery } from "../../redux/homeApi";
import ProductCard from "../components/ProductCard";

interface Props {
  categoryId: number;
  title: string;
}

export default function ItemSection({ categoryId, title }: Props) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(categoryId);

  if (isLoading) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>

        <ActivityIndicator size="small" color="#2E7D32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.error}>Failed to load products</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <FlashList
        horizontal
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 12,
  },

  error: {
    color: "red",
    marginHorizontal: 16,
  },
});
