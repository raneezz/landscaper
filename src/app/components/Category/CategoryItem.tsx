import { setCategory } from "@/redux/filterSlice";
import { AppDispatch } from "@/redux/store";
import { IMG_URL } from "@/utils/constants";
import { router } from "expo-router";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import { useDispatch } from "react-redux";

interface Category {
  id: number;
  category_en: string;
  category_ar?: string;
  icon_img?: string;
}

interface Props {
  item: Category;
}

function CategoryItem({ item }: Props) {
  const iconUrl = item.icon_img ? `${IMG_URL}${item.icon_img}/content` : null;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        dispatch(
          setCategory({
            id: item.id,
            name: item.category_en,
          }),
        );

        router.push("/screens/categoryFilterList");
      }}
    >
      {iconUrl && <SvgUri uri={iconUrl} width={24} height={24} />}

      <Text style={styles.title} numberOfLines={2}>
        {item.category_en}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(CategoryItem);

const styles = StyleSheet.create({
  card: {
    width: "85%",
    height: 90,
    alignItems: "center",
    margin: 7,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 2,
  },

  title: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    fontFamily: "PoppinsMedium",
    color: "#374151",
  },
});
