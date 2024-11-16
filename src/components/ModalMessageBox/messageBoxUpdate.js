import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from "react";

export default function ModalMessageBox({ setMessageVisible }) {

    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Alterações realizadas</Text>
            </View>
            <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={styles.modalMessageContainer}>
                    <View style={styles.modalMessageContent}>
                        <Icon name="check-circle" style={styles.icon}></Icon>
                        <Text style={styles.modalMessageText}>Alterações realizadas com sucesso!</Text>
                        <View style={styles.buttonMessageContainer}>
                            <TouchableOpacity style={styles.buttonMessage} onPress={() => { setMessageVisible(false) }}>
                                <Text style={styles.buttonMessageText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#dfe8df', //#faf2ed
        flex: 1,
    },
    modalMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dfe8df'
    },
    modalMessageContent: {
        width: '100%',
        backgroundColor: '#dfe8df',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
    },
    modalMessageText: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
    buttonMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonMessage: {
        backgroundColor: '#3a4d39',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 5,
    },
    buttonMessageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        fontSize: 180,
        color: '#7ccaeb',
        padding: 50,
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
})




