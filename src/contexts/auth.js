import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import to from "await-to-js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [codigo, setCodigo] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorage() {
            setLoadingAuth(true);

            try {
                const storageUserToken = await AsyncStorage.getItem("@userToken");

                if (storageUserToken) {
                    const userInfo = jwtDecode(storageUserToken); // Decodifica o token JWT
                    const userName = userInfo.name;
                    setUser(userInfo); // Define o usuário com as informações decodificadas
                    setUserName(userName);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log("Erro ao carregar usuário do AsyncStorage", error);
                setUser(null);
            } finally {
                setLoadingAuth(false);
            }
        }

        loadStorage();
    }, []);

    async function signUp(email, password, userName, passwordConfirmation) {
        setLoadingAuth(true);
        try {
            const [error, response] = await to(
                api.post("unauth/authentication/register", {
                    userName,
                    email,
                    password,
                    passwordConfirmation,
                })
            );

            if (error) {
                console.log(error);
                setLoadingAuth(false);
                throw new Error("Erro ao efetuar Cadastro", error);
            }
            setLoadingAuth(false);
            navigation.goBack();

        } catch (err) {
            alert(err)
        }
    }

    async function signOut() {
        await AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }


    async function signIn(email, password) {
        setLoadingAuth(true);

        try {
            const [error, response] = await to(api.post('unauth/authentication/signin',
                {
                    email,
                    password
                }
            ))

            const userToken = response.data.userToken;
            const userInfo = jwtDecode(userToken);
            const userName = userInfo.name;
            console.log(userToken);

            await AsyncStorage.setItem("@userToken", userToken);
            api.defaults.headers["Authorization"] = `Bearer ${userToken}`;

            setUserName(userName);
            console.log(userName);
            setLoadingAuth(false);

        } catch (err) {
            console.log("Erro ao logar", err);
            setLoadingAuth(false);
        }
    }


    async function recuperarSenha(email) {
        setLoadingAuth(true);
        const [error, response] = await to(api.post('unauth/user/password/solicit',
            { email },
        ))
        if (error) {
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao enviar e-mail", error)
        }

        setLoadingAuth(false);
    }

    async function codeSubmit(codigo) {
        setLoadingAuth(true);
        const [error, response] = await to(api.post('unauth/user/password/confirm',
            { passwordResetCode: codigo },
        ))
        if (error) {
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao enviar código", error)
        }
        setCodigo(codigo);
        setLoadingAuth(false);
    }

    async function cadastrar(password, confirmPassword) {
        setLoadingAuth(true);
        const [error, response] = await to(api.post('unauth/user/password/new',
            { password, passwordConfirmation: confirmPassword, passwordResetCode: codigo },
        ))
        if (error) {
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao enviar senhas", error)
        }
        setCodigo(null);
        setLoadingAuth(false);
        navigation.goBack();
    }

    async function addNewPlant(plantToken, ) {
        const [error, response] = await to(api.post(`auth/plant/add?plantName=${search}`));

        if (error) {
            console.error('Erro ao enviar planta:', error);
            return;
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, userName, signUp, signOut, signIn, recuperarSenha, cadastrar, codeSubmit, addNewPlant, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
