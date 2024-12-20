import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Dimensions, } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/auth";
import { useAvatar } from '../../contextAvatar/avatarContext';

const { height, width } = Dimensions.get('window');
const scaleFactor = height / 800; // Baseado em uma tela de altura 800 como referência

export default function DrawerLog(props) {
    const { signOut, userName } = useContext(AuthContext);
    const [confirmSair, setConfirmSair] = useState(false);
    const { avatar } = useAvatar();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                {avatar ? (
                    <Image source={avatar} style={styles.avatar} />
                ) : (
                    <Icon name="account-circle" size={170 * scaleFactor} style={styles.avatarIcon} />
                )}
                <Text style={{ color: '#f0f2ff', fontSize: 20, paddingTop: 20, fontWeight: 'bold' }}>Bem-vindo(a)!</Text>
                <Text style={{ color: '#f0f2ff', fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>{userName}</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem {...props}
                label="Sair"
                onPress={() => setConfirmSair(true)}
                icon={() => <Icon name="exit-to-app" color={'#f0f2ff'} size={25} paddingLeft={5} />}
                labelStyle={{ color: '#f0f2ff', fontSize: 18, paddingTop: 5 }}
                style={{ backgroundColor: '#3A4D39', height: 70, borderBottomWidth: 2, borderBottomColor: '#f0f2ff' }}

            >
            </DrawerItem>
            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmSair}
                onRequestClose={() => setConfirmSair(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Você tem certeza que deseja sair?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
                                <Text style={styles.buttonText}>Sair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setConfirmSair(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#afcca8',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#3A4D39',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    avatar: {
        width: 170,
        height: 170,

    },
    avatarIcon: {
        color: '#a7c5d4', // Cor do ícone
        marginBottom: 8, // Espaçamento entre o ícone e o texto
    },
})