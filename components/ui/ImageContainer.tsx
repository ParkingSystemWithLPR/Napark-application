import { StyleSheet, FlatList, Image, View } from "react-native";

import IconButton from "../button/IconButton";

import Colors from "@/constants/color";
import { ImageProps } from "@/types";

export type ImageContainerProps = {
  images: ImageProps[];
  editable?: boolean;
  onDelete?: (imageUrl: ImageProps) => void;
  containerStyle?: object;
};

const IMAGE_SIZE = 100;

const ImageContainer: React.FC<ImageContainerProps> = ({
  images,
  containerStyle,
  onDelete,
  editable,
}) => {
  return (
    <View style={containerStyle}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: "data:image/jpeg;base64," + item.content,
              }}
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
              style={styles.image}
            />
            {editable && (
              <IconButton
                icon={"close"}
                size={20}
                color={Colors.gray[800]}
                buttonStyle={styles.icon}
                onPress={() => onDelete && onDelete(item)}
              />
            )}
          </View>
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
  icon: {
    position: "absolute",
    top: -110,
    left: 62,
  },
});
