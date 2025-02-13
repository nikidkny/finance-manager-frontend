import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";
import { categoryType } from "./CategoryType";

export default function Category() {
  const [categories, setCategories] = useState<categoryType[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://10.0.0.8:3000/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data: categoryType[] = await response.json();
      console.log("All Categories fetched:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (category: categoryType) => {
    try {
      const response = await fetch("http://10.0.0.8:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: category.title }),
      });
      if (!response.ok) throw new Error("Failed to create category");

      const data: categoryType = await response.json();
      console.log("Category created:", data);
      //refetch categories to refresh the list
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(`http://10.0.0.8:3000/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      console.log("Category deleted:", id);
      //refetch categories to refresh the list
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <AddCategory onAdd={handleAddCategory} />
      <CategoryList categories={categories} onDelete={handleDeleteCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
