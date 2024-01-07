import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity, Text, Image, ImageBackground, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    const [hidePass, setHidePass] = useState(true);

    const { signUp, loadingAuth } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp() {
        if (nome === '' || email === '' || password === '') return;
        signUp(email, password, nome);
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <ImageBackground source={require('../../img/1.jpg')} style={styles.imageBackground}>
                <View style={styles.viewInput}>
                    <Image source={require('../../img/logo1.png')} style={{
                        width: 130, height: 118, marginBottom: 20,
                    }}></Image>
                    <TextInput style={styles.input}
                        placeholder='Nome'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        placeholderTextColor='#3a4d39'>
                    </TextInput>

                    <TextInput style={styles.input}
                        placeholder='E-mail'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor='#3a4d39'>
                    </TextInput>

                    <TextInput style={styles.input}
                        placeholder='Senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='#3a4d39'
                        secureTextEntry={hidePass}>

                    </TextInput>
                    <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                        {hidePass ? <MaterialIcons name='visibility' style={styles.iconPlacePassword} /> : <MaterialIcons name='visibility-off' style={styles.iconPlacePassword} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCadastrar} onPress={handleSignUp}>
                        {loadingAuth ? (<ActivityIndicator size={20} color={'#fff'} />) :
                            (<Text style={styles.txtCadastrar}>CADASTRAR</Text>)}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCadastrar: {
        backgroundColor: 'rgba(58,77,57,1)',
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 0.40,
        borderRadius: 24,
        height: 55,
        width: 300,
        maxWidth: '65%',
        marginTop: 18,

    },
    txtCadastrar: {
        color: 'rgba(255,255,255,.9)',
        fontSize: 20,
        textAlign: 'center',
        padding: 12
    },
    input: {
        color: '#3a4d39',
        height: 55,
        fontSize: 20,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#3a4d39',
        backgroundColor: 'rgba(232,211,182,.61)',
        marginTop: 20,
        borderRadius: 10,
        width: 310,
        margin: 5

    },
    iconPlacePassword: {
        position: 'absolute',
        right: -145,
        top: -45,
        fontSize: 25,
        color: '#3a4d39'
    },
    viewInput: {
        backgroundColor: 'rgba(115,144,114,.6)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'

    },
    imageBackground: {
        justifyContent: "center",
        alignItems: "center",

    },
})