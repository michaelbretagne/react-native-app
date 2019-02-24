import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS == "ios" ? "ios-map" : "md-map", 30),
    Icon.getImageSource(
      Platform.OS == "ios" ? "ios-share-alt" : "md-share",
      30,
    ),
    Icon.getImageSource(Platform.OS == "ios" ? "ios-menu" : "md-menu", 30),
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle",
              },
            ],
          },
        },
        {
          screen: "awesome-places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle",
              },
            ],
          },
        },
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "#FFA500",
      },
      appStyle: {
        tabBarSelectedButtonColor: "#FFA500",
      },
      drawer: {
        left: {
          screen: "awesome-places.SideDrawer",
        },
      },
    });
  });
};

export default startTabs;
