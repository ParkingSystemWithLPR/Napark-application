import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SessionsList from "./SessionsList";
import Colors from "../../constants/color";

const ActiveSessions = () => <SessionsList type="ACTIVE" />;
const CompletedSessions = () => <SessionsList type="COMPLETED" />;

const Tab = createMaterialTopTabNavigator();

const TabBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  return (
    <View style={style.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              label === "Active Sessions"
                ? {
                    ...style.leftTabBar,
                    backgroundColor: isFocused ? Colors.red[400] : Colors.white,
                  }
                : {
                    ...style.rightTabBar,
                    backgroundColor: isFocused ? Colors.red[400] : Colors.white,
                  }
            }
          >
            <Text
              style={{
                ...style.text,
                color: isFocused ? Colors.white : Colors.red[400],
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MyBookingTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Active Sessions" component={ActiveSessions} />
      <Tab.Screen name="Completed Sessions" component={CompletedSessions} />
    </Tab.Navigator>
  );
};

export default MyBookingTab;

const style = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    marginVertical: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  leftTabBar: {
    flex: 1,
    height: "100%",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    marginLeft: 50,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rightTabBar: {
    flex: 1,
    height: "100%",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginRight: 50,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
