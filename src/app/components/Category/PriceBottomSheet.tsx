import { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface PriceBottomSheetProps {
  visible: boolean;
  minPrice: number | null;
  maxPrice: number | null;

  onClose: () => void;
  onApply: (minPrice: number | null, maxPrice: number | null) => void;
  onClear: () => void;
}

export default function PriceBottomSheet({
  visible,
  minPrice,
  maxPrice,
  onClose,
  onApply,
  onClear,
}: PriceBottomSheetProps) {
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  useEffect(() => {
    if (visible) {
      setTempMinPrice(minPrice !== null ? String(minPrice) : "");
      setTempMaxPrice(maxPrice !== null ? String(maxPrice) : "");
    }
  }, [visible, minPrice, maxPrice]);

  const handleApply = () => {
    const min = tempMinPrice.trim() !== "" ? Number(tempMinPrice) : null;
    const max = tempMaxPrice.trim() !== "" ? Number(tempMaxPrice) : null;
    onApply(min, max);
  };

  const handleClear = () => {
    setTempMinPrice("");
    setTempMaxPrice("");

    onClear();
  };

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
          <Text style={styles.title}>Price</Text>

          <Text style={styles.subtitle}>Set your desired price range</Text>

          <View style={styles.rangeRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={tempMinPrice}
                onChangeText={setTempMinPrice}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#748096"
              />

              <Text style={styles.currency}>Ð</Text>
            </View>

            <Text style={styles.toText}>to</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={tempMaxPrice}
                onChangeText={setTempMaxPrice}
                keyboardType="numeric"
                placeholder="Any"
                placeholderTextColor="#748096"
              />

              <Text style={styles.currency}>Ð</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>

            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
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
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 32,
  },

  title: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#748096",
  },

  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
  },

  inputContainer: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#D8DCE2",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
    paddingVertical: 0,
  },

  currency: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#43536D",
  },

  toText: {
    marginHorizontal: 16,
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#183B63",
  },

  buttons: {
    flexDirection: "row",
    gap: 30,
    marginTop: 25,
  },

  clearButton: {
    flex: 1,
    height: 45,
    borderWidth: 1.5,
    borderColor: "#183B63",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#222222",
  },

  applyButton: {
    flex: 1,
    height: 45,
    backgroundColor: "#08A91D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  applyText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});
