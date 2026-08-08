import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 65 + insets.bottom,
            paddingBottom: insets.bottom + 5,
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#183B63" : "#8B98A8"}
              />

              <Text style={[styles.label, focused && styles.activeLabel]}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      {/* SEARCH */}
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name="search-outline"
                size={26}
                color={focused ? "#183B63" : "#8B98A8"}
              />

              <Text style={[styles.label, focused && styles.activeLabel]}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      {/* NEW LISTING */}
      <Tabs.Screen
        name="listing"
        options={{
          tabBarIcon: () => (
            <View style={styles.newListingContainer}>
              <View style={styles.newListingButton}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </View>

              <Text style={styles.label}>New Listing</Text>
            </View>
          ),
        }}
      />

      {/* NOTIFICATIONS */}
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                size={25}
                color={focused ? "#183B63" : "#8B98A8"}
              />

              <Text style={[styles.label, focused && styles.activeLabel]}>
                Notifications
              </Text>
            </View>
          ),
        }}
      />

      {/* MENU */}
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name="menu-outline"
                size={27}
                color={focused ? "#183B63" : "#8B98A8"}
              />

              <Text style={[styles.label, focused && styles.activeLabel]}>
                Menu
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    elevation: 8,
    paddingTop: 5,
    paddingBottom: 6,
  },

  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
    color: "#8B98A8",
    marginTop: 2,
  },

  activeLabel: {
    color: "#183B63",
    fontFamily: "PoppinsMedium",
  },

  newListingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -12,
  },

  newListingButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#176FE5",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 2,
  },
});
