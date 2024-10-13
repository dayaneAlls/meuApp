import React, { useState, useEffect } from "react";
import api from "../../services/api";
import to from "await-to-js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Modal, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Header from '../../components/Header'
import ModalLembretes from "../../components/ModalLembretes/lembretes";

export default function MinhasPlantas({ route }) {

    const [plantList, setPlantList] = useState([]);
    const [modalCuidados, setModalCuidados] = useState(false);
    const [modalLembrete, setModalLembrete] = useState(true);
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
                    <Icon name="trash-can-outline" style={styles.iconPlace} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Header title='Minhas Plantas'></Header>
            <SafeAreaView >
                <ImageBackground
                    //  source={require("../../img/fundocasa.jpg")}
                    // source={require("../../img/fundoMinhasPlantas.png")}
                    style={styles.imageBackground}
                    imageStyle={{ opacity: 0.5 }}
                >
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
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity onPress={() => setModalCuidados(false)}>
                                        <Icon name="arrow-left" style={styles.iconVoltar} />
                                    </TouchableOpacity>
                                    <Text style={styles.modalTitle}>Cuidados Minhas Plantas</Text>
                                </View>
                                <View style={styles.modalCard}>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${plantList.thumbnail}` }}
                                        style={styles.modalImage}
                                    />
                                    <Text style={styles.textNamePlant}>{plantList.entity_name}</Text>
                                </View>
                                <View style={styles.viewDetails}>
                                    <View style={styles.viewDescricao}>
                                        <Text numberOfLines={7} style={styles.textDetailsPlant}>
                                            <Text style={{ fontWeight: 'bold' }}>Nome comum:</Text> {plantList.common_names}okotre
                                            <Text style={{ fontWeight: 'bold' }}>{"\n"}Descrição:</Text> {plantList.description}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                    <View style={[styles.viewDetails2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                        <View style={styles.viewDescricao2}>
                                            <Icon name="sprout" size={35} color="green" style={{ paddingRight: 15 }} />
                                            <Text style={styles.textDetailsPlant}>
                                                <Text style={{ fontWeight: 'bold' }}>Comestível:</Text>
                                                {"\n"}{plantList.edible_parts}usdf0ifporeit-0
                                            </Text>
                                        </View>
                                        <View style={styles.viewDescricao2}>
                                            <Icon name="seed" size={40} color="#7a4526" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>
                                                <Text style={{ fontWeight: 'bold' }}>Cultivo:</Text>
                                                {"\n"}{plantList.propagation_methods}gpyrtyort-
                                            </Text>
                                        </View>
                                        <View style={styles.viewDescricao2}>
                                            <Icon name="water-check" size={40} color="#51a9e0" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>
                                                <Text style={{ fontWeight: 'bold' }}>Rega:</Text>
                                                {"\n"}{plantList.watering}kgkfhpfgt
                                            </Text>
                                        </View>
                                        <View style={styles.viewDescricao2}>
                                            <Icon name="white-balance-sunny" size={40} color="#f5f125" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>
                                                <Text style={{ fontWeight: 'bold' }}>Iluminação:</Text>
                                                {"\n"}{plantList.Iluminacao}kghokfh-f
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.modalCard, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                    <View style={styles.viewButtons}>
                                        <TouchableOpacity style={styles.buttons} onPress={() => { setModalCuidados(false); setModalLembrete(true); }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Adicionar{"\n"}lembrete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.viewButtons}>
                                        <TouchableOpacity style={styles.buttons} onPress={() => { setModalCuidados(false); setModalHistorico(true); }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Histórico de{"\n"}cuidados</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
                            onRequestClose={() => setModalHistorico(false)}
                        >
                            <View>

                            </View>
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
        left: 100,
        top: -55,
        fontSize: 50,
        color: "#2a3b29",
    },
    modalContainer: {
        backgroundColor: '#f6fff5', //#faf2ed
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
        borderRadius: 25,
        marginTop: 20,
        shadowColor: 'black',
        elevation: 8,
        width: 170,
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
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        width: "47%",
        height: "50%",
        borderWidth: 3,
        borderColor: "#b5d4b4",
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
    iconVoltar: {
        fontSize: 30,
        color: '#2a3b29',
    },
    modalTitle: {
        fontSize: 25,
        marginLeft: 10,
        color: '#2a3b29',
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

    },
})