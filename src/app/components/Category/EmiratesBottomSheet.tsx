import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface Emirate {
  id: number;
  name_en: string;
}

interface EmiratesBottomSheetProps {
  visible: boolean;
  cities: Emirate[];
  selectedCityId: number | null;
  onSelect: (city: Emirate | null) => void;
  onClose: () => void;
}

export default function EmiratesBottomSheet({
  visible,
  cities,
  selectedCityId,
  onSelect,
  onClose,
}: EmiratesBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Emirates</Text>
          </View>

          <FlatList
            data={cities}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <Pressable
                style={[
                  styles.cityItem,
                  selectedCityId === null && styles.selectedItem,
                ]}
                onPress={() => onSelect(null)}
              >
                <Text
                  style={[
                    styles.cityText,
                    selectedCityId === null && styles.selectedText,
                  ]}
                >
                  All Emirates
                </Text>

                {selectedCityId === null && (
                  <Ionicons name="checkmark" size={22} color="#0BAE17" />
                )}
              </Pressable>
            }
            renderItem={({ item }) => {
              const isSelected = item.id === selectedCityId;

              return (
                <Pressable
                  style={[styles.cityItem, isSelected && styles.selectedItem]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[styles.cityText, isSelected && styles.selectedText]}
                    numberOfLines={1}
                  >
                    {item.name_en}
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

  cityItem: {
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  selectedItem: {
    backgroundColor: "#FFFFFF",
  },

  cityText: {
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
