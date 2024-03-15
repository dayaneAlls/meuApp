import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axios from 'axios';
import to from 'await-to-js'
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
        const [error, usuario] = await to(axios.post('http://localhost:3000/unauth/register',
        { userName: user, email, password },
        ))

        if(error){
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao efetuar Cadastro", error)
        }
        
        setLoadingAuth(false);
        navigation.goBack();
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
