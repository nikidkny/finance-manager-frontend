import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { categoryType } from "./CategoryType";

interface AddCategoryProps {
  onAdd: (category: categoryType) => void;
}

export default function AddCategory({ onAdd }: AddCategoryProps) {
  const [title, setTitle] = useState("");

  const handleAddCategory = () => {
    if (title.trim()) {
      const newCategory: categoryType = { id: Date.now(), title };
      onAdd(newCategory);
      // Clear input after adding a category
      setTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a category name"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Category" onPress={handleAddCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
