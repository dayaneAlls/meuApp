import React, { useState } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";

export default function Visitante() {
  const [planta, setPlanta] = useState("");
  const [listaDePlantas, setListaDePlantas] = useState([]);

  async function pesquisarPlantas(search) {
    console.log({ search });
    const [error, response] = await to(api.get(`unauth/plants/search?plantName=${search}`));

    if (error) {
      console.error('Erro ao buscar plantas:', error);
      return;
    }

    console.log({ data: response.data });
    setListaDePlantas(response.data.plants);
    setPlanta("");
  }

  // Calcular a largura disponível para cada card
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth / 2 - 20; // Subtrai a margem/padding conforme necessário

  const renderItem = ({ item }) => {
    const base64Image = `data:image/jpeg;base64,${item.thumbnail}`;

    return (
      <View style={[styles.card, { width: cardWidth }]}>
        <TouchableOpacity
          style={styles.cardNoticia}
          onPress={() => { }}
        >
          <Image
            source={{ uri: base64Image }}
            style={styles.image}
            resizeMode="cover" // Ajusta o modo de redimensionamento da imagem
          />
          <Text style={styles.cardText}>{item.matched_in}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../img/fundoPesquisar2.jpg")}
      style={styles.imageBackground}
      imageStyle={{ opacity: 0.2 }}
    >
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Pesquisar Plantas"
            style={styles.input}
            value={planta}
            onChangeText={(text) => setPlanta(text)}
          />
          <TouchableOpacity
            onPress={() => pesquisarPlantas(planta)}
          >
            <MaterialIcons name="search" style={styles.iconPlace} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={listaDePlantas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index} // Assegure-se de ter uma chave única para cada item
          numColumns={2} // Define o número de colunas
          contentContainerStyle={styles.cardsContainer} // Estilo do contêiner de itens 
        />
      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  input: {
    color: "#3a4d39",
    height: 55,
    fontSize: 20,
    paddingLeft: 25,
    borderColor: "#587f56",
    borderWidth: 2,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 25,
    width: 360,
  },

  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: '#f2d8cb', //#edddd5
    borderColor: "#587f56",
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
  },
  cardNoticia: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    height: '100%',

  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 90,
    borderRadius: 5
  },
  iconPlace: {
    position: "absolute",
    left: 310,
    top: -45,
    fontSize: 40,
    color: "rgba(58, 77, 57,.7)",
  }
});
