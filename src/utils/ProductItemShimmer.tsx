import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductItemShimmer() {
  const skeletons = [1, 2, 3];
  return (
    <View style={styles.section}>
      <FlashList
        horizontal
        data={skeletons}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={() => <ProductSkeleton />}
      />
    </View>
  );
}

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
    fontSize: 14,
    marginBottom: 15,
    marginStart: 11,
    fontFamily: "PoppinsMedium",
  },

  error: {
    color: "red",
    marginHorizontal: 16,
  },
});
