import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from "../../../assets/icons/search.svg";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for anything"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.searchButton}>
        <SearchIcon width={75} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
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
    fontFamily: "PoppinsRegular",
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
