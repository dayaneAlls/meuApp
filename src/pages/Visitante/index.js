import React, { useState } from "react";

import to from 'await-to-js'
import axios from 'axios'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
} from "react-native";

export default function Visitante() {
  const [planta, setPlanta] = useState("");

  async function pesquisarPlantas(search) {

    const [error, plantInfo] = await to(axios.get(`http://localhost:3000/plants/search?plantName=${search}`))

    console.log({ error, plantInfo })
    alert("Pesquisar: " + planta);
    setPlanta("");
  }
  return (
    <ImageBackground
      source={require("../../img/cereja.jpg")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.areaInput}>
          <TextInput
            placeholder="Pesquisar Plantas"
            style={styles.input}
            value={planta}
            onChangeText={(text) => setPlanta(text)}
          />
          <TouchableOpacity
            style={styles.btnPesquisar}
            onPress={pesquisarPlantas(planta)}
          >
            <Text style={styles.txtPesquisar}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardNoticia}
            onPress={() => Linking.openURL("https://www.tuacasa.com.br/plantas-faceis-de-cuidar/")}
          >
            <Image
              source={require("../../img/plantas-faceis-de-cuidar.webp")}
              style={{
                maxWidth: '45%',
                maxHeight: '45%',
                opacity: 1,
              }}
            ></Image>
            <Text style={styles.cardText}>40 plantas mais fáceis de cuidar para cultivar em casa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>

    //https://www.tuacasa.com.br/plantas-faceis-de-cuidar/
    //teste1234
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
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
    width: 310,
    margin: 5,
  },
  btnPesquisar: {
    backgroundColor: "#3a4d39",
    borderColor: "rgba(255,255,255,.5)",
    borderWidth: 0.4,
    borderRadius: 24,
    height: 55,
    marginTop: 18,
  },
  txtPesquisar: {
    color: "rgba(255,255,255,.9)",
    fontSize: 20,
    textAlign: "center",
    padding: 12,
  },
  card: {
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardNoticia: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#E2DAD6',
    borderColor: "#000000",
    borderWidth: 1,
    padding: 20,
    marginTop: 30,
    height: 600,
    borderRadius: 15,
  },
  cardText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    // marginTop: 10,
    marginVertical: 10,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
});
