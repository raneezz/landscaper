import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryGrid({ categories }: any) {
  return (
    <View style={styles.container}>
      {categories.map((item: any) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={styles.icon} />
          <Text style={styles.text}>{item.category_en}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "#F5F5F5",
  },

  card: {
    width: "28%",
    height: 90,
    alignItems: "center",
    margin: 8,
    marginBottom: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 2,
  },

  icon: {
    width: 10,
    height: 10,
    borderRadius: 29,
    backgroundColor: "#123607",
    marginBottom: 8,
  },

  text: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
});
