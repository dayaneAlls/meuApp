import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import firebase from "../services/FIrebaseConnection";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState('Teste')
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation = useNavigation();

    async function signUp(email, password, user) {

        setLoadingAuth(true);
        const usuario = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((usuario) => {

                firebase.database().ref('usuarios').child(usuario.user.uid).set({
                    nome: user,
                    email: email
                })
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

                async function capturaDados() {

                    await firebase.database().ref('usuarios').child(usuario.user.uid).child('nome').get().then((snapshot) => {
                        if (snapshot.exists()) {
                            const nomeUsuario = (snapshot.val())
                            console.log(snapshot.val());
                            setUsuarioLogado(nomeUsuario);

                        } else {
                            console.log("No data available");
                        }
                        setUser(usuario.user.uid)
                        setLoadingAuth(false);
                       
                    })

                }
                // alert(idUsuario)

                capturaDados();






            })
            .catch((err) => {
                alert('Usuário ou senha incorretos!')
                setLoadingAuth(false);
            })

    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, singOut, signIn, loadingAuth, usuarioLogado }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
