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
      style={styles.listContainer}
    />
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  listContainer: {
    height: 120,
  },
  image: {
    height: "100%",
    // width: 100,
    objectFit: "scale-down",
    borderRadius: 12,
    marginRight: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
