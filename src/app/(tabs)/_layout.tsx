import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import HomeIconsActive from "../../../assets/icons/tab_home_a.svg";
import HomeIconsDeactive from "../../../assets/icons/tab_home_d.svg";
import ListIcons from "../../../assets/icons/tab_listing.svg";
import MenuIcons from "../../../assets/icons/tab_menu.svg";
import NotificationIcons from "../../../assets/icons/tab_notification.svg";
import SerachIcons from "../../../assets/icons/tab_search.svg";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarHideOnKeyboard: true,

        tabBarButton: (props) => {
          const { ref: _ref, ...buttonProps } = props;
          return <Pressable {...buttonProps} android_ripple={null} />;
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeIconsActive : HomeIconsDeactive;

            return (
              <View style={styles.item}>
                <Icon height={23} />

                <Text
                  numberOfLines={1}
                  style={[styles.label, focused && styles.activeLabel]}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <SerachIcons
                height={24}
                color={focused ? "#183B63" : "#9AA0A6"}
              />

              <Text
                numberOfLines={1}
                style={[styles.label, focused && styles.activeLabel]}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="listing"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <ListIcons height={24} color={focused ? "#183B63" : "#9AA0A6"} />

              <Text
                numberOfLines={1}
                style={[styles.label, focused && styles.activeLabel]}
              >
                List Now
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <NotificationIcons
                height={22}
                color={focused ? "#183B63" : "#9AA0A6"}
              />

              <Text
                numberOfLines={1}
                style={[styles.label, focused && styles.activeLabel]}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <MenuIcons height={20} color={focused ? "#183B63" : "#9AA0A6"} />
              <Text
                numberOfLines={1}
                style={[styles.label, focused && styles.activeLabel]}
              >
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
    height: 110,
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    elevation: 8,
    shadowOpacity: 0.05,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 10,
  },

  item: {
    width: 100,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
    color: "#9AA0A6",
    marginTop: 3,
    textAlign: "center",
    includeFontPadding: false,
  },

  activeLabel: {
    color: "#183B63",
    fontFamily: "PoppinsMedium",
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1675E5",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 2,
  },
});
