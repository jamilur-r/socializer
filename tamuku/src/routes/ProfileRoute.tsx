import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileIndex from "../screens/profile/ProfileIndex";
import SettingsRoute from "./SettingsRoute";
import ProfileEditRoute from "./ProfileEditRoute";

const Stack = createStackNavigator();

const ProfileRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile_index" component={ProfileIndex} />
      <Stack.Screen name="profile_edit" component={ProfileEditRoute} />
      <Stack.Screen name="settings" component={SettingsRoute} />
    </Stack.Navigator>
  );
};

export default ProfileRoute;
