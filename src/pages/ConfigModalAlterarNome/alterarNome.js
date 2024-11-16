import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import ModalMessageBox from "../../components/ModalMessageBox/messageBoxUpdate";
import { LinearGradient } from "expo-linear-gradient";

export default function ConfigModalAlterarNome({ setVisible }) {

    const [userName, setUserName] = useState('');
    const { patchUserName, loading } = useContext(AuthContext);
    const [message, setMessage] = useState(false);

    async function handleEdit() {
        if (userName === "") {
            alert("Por favor digite o nome!");
            return;
        }
        patchUserName(userName)
        setUserName("");
        setMessage(true);
    };

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
                    <Text style={styles.modalTitle}>Alterar Nome </Text>
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
                            <Text style={styles.modalAlterarText}>Digite um novo nome:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                placeholderTextColor="#3a4d39"
                            />
                            <View style={styles.buttonAlterarContainer}>
                                <TouchableOpacity
                                    style={styles.buttonAlterar}
                                    onPress={() => handleEdit()}
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
                    visible={message}
                >
                    <ModalMessageBox setMessageVisible={() => { setMessage(false); setVisible(false); }} />
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
})

