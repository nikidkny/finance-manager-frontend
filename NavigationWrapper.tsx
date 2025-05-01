import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "./users/SignupScreen";
import { LoginScreen } from "./users/LoginScreen";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Counter } from "./counter/counter";
import { createStaticNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { reloadJwtFromStorage } from "./users/userSlice";
import ProfileScreen from "./users/ProfileScreen";
import EntriesMain from "./entries/EntriesListScreen";

export type CategoryStackParamList = {
  CategoryList: undefined; // No parameters
  NewCategory: undefined; // No parameters for this route
  // CategoryDetails: { id: number }; // Example for a route with parameters
};

// export type EntryStackParamList = {
//   EntryList: undefined; // No parameters
//   CreateEntry: undefined; // No parameters
// };

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

// const EntryStack = createNativeStackNavigator<EntryStackParamList>({
//   screens: {
//     EntryList: EntryList,
//     CreateEntry: CreateEntry,
//   },
// });

const CategoryStack = createNativeStackNavigator<CategoryStackParamList>({
  screens: {
    CategoryList: CategoryList,
    NewCategory: NewCategoryScreen,
  },
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Entries: EntriesMain,
    Categories: CategoryStack,
    Profile: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(HomeTabs);

const LoginSignupScreens = createStaticNavigation(LoginSignupStack);

export default function NavigationWrapper() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getValueFor() {
      const token = JSON.parse((await SecureStore.getItemAsync("jwt")) || "");
      console.log("token", token);
      if (token) {
        dispatch(reloadJwtFromStorage(token));
      }
    }
    getValueFor();
  }, [dispatch]);

  return (
    <>
      {token ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <LoginSignupScreens />
        </>
      )}
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
