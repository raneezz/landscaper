import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { homeApi } from "../../redux/homeApi";
import { RootState } from "../../redux/store";
import CategoryItem from "../components/Category/CategoryItem";

const EMPTY_CATEGORIES: any[] = [];

const selectCategories = createSelector(
  homeApi.endpoints.getCategories.select(),
  (result) => result.data ?? EMPTY_CATEGORIES,
);

export default function CategoriesScreen() {
  const categories = useSelector((state: RootState) => selectCategories(state));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#263238" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Categories</Text>
          <Text style={styles.subtitle}>Find what you're looking for</Text>
        </View>
      </View>

      <FlashList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  errorText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: "#666666",
  },

  header: {
    marginTop: 30,
    marginBottom: 4,
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 20,
  },

  headerRight: {
    width: 40,
  },

  title: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#263238",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 2,
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: "#697586",
    textAlign: "center",
  },

  listContent: {
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 10,
  },
});
