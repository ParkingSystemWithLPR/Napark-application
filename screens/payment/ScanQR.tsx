import { BarCodeScanner } from "expo-barcode-scanner";
import { BarCodeScanningResult } from "expo-camera";
import { CameraView, Camera } from "expo-camera/next";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, DimensionValue } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "@/constants/color";

export const ScanQR: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  function marker(
    color: string,
    size: DimensionValue,
    borderLength: DimensionValue,
    thickness: number = 2,
    borderRadius: number = 0
  ): JSX.Element {
    return (
      <View style={{ height: size, width: size }}>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            top: 0,
            left: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderLeftWidth: thickness,
            borderTopLeftRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            top: 0,
            right: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderRightWidth: thickness,
            borderTopRightRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            bottom: 0,
            left: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderLeftWidth: thickness,
            borderBottomLeftRadius: borderRadius,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            height: borderLength,
            width: borderLength,
            bottom: 0,
            right: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderRightWidth: thickness,
            borderBottomRightRadius: borderRadius,
          }}
        ></View>
      </View>
    );
  }

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

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

    // if the user successfully picks an image then we check if the image has a QR code
    if (result && result.assets) {
      try {
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
        const dataNeeded = scannedResults[0].data;
        alert(dataNeeded);
      } catch (error) {
        // if there this no QR code
        alert("No QR Code Found");
      }
    }
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {marker("white", 200, "25%", 5, 20)}
      {/* <Button title={"Scan from Image"} onPress={pickImage} /> */}
      <View
        style={{
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
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <MaterialCommunityIcons
            name="image-search-outline"
            color={Colors.white}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
