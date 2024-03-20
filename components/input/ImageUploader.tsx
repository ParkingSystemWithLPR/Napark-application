import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Pressable, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";
import ImageContainer from '../ui/ImageContainer';

type ImageUploaderProps = {
  title?: string;
  image: string[];
  onChange: (images: string[]) => void;
  containerStyle?: object;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  image,
  onChange,
  containerStyle,
}) => {
  const [images, setImages] = useState<string[]>(image ?? []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages: string[] = [];
      result.assets.forEach((img) => {
        newImages.push(img.uri);
      });
      setImages(images.concat(newImages));
      onChange(newImages);
    }
  };

  const onDelete = (image: string) => {
    const newImage: string[] = images.filter((img) => img !== image);
    setImages(newImage);
    onChange(newImage);
  }

  return (
    <View style={styles.container}>
      {title && <SubHeaderText text={title} />}
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          styles.card,
          pressed ? styles.cardPressed : null,
        ]}
        onPress={pickImage}
      >
        <View style={[styles.uploadContainer, containerStyle]}>
          <MaterialCommunityIcons
            name={"cloud-upload-outline"}
            size={120}
            color={Colors.red[400]}
          />
          <SubHeaderText text="Press here to upload image" />
          <BodyText text="Supported format: .jpg, .png" />
        </View>
      </Pressable>
      <ImageContainer imageUrls={images} onDelete={onDelete} editable/>
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
