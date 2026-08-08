import { IMG_URL } from "@/utils/constants";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";
import RightIcon from "../../../assets/icons/chevronRight.svg";

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
          <View style={styles.moreContainer}>
            <Text style={styles.more}>More </Text>
            <RightIcon height={17} color="#166EEA" />
          </View>
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
    paddingHorizontal: 5,
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
    height: 90,
    alignItems: "center",
    margin: 6,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 2,
  },

  text: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    fontFamily: "PoppinsMedium",
    color: "#374151",
  },

  moreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  more: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#166EEA",
  },
});
