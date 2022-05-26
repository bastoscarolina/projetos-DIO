import react from "react";

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  Home  from "./pages/Home"; 
import Main from './pages/Main'

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="Home" screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Main" component={Main}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Routes;