import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../../contexts/auth";

import firebase from "../../services/FIrebaseConnection";

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn() {
        if ( email === '' || password === '') {
            alert('Por favor preencha todos os campos!')
            return;
        }
        signIn(email,password)
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../img/fundo.png')} style={styles.imageBackground}>
                <View style={styles.telaLogin}>
                    <Image source={require('../../img/logo1.png')} style={{
                        width: 130,
                        height: 118
                    }}></Image>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor='rgba(255,255,255,.5)'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <MaterialIcons name='person' style={styles.iconPlace} />

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor='rgba(255,255,255,.5)'
                            secureTextEntry={hidePass}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            {hidePass ? <MaterialIcons name='visibility' style={styles.iconPlacePassword} /> : <MaterialIcons name='visibility-off' style={styles.iconPlacePassword} />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnEntrar} onPress={handleSignIn}>
                        <Text style={styles.txtEntrar}>ENTRAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{ color: 'rgba(255,255,255,1)', padding: 10 }}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <View style={styles.viewSocial}>
                        <TouchableOpacity>
                            <Image source={require('../../img/insta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../img/facebook.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../img/google.png')}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewCadastrar}>
                        <Text style={{ color: 'rgba(255,255,255,1)', padding: 10 }}>Não possui conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.txtCadastrar}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate()}>
                        <Text style={styles.txtVisitante}>ENTRAR COMO VISITANTE</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8
    },
    telaLogin: {
        backgroundColor: 'rgba(115,144,114,.9)',
        borderRadius: 27,
        margin: 6,
        padding: 25,
        borderColor: 'rgba(58,77,57,.75)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnEntrar: {
        backgroundColor: 'rgba(58,77,57,1)',
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 0.40,
        borderRadius: 24,
        height: 43,
        width: 300,
        maxWidth: '65%',
        marginTop: 18,

    },
    txtEntrar: {
        color: 'rgba(255,255,255,.9)',
        fontSize: 17,
        textAlign: 'center',
        padding: 8
    },
    input: {
        color: 'white',
        height: 40,
        fontSize: 17,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,1)',
        marginTop: 20,
        borderRadius: 10,
        width: 300,
        maxWidth: '75%',
    },
    iconPlace: {
        position: 'absolute',
        right: 17,
        top: 35,
        fontSize: 20,
        color: 'rgba(255,255,255,.5)'
    },
    iconPlacePassword: {
        position: 'absolute',
        right: 17,
        top: -25,
        fontSize: 20,
        color: 'rgba(255,255,255,.5)'
    },
    viewSocial: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        width: '80%',
        padding: 10,
        fontSize: 40
    },
    viewCadastrar: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        width: '80%',
        padding: 10,
    },
    txtCadastrar: {
        color: '#3A4D39'
    },
    txtVisitante: {
        color: 'rgba(255,255,255,.9)',
        fontWeight: 'bold'
    }
})