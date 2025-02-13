import React from "react";
import { Button } from "react-native";

interface DeleteCategoryButtonProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function DeleteCategoryButton({ id, onDelete }: DeleteCategoryButtonProps) {
  return <Button title="Delete" color="#D21404" onPress={() => onDelete(id)} />;
}
