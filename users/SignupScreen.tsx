import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./userSlice";
import { AppDispatch, RootState } from "../store/store";
import { CreateUserDto } from "./CreateUserDto";
import { useNavigation } from "@react-navigation/native";

interface SignupScreenProps {}

export const SignupScreen: React.FC<SignupScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const error = useSelector((state: RootState) => state.user.errormessage);
  const token = useSelector((state: RootState) => state.user.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    dispatch(signup(new CreateUserDto(email, password)));
  };
  useEffect(() => {
    if (token) {
      navigation.navigate("HomeTabs");
    }
  }, [token, navigation]);
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <Text>{error}</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Signup" onPress={handleSubmit} />
      <Text style={styles.error}>{error}</Text>
      <View style={styles.logincontainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
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
  logincontainer: {
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
