import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    Modal,
    ActivityIndicator,
} from "react-native";

export default function EsqueceuSenha() {

    const [hidePass, setHidePass] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);
    const [enviarCodigo, setEnviarCodigo] = useState(false);
    const [novaSenha, setNovaSenha] = useState(true);
    const { recuperarSenha, loadingAuth } = useContext(AuthContext);
    const { codeSubmit } = useContext(AuthContext);
    const { cadastrar } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [codigo, setCodigo] = useState('');
    const [messageBox, setMessageBox] = useState(false);


    function handleEnviar() {
        /*if (email === "") {
            alert("Por favor preencha todos os campos!");
            return;
        }*/
        recuperarSenha(email);
        setMessageBox(false);
        setEnviarCodigo(true);
    }

    function handleCodeSubmit() {
        /* if (codigo === "") {
             alert("Por favor preencha todos os campos!");
             return;
         }*/
        codeSubmit(codigo);
        setEnviarCodigo(false);
        setNovaSenha(true);
    }

    function handleCadastrar() {
        /*if (password === "" || password2 === "") {
            alert("Por favor preencha todos os campos!");
            return;
        }*/
        cadastrar(password, password2);
        setNovaSenha(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""} enabled
        >
            <LinearGradient
                colors={['#f1dbda', '#cbd4ba', '#afcca8']}
                start={{ x: 0, y: 0 }} // Ponto inicial do gradiente
                end={{ x: 1, y: 1 }} >
                <View >
                    <View style={styles.viewInput}>
                        <Icon name="lock-reset" style={styles.icon}
                        ></Icon>
                        <Text style={styles.texto1}>Esqueceu sua senha?</Text>
                        <Text style={styles.texto2}>Para redefinir sua senha, informe o e-mail cadastrado na sua conta e lhe enviaremos um código para o cadastro de uma nova senha.</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="#3a4d39"
                            ></TextInput>
                        </View>
                        <LinearGradient style={styles.btnEnviar}
                            colors={['#4e6e4d', '#3a4d39']}
                            start={{ x: 1, y: 0 }} // Ponto inicial do gradiente
                            end={{ x: 0, y: 1 }}>
                            <TouchableOpacity onPress={() => setMessageBox(true)}>
                                <Text style={styles.txtEnviar}>Enviar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={messageBox}
                            onRequestClose={() => setMessageBox(false)}
                        >
                            <View style={styles.modalMessageBackground}>
                                <View style={styles.modalMessageContainer}>
                                    <Text style={styles.modalMessageText}>O e-mail cadastrado será verificado e em breve você receberá um código de verificação</Text>
                                    <TouchableOpacity onPress={handleEnviar}>
                                        {loadingAuth ? (
                                            <ActivityIndicator size={50} color={"#fff"} />
                                        ) : (
                                            <Text style={{ color: '#285c1b', fontSize: 25, fontWeight: 'bold' }}>OK</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={enviarCodigo}
                        onRequestClose={() => setEnviarCodigo(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setEnviarCodigo(false)}>
                                    <Icon name="arrow-left" style={styles.iconVoltar} />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Voltar </Text>
                            </View>
                            <View style={[styles.container, { flex: 1 }]}>
                                <LinearGradient style={styles.modalContainer}
                                    colors={['#f1dbda', '#cbd4ba', '#afcca8']}
                                    start={{ x: 0, y: 0 }} // Ponto inicial do gradiente
                                    end={{ x: 1, y: 1 }} >
                                    <View style={styles.container}>
                                        <Icon name="lock-open" style={styles.icon2} />
                                        <Text style={styles.texto1}>Código de verificação</Text>
                                        <Text style={styles.texto2}>Por favor, insira o código enviado para o seu e-mail.</Text>
                                        <View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Insira o código"
                                                value={codigo}
                                                onChangeText={(text) => setCodigo(text)}
                                                placeholderTextColor="#3a4d39"
                                                keyboardType="number-pad"
                                                maxLength={6}
                                            ></TextInput>
                                        </View>
                                        <LinearGradient style={styles.modalButton}
                                            colors={['#4e6e4d', '#3a4d39']}
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 1 }}>
                                            <TouchableOpacity onPress={handleCodeSubmit}>
                                                {loadingAuth ? (
                                                    <ActivityIndicator size={50} color={"#fff"} />
                                                ) : (
                                                    <Text style={styles.modalButtonText}>Verificar</Text>
                                                )}
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={novaSenha}
                        onRequestClose={() => setNovaSenha(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setNovaSenha(false)}>
                                    <Icon name="arrow-left" style={styles.iconVoltar} />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Voltar </Text>
                            </View>
                            <View style={[styles.container, { flex: 1 }]}>
                                <LinearGradient style={styles.modalContainer}
                                    colors={['#f1dbda', '#cbd4ba', '#afcca8']}
                                    start={{ x: 0, y: 0 }} // Ponto inicial do gradiente
                                    end={{ x: 1, y: 1 }} >
                                    <View style={styles.container}>
                                        <Icon name="lock-open" style={styles.icon2} />
                                        <Text style={styles.texto2}>Por favor, cadastre sua nova senha.</Text>
                                        <View>
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
                                                secureTextEntry={hidePass2}
                                            ></TextInput>
                                            <TouchableOpacity onPress={() => setHidePass2(!hidePass2)}>
                                                {hidePass2 ? (
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
                                        <LinearGradient style={styles.modalButton}
                                            colors={['#4e6e4d', '#3a4d39']}
                                            start={{ x: 1, y: 0 }} // Ponto inicial do gradiente
                                            end={{ x: 0, y: 1 }}>
                                            <TouchableOpacity onPress={handleCadastrar}>
                                                {loadingAuth ? (
                                                    <ActivityIndicator size={50} color={"#fff"} />
                                                ) : (
                                                    <Text style={styles.modalButtonText}>Cadastrar</Text>
                                                )}
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </Modal>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
    },
    iconVoltar: {
        fontSize: 30,
        marginLeft: 15,
    },
    modalTitle: {
        fontSize: 22,
        paddingHorizontal: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeader: {
        backgroundColor: "rgba(115,144,114,.8)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 55,
        elevation: 3
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
        fontSize: 200,
        color: '#eda08c',
        marginBottom: 40,
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
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(240, 242, 235, 0.9)', // Fundo semi-transparente
    },
    modalContainer: {
        width: 350,
        padding: 20,
        borderRadius: 15,
        borderColor: '#33605a',
        borderWidth: 2,
        shadowColor: 'black',
        elevation: 15,
    },
    modalText: {
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        color: '#33605a',
        marginBottom: 15,
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
})
