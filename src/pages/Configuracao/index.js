import React, { useState, useContext } from "react";
import Header from '../../components/Header';
import { AuthContext } from "../../contexts/auth";
import { useAvatar } from '../../contextAvatar/avatarContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ConfigModalAlterarNome from "../ConfigModalAlterarNome/alterarNome";
import ConfigModalAlterarAvatar from "../ConfigModalAlterarAvatar/alterarAvatar";
import ConfigModalAlterarSenha from "../ConfigModalAlterarSenha/alterarSenha";
import ConfigModalExcluirConta from "../ConfigModalExcluirConta/excluirConta";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
    Dimensions,
} from "react-native";

const { height, width } = Dimensions.get('window');
const scaleFactor = height / 800; // Baseado em uma tela de altura 800 como referência

export default function Configuracao() {

    const { userName, userEmail } = useContext(AuthContext);
    const [modalAlterarNome, setModalAlterarNome] = useState(false);
    const [modalAlterarAvatar, setModalAlterarAvatar] = useState(false);
    const [modalAlterarSenha, setModalAlterarSenha] = useState(false);
    const [modalExcluirConta, setModalExcluirConta] = useState(false);
    const { avatar } = useAvatar();

    return (
        <>
            <Header title='Configurações'></Header>
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}>
                    <View style={styles.viewPersona}>
                        <View style={styles.personaInner}>
                            {avatar ? (
                                <Image source={avatar} style={styles.avatar} />
                            ) : (
                                <Icon name="account-circle" size={170 * scaleFactor} style={styles.avatarIcon} />
                            )}
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{userEmail}</Text>
                        </View>
                    </View>
                    <View style={styles.viewOptions}>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalAlterarNome(true)}>
                            <Icon name="account-edit" style={styles.iconButton1} />
                            <Text style={styles.textBotton}>Alterar nome</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalAlterarSenha(true)}>
                            <Icon name="lock-reset" style={styles.iconButton1} />
                            <Text style={styles.textBotton}>Alterar senha</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalAlterarAvatar(true)}>
                            <Icon name="image-edit-outline" style={styles.iconButton1} />
                            <Text style={styles.textBotton}>Alterar avatar de perfil</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => setModalExcluirConta(true)}>
                            <Icon name="account-remove" style={styles.iconButton1} />
                            <Text style={styles.textBotton}>Excluir conta</Text>
                            <Icon name="menu-right" style={styles.iconButton2} />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalAlterarNome}
                    >
                        <ConfigModalAlterarNome setVisible={() => setModalAlterarNome(false)} />
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalAlterarSenha}
                    >
                        <ConfigModalAlterarSenha setVisible={() => setModalAlterarSenha(false)} />
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalAlterarAvatar}
                    >
                        <ConfigModalAlterarAvatar setVisible={() => setModalAlterarAvatar(false)} />
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalExcluirConta}
                    >
                        <ConfigModalExcluirConta setVisible={() => setModalExcluirConta(false)} />
                    </Modal>
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
    textBotton: {
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
    avatarIcon: {
        color: '#a7c5d4', // Cor do ícone
        marginBottom: 8, // Espaçamento entre o ícone e o texto
    },
})
