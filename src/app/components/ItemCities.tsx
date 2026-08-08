import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Cities {
  image: any;
  id: number;
  name_en: string;
  icon_img?: string;
}
interface Props {
  cities: Cities[];
}

const locationImages: Record<string, string> = {
  Dubai:
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/dubai.webp",
  "Abu Dhabi":
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/abu-dhabi.webp",
  Sharjah:
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/sharjah.webp",
  "Ras Al Khaimah":
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/ras-al-khaimah.webp",
  "Al Ain":
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/al-ain.webp",
  Ajman:
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/ajman.webp",
  Fujairah:
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/fujairah.webp",
  "Umm Al Quwain":
    "https://webuat.thelandscaper.com/images/explore-by-emirate/mobile/umm-al-quwain.webp",
};

function ItemCities({ cities }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Explore by Emirates</Text>
      <FlashList
        data={cities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity>
              <Image
                source={{ uri: locationImages[item.name_en] }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.citiText}>{item.name_en}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default memo(ItemCities);

const styles = StyleSheet.create({
  section: {
    marginStart: 16,
  },
  card: {
    width: 145,
    height: 170,
    borderRadius: 11,
    overflow: "hidden",
    backgroundColor: "#eee",
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#D5D5D5",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  title: {
    fontSize: 16,
    marginBottom: 15,
    marginStart: 5,
    fontFamily: "PoppinsMedium",
  },

  citiText: {
    position: "absolute",
    start: 15,
    bottom: 10,
    color: "#faf9f9",
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },
});
