import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PesquisarPlantas from '../pages/PesquisarPlantas';
import MinhasPlantas from '../pages/MinhasPlantas';
import Configuracao from '../pages/Configuracao';
import DrawerLogo from '../components/DrawerLogo';
import { ScreenStack } from "react-native-screens";


const AppDrawer = createDrawerNavigator();

function AppRoutes() {

    return (
        <AppDrawer.Navigator
            drawerContent={DrawerLogo}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#739072',
                    paddingTop: 50,
                },
                drawerActiveBackgroundColor: '#4F6F52',
                drawerInactiveBackgroundColor: '#3A4D39',
                drawerItemStyle: { height: 70, borderBottomColor: '#f0f2ff', borderBottomWidth: 2 },
                drawerActiveTintColor: '#f0f2ff',
                drawerInactiveTintColor: '#f0f2ff',
                drawerLabelStyle: { fontSize: 18, paddingTop: 5, },

            }}>
            <AppDrawer.Screen
                name="Minhas Plantas"
                component={MinhasPlantas}
                options={{
                    drawerIcon: () => { return <Icon name="sprout" color={'#f0f2ff'} size={25} paddingLeft={5} /> }
                }}>
            </AppDrawer.Screen>
            <AppDrawer.Screen
                name="Pesquisar Plantas"
                component={PesquisarPlantas}
                options={{
                    drawerIcon: () => { return <Icon name="magnify" color={'#f0f2ff'} size={25} paddingLeft={5} /> }
                }}>
            </AppDrawer.Screen>
            <AppDrawer.Screen
                name="Configurações"
                component={Configuracao}
                options={{
                    drawerIcon: () => { return <Icon name="account-cog" color={'#f0f2ff'} size={25} paddingLeft={5} /> }
                }}>
            </AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}
export default AppRoutes;