import React, { useState } from "react";
import to from 'await-to-js';
import api from '../../services/api';
import Header from '../../components/Header'

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";

export default function Configuracao() {

    return (
        <>
            <Header title='Configuracões'></Header>
            <SafeAreaView >


            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e3da',

    },
})
