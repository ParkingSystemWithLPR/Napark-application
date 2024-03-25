import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import BodyContainer from "./BodyContainer";
import BodyText from "../text/BodyText";

import Colors from "@/constants/color";

type TabsContainerProps = {
  leftTabName: string;
  leftTabContent: React.JSX.Element;
  rightTabName: string;
  rightTabContent: React.JSX.Element;
};

type TabBarProps = MaterialTopTabBarProps & {
  leftTabName: string;
};

const Tab = createMaterialTopTabNavigator();

const TabBar = ({
  state,
  descriptors,
  navigation,
  leftTabName,
}: TabBarProps) => {
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
              label === leftTabName ? styles.leftTabBar : styles.rightTabBar,
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

const TabsContainer: React.FC<TabsContainerProps> = ({
  leftTabName,
  leftTabContent,
  rightTabName,
  rightTabContent,
}) => {
  const LeftContent = () => (
    <View style={styles.tabContent}>{leftTabContent}</View>
  );
  const RightContent = () => (
    <View style={styles.tabContent}>{rightTabContent}</View>
  );
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} leftTabName={leftTabName} />}
    >
      <Tab.Screen name={leftTabName} component={LeftContent} />
      <Tab.Screen name={rightTabName} component={RightContent} />
    </Tab.Navigator>
  );
};

export default TabsContainer;

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
    elevation: 4,
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
    elevation: 4,
    alignSelf: "baseline",
  },
  text: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabContent: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
});
