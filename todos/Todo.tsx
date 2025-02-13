import { View, TextInput, StyleSheet, Button } from "react-native";
import React from "react";
import { TodoEntity } from "./TodoEntity";

export default function Todo() {
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState([] as TodoEntity[]);
  const onAddTodo = () => {
    const newTodo = new TodoEntity(todos.length, todo);
    setTodos([...todos, newTodo]);
    console.log("Todos", todos);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setTodo}
        value={todo}
        placeholder="Enter a new to do"
      />
      <Button
        onPress={onAddTodo}
        title="Add to do"
        color="#841584"
        accessibilityLabel="Add a new to do"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
