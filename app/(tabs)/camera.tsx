import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Camera as CameraIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const isWithinShootingWindow = false;

  useEffect(() => {
    if (permission && permission.granted && isWithinShootingWindow) {
      router.push("/(camera-view)");
    }
  }, [permission]);

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>カメラを準備中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (
    permission.status === "undetermined" ||
    (permission.status === "denied" && permission.canAskAgain)
  ) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <CameraIcon size={64} color="#ff6b6b" strokeWidth={1.5} />
          <Text style={styles.permissionTitle}>カメラへのアクセス</Text>
          <Text style={styles.permissionMessage}>
            大切な瞬間を記録するために{"\n"}カメラの使用を許可してください
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>許可する</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (permission.status === "denied" && !permission.canAskAgain) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>カメラへのアクセス</Text>
          <Text style={styles.permissionMessage}>
            カメラへのアクセスが拒否されました。設定から許可してください。
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.permissionButtonText}>設定を開く</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (permission.status === "granted" && !isWithinShootingWindow) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>カメラへのアクセス</Text>
          <Text style={styles.permissionMessage}>
            カメラへのアクセスが許可されていますが、撮影時間外です。
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        {/* TODO: add loading indicator */}
        <Text style={styles.loadingText}>カメラを準備中...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 24,
    marginBottom: 16,
  },
  permissionMessage: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
  encouragementContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 16,
    alignItems: "center",
  },
  encouragementText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
