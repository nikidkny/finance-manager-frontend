import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LoginScreen } from "./users/LoginScreen";
import { SignupScreen } from "./users/SignupScreen";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import ProfileScreen from "./users/ProfileScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./store/store";
// import { reloadJwtFromStorage } from "./users/userSlice";
// import * as SecureStore from "expo-secure-store";
import { EntryList } from "./entries/EntryList";
import { CreateEntry } from "./entries/CreateEntry";

export type CategoryStackParamList = {
  CategoryList: undefined; // No parameters
  NewCategory: undefined; // No parameters for this route
  // CategoryDetails: { id: number }; // Example for a route with parameters
};

export type EntryStackParamList = {
  EntryList: undefined; // No parameters
  CreateEntry: undefined; // No parameters
};

export type LoginSignupStackParamList = {
  SignupScreen: undefined; // No parameters
  LoginScreen: undefined; // No parameters for this route
};

const LoginSignupStack = createNativeStackNavigator<LoginSignupStackParamList>({
  screens: {
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
  },
});

const EntryStack = createNativeStackNavigator<EntryStackParamList>({
  screens: {
    EntryList: EntryList,
    CreateEntry: CreateEntry,
  },
});

const CategoryStack = createNativeStackNavigator<CategoryStackParamList>({
  screens: {
    CategoryList: CategoryList,
    NewCategory: NewCategoryScreen,
  },
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Entries: EntryStack,
    Categories: CategoryStack,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(HomeTabs);

const LoginSignupScreens = createStaticNavigation(LoginSignupStack);

export default function NavigationWrapper() {
  // const token = useSelector((state: RootState) => state.user.token);
  // const dispatch = useDispatch();

  useEffect(() => {
    // async function getValueFor() {
    //   const userObj = JSON.parse((await SecureStore.getItemAsync("jwt")) || "");
    //   console.log("userObj", userObj);
    //   dispatch(reloadJwtFromStorage(userObj)); // in my code, I have no token
    //   // Instead, do the login functionality and save the token instead of the user.
    // }
    // getValueFor();
  }, []);

  return (
    <>
      {/* {token ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <LoginSignupScreens />
        </>
      )} */}
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
