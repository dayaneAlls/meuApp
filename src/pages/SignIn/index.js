import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../contexts/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function SignIn() {
  const { signIn, loading } = useContext(AuthContext);
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (email === "" || password === "") {
      alert("Por favor preencha todos os campos!");
      return;
    }
    try {
      signIn(email, password)
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../img/fundo.png")}
        style={styles.imageBackground}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.telaLogin}>
          <View style={styles.viewLogo}>
            <Image
              source={require("../../img/logo1.png")}
              style={styles.logo}
            ></Image>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,.5)"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <MaterialIcons name="person" style={styles.iconPlace} />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="rgba(255,255,255,.5)"
              secureTextEntry={hidePass}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
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
          <LinearGradient colors={['#779675', '#4b6949', '#2b382a']} style={styles.btnEntrar}>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.txtEntrar}>Entrar</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity onPress={() => navigation.navigate("EsqueceuSenha")}>
            <Text style={{ color: "#3A4D39", marginTop: 20, fontSize: 17, fontWeight: "bold" }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          <View style={styles.viewCadastrar}>
            <Text style={{ color: "rgba(255,255,255,1)", fontSize: 18, marginTop: 15, }}>
              Não possui conta?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.btnCadastrar}>
              <Text style={styles.txtCadastrar}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Visitante")} style={styles.btnVisitante}>
            <Text style={styles.txtVisitante}>Entrar como visitante</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 130,
    height: 118,
    borderColor: '#2b382a',
    borderWidth: 2,
    borderRadius: 60,

  },

  viewLogo: {
    borderRadius: 60,
    marginTop: 15,
    elevation: 15,
    shadowColor: 'black',
  },

  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  telaLogin: {
    backgroundColor: "#739072",
    borderRadius: 25,
    padding: 15,
    borderColor: "rgba(58,77,57,.75)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "87%",
    shadowColor: 'black',
    elevation: 25,
    opacity: 0.8,
  },
  btnEntrar: {
    borderWidth: 0.4,
    borderRadius: 24,
    height: 43,
    width: 300,
    maxWidth: "65%",
    marginTop: 25,
    shadowColor: 'black',
    elevation: 10,
  },
  txtEntrar: {
    color: "rgba(255,255,255,.9)",
    fontSize: 25,
    textAlign: "center",
    padding: 2,
    fontWeight: 'bold',
  },
  input: {
    color: "white",
    height: 45,
    fontSize: 18,
    paddingLeft: 15,
    borderBottomWidth: 1.5,
    borderColor: "rgba(255,255,255,1)",
    marginTop: 30,
    borderRadius: 15,
    width: 295,
  },
  iconPlace: {
    position: "absolute",
    right: 17,
    top: 40,
    fontSize: 20,
    color: "rgba(255,255,255,.5)",
  },
  iconPlacePassword: {
    position: "absolute",
    right: 17,
    top: -25,
    fontSize: 20,
    color: "rgba(255,255,255,.5)",
  },
  viewCadastrar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },
  txtCadastrar: {
    color: "#3A4D39",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
  },
  txtVisitante: {
    color: "rgba(255,255,255,.9)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  btnCadastrar: {
    borderRadius: 24,
    height: 35,
    width: 135,
    marginTop: 18,
  },
  btnVisitante: {
    borderRadius: 24,
    height: 43,
    width: 260,
    marginTop: 25,
    marginBottom: 20,
  }
});
