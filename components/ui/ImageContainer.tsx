import { StyleSheet, FlatList, Image } from "react-native";

export type ImageContainerProps = {
  imageUrls: string[];
};

const IMAGE_SIZE = 100;

const ImageContainer: React.FC<ImageContainerProps> = ({ imageUrls }) => {
  return (
    <FlatList
      data={imageUrls}
      renderItem={() => (
        <Image
          source={{
            uri: "https://fastly.picsum.photos/id/157/200/300.jpg?hmac=-OZWQAIRoAdYWp7-qnHO1wl5t0TO3BMoAgW3tmR7wgE",
          }}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
          style={styles.image}
        />
      )}
      horizontal={true}
      overScrollMode="never"
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
