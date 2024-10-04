
import React, { useState } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Header from '../../components/Header'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Modal,
    FlatList,
} from "react-native";

export default function Configuracao() {
    const [planta, setPlanta] = useState("");
    const [listaDePlantas, setListaDePlantas] = useState([]);
    const [modalPlant, setModalPlant] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [plantInfo, setPlantInfo] = useState(null);
    const navigation = useNavigation();

    async function pesquisarPlantas(search) {
        console.log({ search });
        const [error, response] = await to(api.get(`unauth/plant/search?plantName=${search}`));

        if (error) {
            console.error('Erro ao buscar plantas:', error);
            return;
        }
        setListaDePlantas(response.data.plants);
        setPlanta("");
    }

    async function fetchPlantInfo(plant_access_token) {
        console.log({ plant_access_token });
        const [error, response] = await to(api.get(`unauth/plant/info?plant_access_token=${plant_access_token}`));

        if (error) {
            console.error('Erro ao buscar informações da planta:', error);
            return;
        }
        setPlantInfo(response.data.plants);
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
                    onPress={() => {
                        setSelectedPlant(item);
                        fetchPlantInfo(item.access_token);
                        setModalPlant(true);
                    }}
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
        <>
            <Header title='Pesquisar Plantas'></Header>
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
                    {modalPlant && selectedPlant && plantInfo && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalPlant}
                            onRequestClose={() => setModalPlant(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalCard}>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${selectedPlant.thumbnail}` }}
                                        style={styles.modalImage}
                                    />
                                    <Text style={styles.textNamePlant}>{selectedPlant.entity_name}</Text>
                                </View>
                                <ScrollView>
                                    <View style={styles.viewDetails}>
                                        <Text style={styles.textDetailsPlant}>Nome comum: {plantInfo.common_names}</Text>
                                        <Text style={styles.textDetailsPlant}>Descrição: {plantInfo.description.value}</Text>
                                        <Text style={styles.textDetailsPlant}>Partes Comestíveis: {plantInfo.edible_parts}</Text>
                                        <Text style={styles.textDetailsPlant}>Rega Recomendada: {plantInfo.watering.max}</Text>
                                        <Text style={styles.textDetailsPlant}>Sinonimos: {plantInfo.synonyms.join(', \n')}</Text>
                                        <Text style={styles.textDetailsPlant}>Classe: {plantInfo.taxonomy.class}</Text>
                                        <Text style={styles.textDetailsPlant}>Gênero: {plantInfo.taxonomy.genus}</Text>
                                        <Text style={styles.textDetailsPlant}>Ordem: {plantInfo.taxonomy.order}</Text>
                                    </View>
                                </ScrollView>
                                <View style={{ justifyContent: "flex-start", alignItems: "center", marginTop: 10, }}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate("Minhas Plantas", { newPlant: selectedPlant }); setModalPlant(false); }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 5, color: 'white' }}>Adicionar em Minhas Plantas</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                    )}
                </View>
            </ImageBackground >
        </>
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
    },
    modalContainer: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 15,
        backgroundColor: '#f2d8cb', //#edddd5
        borderColor: "#587f56",
        borderWidth: 5,
        borderRadius: 25,
        padding: 10,
        flex: 1,
    },
    modalImage: {
        width: "85%",
        height: 190,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    closeButton: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#587f56",
        borderRadius: 25,
    },
    viewDetails: {
        justifyContent: "center",

    },
    textNamePlant: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    textDetailsPlant: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 15,
    },
    modalCard: {
        justifyContent: "flex-start",
        alignItems: "center",
    },

});