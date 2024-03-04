import { StyleSheet, FlatList, Image } from "react-native";

export type ImageContainerProps = {
  imageUrls: string[];
};

const ImageContainer: React.FC<ImageContainerProps> = ({ imageUrls }) => {
  return (
    <FlatList
      data={imageUrls}
      renderItem={({ item: imageUrl }) => (
        <Image source={{ uri: imageUrl }} style={styles.image} />
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
