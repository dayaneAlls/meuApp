import React, { useState, useContext, useEffect } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Header from '../../components/Header';
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    SafeAreaView,
} from "react-native";

export default function Configuracao() {

    const { userName, userEmail } = useContext(AuthContext);
    

    return (
        <>
            <Header title='Configurações'></Header>
            <SafeAreaView >
                <View style={styles.container}>
                    <View style={styles.viewButtons}>
                        <View style={styles.viewPersona}>
                            {/* <Image source={{ uri: item.url_imagem }} style={styles.cardImage} /> */}
                            <Icon name="account-circle" style={styles.avatar}></Icon>
                            <Text style={{ color: '#648c62', fontSize: 30, fontWeight: 'bold', marginBottom: 5 }}>{userName}</Text>
                            <Text style={{ color: '#648c62', fontSize: 15, fontWeight: 'bold', marginBottom: 15 }}>{userEmail}</Text>
                        </View>
                        <View style={styles.viewOptions}>
                            <TouchableOpacity style={styles.buttons}>
                                <Icon name="clipboard-text-clock-outline" style={styles.iconButton1} />
                                <Text style={styles.textAddPlant}>Alterar nome</Text>
                                <Icon name="menu-right" style={styles.iconButton2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons}>
                                <Icon name="clipboard-text-clock-outline" style={styles.iconButton1} />
                                <Text style={styles.textAddPlant}>Alterar senha</Text>
                                <Icon name="menu-right" style={styles.iconButton2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons}>
                                <Icon name="image-edit-outline" style={styles.iconButton1} />
                                <Text style={styles.textAddPlant}>Alterar avatar de perfil</Text>
                                <Icon name="menu-right" style={styles.iconButton2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons}>
                                <Icon name="clipboard-text-clock-outline" style={styles.iconButton1} />
                                <Text style={styles.textAddPlant}>Excluir conta</Text>
                                <Icon name="menu-right" style={styles.iconButton2} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    avatar: {
        fontSize: 200,
        color: '#90e0b3',
    },
    viewButtons: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    viewPersona: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 280,
        borderRadius: 10,
        backgroundColor: '#f5f7f5',
        borderColor: "#f5f7f5",
        shadowColor: 'black',
        elevation: 5,
    },
    viewOptions: {
        width: "100%",
        height: "55%",
        borderRadius: 10,
        backgroundColor: '#f5f7f5',
        borderColor: "#f5f7f5",
        shadowColor: 'black',
        elevation: 3,
        marginTop: 30,
    },
    buttons: {
        padding: 10,
        borderRadius: 15,
        borderTopWidth: 1,
        borderBottomWidth: 2,
        backgroundColor: '#f5f7f5',
        borderColor: "#b8e0b4",
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        elevation: 1,
    },
    textAddPlant: {
        justifyContent: "center",
        fontSize: 20,
        textAlign: 'flex-start',
        color: '#496e47',
        fontWeight: "bold",
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconPlace: {
        position: "absolute",
        top: -40,
        fontSize: 40,
        left: 50,
        color: "#648c62"
    },
    iconButton1: {
        fontSize: 40,
        color: "#496e47",
        marginTop: 5,
    },
    iconButton2: {
        position: "absolute",
        fontSize: 40,
        marginTop: 10,
        color: "#9bc997",
        right: 5,
    },
})
