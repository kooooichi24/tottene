import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      blurEffect="systemChromeMaterial"
      tintColor='#ff6b6b'
    >
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>ホーム</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="camera">
        <Icon sf={{ default: "camera", selected: "camera.fill" }} />
        <Label>撮影</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="gallery">
        <Icon sf={{ default: "camera", selected: "camera.fill" }} />
        <Label>ギャラリー</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: "gearshape", selected: "gearshape.fill" }} />
        <Label>設定</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}