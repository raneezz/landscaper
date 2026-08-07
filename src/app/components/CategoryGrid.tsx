import { IMG_URL } from "@/utils/constants";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";

interface Category {
  id: number;
  category_en: string;
  icon_img?: string;
}
interface Props {
  categories: Category[];
  onMorePress?: () => void;
  onCategoryPress?: (category: Category) => void;
}

function CategoryGrid({ categories, onMorePress, onCategoryPress }: Props) {
  const visibleCategories = categories.slice(0, 8);
  return (
    <View style={styles.container}>
      {visibleCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => onCategoryPress?.(category)}
        >
          <SvgUri
            uri={`${IMG_URL}${category.icon_img}/content`}
            width={24}
            height={24}
          />
          <Text style={styles.text}>{category.category_en}</Text>
        </TouchableOpacity>
      ))}

      {categories.length > 8 && (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={onMorePress}
        >
          <Text style={styles.text}>More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
export default memo(CategoryGrid);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  moreIcon: {
    fontSize: 40,
    fontWeight: "300",
  },

  card: {
    width: "29%",
    height: 80,
    alignItems: "center",
    margin: 5,
    marginBottom: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 2,
  },

  text: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    fontFamily: "PoppinsRegular",
  },
});
