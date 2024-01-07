import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}>
            </AuthStack.Screen>

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerStyle: { backgroundColor: 'rgba(115,144,114,.8)' },
                    headerTitle: 'Voltar',
                    headerBackTitleVisible: false,
                }}>
            </AuthStack.Screen>
        </AuthStack.Navigator>


    )
}

export default AuthRoutes;
