import React from "react";
import { View, Text, StyleSheet } from 'react-native';

import Header from '../../components/Header'

export default function MinhasPlantas() {
    return (
        <>
            <Header title='Minhas Plantas'></Header>
            <View style={style.container}>
                <Text>Tela Minhas Plantas</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})