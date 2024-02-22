import { ColorValue, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type IconButtonProps = {
  icon: string;
  size: number;
  color: number | ColorValue;
  onPress: () => void;
  buttonStyle?: object;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, buttonStyle]}>
        <MaterialCommunityIcons name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
});
