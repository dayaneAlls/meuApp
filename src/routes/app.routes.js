import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from '../pages/Home';
import Sobre from '../pages/Sobre';


const AppDrawer = createDrawerNavigator();

function AppRoutes() {

    return (
        <AppDrawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#3a4d39',
                    paddingTop: 20,
                },
                drawerActiveBackgroundColor: 'rgba(115,144,114,.8)',
                drawerItemStyle: {borderColor: 'rgba(255,255,255,1)', borderBottomWidth: 1},
                drawerActiveTintColor: '#f0f2ff',
                drawerInactiveTintColor: '#121212'
            }}>
            <AppDrawer.Screen
                name="Home"
                component={Home}>
            </AppDrawer.Screen>
            <AppDrawer.Screen
                name="Sobre"
                component={Sobre}>
            </AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}
export default AppRoutes;