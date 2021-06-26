import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Root from "../screens/main/Root";
import { Feather } from "@expo/vector-icons";
import ProfileRoute from "./ProfileRoute";
const Tab = createBottomTabNavigator();

const HomeRoute = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#272729",
        inactiveTintColor: "#9e9e9e",
        showLabel: false,
        adaptive: true,
      }}
    >
      <Tab.Screen
        name="feed"
        component={Root}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Root}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={Root}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="noti"
        component={Root}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileRoute}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRoute;
