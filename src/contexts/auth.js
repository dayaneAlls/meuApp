import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import to from "await-to-js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  // const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      setLoadingAuth(true);
      const storageUser = await AsyncStorage.getItem("@userToken");
      // setLoadingAuth(false)

      if (storageUser) {
        setUser(storageUser);
      } else {
        setUserToken(null);
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
    });
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    try {
      const [error, response] = await to(
        api.post("unauth/authentication/signin", {
          email,
          password,
        })
      );

      console.log({ error, response });

      const userToken = response.data.userToken;
      console.log(userToken);

      const userInfo = jwtDecode(userToken);
      console.log(userInfo);

      await AsyncStorage.setItem("@userToken", userToken);
      api.defaults.headers["Authorization"] = `Bearer ${userToken}`;

      setUser(userInfo.name);

      setLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao logar", err);
      setLoadingAuth(false);
    }

    // console.log(response.data);

    // if (error) {
    //     console.log(error)
    //     setLoadingAuth(false)
    //     throw new Error("Erro ao efetuar Login", error)
    // }

    /* if (response) {
             const { id, name, userToken } = response.data;
             const data = { id, name, token, email };*/
  }

  /*const [error, response] = await to(api.post('unauth/signin',
        {
            email,
            password
        }
    ))

    if (error) {
        console.log(error)
        setLoadingAuth(false)
        throw new Error("Erro ao efetuar Login", error)
    }

    if (response) {
        const { id, name, userToken } = response.data;
        const data = { id, name, token, email };*/

  /*async function recuperarSenha(email) {
        setLoadingAuth(true);
        const [error, response] = await to(api.post('unauth/password/solicit',
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
        const [error, response] = await to(api.post('unauth/password/solicit',
            { codigo },
        ))
        if (error) {
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao enviar código", error)
        }

        setLoadingAuth(false);
    }*/
  /*async function cadastrar(email, email2) {
        setLoadingAuth(true);
        const [error, response] = await to(api.post('unauth/password/solicit',
            { email, email2 },
        ))
        if (error) {
            console.log(error)
            setLoadingAuth(false);
            throw new Error("Erro ao enviar senhas", error)
        }

        setLoadingAuth(false);
        navigation.goBack();
    }*/

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, signOut, signIn, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
