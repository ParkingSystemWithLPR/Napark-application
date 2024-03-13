import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BarCodeScanningResult } from "expo-camera";
import { CameraView, Camera } from "expo-camera/next";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Marker from "@/components/payment/Marker";
import NoPermissionModalContent from "@/components/payment/NoPermissionModalContent";
import BodyContainer from "@/components/ui/BodyContainer";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import {
  AuthenticatedStackParamList,
  MainPageBottomTabParamList,
} from "@/types";

export type ScanQRProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "ScanQR">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;
export const ScanQR: React.FC<ScanQRProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const isFocused = useIsFocused();
  const closeModal = () => {
    navigation.navigate("MainScreen", { screen: "Landing" });
    setOpenModal(false);
  };

  useLayoutEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const isGranted = status === "granted";
      setOpenModal(!isGranted);
      setHasPermission(isGranted);
    };

    isFocused && getCameraPermissions();
  }, [isFocused]);

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTimeout(() => {
      setScanned(false);
    }, 10000);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && result.assets) {
      try {
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
        const dataNeeded = scannedResults[0].data;
        alert(dataNeeded);
      } catch (error) {
        alert("No QR Code Found");
      }
    }
  };

  return (
    <BodyContainer innerContainerStyle={styles.innerContainer}>
      {hasPermission ? (
        <View style={styles.container}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <Marker
            color={Colors.white}
            size={200}
            borderLength={"25%"}
            thickness={5}
            borderRadius={20}
          />
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity onPress={pickImage}>
              <MaterialCommunityIcons
                name="image-search-outline"
                color={Colors.white}
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ModalOverlay visible={openModal} closeModal={closeModal}>
          <View style={styles.modalBackground}>
            <NoPermissionModalContent handlecloseModal={closeModal} />
          </View>
        </ModalOverlay>
      )}
    </BodyContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerContainer: {
    backgroundColor: Colors.red[400],
    borderRadius: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  innerContainer: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
