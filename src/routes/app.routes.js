import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import DrawerLogo from '../components/DrawerLogo';


const AppDrawer = createDrawerNavigator();

function AppRoutes() {

    return (
        <AppDrawer.Navigator
            drawerContent={DrawerLogo}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#739072',
                    paddingTop: 20,
                },
                drawerActiveBackgroundColor: '#4F6F52',
                drawerInactiveBackgroundColor: '#3A4D39',
                drawerItemStyle: { borderRadius: 27, height: 55, },
                drawerActiveTintColor: '#f0f2ff',
                drawerInactiveTintColor: '#f0f2ff',
                drawerLabelStyle: { fontSize: 18 },
            }}>
            <AppDrawer.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Pesquisar Plantas',
                    drawerIcon: () => { return <Icon name="search" color={'#f0f2ff'} size={20} />}
                }}>
            </AppDrawer.Screen>
            <AppDrawer.Screen
                name="Sobre"
                component={Sobre}
                options={{
                    title: 'Minhas Plantas',
                    drawerIcon: () => { return <Icon name="settings" color={'#f0f2ff'} size={20} /> }
                }}>
            </AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}
export default AppRoutes;