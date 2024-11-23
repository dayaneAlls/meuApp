import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function ConfigModalExcluirConta({ setVisible }) {

    const [email, setEmail] = useState('');
    const { loading, SignOut } = useContext(AuthContext);
    const [messageBox, setMessageBox] = useState(false);

    async function handleDeleteAccount() {
        // if (email === "") {
        //     alert("Por favor digite o nome!");
        //     return;
        // }
        //changeUserName(name);
        setEmail("");
        setMessageBox(true);
    }

    return (
        <SafeAreaView style={styles.modalContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Icon name="arrow-left" style={styles.iconVoltar} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Excluir Conta </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <LinearGradient
                        style={{ padding: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        colors={['#ede0df', '#dfe8df', '#c3dbbd']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.modalAlterarContent}>
                            <Icon name="account-edit" style={styles.icon} />
                            <Text style={styles.modalAlterarText}>Digite seu e-mail cadastrado para excluir sua conta permanentemente</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="#3a4d39"
                            />
                            <View style={styles.buttonAlterarContainer}>
                                <TouchableOpacity
                                    style={styles.buttonAlterar}
                                    onPress={() => handleDeleteAccount()}
                                >
                                    {loading ? (
                                        <ActivityIndicator size={50} color="#fff" />
                                    ) : (
                                        <Text style={styles.buttonAlterarText}>Salvar</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonAlterar}
                                    onPress={() => setVisible(false)}
                                >
                                    <Text style={styles.buttonAlterarText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={messageBox}
                    onRequestClose={() => setMessageBox(false)}>
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Alterações realizadas</Text>
                        </View>
                        <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.modalMessageContainer}>
                                <View style={styles.modalMessageContent}>
                                    <Icon name="check-circle" style={styles.icon2}></Icon>
                                    <Text style={styles.modalMessageText}>Conta excluída com sucesso!</Text>
                                    <View style={styles.buttonMessageContainer}>
                                        <TouchableOpacity style={styles.buttonMessage} onPress={() => { setVisible(false); SignOut(); }}>
                                            <Text style={styles.buttonMessageText}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#dfe8df', //#faf2ed
        flex: 1,
    },
    iconVoltar: {
        fontSize: 30,
        color: '#ffffff',
        marginLeft: 15,
    },
    modalTitle: {
        fontSize: 22,
        paddingHorizontal: 20,
        color: '#ffffff',
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
    buttonAlterarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
    },
    buttonAlterar: {
        flex: 1,
        backgroundColor: '#3a4d39',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 5,
    },
    buttonAlterarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalAlterarContent: {
        width: '100%',
        backgroundColor: 'rgba(242, 245, 242,.9)',
        borderColor: 'rgba(242, 245, 242,.9)',
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 3,
    },
    modalAlterarText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: "#496e47",
    },
    icon: {
        fontSize: 150,
        color: '#7ccaeb',
        padding: 30
    },
    input: {
        color: "#3a4d39",
        height: 55,
        fontSize: 20,
        paddingLeft: 15,
        borderBottomWidth: 3,
        borderBottomColor: "#3a4d39",
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 15,
        width: 310,
        margin: 5,
    },
    modalExcluirContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
    },
    modalExcluirContent: {
        width: '90%',
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
    modalMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dfe8df'
    },
    modalMessageContent: {
        width: '100%',
        backgroundColor: '#dfe8df',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
    },
    modalMessageText: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
    buttonMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonMessage: {
        backgroundColor: '#3a4d39',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 5,
    },
    buttonMessageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon2: {
        fontSize: 180,
        color: '#7ccaeb',
        padding: 50,
    },
})