import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import to from "await-to-js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Header from '../../components/Header'
import ModalLembretes from "../../components/ModalLembretes/lembretes";
import ModalHistorico from "../../components/ModalHistorico/historico";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

export default function MinhasPlantas() {

    const navigation = useNavigation();
    const [plantList, setPlantList] = useState([]);
    const { listPlants } = useContext(AuthContext);
    const [plantInfo, setPlantInfo] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [modalCuidados, setModalCuidados] = useState(false);
    const [modalLembrete, setModalLembrete] = useState(false);
    const [modalHistorico, setModalHistorico] = useState(false);
    const [confirmExcluir, setConfirmExcluir] = useState(false);
    const [alterarNomePlanta, setAlterarNomePlanta] = useState(false);

    async function fetchPlantInfo(plant_access_token) {
        // console.log({ plant_access_token });
        const [error, response] = await to(api.get(`unauth/plant/info?plant_access_token=${plant_access_token}`));

        if (error) {
            console.error('Erro ao buscar informações da planta:', error);
            return;
        }
        setPlantInfo(response.data.plants);
    }

    async function handleList() {
        var response = await listPlants();
        //console.log({ b: response.data.list });
        setPlantList(response.data.list);
    }

    useEffect(() => {
        handleList();
    }, []);

    const handleDelete = (index) => {
        const updatedList = plantList.filter((_, i) => i !== index);
        setPlantList(updatedList);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.cardNoticia} onPress={() => { setSelectedPlant(item); fetchPlantInfo(item.access_token); setModalCuidados(true) }}>
                <Image source={{ uri: item.url_imagem }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.nome}</Text>
                <TouchableOpacity
                    onPress={() => setConfirmExcluir(true)} // Chama a função handleDelete passando o index do item
                >
                    <Icon name="trash-can-outline" style={[styles.iconPlace, { left: 100, color: "#cc544e" }]} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setAlterarNomePlanta(true)} // Chama a função handleDelete passando o index do item
                >
                    <Icon name="square-edit-outline" style={[styles.iconPlace, { left: 60, color: "#659e5f" }]} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Header title='Minhas Plantas'></Header>
            <SafeAreaView >
                <ImageBackground
                    //source={require("../../img/fundocasa.jpg")}
                    //source={require("../../img/fundoMinhasPlantas.png")}
                    style={styles.imageBackground}
                    imageStyle={{ opacity: 0.3 }}
                >
                    <View style={styles.container}>
                        <View style={{ marginBottom: 20, height: "96%", justifyContent: "center" }}>
                            <FlatList
                                data={plantList}
                                keyExtractor={(item, index) => index}
                                renderItem={renderItem}
                                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma planta adicionada{"\n"}Adicione uma planta à sua lista de plantas clicando no botão "adicionar"</Text>}
                            />
                            <View style={{ borderColor: "#a3d1a1", justifyContent: "center", alignItems: "center" }}>
                                < TouchableOpacity style={styles.buttonAddLembrete} onPress={() => navigation.navigate("Pesquisar Plantas")}>
                                    <Icon name="plus" style={{ fontSize: 50, color: "#2a3b29" }} />
                                </TouchableOpacity>
                                <Text >Adicionar</Text>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={confirmExcluir}
                            onRequestClose={() => setConfirmExcluir(false)}>
                            <View style={styles.modalExcluirContainer}>
                                <View style={styles.modalExcluirContent}>
                                    <Text style={styles.modalExcluirText}>Você tem certeza que deseja excluir essa planta da sua lista de plantas?</Text>
                                    <View style={styles.buttonExcluirContainer}>
                                        <TouchableOpacity style={styles.buttonExcluir} onPress={() => handleDelete(index)}>
                                            <Text style={styles.buttonExcluirText}>Excluir</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonExcluir} onPress={() => setConfirmExcluir(false)}>
                                            <Text style={styles.buttonExcluirText}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={alterarNomePlanta}
                            onRequestClose={() => setAlterarNomePlanta(false)}>
                            <View style={styles.modalExcluirContainer}>
                                <View style={styles.modalExcluirContent}>
                                    <Text style={styles.modalExcluirText}>Insira o novo nome da sua planta</Text>
                                    <View style={styles.buttonExcluirContainer}>

                                        <TouchableOpacity style={styles.buttonExcluir} onPress={() => handleDelete(index)}>
                                            <Text style={styles.buttonExcluirText}>Salvar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonExcluir} onPress={() => setAlterarNomePlanta(false)}>
                                            <Text style={styles.buttonExcluirText}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {modalCuidados && selectedPlant && plantInfo && (
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalCuidados}
                                onRequestClose={() => setModalCuidados(false)}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalHeader}>
                                        <TouchableOpacity onPress={() => setModalCuidados(false)}>
                                            <Icon name="arrow-left" style={styles.iconVoltar} />
                                        </TouchableOpacity>
                                        <Text style={styles.modalTitle}>Cuidados Minhas Plantas</Text>
                                    </View>
                                    <View style={{ padding: 20 }}>
                                        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
                                            <Image
                                                source={{ uri: selectedPlant.url_imagem }}
                                                style={styles.modalImage}
                                            />
                                            <Text style={styles.textNamePlant}>{plantInfo.name}</Text>
                                        </View>
                                        <View style={styles.viewDetails}>
                                            <View style={styles.viewDescricao}>
                                                <Text numberOfLines={7} style={styles.textDetailsPlant}>
                                                    <Text style={{ fontWeight: 'bold' }}>Nome comum:</Text> {plantInfo.common_names}
                                                    <Text style={{ fontWeight: 'bold' }}>{"\n"}Descrição:</Text> {plantInfo.description.value}</Text>
                                            </View>
                                            <View style={[styles.viewDetails2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                                <View style={styles.viewDescricao2}>
                                                    <Icon name="sprout" size={35} color="green" style={{ paddingRight: 15 }} />
                                                    <Text style={styles.textDetailsPlant}>
                                                        <Text style={{ fontWeight: 'bold' }}>Comestível:</Text>
                                                        {"\n"}{plantInfo.edible_parts}
                                                    </Text>
                                                </View>
                                                <View style={styles.viewDescricao2}>
                                                    <Icon name="seed" size={40} color="#7a4526" style={{ paddingRight: 10 }} />
                                                    <Text style={styles.textDetailsPlant}>
                                                        <Text style={{ fontWeight: 'bold' }}>Cultivo:</Text>
                                                        {"\n"}{plantInfo.propagation_methods}
                                                    </Text>
                                                </View>
                                                <View style={styles.viewDescricao2}>
                                                    <Icon name="water-check" size={40} color="#51a9e0" style={{ paddingRight: 10 }} />
                                                    <Text style={styles.textDetailsPlant}>
                                                        <Text style={{ fontWeight: 'bold' }}>Rega:</Text>
                                                        {"\n"}{plantInfo.watering.max}
                                                    </Text>
                                                </View>
                                                <View style={styles.viewDescricao2}>
                                                    <Icon name="white-balance-sunny" size={40} color="#f5f125" style={{ paddingRight: 10 }} />
                                                    <Text style={styles.textDetailsPlant}>
                                                        <Text style={{ fontWeight: 'bold' }}>Iluminação:</Text>
                                                        {"\n"}{plantInfo.Iluminacao}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.modalBottons}>
                                        <View style={styles.viewButtons}>
                                            <TouchableOpacity style={styles.buttons} onPress={() => { setModalCuidados(false); setModalLembrete(true); }}>
                                                <Icon name="bell-ring" size={45} color="#f6fff5" />
                                            </TouchableOpacity>
                                            <Text style={styles.textAddPlant}>Lembretes</Text>
                                        </View>
                                        <View style={styles.viewButtons}>
                                            <TouchableOpacity style={styles.buttons} onPress={() => { setModalCuidados(false); setModalHistorico(true); }}>
                                                <Icon name="clipboard-text-clock-outline" size={45} color="#f6fff5" />
                                            </TouchableOpacity>
                                            <Text style={styles.textAddPlant}>Histórico</Text>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalLembrete}
                        >
                            <ModalLembretes setVisible={() => { setModalCuidados(true); setModalLembrete(false); }}></ModalLembretes>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalHistorico}
                        >
                            <ModalHistorico setVisible={() => { setModalCuidados(true); setModalHistorico(false); }}></ModalHistorico>
                        </Modal>
                    </View >
                </ImageBackground >
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    card: {
        marginTop: 25,
        marginBottom: 15,
        marginHorizontal: 45,
        backgroundColor: '#c4d4c3',
        borderRadius: 15,
        padding: 15,
        flex: 1,
        borderWidth: 1,
        borderColor: "#587f56",
    },
    imageBackground: {
        height: '100%',
        width: '100%',
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 10,
    },
    cardImage: {
        width: "85%",
        height: 200,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 10,

    },
    cardNoticia: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    iconPlace: {
        position: "absolute",
        top: -45,
        fontSize: 40,
    },
    modalContainer: {
        backgroundColor: '#f6fff5', //#faf2ed
        flex: 1,
    },
    modalImage: {
        width: "80%",
        height: 180,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    buttons: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        borderRadius: 20,
        borderWidth: 3,
        backgroundColor: '#587f56',
        borderColor: "#587f56",
        marginTop: 10,
        shadowColor: 'black',
        elevation: 5,
        marginBottom: 5,
        marginLeft: 10,
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
        fontSize: 18,
        color: '#3a4d39',
        fontFamily: 'sans-serif-condensed',

    },
    modalBottons: {
        justifyContent: "center",
        alignItems: "space-between",
        flexDirection: 'row',
    },
    viewDescricao: {
        backgroundColor: '#d0e0ce',
        borderColor: "#587f56",
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between', // Espaça o texto e o ícone
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewDescricao2: {
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        width: "47%",
        height: "50%",
        borderWidth: 4,
        borderColor: "#b5d4b4",
    },
    viewDetails2: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewButtons: {
        marginTop: 5,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap',
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
    textAddPlant: {
        fontSize: 13,
        textAlign: 'center',
        color: 'black',
        flexWrap: "wrap"
    },
    modalExcluirContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
    },
    modalExcluirContent: {
        width: '100%',
        backgroundColor: '#afcca8',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
    },
    modalExcluirText: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonExcluirContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonExcluir: {
        flex: 1,
        backgroundColor: '#3A4D39',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonExcluirText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonAddLembrete: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 5,
        backgroundColor: "#a3d1a1",
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 5,
        shadowColor: 'black',
        elevation: 5,
    },
})