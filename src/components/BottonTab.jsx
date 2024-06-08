import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet } from "react-native";
import Favorites from "../screens/Favorites";
import Add from "../screens/Add";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const itemsTabs = [
    {
      name: "Inicio",
      component: Home,
      icon: "home",
    },
    {
      name: "Favoritos",
      component: Favorites,
      icon: "heart",
    },
    {
      name: "Agregar",
      component: Add,
      icon: "plus",
    },
    {
      name: "Ajustes",
      component: Setting,
      icon: "cog",
    },
    {
      name: "Perfil",
      component: Profile,
      icon: "user",
    },
   /*  {
      name: "Salir",
      component: LogoutButton,
      icon: "sign-out",
    }, */
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          // bottom: 25,
          // left: 20,
          // right: 20,
          //elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...Styles.shadow,
        },
      }}
    >
      {itemsTabs.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Icon
                  name={item.icon}
                  size={24}
                  color={focused ? "#757575" : "#BDBDBD"}
                />
                <Text
                  className={`text-sm ${
                    focused ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {item.name}
                </Text>
              </View>
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const Styles = StyleSheet.create({
  shadow: {
    shadowColor: "STFSDFS",
    shadowOffset: {
      with: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
