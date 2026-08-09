import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { setSort, SortOption } from "../../redux/filterSlice";

import type { AppDispatch, RootState } from "../../redux/store";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const options: {
  value: SortOption;
  label: string;
}[] = [
  {
    value: "newest",
    label: "Newest to Oldest",
  },
  {
    value: "oldest",
    label: "Oldest to Newest",
  },
  {
    value: "price_high",
    label: "Price Highest to Lowest",
  },
  {
    value: "price_low",
    label: "Price Lowest to Highest",
  },
];

export default function SortSheet({ visible, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const selected = useSelector((state: RootState) => state.filters.sort);

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
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Sort</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </Pressable>
          </View>

          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.row}
              onPress={() => {
                dispatch(setSort(option.value));
              }}
            >
              <Text style={styles.text}>{option.label}</Text>

              {selected === option.value && <Text style={styles.check}>✓</Text>}
            </Pressable>
          ))}

          <View style={styles.buttons}>
            <Pressable
              style={styles.clearButton}
              onPress={() => {
                dispatch(setSort("newest"));
              }}
            >
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>

            <Pressable style={styles.sortButton} onPress={onClose}>
              <Text style={styles.sortButtonText}>Sort</Text>
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 25,
  },

  handle: {
    alignSelf: "center",
    width: 68,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#D5D5D5",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#444444",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 28,
    lineHeight: 33,
  },

  row: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 19,
    fontFamily: "PoppinsRegular",
    color: "#183B63",
  },

  check: {
    fontSize: 30,
    color: "#168C35",
  },

  buttons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 15,
  },

  clearButton: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderColor: "#183B63",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 19,
    fontFamily: "PoppinsSemiBold",
    color: "#183B63",
  },

  sortButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#0BAE17",
    alignItems: "center",
    justifyContent: "center",
  },

  sortButtonText: {
    fontSize: 19,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});
