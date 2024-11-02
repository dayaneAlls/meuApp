import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import to from "await-to-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format, addDays, startOfWeek } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, ScrollView, Switch, } from 'react-native';

export default function ModalHistorico({ setVisible }) {


    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Histórico de Cuidados </Text>
            </View>
            <View style={{ padding: 15 }}>


            </View>
        </View>
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
})