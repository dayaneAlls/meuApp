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
    const [codigo, setCodigo] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorage() {
            setLoading(true);
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
                setLoading(false);
            }
        }

        loadStorage();
    }, []);

    async function signUp(email, password, userName, passwordConfirmation) {
        setLoading(true);
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
                setLoading(false);
                throw new Error("Erro ao efetuar Cadastro", error);
            }
            setLoading(false);
            navigation.goBack();

        } catch (err) {
            alert(err)
        }
    }

    async function signOut() {
        try {
            await AsyncStorage.removeItem("@userToken"); // Remove apenas o token do usuário
            setUser(null);
        } catch (error) {
            console.log("Erro ao remover token do AsyncStorage", error);
        }
    }


    async function signIn(email, password) {
        setLoading(true);

        try {
            const [error, response] = await to(api.post('unauth/authentication/signin',
                {
                    email,
                    password
                }
            ))

            const userToken = response.data.userToken;
            const userInfo = jwtDecode(userToken);
            console.log(userToken);

            await AsyncStorage.setItem("@userToken", userToken);
            api.defaults.headers["Authorization"] = `Bearer ${userToken}`;

            setUser(userInfo); // Atualiza o usuário
            setUserName(userName);
            console.log(userName);
            setLoading(false);

        } catch (err) {
            console.log("Erro ao logar", err);
            setLoading(false);
        }
    }


    async function recuperarSenha(email) {
        setLoading(true);
        const [error, response] = await to(api.post('unauth/user/password/solicit',
            { email },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao enviar e-mail", error)
        }

        setLoading(false);
    }

    async function codeSubmit(codigo) {
        setLoading(true);
        const [error, response] = await to(api.post('unauth/user/password/confirm',
            { passwordResetCode: codigo },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao enviar código", error)
        }
        setCodigo(codigo);
        setLoading(false);
    }

    async function cadastrar(password, confirmPassword) {
        setLoading(true);
        const [error, response] = await to(api.post('unauth/user/password/new',
            { password, passwordConfirmation: confirmPassword, passwordResetCode: codigo },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao enviar senhas", error)
        }
        setCodigo(null);
        setLoading(false);
        navigation.goBack();
    }

    async function addNewPlant(plantToken,) {
        const [error, response] = await to(api.post(`auth/plant/add?plantName=${search}`));

        if (error) {
            console.error('Erro ao enviar planta:', error);
            return;
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, userName, signUp, signOut, signIn, recuperarSenha, cadastrar, codeSubmit, addNewPlant, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
