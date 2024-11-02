import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import to from "await-to-js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userCares, setUserCares] = useState(null);
    const [codigo, setCodigo] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorage() {
            setLoading(true);
            try {
                const storageUserToken = await AsyncStorage.getItem("@userToken");

                if (storageUserToken) {
                    const userInfo = jwtDecode(storageUserToken);

                    // Verifica se o token é válido (não expirado)
                    if (Date.now() >= storageUserToken.exp * 1000) {
                        console.log("Token expirado");
                        await AsyncStorage.removeItem("@userToken");
                        setUser(null);
                        setUserToken(null);
                        setUserName(null);
                        setUserEmail(null);
                    } else {
                        setUserToken(storageUserToken);
                        setUser(userInfo);
                        setUserName(userInfo.name);
                        setUserEmail(userInfo.email);
                    }
                } else {
                    setUser(null);
                    setUserToken(null);
                    setUserName(null);
                    setUserEmail(null);
                }
            } catch (error) {
                console.log("Erro ao carregar usuário do AsyncStorage:", error);
                setUser(null);
                setUserToken(null);
                setUserName(null);
                setUserEmail(null);
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
            setUserToken(null);
            setUserName(null);
            setUserEmail(null);
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
            ));

            const userToken = response.data.userToken;
            setUserToken(userToken);
            const userInfo = jwtDecode(userToken);
            const userName = userInfo.name;
            const userEmail = userInfo.email;

            // Salva o token no AsyncStorage
            await AsyncStorage.setItem("@userToken", userToken);

            // Define o token no cabeçalho padrão da API
            api.defaults.headers["Authorization"] = `Bearer ${userToken}`;

            // Atualiza o estado do usuário e o token
            setUser(userInfo);
            setUserName(userName);
            setUserEmail(userEmail);

            setUserCares(listCare());

        } catch (err) {
            console.log("Erro ao logar:", err);
        } finally {
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

    async function addNewPlant(plantToken) {
        setLoading(true);

        // Recupera o token mais atualizado do AsyncStorage
        const token = await AsyncStorage.getItem("@userToken");
        if (!token) {
            console.error("Token não encontrado. Usuário não autenticado.");
            setLoading(false);
            return;
        }
        const [error, response] = await to(api.post(`auth/plant/add?plant_access_token=${plantToken}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }));

        if (error) {
            console.error('Erro ao enviar planta:', error);
            setLoading(false);
            return;
        }
        setLoading(false);
    }

    async function listPlants() {
        const [error, response] = await to(api.get(`auth/plant/list`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));
        if (error) {
            console.error('Erro ao buscar plantas:', error);
            return;
        }
        return response;
    }

    async function listActivities() {
        const [error, response] = await to(api.get(`unauth/plant/activity/list`));
        if (error) {
            console.error('Erro ao buscar atividades:', error);
            setLoading(false);
            return;
        }
        return response;
    }

    async function addLembrete(plantId, novaNotificacao) {
        console.log({
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
            body: {
                ...novaNotificacao
            }
        });

        const [error, response] = await to(api.post(`auth/plant/${plantId}/care/add`,
            {
                ...novaNotificacao
            },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ));
        if (error) {
            console.error('Erro ao adicionar lembrete:', error);
            setLoading(false);
            return;
        }
    }

    async function listCare() {
        const [error, response] = await to(api.get(`auth/user/care/list`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));
        if (error) {
            console.error('Erro ao buscar cuidados:', error);
            return;
        }
        return response;
    }

    async function changeNamePlant(namePlant) {
        setLoading(true);
        const [error, response] = await to(api.post('',
            { namePlant },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao alterar nome", error)
        }
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, userName, userEmail, signUp, signOut, signIn, recuperarSenha, cadastrar, codeSubmit, addNewPlant, listPlants, listActivities, addLembrete, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
