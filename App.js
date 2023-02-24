import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";

export default function App() {
  const [hasCamPermision, sethasCamPermision] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const camStatus = await Camera.requestCameraPermissionsAsync();
      sethasCamPermision(camStatus.status === "authorized");
    })();
  }, []);
  const clickPic = async () => {
    console.log("inside click pic fn");
    if (!camera) return;
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // console.log(data);
    setImage(data.uri);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camRation}
          camRation={"5:4"}
          // ratio={"5:4"}
          ref={(ref) => setCamera(ref)}
          type={type}
        />
      </View>
      <View style={[styles.flexRow, { justifyContent: "center" }]}>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Image
            source={require("./images/rotate.png")}
            style={styles.camIconTray}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickPic()}>
          <Image
            source={require("./images/click.png")}
            style={styles.camIconTray}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // justifyContent: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  camRation: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camIconTray: {
    width: 45,
    height: 45,
    margin: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
