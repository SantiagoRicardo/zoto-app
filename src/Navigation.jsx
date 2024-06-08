import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import HomeTabs from "./components/BottonTab";
import Profile from "./screens/Profile";
import Security from "./screens/Security";
import ResetPassword from "./screens/ResetPassword";
import OffersDetails from "./screens/OffersDetails";

const LoginRegister = createNativeStackNavigator();
function LoginRegisterNavigation() {
  return (
    <LoginRegister.Navigator initialRouteName="Login">
      <LoginRegister.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <LoginRegister.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <LoginRegister.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <LoginRegister.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <LoginRegister.Screen
        name="Security"
        component={Security}
        options={{
          headerShown: false,
        }}
      />
      <LoginRegister.Screen
        name="OffersDetails"
        component={OffersDetails}
        options={{
          headerShown: false,
        }}
      />
      <LoginRegister.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </LoginRegister.Navigator>
    
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <LoginRegisterNavigation />
    </NavigationContainer>
  );
}
