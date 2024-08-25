import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HHHHHEEEEELLLOO~</Text>
      {/* 이 status-bar는 앱의 배터리, 시간, 와이파이 등 을 나타냄 */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  // 아래 continaer, text는 네이밍 규칙 없음
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "black",
  },
});
