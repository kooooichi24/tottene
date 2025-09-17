import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { RotateCcw, X, Timer } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraViewScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission] = useCameraPermissions();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      router.replace("/(tabs)/camera");
    }
  }, [permission]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      Alert.alert("時間終了", "撮影時間が終了しました。");
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        Alert.alert("撮影完了", "素敵な写真が撮れました！");
        // Here you would save the photo to local storage
      } catch (error) {
        Alert.alert("エラー", "撮影に失敗しました。");
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {/* Timer Header */}
        <View style={styles.timerHeader}>
          <TouchableOpacity style={styles.closeButton}>
            <X size={24} color="#ffffff" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <Timer size={20} color="#ffffff" strokeWidth={2} />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Camera View */}
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          ratio={"16:9"}
        />

        <View style={styles.cameraOverlay}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <RotateCcw size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>

            <View style={[styles.captureButtonContainer]}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>

            <View style={styles.placeholder} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  welcomeContent: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 24,
    marginBottom: 16,
  },
  welcomeMessage: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  cameraContainer: {
    flex: 1,
  },
  timerHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0)",
    paddingTop: 50, // ステータスバーの高さ分
    paddingHorizontal: 20,
    paddingBottom: 16,
    zIndex: 1000,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 107, 107, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  placeholder: {
    width: 40,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0)",
    paddingTop: 20,
    paddingBottom: 40, // ナビゲーションバーの高さ分
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonContainer: {
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6b6b",
  },
});
