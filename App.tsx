import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Category from "./category/Category";

export default function App() {
  return (
    <View style={styles.container}>
      <Category />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
