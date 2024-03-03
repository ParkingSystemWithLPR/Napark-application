import { StyleSheet, FlatList, Image,  View } from "react-native";

export type ImageContainerProps = {
  imageUrls: string[];
  containerStyle?: object;
};

const IMAGE_SIZE = 100;

const ImageContainer: React.FC<ImageContainerProps> = ({ imageUrls, containerStyle }) => {
  return (
    <View style={containerStyle}>
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
        style={containerStyle}
        horizontal={true}
      overScrollMode="never"
      />
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    marginRight: 10,
  },
});
