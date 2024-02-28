import { useState } from "react";
import { SafeAreaView } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import SessionsList from "./SessionsList";

const FirstRoute = () => <SessionsList type="ACTIVE" />;

const SecondRoute = () => <SessionsList type="COMPLETED" />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const MyBookingTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Active Session" },
    { key: "second", title: "Completed Sessions" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default MyBookingTab;
