import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import firebase from "../services/FIrebaseConnection";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation = useNavigation();

    async function signUp(email, password, user) {
        setLoadingAuth(true);

        const usuario = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((usuario) => {
                setLoadingAuth(false);
                navigation.goBack();

            })
            .catch((err) => {
                console.log('erro ao cadastrar', err)
                setLoadingAuth(false);
            })
    }

    async function singOut() {
        await AsyncStorage.clear()
            .then(() => { setUser(null); })
    }


    async function signIn(email, password) {
        setLoadingAuth(true);
        const usuario = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((usuario) => {
                setUser(usuario.user.uid)
                setLoadingAuth(false);
            })
            .catch((err) => {
                alert('Usuário ou senha incorretos!')
                setLoadingAuth(false);
            })

    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, singOut, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
