import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";

import SessionsList from "@/components/booking/SessionsList";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { BookingType } from "@/enum/BookingType";
import { RootParamList } from "@/types";

export type MyBookingProps = NativeStackScreenProps<RootParamList, "MyBooking">;

const ActiveSessions = () => <SessionsList type={BookingType.ACTIVE} />;
const CompletedSessions = () => <SessionsList type={BookingType.COMPLETED} />;

const Tab = createMaterialTopTabNavigator();

const TabBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  return (
    <BodyContainer
      containerStyle={styles.container}
      innerContainerStyle={styles.tabBarContainer}
    >
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
            style={[
              label === BookingType.ACTIVE
                ? styles.leftTabBar
                : styles.rightTabBar,
              { backgroundColor: isFocused ? Colors.red[400] : Colors.white },
            ]}
            key={label}
          >
            <BodyText
              text={label}
              textStyle={[
                styles.text,
                { color: isFocused ? Colors.white : Colors.red[400] },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </BodyContainer>
  );
};

const MyBooking: React.FC<MyBookingProps> = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name={BookingType.ACTIVE} component={ActiveSessions} />
    <Tab.Screen name={BookingType.COMPLETED} component={CompletedSessions} />
  </Tab.Navigator>
);

export default MyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  tabBarContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  tabBar: {},
  leftTabBar: {
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
    alignSelf: "baseline",
  },
  rightTabBar: {
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
    alignSelf: "baseline",
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
