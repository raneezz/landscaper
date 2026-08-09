import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface FilterField {
  id: number;
  category_id: number;
  field_id: string;
  name_en: string;
  name_ar?: string;
}

import Filtercon from "@/assets/icons/filter.svg";

interface FilterBarProps {
  categoryName?: string;
  emirate?: string;
  filterCount?: number;

  fields?: FilterField[];

  onFilterPress?: () => void;
  onCategoryPress?: () => void;
  onEmiratePress?: () => void;

  onFieldPress?: (field: FilterField) => void;
}

export default function FilterBar({
  categoryName = "All Categories",
  emirate = "All Emirates",
  filterCount = 0,
  fields = [],

  onFilterPress,
  onCategoryPress,
  onEmiratePress,
  onFieldPress,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        bounces
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <Filtercon />

          <Text style={styles.filterText}>Filters</Text>

          {filterCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[styles.dropdown, styles.categoryDropdown]}
          onPress={onCategoryPress}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownText} numberOfLines={1}>
            {categoryName}
          </Text>

          <Ionicons name="chevron-down" size={14} color="#183B63" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, styles.categoryDropdown]}
          onPress={onEmiratePress}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownText} numberOfLines={1}>
            {emirate}
          </Text>

          <Ionicons name="chevron-down" size={14} color="#183B63" />
        </TouchableOpacity>

        {fields.map((field) => (
          <TouchableOpacity
            key={field.id}
            style={[styles.dropdown, styles.smallDropdown]}
            onPress={() => onFieldPress?.(field)}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownText} numberOfLines={1}>
              {field.name_en}
            </Text>

            <Ionicons name="chevron-down" size={14} color="#183B63" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 30,
    gap: 14,
  },

  filterButton: {
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexShrink: 0,
  },

  filterText: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  badge: {
    width: 18,
    height: 18,
    borderRadius: 15,
    backgroundColor: "#087FE5",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "PoppinsSemiBold",
  },

  divider: {
    width: 1,
    height: 25,
    backgroundColor: "#D8D8D8",
    marginHorizontal: 2,
    flexShrink: 0,
  },

  dropdown: {
    height: 30,
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
    flexShrink: 0,
  },

  categoryDropdown: {
    height: 30,
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

  smallDropdown: {
    width: 150,
  },

  dropdownText: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
    flexShrink: 1,
    marginRight: 10,
  },
});
