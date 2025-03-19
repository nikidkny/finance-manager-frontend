import React, { useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEntries, deleteEntry } from "./entrySlice";
import { useNavigation } from "@react-navigation/native";
import { EntryStackParamList } from "../NavigationWrapper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EntryEntity } from "./EntryEntity";

export const EntryList: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<EntryStackParamList, "EntryList">;
  const navigation = useNavigation<NavigationProp>();

  const entries = useSelector((state: RootState) => state.entry.entries);
  const dispatch = useDispatch<AppDispatch>();
  console.log(entries);

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  const renderItem = ({ item }: { item: EntryEntity }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Text>{item.amount}</Text>
      {/* <Button title="Edit" onPress={() => navigation.navigate("EditEntry", { id: item.id })} /> */}
      {/* <Button title="Delete" onPress={() => dispatch(deleteEntry(item.id))} /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Create New Entry" onPress={() => navigation.navigate("CreateEntry")} />
      {entries && entries.length > 0 && (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 16 },
});
