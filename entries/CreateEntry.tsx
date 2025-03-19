import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createEntry } from "./entrySlice";
import { EntryEntity } from "./EntryEntity";

export const CreateEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const newEntry = new EntryEntity(title, parseFloat(amount), new Date().toISOString());
    dispatch(createEntry(newEntry));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Create" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 16, borderWidth: 1, padding: 8 },
});
