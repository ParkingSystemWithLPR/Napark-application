import { StyleSheet, ScrollView, FlatList, Image, View } from "react-native";
import Colors from "../../constants/color";

export type ImageContainerProps = {
  images: string[];
};

const ImageContainer: React.FC<ImageContainerProps> = ({ images }) => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.image}
        />
      )}
      horizontal={true}
    />
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    marginRight: 10,
  },
});
