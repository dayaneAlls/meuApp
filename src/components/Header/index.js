import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Header({ title }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name='menu' size={35} marginLeft={15} color={'rgba(255,255,255,1)'}></Icon>
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
        backgroundColor: '#3a4d39',
        height: 50
    },
    header: {
        fontSize: 22,
        marginLeft: 20,
        color: 'rgba(255,255,255,1)'
    }
})
