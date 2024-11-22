import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import to from "await-to-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, } from 'react-native';

export default function ModalHistorico({ selectedPlant ,setVisible }) {

    const { listActivityCare } = useContext(AuthContext);
    const [dataActivities, setDataActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar atividades da API
    
        // const dataActivities = [
        //     { data: "18/01/2024", hora: "08:00", atividade: "Adubar" },
        //     { data: "18/03/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/04/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "19/05/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "26/05/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "10/08/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "11/08/2024", hora: "08:00", atividade: "Adubar" },
        //     { data: "18/04/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/06/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "11/08/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/04/2024", hora: "08:00", atividade: "Adubar" },
        //     { data: "18/06/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "11/08/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/04/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/06/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "11/08/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/04/2024", hora: "08:00", atividade: "Regar" },
        //     { data: "18/06/2024", hora: "08:00", atividade: "Regar" },
        // ];

        const fetchActivities = async () => {
            setLoading(true);
            try {
                const response = await listActivityCare(selectedPlant._id);
                console.log(response.data); // Verifique onde os dados estão armazenados
        
                if (response.data?.activityCareList) {
                    const adaptedData = adaptApiResponse(response.data.activityCareList); // Passe apenas o array para adaptar
                    setDataActivities(adaptedData);
                } else {
                    console.warn('Dados inválidos recebidos da API:', response.data);
                    setDataActivities([]);
                }
            } catch (error) {
                console.error('Erro ao carregar atividades:', error);
                setDataActivities([]);
            } finally {
                setLoading(false);
            }
        };
        
        useEffect(() => {
            fetchActivities();
        }, []);

        const adaptApiResponse = (activityCareList) => {
            return activityCareList.map((item) => ({
                data: `${item.dia.padStart(2, '0')}/${item.mes.padStart(2, '0')}/${item.ano}`,
                hora: `${item.hora.padStart(2, '0')}:${item.minuto.padStart(2, '0')}`,
                atividade: `Código ${item.ActivityCareCode}`, // Personalize aqui conforme necessário
            }));
        };
    // Função para agrupar as datas por mês e ano
    const groupByMonth = (data) => {
        const grouped = data.reduce((acc, item) => {
            const [day, month, year] = item.data.split('/');
            const key = `${month}/${year}`;

            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);

            return acc;
        }, {});

        // Ordenar os meses em ordem crescente
        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            const [monthA, yearA] = a.split('/').map(Number);
            const [monthB, yearB] = b.split('/').map(Number);

            return yearA - yearB || monthA - monthB;
        }); 

        // Retornar o objeto ordenado
        const sortedGrouped = {};
        sortedKeys.forEach((key) => {
            sortedGrouped[key] = grouped[key].sort((a, b) => {
                const [dayA, monthA, yearA] = a.data.split('/').map(Number);
                const [dayB, monthB, yearB] = b.data.split('/').map(Number);

                return yearA - yearB || monthA - monthB || dayA - dayB;
            });
        });

        return sortedGrouped;
    };

    const prepareFlatListData = (groupedData) => {
        return Object.keys(groupedData).map((monthYear) => ({
            monthYear,
            activities: groupedData[monthYear],
        }));
    };

    const renderGroupedItems = ({ item }) => {
        return (
            <View key={item.monthYear}>
                <Text style={styles.textMonth}>{item.monthYear}</Text>
                <View style={{ marginBottom: 10, marginHorizontal: 30 }}>
                    {item.activities.map((activity, index) => (
                        <View
                            key={index.toString()}
                            style={{ flexDirection: "row", justifyContent: "space-around", }}
                        >
                            <Text style={{ fontSize: 18 }}>{activity.data}</Text>
                            <Text style={{ fontSize: 18 }}>{activity.hora}</Text>
                            <Text style={{ fontSize: 18 }}>{'- ' + activity.atividade}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };
    // const activitiesGrouped = groupByMonth(dataActivities);
    const activitiesGrouped = groupByMonth(Array.isArray(dataActivities) ? dataActivities : []);

    const flatListData = prepareFlatListData(activitiesGrouped);

    
    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Histórico de Cuidados </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.modalTitle2}>Atividades</Text>
                <FlatList
                    data={flatListData}
                    keyExtractor={(item) => item.monthYear}
                    renderItem={renderGroupedItems}
                />
            </View>
        </SafeAreaView>
    );
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
    modalTitle2: {
        fontSize: 22,
        padding: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: "#587f56",
        padding: 5,
        borderBottomWidth: 2,
        borderColor: "#a3d1a1",
        backgroundColor: "#ddeddd",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalHeader: {
        backgroundColor: "#3a4d39",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 60,
    },
    card: {
        borderRadius: 10,
        borderWidth: 2,
        shadowColor: 'black',
        elevation: 1,
        borderColor: "#a3d1a1",
        backgroundColor: "#f5faf5",
        margin: 25,
        height: "85%",
    },
    textMonth: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#587f56",
        padding: 5,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#a3d1a1",
        backgroundColor: "#ddeddd",
        marginVertical: 20,
        marginHorizontal: 30

    },
})