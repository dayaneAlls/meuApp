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
  Modal,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUp() {
  const [hidePass, setHidePass] = useState(true);
  const { signUp, loading } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [messageBox, setMessageBox] = useState(true);

  function handleSignUp() {
    if (user === "" || email === "" || password === "" || passwordConfirmation === "") {
      alert("Por favor preencha todos os campos!");
      return;
    }
    signUp(email, password, user, passwordConfirmation);
    setUser("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
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
          <View style={styles.viewLogo}>
            <Image
              source={require("../../img/logo1.png")}
              style={{
                width: 130,
                height: 118,
              }}
            ></Image>
          </View>
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

            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              value={passwordConfirmation}
              onChangeText={(text) => setPasswordConfirmation(text)}
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
          <LinearGradient
            style={styles.btnCadastrar}
            colors={["#587f56", "#587f56", "#3a4d39"]}
          >
            <TouchableOpacity onPress={handleSignUp}>
              {loading ? (
                <ActivityIndicator size={50} color={"#fff"} />
              ) : (
                <Text style={styles.txtCadastrar}>CADASTRAR</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={messageBox}
          onRequestClose={() => setMessageBox(false)}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alterações realizadas</Text>
            </View>
            <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <View style={styles.modalMessageContainer}>
                <View style={styles.modalMessageContent}>
                  <Icon name="check-circle" style={styles.icon2}></Icon>
                  <Text style={styles.modalMessageText}>Cadastro efetuado com sucesso!</Text>
                  <View style={styles.buttonMessageContainer}>
                    <TouchableOpacity style={styles.buttonMessage} onPress={() => { setMessageBox(false); }}>
                      <Text style={styles.buttonMessageText}>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
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
    borderColor: "rgba(255,255,255)",
    borderWidth: 0.4,
    borderRadius: 15,
    height: 55,
    width: 300,
    maxWidth: "65%",
    marginTop: 35,
    shadowColor: "black",
    elevation: 15,
  },
  txtCadastrar: {
    color: "white",
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
    borderColor: "rgba(211, 211, 230)",
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
    backgroundColor: "rgba(223, 229, 235,.7)",
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

  viewLogo: {
    borderRadius: 60,
    marginTop: 15,
    elevation: 60,
    shadowColor: "black",
    marginTop: -80,
    marginBottom: 35,
  },
  modalContainer: {
    backgroundColor: '#dfe8df', //#faf2ed
    flex: 1,
  },
  modalHeader: {
    backgroundColor: "#3a4d39",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
  },
  modalTitle: {
    fontSize: 22,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontWeight: "bold",
    textAlign: "center"
  },
  modalMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe8df'
  },
  modalMessageContent: {
    width: '100%',
    backgroundColor: '#dfe8df',
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    alignItems: 'center',
  },
  modalMessageText: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: "bold",
  },
  buttonMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonMessage: {
    backgroundColor: '#3a4d39',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 5,
  },
  buttonMessageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon2: {
    fontSize: 180,
    color: '#7ccaeb',
    padding: 50,
  },
});
