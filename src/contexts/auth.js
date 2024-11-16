import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import to from "await-to-js";
import { jwtDecode } from "jwt-decode";
//import { limparNotificacoesLocais } from "../utils/notificationsUtils"

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
            // await limparNotificacoesLocais(); // Limpa notificações locais antes do logout
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

            // setUserCares(listCare());

        } catch (err) {
            console.log("Erro ao logar:", err);
        } finally {
            setLoading(false);
        }
    }


    async function recuperarSenha(email) {
        /*setLoading(true);
        const [error, response] = await to(api.post('unauth/user/password/solicit',
            { email },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao enviar e-mail", error)
        }
 
        setLoading(false);*/
    }

    async function codeSubmit(codigo) {
        /*setLoading(true);
        const [error, response] = await to(api.post('unauth/user/password/confirm',
            { passwordResetCode: codigo },
        ))
        if (error) {
            console.log(error)
            setLoading(false);
            throw new Error("Erro ao enviar código", error)
        }
        setCodigo(codigo);
        setLoading(false);*/
    }

    async function cadastrar(password, confirmPassword) {
        /* setLoading(true);
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
         navigation.goBack();*/
    }

    async function deleteUser(idPlant) {
        const [error, response] = await to(api.delete(`auth/plant/${idPlant}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
        ));
        if (error) {
            console.error('Erro ao deletar planta:', error);
            setLoading(false);
            return;
        }
        console.log(response.data);
    }

    async function patchUserName(name) {
        const [error, response] = await to(api.patch(`auth/user/edit`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));

        if (error) {
            console.error('Erro ao editar usuario:', error);
            setLoading(false);
            return;
        }
        setUserName(name);
        console.log(response.data);
    }

    async function patchUserPassword(oldPassword, password, passwordConfirmation) {
        const [error, response] = await to(api.patch(`auth/user/password`, {
            oldPassword,
            password,
            passwordConfirmation
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));

        if (error) {
            console.error('Erro ao editar usuario:', error);
            setLoading(false);
            return false;
        }

        console.log(response.data);
        return true;
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

    async function deletePlant(idPlant) {
        const [error, response] = await to(api.delete(`auth/plant/${idPlant}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
        ));
        if (error) {
            console.error('Erro ao deletar planta:', error);
            setLoading(false);
            return;
        }
        console.log(response.data);
    }

    async function patchPlant(idPlant, name) {
        const [error, response] = await to(api.patch(`auth/plant/${idPlant}`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));

        if (error) {
            console.error('Erro ao editar planta:', error);
            setLoading(false);
            return;
        }
        console.log(response.data);
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

    async function listPlantCare() {
        const [error, response] = await to(api.get(`auth/user/care/list`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }));
        if (error) {
            console.error('Erro ao buscar cuidados:', error);
            return;
        }
        console.log(response.data);
        return response;
    }

    async function deleteLembrete(idPlant, idCare) {
        const [error, response] = await to(api.delete(`auth/plant/${idPlant}/care/${idCare}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
        ));
        if (error) {
            console.error('Erro ao deletar lembrete:', error);
            setLoading(false);
            return;
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user, userName, userEmail, loading,
            signUp, signOut, signIn, patchUserName, patchUserPassword, recuperarSenha, cadastrar, codeSubmit, addNewPlant, listPlants,
            deletePlant, patchPlant, listActivities, addLembrete, deleteLembrete, listPlantCare,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
