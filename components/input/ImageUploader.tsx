import { Pressable, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

type ImageUploaderProps = {
  title?: string;
  onPress: () => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  onPress,
}) => {

  return (
    <View style={styles.container}>
      {title && <SubHeaderText text={title} />}
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          styles.card,
          pressed ? styles.cardPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.uploadContainer}>
          <MaterialCommunityIcons
            name={"cloud-upload-outline"}
            size={120}
            color={Colors.red[400]}
          />
          <SubHeaderText text="Press here to upload image" />
          <BodyText text="Supported format: .jpg, .png" />
        </View>
      </Pressable>
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    gap: 10,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: Colors.red[400],
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
});
