import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from "../../../assets/icons/search.svg";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearchPress?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onSearchPress,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for anything"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={onSearchPress}
        activeOpacity={0.8}
      >
        <SearchIcon width={75} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    overflow: "hidden",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },
  searchButton: {
    width: 52,
    height: "100%",
    backgroundColor: "#1EAD3A",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
});
