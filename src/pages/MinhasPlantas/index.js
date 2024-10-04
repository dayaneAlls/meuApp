import React, { useState, useEffect } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import Header from '../../components/Header'


export default function MinhasPlantas({ route }) {

    const [plantList, setPlantList] = useState([]);
    const [modalCuidados, setModalCuidados] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    const scrollWidth = windowWidth / 1 - 40;

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
                    {modalCuidados && plantList && (
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
                                    <ScrollView horizontal={true}>
                                        <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                            <Text numberOfLines={7} style={styles.textDetailsPlant}>Nome comum: {plantList.common_names} {"\n"}Descrição: {plantList.description.value.slice(0, 251)}</Text>
                                            <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                        </View>
                                        <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                            <Text style={styles.textDetailsPlant}>
                                                {plantList.description.value.slice(251)}
                                            </Text>
                                            <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                        </View>
                                        <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                            <Text style={styles.textDetailsPlant}>Sinonimos: {plantList.synonyms.join(',')}</Text>
                                            <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                        </View>
                                        <View style={[styles.scrollModal, { width: scrollWidth }]}>
                                            <Text style={styles.textDetailsPlant}>
                                                Classe: {plantList.taxonomy.class}
                                                {"\n"}Gênero: {plantList.taxonomy.genus}
                                                {"\n"}Ordem: {plantList.taxonomy.order}
                                            </Text>
                                            <MaterialIcons name="chevron-right" size={25} color="#3a4d39" style={{ paddingRight: 5 }} />
                                        </View>
                                    </ScrollView>
                                    <View style={[styles.viewDetails2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                                        <View style={styles.scrollModal2}>
                                            <Icon name="sprout" size={35} color="green" style={{ paddingRight: 15 }} />
                                            <Text style={styles.textDetailsPlant}>Partes Comestíveis: {plantList.edible_parts}</Text>
                                        </View>
                                        <View style={styles.scrollModal2}>
                                            <Icon name="seed" size={40} color="#7a4526" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>Cultivo: {plantList.propagation_methods.area}</Text>
                                        </View>
                                        <View style={styles.scrollModal2}>
                                            <Icon name="water-check" size={40} color="#51a9e0" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>{plantList.watering.max}</Text>
                                        </View>
                                        <View style={styles.scrollModal2}>
                                            <Icon name="white-balance-sunny" size={40} color="#f5f125" style={{ paddingRight: 10 }} />
                                            <Text style={styles.textDetailsPlant}>{plantList.Iluminacao}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.modalCard}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalPlant(false)}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'white' }}>Voltar</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                    )}

                </View>
                <View style={styles.container}>

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
    deleteButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end',
        borderRadius: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    iconPlace: {
        position: "absolute",
        left: 100,
        top: -55,
        fontSize: 50,
        color: "rgba(58, 77, 57,.7)",
    },
    modalContainer: {
        marginTop: 30,
        marginHorizontal: 5,
        backgroundColor: 'white', //#faf2ed
        borderRadius: 25,
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
        fontSize: 18,
        color: '#3a4d39',
        fontFamily: 'sans-serif-condensed',

    },
    modalCard: {
        justifyContent: "flex-start",
        alignItems: "center"

    },
    scrollModal: {
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
    scrollModal2: {
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
})