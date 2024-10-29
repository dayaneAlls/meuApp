
import React, { useState, useContext } from "react";
import api from "../../services/api";
import to from "await-to-js";
import Header from '../../components/Header'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

export default function PesquisarPlantas() {

    const [planta, setPlanta] = useState("");
    const [listaDePlantas, setListaDePlantas] = useState([]);
    const [modalPlant, setModalPlant] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const { addNewPlant } = useContext(AuthContext);
    const [plantInfo, setPlantInfo] = useState(null);

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
        // console.log({ plant_access_token });
        const [error, response] = await to(api.get(`unauth/plant/info?plant_access_token=${plant_access_token}`));

        if (error) {
            console.error('Erro ao buscar informações da planta:', error);
            return;
        }
        setPlantInfo(response.data.plants);
    }

    function handleAdd() {
        addNewPlant(selectedPlant.access_token,);
    }

    // Calcular a largura disponível para cada card
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = windowWidth / 2 - 20; // Subtrai a margem/padding conforme necessário
    const scrollWidth = windowWidth / 1 - 40;

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
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            placeholder="Pesquise uma Planta"
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
                    <View style={{ marginBottom: 20, height: "80%", justifyContent: "center" }}>
                        <FlatList
                            data={listaDePlantas}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index} // chave única para cada item
                            numColumns={2} // Define o número de colunas
                            contentContainerStyle={styles.cardsContainer} // Estilo do contêiner de itens 
                        />
                    </View>

                    {modalPlant && selectedPlant && plantInfo && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalPlant}
                            onRequestClose={() => setModalPlant(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity onPress={() => setModalPlant(false)}>
                                        <Icon name="arrow-left" style={styles.iconVoltar} />
                                    </TouchableOpacity>
                                    <Text style={styles.modalTitle}>Informações da planta</Text>
                                </View>
                                <View style={{ padding: 20 }}>
                                    <View style={styles.modalCard}>
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${selectedPlant.thumbnail}` }}
                                            style={styles.modalImage}
                                        />
                                        <Text style={styles.textNamePlant}>{selectedPlant.entity_name}</Text>
                                    </View>
                                    <View style={styles.viewDetails}>
                                        <ScrollView horizontal={true}>
                                            <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                                <Text numberOfLines={7} style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Nome comum:</Text> {plantInfo.common_names}
                                                    <Text style={{ fontWeight: 'bold' }}>{"\n"}Descrição:</Text> {plantInfo.description.value.slice(0, 251)}</Text>
                                                <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 15 }} />
                                            </View>
                                            <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                                <Text style={styles.textDetailsPlant}>
                                                    {plantInfo.description.value.slice(251)}
                                                </Text>
                                                <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                            </View>
                                            <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Sinonimos:</Text> {plantInfo.synonyms.join(',')}
                                                </Text>
                                                <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                            </View>
                                            <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Classe:</Text> {plantInfo.taxonomy.class}
                                                    <Text style={{ fontWeight: 'bold' }}>{"\n"}Gênero:</Text> {plantInfo.taxonomy.genus}
                                                    <Text style={{ fontWeight: 'bold' }}>{"\n"}Ordem:</Text> {plantInfo.taxonomy.order}
                                                </Text>
                                                <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                            </View>
                                        </ScrollView>
                                        <View style={[styles.viewDetails2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                            <View style={styles.scrollModal2}>
                                                <Icon name="sprout" size={35} color="green" style={{ paddingRight: 15 }} />
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Comestível:</Text>
                                                    {"\n"}{plantInfo.edible_parts}
                                                </Text>
                                            </View>
                                            <View style={styles.scrollModal2}>
                                                <Icon name="seed" size={40} color="#7a4526" style={{ paddingRight: 10 }} />
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Cultivo:</Text>
                                                    {"\n"} jhsdhsdhsu
                                                </Text>
                                            </View>
                                            <View style={styles.scrollModal2}>
                                                <Icon name="water-check" size={40} color="#51a9e0" style={{ paddingRight: 10 }} />
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Rega:</Text>
                                                    {"\n"}{plantInfo.watering.max}
                                                </Text>
                                            </View>
                                            <View style={styles.scrollModal2}>
                                                <Icon name="white-balance-sunny" size={40} color="#f5f125" style={{ paddingRight: 10 }} />
                                                <Text style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Iluminação:</Text>
                                                    {"\n"}{plantInfo.Iluminacao}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => { handleAdd(); setModalPlant(false); }}>
                                            <Icon name="plus-circle" size={70} color="#587f56" />
                                        </TouchableOpacity>
                                        <Text style={styles.textAddPlant}>Adicionar Planta</Text>
                                    </View>
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
        backgroundColor: '#f6fff5', //#faf2ed
        flex: 1,
    },
    modalImage: {
        width: "80%",
        height: 180,
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    viewDetails: {
        justifyContent: "center",

    },
    modalCard: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textAddPlant: {
        fontSize: 13,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        color: 'black',
        flexWrap: "wrap"
    },
    iconVoltar: {
        fontSize: 30,
        color: 'rgba(255,255,255,1)',
        marginLeft: 15,
    },
    modalTitle: {
        fontSize: 22,
        marginLeft: 20,
        color: 'rgba(255,255,255,1)',
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeader: {
        backgroundColor: "#3a4d39",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 50,
    },
    scrollModal: {
        backgroundColor: 'white',
        borderColor: "#587f56",
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 15,
        marginRight: 10,
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between', // Espaça o texto e o ícone
        alignItems: 'center',
        flexDirection: 'row',
    },

    scrollModal2: {
        backgroundColor: '#c0c9bf',
        marginTop: 5,
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        width: "47%",
        height: "50%",
        borderWidth: 0.6,
        borderColor: "#587f56",
    },
    viewDetails2: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    textDetailsPlant: {
        fontSize: 18,
        color: '#3a4d39',
        fontFamily: 'sans-serif-condensed',

    },
    textNamePlant: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
});