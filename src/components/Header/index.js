import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Header({ title }) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity >
                <Icon name='menu' size={35} ></Icon>
            </TouchableOpacity>
            {title && (<Text style={styles.header}>{title}</Text>)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: 'rgba(115,144,114,.8)',
        marginTop: 30,
        marginLeft: 15,
        marginBottom: 15
    },
    header:{
        fontSize: 22,
        marginLeft: 10,
    }
})
