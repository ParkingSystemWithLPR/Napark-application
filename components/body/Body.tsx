import { View, StyleSheet } from "react-native";
import Colors from "../../constants/color";

const Body: React.FC<{ children: React.ReactNode, bodyStyle?: object }> = ({ children, bodyStyle }) => {
  return (
    <View style={[styles.body, bodyStyle]}>
      {children}
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    marginTop: 75,
    height: "100%",
  }
});
