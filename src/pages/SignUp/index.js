import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [hidePass, setHidePass] = useState(true);

  const { signUp, loadingAuth } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (user === "" || email === "" || password === "") {
      alert("Por favor preencha todos os campos!");
      return;
    }
    signUp(email, password, user);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      enabled
    >
      <ImageBackground
        source={require("../../img/1.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.viewInput}>
          <Image
            source={require("../../img/logo1.png")}
            style={{
              width: 130,
              height: 118,
              marginTop: -80,
              marginBottom: 35,
            }}
          ></Image>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={user}
              onChangeText={(text) => setUser(text)}
              placeholderTextColor="#3a4d39"
            ></TextInput>

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#3a4d39"
            ></TextInput>

            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#3a4d39"
              secureTextEntry={hidePass}
            ></TextInput>
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              {hidePass ? (
                <MaterialIcons
                  name="visibility"
                  style={styles.iconPlacePassword}
                />
              ) : (
                <MaterialIcons
                  name="visibility-off"
                  style={styles.iconPlacePassword}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnCadastrar} onPress={handleSignUp}>
            {loadingAuth ? (
              <ActivityIndicator size={50} color={"#fff"} />
            ) : (
              <Text style={styles.txtCadastrar}>CADASTRAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    jflex: 1,
    justifyContent: "center",
  },
  btnCadastrar: {
    backgroundColor: "#3a4d39",
    borderColor: "rgba(255,255,255)",
    borderWidth: 0.4,
    borderRadius: 15,
    height: 55,
    width: 300,
    maxWidth: "65%",
    marginTop: 35,
  },
  txtCadastrar: {
    color: 'white',
    fontSize: 20,
    textAlign: "center",
    padding: 12,
  },
  input: {
    color: "#3a4d39",
    height: 55,
    fontSize: 20,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "#3a4d39",
    backgroundColor: "rgba(211, 211, 230,.90)",
    marginTop: 20,
    borderRadius: 10,
    width: 310,
    margin: 5,
  },
  iconPlacePassword: {
    position: "absolute",
    right: 15,
    top: -45,
    fontSize: 25,
    color: "#3a4d39",
  },
  viewInput: {
    backgroundColor: "rgba(247, 250, 250,.71)",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    width: "90%",
    height: "90%",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});