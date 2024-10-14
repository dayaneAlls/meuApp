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
    ImageBackground,
    Image,
    SafeAreaView,
} from "react-native";

export default function Configuracao() {

    return (
        <>
            <Header title='Configurações'></Header>
            <SafeAreaView >
                <ImageBackground
                    source={require("../../img/fundoPesquisar.jpg")}
                    style={styles.imageBackground}
                    imageStyle={{ opacity: 0.3 }}
                >
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
})
