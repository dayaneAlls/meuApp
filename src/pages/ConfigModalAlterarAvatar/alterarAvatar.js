import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal, ActivityIndicator, Image, FlatList } from 'react-native';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";


export default function ConfigModalAlterarAvatar({ setVisible, onClose, onSelectAvatar, avatarOptions }) {

    const [message, setMessage] = useState(false);

    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Alterar avatar </Text>
            </View>
            <View style={{ padding: 15, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={avatarOptions}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onSelectAvatar(item)}>
                                <Image source={item} style={styles.avatarOption} />
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={message}
                    onRequestClose={() => setMessage(false)}>
                    <View style={styles.modalMessageContainer}>
                        <View style={styles.modalMessageContent}>
                            <Icon name="check-circle" style={styles.icon}></Icon>
                            <Text style={styles.modalMessageText}>Informações atualizadas com sucesso</Text>
                            <View style={styles.buttonMessageContainer}>
                                <TouchableOpacity style={styles.buttonMessage} onPress={() => { setMessage(false); setVisible(false) }}>
                                    <Text style={styles.buttonMessageText}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#dfe8df', //#faf2ed
        flex: 1,
    },
    iconVoltar: {
        fontSize: 30,
        color: 'rgba(255,255,255,1)',
        marginLeft: 15,
    },
    modalTitle: {
        fontSize: 22,
        paddingHorizontal: 20,
        color: 'rgba(255,255,255,1)',
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
    avatarOptions: {
        width: '100%',
        backgroundColor: '#afcca8',
        borderRadius: 10,
        padding: 20,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: "center",
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
        flex: 1,
        backgroundColor: '#3A4D39',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonMessageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        fontSize: 180,
        color: '#7ccaeb',
        padding: 50
    },
})