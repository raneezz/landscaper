import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

interface Props {
  title: string;
  categoryId: number;
}

export default function ItemSection({ title, categoryId }: Props) {
  // Replace with your RTK Query
  const products = [
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
    { id: "4", name: "Product 3" },
    { id: "5", name: "Product 3" },
    { id: "6", name: "Product 3" },
  ];

  return (
    <View>
      <Text>{title}</Text>

      <FlashList
        horizontal
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width: 120, height: 120 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
