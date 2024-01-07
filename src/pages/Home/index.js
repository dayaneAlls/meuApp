
import React, { useContext } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View, Text, StyleSheet } from "react-native";

import Header from '../../components/Header'

export default function Home() {

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <Header title='Pesquisar Plantas'></Header>
            <View style={styles.container}>
                <Text>Tela home</Text>

            </View>
            {/*
            const { signOut, user } = useContext(AuthContext);<Text>Nome: {user.nome}</Text>
<TouchableOpacity style={styles.btnSair} title='Sair' onPress={() => signOut()}>
                    <Text style={styles.txtSair}>Sair</Text>
    </TouchableOpacity>*/}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece3ce',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'cover',
    },
    btnSair: {
        backgroundColor: 'rgba(58,77,57,1)',
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 0.40,
        borderRadius: 24,
        height: 55,
        width: 300,
        maxWidth: '65%',
        marginTop: 18,

    },
    txtSair: {
        color: 'rgba(255,255,255,.9)',
        fontSize: 20,
        textAlign: 'center',
        padding: 12
    },
})