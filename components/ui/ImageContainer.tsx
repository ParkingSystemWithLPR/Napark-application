import { StyleSheet, FlatList, Image } from "react-native";

export type ImageContainerProps = {
  images: string[];
};

const ImageContainer: React.FC<ImageContainerProps> = ({ images }) => {
  return (
    <FlatList
      data={images}
      renderItem={() => (
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
