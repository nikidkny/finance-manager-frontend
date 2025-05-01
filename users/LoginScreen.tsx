import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { login, signup } from "./userSlice";
import { CreateUserDto } from "./CreateUserDto";
import { AppDispatch, RootState } from "../store/store";
import { useNavigation } from "@react-navigation/native";

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const error = useSelector((state: RootState) => state.user.errormessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    dispatch(login(new CreateUserDto(email, password)));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>{error}</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Login" onPress={handleSubmit} />
      <Text style={styles.error}>{error}</Text>
      <View style={styles.singupcontainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
  singupcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 2,
  },
  link: {
    color: "blue",
  },
});
