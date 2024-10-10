import React, { useState, useEffect } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import Header from '../../components/Header'


export default function MinhasPlantas({ route }) {

    const [plantList, setPlantList] = useState([]);
    const [modalCuidados, setModalCuidados] = useState(true);
    const [modalLembrete, setModalLembrete] = useState(false);
    const [modalHistorico, setModalHistorico] = useState(false);

    useEffect(() => {
        if (route.params?.newPlant) {
            setPlantList([...plantList, route.params.newPlant]); // Adiciona a nova planta à lista
        }
    }, [route.params?.newPlant]);

    const handleDelete = (index) => {
        const updatedList = plantList.filter((_, i) => i !== index);
        setPlantList(updatedList);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.cardNoticia} onPress={() => setModalCuidados(true)}>
                <Image source={{ uri: `data:image/jpeg;base64,${item.thumbnail}` }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.entity_name}</Text>
                <TouchableOpacity
                    onPress={() => handleDelete(index)} // Chama a função handleDelete passando o index do item
                >
                    <Icon name="delete-empty" style={styles.iconPlace} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Header title='Minhas Plantas'></Header>
            <SafeAreaView >
                <View style={styles.container}>
                    <FlatList
                        data={plantList}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalCuidados}
                        onRequestClose={() => setModalCuidados(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalCard}>
                                <Image
                                    source={{ uri: `data:image/jpeg;base64,${plantList.thumbnail}` }}
                                    style={styles.modalImage}
                                />
                                <Text style={styles.textNamePlant}>{plantList.entity_name}</Text>
                            </View>
                            <View style={styles.viewDetails}>
                                <View style={styles.viewDescricao}>
                                    <Text numberOfLines={7} style={styles.textDetailsPlant}>Nome comum: {plantList.common_names} {"\n"}Descrição: {plantList.description}</Text>
                                </View>
                                <View style={[styles.viewDetails2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                    <View style={styles.viewDescricao2}>
                                        <Icon name="sprout" size={35} color="green" style={{ paddingRight: 15 }} />
                                        <Text style={styles.textDetailsPlant}>Partes {"\n"}Comestíveis: {plantList.edible_parts}</Text>
                                    </View>
                                    <View style={styles.viewDescricao2}>
                                        <Icon name="seed" size={40} color="#7a4526" style={{ paddingRight: 10 }} />
                                        <Text style={styles.textDetailsPlant}>Cultivo: {plantList.propagation_methods}</Text>
                                    </View>
                                    <View style={styles.viewDescricao2}>
                                        <Icon name="water-check" size={40} color="#51a9e0" style={{ paddingRight: 10 }} />
                                        <Text style={styles.textDetailsPlant}>{plantList.watering}</Text>
                                    </View>
                                    <View style={styles.viewDescricao2}>
                                        <Icon name="white-balance-sunny" size={40} color="#f5f125" style={{ paddingRight: 10 }} />
                                        <Text style={styles.textDetailsPlant}>{plantList.Iluminacao}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.modalCard, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                <View style={styles.viewButtons}>
                                    <LinearGradient style={styles.buttons}
                                        colors={['#4e6e4d', '#3a4d39']}
                                        start={{ x: 1, y: 0 }} // Ponto inicial do gradiente
                                        end={{ x: 0, y: 1 }}>
                                        <TouchableOpacity onPress={() => { setModalCuidados(false); setModalLembrete(true); }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Adicionar{"\n"}lembrete</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                                <View style={styles.viewButtons}>
                                    <LinearGradient style={styles.buttons}
                                        colors={['#4e6e4d', '#3a4d39']} //['#5cd19c', '#86db84', '#47ad7f']
                                        start={{ x: 1, y: 0 }} // Ponto inicial do gradiente
                                        end={{ x: 0, y: 1 }}>
                                        <TouchableOpacity onPress={() => { setModalCuidados(false); setModalHistorico(true); }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Histórico de{"\n"}cuidados</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </View>

                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalLembrete}
                        onRequestClose={() => setModalLembrete(false)}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.buttons} onPress={() => { setModalLembrete(false); setModalCuidados(true) }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={styles.viewButtons}>
                                <LinearGradient style={styles.buttons}
                                    colors={['#4e6e4d', '#3a4d39']} //['#5cd19c', '#86db84', '#47ad7f']
                                    start={{ x: 1, y: 0 }} // Ponto inicial do gradiente
                                    end={{ x: 0, y: 1 }}>
                                    <TouchableOpacity onPress={() => { setModalCuidados(false); setModalHistorico(true); }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Salvar</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalHistorico}
                        onRequestClose={() => setModalHistorico(false)}
                    >
                        <View>

                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
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
        left: 100,
        top: -55,
        fontSize: 50,
        color: "rgba(58, 77, 57,.7)",
    },
    modalContainer: {
        marginTop: 50,
        backgroundColor: 'white', //#faf2ed
        padding: 10,
        flex: 1,
    },
    modalImage: {
        width: "90%",
        height: 190,
        borderRadius: 20,
        marginBottom: 15,
        marginTop: 10,
    },
    buttons: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#587f56",
        borderRadius: 20,
        marginTop: 35,
        shadowColor: 'black',
        elevation: 15,
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
    modalCard: {
        justifyContent: "center",
        alignItems: "space-between",
        flexDirection: 'row',
    },
    viewDescricao: {
        //backgroundColor: '#c0c9bf',
        borderColor: "#587f56",
        borderWidth: 2,
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
        backgroundColor: '#c0c9bf',
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 15,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    viewDetails2: {
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewButtons: {
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
})