import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { categoryType } from "./CategoryType";

interface CategoryListProps {
  categories: categoryType[];
  onDelete: (id: number) => void;
}

export default function CategoryList({ categories, onDelete }: CategoryListProps) {
  {
    return (
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.title}</Text>
            <DeleteCategoryButton id={item.id} onDelete={onDelete} />
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryText: {
    fontSize: 18,
  },
});
