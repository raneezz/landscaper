import SortIcon from "@/assets/icons/sort.svg";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import {
  clearFilters,
  setCategory,
  setCity,
  setPrice,
  setSearch,
  setSort,
  setSortBy,
  setTopFavorites,
} from "@/redux/filterSlice";
import CategoryListingCardShimmer from "@/utils/CategoryListingCardShimmer";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetFilterFieldsQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/homeApi";
import type { AppDispatch, RootState } from "../../redux/store";
import CategoryBottomSheet from "../components/Category/CategoryBottomSheet";
import CategoryListingCard from "../components/Category/CategoryListingCard";
import EmiratesBottomSheet from "../components/Category/EmiratesBottomSheet";
import FilterBar from "../components/Category/FilterBar";
import PriceBottomSheet from "../components/Category/PriceBottomSheet";
import SortBottomSheet from "../components/Category/SortBottomSheet";

export default function CategoryFilterList() {
  const dispatch = useDispatch<AppDispatch>();

  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [showEmirates, setShowEmirates] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showPriceSheet, setShowPriceSheet] = useState(false);

  const filters = useSelector((state: RootState) => state.filters);

  //set Filter
  const { data: filterFields = [], isLoading: filterFieldsLoading } =
    useGetFilterFieldsQuery(filters.categoryId ?? 0, {
      skip: filters.categoryId == null,
    });

  const is_priceSale =
    !filterFieldsLoading && filterFields[0]?.field_id === "Price_Sale";

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: cities = [] } = useGetCitiesQuery();

  //search
  const [searchTxt, setSearchTxt] = useState(filters.search);

  const handleCategorySelect = (category: any) => {
    dispatch(
      setCategory({
        id: category.id,
        name: category.category_en,
      }),
    );
    setShowCategorySheet(false);
  };

  //Load pro
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetProductsByCategoryQuery({
    categoryId: filters.categoryId,
    cityId: filters.cityId,
    sort: filters.sort,
    sortBy: filters.sortBy,
    topFavorites: filters.topFavorites,
    filters: filters.filters,
    search: filters.search,
  });

  const { products, totalCount } = useMemo(() => {
    return {
      products: response?.data ?? [],
      totalCount: response?.total_count ?? 0,
    };
  }, [response]);

  // const totalCount = data.total_count ?? 0;

  const openSort = () => {
    setShowSortSheet(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.searchRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              dispatch(clearFilters());
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#183B63" />
          </Pressable>

          <View style={styles.searchContainer}>
            <TextInput
              value={searchTxt}
              onChangeText={setSearchTxt}
              placeholder="Search for anything"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              returnKeyType="search"
              onSubmitEditing={() => {
                dispatch(setTopFavorites({ id: null }));
                dispatch(setSearch(searchTxt.trim()));
              }}
            />
            {searchTxt.length > 0 && (
              <Pressable
                style={styles.clearSearchButton}
                onPress={() => {
                  setSearchTxt("");
                  dispatch(setSearch(""));
                  dispatch(setTopFavorites({ id: 9 }));
                }}
              >
                <Ionicons name="close" size={22} color="#7D8798" />
              </Pressable>
            )}
            <Pressable
              style={styles.searchButton}
              onPress={() => {
                dispatch(setTopFavorites({ id: null }));
                dispatch(setSearch(searchTxt.trim()));
                console.log("Serach==", searchTxt.trim());
              }}
            >
              <Ionicons name="search" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <FilterBar
          categoryName={filters.categoryName || "All Categories"}
          emirate={filters.cityName || "All Emirates"}
          filterCount={1}
          fields={filterFields}
          onFilterPress={() => {}}
          onCategoryPress={() => {
            setShowCategorySheet(true);
          }}
          onEmiratePress={() => {
            setShowEmirates(true);
          }}
          onFieldPress={(field) => {
            if (field.field_id === "Price_Sale") {
              setShowPriceSheet(true);
            }

            if (field.field_id === "Quantity") {
            }

            if (field.field_id === "Height") {
            }
          }}
        />
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listingsTitle}>Listings</Text>
        <Text style={styles.listingsCount}>({totalCount})</Text>
      </View>
      <FlashList
        data={products}
        keyExtractor={(item: any, index) => String(item.id ?? index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshing={isFetching}
        renderItem={({ item }) => <CategoryListingCard product={item} />}
        ListEmptyComponent={
          isLoading ? (
            <>
              <CategoryListingCardShimmer />
              <CategoryListingCardShimmer />
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>No datas found</Text>
            </View>
          )
        }
      />
      <Pressable style={styles.sortButton} onPress={openSort}>
        <SortIcon />

        <Text style={styles.sortText}>Sort</Text>
      </Pressable>

      <CategoryBottomSheet
        visible={showCategorySheet}
        categories={categories}
        selectedCategoryId={filters.categoryId}
        onSelect={handleCategorySelect}
        onClose={() => {
          setShowCategorySheet(false);
        }}
      />

      <EmiratesBottomSheet
        visible={showEmirates}
        cities={cities}
        selectedCityId={filters.cityId}
        onClose={() => setShowEmirates(false)}
        onSelect={(city) => {
          if (city === null) {
            dispatch(
              setCity({
                id: null,
                name: "All Emirates",
              }),
            );
          } else {
            dispatch(
              setCity({
                id: city.id,
                name: city.name_en,
              }),
            );
          }

          setShowEmirates(false);
        }}
      />

      <SortBottomSheet
        visible={showSortSheet}
        selectedSort={filters.sort}
        selectedSortBy={filters.sortBy}
        isPriceSale={is_priceSale}
        onSelect={() => {}}
        onClose={() => {
          setShowSortSheet(false);
        }}
        onClear={() => {
          dispatch(setSort(null));
          dispatch(setSortBy(null));
          dispatch(setTopFavorites({ id: 9 }));

          setShowSortSheet(false);
        }}
        onApply={(sort, sortBy) => {
          dispatch(setSort(sort));
          dispatch(setSortBy(sortBy));
          dispatch(setTopFavorites({ id: null }));

          setShowSortSheet(false);
        }}
      />

      <PriceBottomSheet
        visible={showPriceSheet}
        minPrice={filters.minPrice !== "" ? Number(filters.minPrice) : null}
        maxPrice={filters.maxPrice !== "" ? Number(filters.maxPrice) : null}
        onClose={() => {
          setShowPriceSheet(false);
        }}
        onApply={(min, max) => {
          dispatch(
            setPrice({
              min: min !== null ? String(min) : "",
              max: max !== null ? String(max) : "",
            }),
          );

          setShowPriceSheet(false);
        }}
        onClear={() => {
          dispatch(
            setPrice({
              min: "",
              max: "",
            }),
          );

          setShowPriceSheet(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  topArea: {
    backgroundColor: "#FFFFFF",
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  backButton: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    flexDirection: "row",
    overflow: "hidden",
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#183B63",
  },

  searchButton: {
    width: 65,
    backgroundColor: "#0BAE17",
    alignItems: "center",
    justifyContent: "center",
  },

  filterRow: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  filterText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  filterCount: {
    width: 18,
    height: 18,
    borderRadius: 12,
    backgroundColor: "#287BE0",
    alignItems: "center",
    justifyContent: "center",
  },

  filterCountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontFamily: "PoppinsMedium",
  },

  verticalLine: {
    width: 1,
    height: 38,
    backgroundColor: "#DDDDDD",
    marginHorizontal: 4,
  },

  categoryButton: {
    height: 35,
    minWidth: 150,
    maxWidth: 190,
    borderWidth: 2,
    borderColor: "#222222",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  clearSearchButton: {
    width: 45,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },

  listingsTitle: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  listingsCount: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#777777",
    marginLeft: 5,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  imageContainer: {
    height: 370,
    backgroundColor: "#EEEEEE",
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  heartButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  imageCount: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  imageCountText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  imageCountSlash: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  dots: {
    position: "absolute",
    bottom: 13,
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDDDDD",
  },

  cardContent: {
    padding: 18,
  },

  price: {
    fontSize: 23,
    fontFamily: "PoppinsSemiBold",
    color: "#E87A1B",
    marginBottom: 8,
  },

  productTitle: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
    textAlign: "right",
    marginBottom: 10,
  },

  quantity: {
    fontSize: 17,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
    marginBottom: 8,
  },

  location: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#777777",
    marginBottom: 14,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
  },

  callButton: {
    flex: 1,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#FFF1E7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  callText: {
    fontSize: 17,
    fontFamily: "PoppinsMedium",
    color: "#374151",
  },

  chatButton: {
    flex: 1,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#EAF8EA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  chatText: {
    fontSize: 17,
    fontFamily: "PoppinsMedium",
    color: "#374151",
  },

  mailButton: {
    flex: 1,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#EAF3FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  mailText: {
    fontSize: 17,
    fontFamily: "PoppinsMedium",
    color: "#374151",
  },

  sortButton: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  sortText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  errorText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#777777",
    marginBottom: 15,
  },

  retryButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: "#0BAE17",
    borderRadius: 10,
  },

  retryText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsMedium",
  },

  emptyContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
