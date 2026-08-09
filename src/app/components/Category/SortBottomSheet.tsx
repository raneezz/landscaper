import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export interface SortOption {
  label: string;
  sort: "desc" | "asc";
  sortBy: "created_at" | "price_sale";
}

interface SortBottomSheetProps {
  visible: boolean;
  selectedSort: string | null;
  selectedSortBy: string | null;
  isPriceSale: boolean;
  onSelect: (value: string | null) => void;
  onClose: () => void;
  onApply: (sort: string | null, sortBy: string | null) => void;
  onClear: () => void;
}

const SORT_OPTIONS: SortOption[] = [
  {
    label: "Newest to Oldest",
    sort: "desc",
    sortBy: "created_at",
  },
  {
    label: "Oldest to Newest",
    sort: "asc",
    sortBy: "created_at",
  },
  {
    label: "Price Highest to Lowest",
    sort: "desc",
    sortBy: "price_sale",
  },
  {
    label: "Price Lowest to Highest",
    sort: "asc",
    sortBy: "price_sale",
  },
];

export default function SortBottomSheet({
  visible,
  selectedSort,
  selectedSortBy,
  isPriceSale,
  onSelect,
  onClose,
  onApply,
  onClear,
}: SortBottomSheetProps) {
  const [tempSort, setTempSort] = useState<string | null>(selectedSort);
  const [tempSortBy, setTempSortBy] = useState<string | null>(selectedSortBy);

  useEffect(() => {
    if (visible) {
      setTempSort(selectedSort);
      setTempSortBy(selectedSortBy);
    }
  }, [visible, selectedSort, selectedSortBy]);

  const sortOptions = SORT_OPTIONS.filter((option) => {
    if (option.sortBy === "price_sale") {
      return isPriceSale;
    }

    return true;
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Sort</Text>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={12} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.optionsContainer}>
            {sortOptions.map((option) => {
              const isSelected =
                option.sort === tempSort && option.sortBy === tempSortBy;

              return (
                <Pressable
                  key={`${option.sortBy}-${option.sort}`}
                  style={styles.option}
                  onPress={() => {
                    setTempSort(option.sort);
                    setTempSortBy(option.sortBy);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isSelected && (
                    <Ionicons name="checkmark" size={22} color="#078B25" />
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.bottomButtons}>
            <Pressable style={styles.clearButton} onPress={onClear}>
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>

            <Pressable
              style={styles.sortButton}
              onPress={() => {
                onApply(tempSort, tempSortBy);
              }}
            >
              <Text style={styles.sortText}>Sort</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 22,
    maxHeight: "90%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  closeButton: {
    width: 25,
    height: 25,
    borderRadius: 22,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },

  optionsContainer: {
    paddingHorizontal: 30,
  },

  option: {
    minHeight: 55,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#183B63",
  },

  selectedOptionText: {
    fontFamily: "PoppinsMedium",
  },

  bottomButtons: {
    flexDirection: "row",
    gap: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 32,
  },

  clearButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#222222",
  },

  sortButton: {
    flex: 1,
    height: 45,
    backgroundColor: "#08A91D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  sortText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});
