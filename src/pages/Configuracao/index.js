import React, { useState, useContext, useEffect } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Header from '../../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ConfigModalAlterarNome from "../ConfigModalAlterarNome/alterarNome";
import ConfigModalAlterarAvatar from "../ConfigModalAlterarAvatar/alterarAvatar";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
    ActivityIndicator,
    Dimensions,
} from "react-native";

const { height, width } = Dimensions.get('window');
const scaleFactor = height / 800; // Baseado em uma tela de altura 800 como referência

export default function Configuracao() {

    const { userName, userEmail } = useContext(AuthContext);
    const [modalAlterarNome, setModalAlterarNome] = useState(false);
    const [modalAlterarAvatar, setModalAlterarAvatar] = useState(false);


    return (
        <>
            <Header title='Configurações'></Header>
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}>
                    <View style={styles.viewPersona}>
                        <View style={styles.personaInner}>
                            <Image
                                source={require("../../img/avatares3/5.png")}
                                style={styles.avatar}
                            ></Image>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{userEmail}</Text>
                        </View>
                    </View>
                    <View style={styles.viewOptions}>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalAlterarNome(true)}>
                            <Icon name="account-edit" style={styles.iconButton1} />
                            <Text style={styles.textAddPlant}>Alterar nome</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalAlterarNome}
                        >
                            <ConfigModalAlterarNome setVisible={() => setModalAlterarNome(false)} />
                        </Modal>
                        <TouchableOpacity style={styles.buttons}>
                            <Icon name="lock-reset" style={styles.iconButton1} />
                            <Text style={styles.textAddPlant}>Alterar senha</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalAlterarAvatar(true)}>
                            <Icon name="image-edit-outline" style={styles.iconButton1} />
                            <Text style={styles.textAddPlant}>Alterar avatar de perfil</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalAlterarAvatar}
                        >
                            <ConfigModalAlterarAvatar setVisible={() => setModalAlterarAvatar(false)} />
                        </Modal>
                        <TouchableOpacity style={styles.buttons}>
                            <Icon name="account-remove" style={styles.iconButton1} />
                            <Text style={styles.textAddPlant}>Excluir conta</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "2%",
    },
    avatar: {
        width: 180 * scaleFactor,
        height: 180 * scaleFactor,
        marginBottom: 5 * scaleFactor,
        marginTop: 10 * scaleFactor,
    },
    viewContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20 * scaleFactor,
    },
    viewPersona: {
        width: "100%",
        height: "40%",
        borderRadius: 10,
        backgroundColor: '#e5ebe1',
        borderColor: "#f5f7f5",
        shadowColor: 'black',
        elevation: 5,
    },
    personaInner: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    viewOptions: {
        width: "100%",
        height: "57%",
        borderRadius: 10,
        backgroundColor: '#edf0ed',
        borderColor: "#f5f7f5",
        shadowColor: 'black',
        elevation: 3,
        marginTop: "8.5%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        padding: `${4 * scaleFactor}%`,
        borderRadius: 15,
        borderTopWidth: 1,
        borderBottomWidth: 2,
        backgroundColor: '#f5f7f5',
        borderColor: "#b8e0b4",
        marginTop: "3%",
        flexDirection: "row",
        elevation: 1,
        width: "100%",
    },
    textAddPlant: {
        fontSize: 20 * scaleFactor,
        color: '#496e47',
        fontWeight: "bold",
        marginLeft: "3%",
        paddingVertical: `${3 * scaleFactor}%`,
    },
    iconButton1: {
        fontSize: 40 * scaleFactor,
        color: "#496e47",
        marginTop: `${1 * scaleFactor}%`,
    },
    iconButton2: {
        position: "absolute",
        fontSize: 40 * scaleFactor,
        color: "#9bc997",
        right: 5,
        marginTop: `${5 * scaleFactor}%`,
    },
    userName: {
        color: '#648c62',
        fontSize: 30 * scaleFactor,
        fontWeight: 'bold',
        marginBottom: 5 * scaleFactor,
    },
    userEmail: {
        color: '#648c62',
        fontSize: 15 * scaleFactor,
        fontWeight: 'bold',
        marginBottom: 15 * scaleFactor,
    },
})
