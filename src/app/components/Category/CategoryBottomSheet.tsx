import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Category {
  id: number;
  category_en: string;
  category_ar?: string;
}

interface CategoryBottomSheetProps {
  visible: boolean;
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (category: Category) => void;
  onClose: () => void;
}

export default function CategoryBottomSheet({
  visible,
  categories,
  selectedCategoryId,
  onSelect,
  onClose,
}: CategoryBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Category</Text>
          </View>

          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedCategoryId;

              return (
                <Pressable
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedItem,
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.selectedText,
                    ]}
                    numberOfLines={1}
                  >
                    {item.category_en}
                  </Text>

                  {isSelected && (
                    <Ionicons name="checkmark" size={22} color="#0BAE17" />
                  )}
                </Pressable>
              );
            }}
          />
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
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "65%",
    minHeight: "45%",
    paddingTop: 12,
  },

  handle: {
    width: 68,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#D0D0D0",
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 12,
    marginTop: 15,
  },

  title: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  list: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },

  categoryItem: {
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  selectedItem: {
    // Keep background white like your screenshot.
  },

  categoryText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#183B63",
    paddingRight: 15,
  },

  selectedText: {
    fontFamily: "PoppinsMedium",
    color: "#183B63",
  },
});
