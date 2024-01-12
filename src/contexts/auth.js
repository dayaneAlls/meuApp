import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({nome: 'matheus'});
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation = useNavigation();

    async function signUp(email, password, name) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/user', {
                name: name, password: password, email: email,
            })
            setLoadingAuth(false);
            navigation.goBack();
        } catch (err) {
            console.log('erro ao cadastrar', err)
            setLoadingAuth(false);
        }
    }

    async function singOut() {
        await AsyncStorage.clear()
            .then(() => { setUser(null); })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, singOut, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
