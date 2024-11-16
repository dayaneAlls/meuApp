import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import React, { useState } from "react";
import { useAvatar, avatarOptions } from '../../contextAvatar/avatarContext';
import ModalMessageBox from "../../components/ModalMessageBox/messageBoxUpdate";


export default function ConfigModalAlterarAvatar({ setVisible }) {

    const { setAvatar } = useAvatar();
    const [selectedItem, setSelectedItem] = useState(null);
    const [message, setMessage] = useState(false);
    const [confirmAlterar, setConfirmAlterar] = useState(false);

    const handleAvatarSelect = (avatarId) => {
        setAvatar(avatarId);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() => { setConfirmAlterar(true); setSelectedItem(item) }}
            >
                <Image source={item.image} style={styles.cardImage} />
            </TouchableOpacity>
        </View>
    );


    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Alterar avatar </Text>
            </View>
            <View style={{ height: "92%", justifyContent: "center" }}>
                <Text style={styles.textoSelecionar}>Selecione uma imagem para alterar a foto do perfil</Text>
                <FlatList
                    data={avatarOptions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmAlterar}
                    onRequestClose={() => setConfirmAlterar(false)}>
                    <View style={styles.modalAlterarContainer}>
                        <View style={styles.modalAlterarContent}>
                            <Text style={styles.modalAlterarText}>Você tem certeza que deseja alterar essa imagem?</Text>
                            <View style={styles.buttonAlterarContainer}>
                                <TouchableOpacity style={styles.buttonAlterar} onPress={() => { handleAvatarSelect(selectedItem.id); setMessage(true); }}>
                                    <Text style={styles.buttonAlterarText}>Alterar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonAlterar} onPress={() => setConfirmAlterar(false)}>
                                    <Text style={styles.buttonAlterarText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={message}
                >
                    <ModalMessageBox setMessageVisible={() => { setMessage(false); setVisible(false) }} />
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#dfe8df', //#faf2ed
        flex: 1,
    },
    iconVoltar: {
        fontSize: 30,
        color: 'rgba(255,255,255,1)',
        marginLeft: 15,
    },
    modalTitle: {
        fontSize: 22,
        paddingHorizontal: 20,
        color: 'rgba(255,255,255,1)',
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeader: {
        backgroundColor: "#3a4d39",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 60,
    },
    card: {
        marginTop: 25,
        marginBottom: 15,
        marginHorizontal: 45,
        backgroundColor: '#ebf0e9',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: "#dfe8df",
        shadowColor: 'black',
        elevation: 3,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    cardImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 10,
        resizeMode: 'cover'
    },
    textoSelecionar: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#587f56",
        paddingTop: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderColor: "#a3d1a1",
        backgroundColor: "#ddeddd",
        textAlign: "center"
    },
    modalAlterarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
    },
    modalAlterarContent: {
        width: '90%',
        backgroundColor: '#afcca8',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
    },
    modalAlterarText: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonAlterarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonAlterar: {
        flex: 1,
        backgroundColor: '#3A4D39',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonAlterarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
})