import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import firebase from "../../services/FIrebaseConnection";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = () => {
    if (email.trim() === "") {
      alert("Por favor, insira um e-mail válido!");
      return;
    }

    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        alert("Um link para redefinição de senha foi enviado para seu e-mail.")
      )
      .catch(() =>
        alert(
          "Erro ao enviar o e-mail de redefinição. Verifique o e-mail inserido."
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <LinearGradient
      //Degrade do fundo
        style={styles.degradeFundo}
        colors={['#deffce', '#a0e2b7', '#44c48b']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} 
      >
        <View style={styles.viewInput}>
          <Image source={require("../../img/logo1.png")} style={styles.logo} />

          {/* Textos */}
          <Text style={styles.message}>
            Insira seu e-mail abaixo para recuperar sua senha.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#3a4d39"
          />

          {/* Botão redefinir senha */}
          <TouchableOpacity
            onPress={handlePasswordReset}
            style={styles.btnCadastrarContent}
          >
            {loading ? (
              <ActivityIndicator size={25} color="#fff" />
            ) : (
              <Text style={styles.txtCadastrar}>REDEFINIR SENHA</Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center'
  },
  //Fundo
  degradeFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Bloco principal
  viewInput: {
    backgroundColor: "rgba(115,144,114,.6)",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    padding: 20,
    borderRadius: 50,
    opacity: 0.9,
  },
  // Imagem do logo
  logo: { 
    width: 130, 
    height: 118, 
    marginBottom: 35,
    opacity: 0.8
  },
  //Texto principal
  message: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  //Caixa do e-mail
  input: {
    color: "#3a4d39",
    height: 55,
    fontSize: 20,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "#3a4d39",
    backgroundColor: "rgba(232,211,182,.61)",
    marginTop: 20,
    borderRadius: 10,
    width: "100%",
  },
  //Botão cadastrar
  btnCadastrarContent: {
    backgroundColor: "#3a4d39",
    borderRadius: 24,
    height: 55,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  //Texto Redefinir senha
  txtCadastrar: { 
    color: "rgba(255,255,255,.9)", 
    fontSize: 20 },
});
