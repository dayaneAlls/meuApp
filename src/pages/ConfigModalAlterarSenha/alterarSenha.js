import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import ModalMessageBox from "../../components/ModalMessageBox/messageBoxUpdate";
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    Modal,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";

export default function ConfigModalAlterarSenha({ setVisible }) {

    const [hidePass, setHidePass] = useState(true);
    const [novaSenha, setNovaSenha] = useState(false);
    const { patchLogin, loading, patchUserPassword } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState(false);

    function handleCadastrar() {
        //  if (password === "" || password2 === "") {
        //      alert("Por favor preencha todos os campos!");
        //      return;
        //  }
        //  cadastrar(password, password2);
        setMessage(true);
    }

    async function handleEdit() {
        if (oldPassword === "" || password === "" || password2 === "") {
            alert("Por favor preencha todos os campos!");
            return;
        }
        retorno = patchUserPassword(oldPassword, password, password2)

        if (!retorno) {
            alert("Senhas não conferem!");
            return;
        }

        setMessage(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Icon name="arrow-left" style={styles.iconVoltar} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Cadastrar Nova Senha </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <LinearGradient style={{ padding: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        colors={['#ede0df', '#dfe8df', '#c3dbbd']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                        <View style={styles.modalAlterarContent}>
                            <Icon name="lock-open" style={styles.icon2} />
                            <Text style={styles.texto2}>Por favor, cadastre sua nova senha.</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha antiga"
                                    value={oldPassword}
                                    onChangeText={(text) => setOldPassword(text)}
                                    placeholderTextColor="#3a4d39"
                                    secureTextEntry={hidePass}
                                ></TextInput>
                                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                    {hidePass ? (
                                        <MaterialIcons
                                            name="visibility"
                                            style={styles.iconPlacePassword}
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name="visibility-off"
                                            style={styles.iconPlacePassword}
                                        />
                                    )}
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nova senha"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    placeholderTextColor="#3a4d39"
                                    secureTextEntry={hidePass}
                                ></TextInput>
                                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                    {hidePass ? (
                                        <MaterialIcons
                                            name="visibility"
                                            style={styles.iconPlacePassword}
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name="visibility-off"
                                            style={styles.iconPlacePassword}
                                        />
                                    )}
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmar nova senha"
                                    value={password2}
                                    onChangeText={(text) => setPassword2(text)}
                                    placeholderTextColor="#3a4d39"
                                    secureTextEntry={hidePass}
                                ></TextInput>
                                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                    {hidePass ? (
                                        <MaterialIcons
                                            name="visibility"
                                            style={styles.iconPlacePassword}
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name="visibility-off"
                                            style={styles.iconPlacePassword}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.modalButton} onPress={() => handleEdit()} >
                                {loading ? (
                                    <ActivityIndicator size={50} color={"#fff"} />
                                ) : (
                                    <Text style={styles.modalButtonText}>Cadastrar</Text>
                                )}
                            </TouchableOpacity>
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
            </KeyboardAvoidingView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
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
    btnEnviar: {
        backgroundColor: "#3a4d39",
        borderRadius: 15,
        height: 55,
        width: 300,
        maxWidth: "65%",
        marginTop: 35,
        shadowColor: 'black',
        elevation: 15,
    },
    txtEnviar: {
        color: 'white',
        fontSize: 25,
        textAlign: "center",
        padding: 12,
        fontWeight: 'bold',
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
    viewInput: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    texto1: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#33605a',
    },

    texto2: {
        textAlign: 'center',
        padding: 20,
        fontSize: 20,
        color: '#33605a',
        marginBottom: 15,
    },

    icon: {
        fontSize: 150,
        color: '#eda08c',
        marginBottom: 30,
    },

    icon2: {
        fontSize: 150,
        color: '#eda08c',
        marginBottom: 10,
    },
    iconPlacePassword: {
        position: "absolute",
        right: 15,
        top: -45,
        fontSize: 25,
        color: "#3a4d39",
    },
    modalButton: {
        backgroundColor: "#3a4d39",
        borderRadius: 15,
        height: 55,
        width: 300,
        maxWidth: "65%",
        marginTop: 35,
        shadowColor: 'black',
        elevation: 15,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 25,
        textAlign: "center",
        padding: 10,
        fontWeight: 'bold',
    },
    modalMessageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(231, 242, 228, 0.8)',
    },
    modalMessageContainer: {
        width: 300,
        padding: 15,
        backgroundColor: '#afcca8',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalMessageText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
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
})