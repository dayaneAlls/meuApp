import React, { useState, useEffect } from "react";
import api from "../../services/api";
import to from "await-to-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format, addDays, startOfWeek } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, ScrollView, TextInput, Switch, SectionList } from 'react-native';

export default function ModalLembretes({ setVisible }) {

    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [horaSelecionada, setHoraSelecionada] = useState('24');
    const [minutoSelecionado, setMinutoSelecionado] = useState('00');
    const [frequencia, setFrequencia] = useState('');
    const [textoLembrete, setTextoLembrete] = useState("");


    const horas = Array.from({ length: 24 }, (_, i) => (i + 0).toString().padStart(2, '0'));
    const minutos = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para enviar notificações é necessária!');
                return;
            }
        })();
    }, []);

    const [notificacoes, setNotificacoes] = useState([]);

    // Recupera as notificações agendadas ao montar o componente
    useEffect(() => {
        const carregarNotificacoes = async () => {
            try {
                const armazenadas = await AsyncStorage.getItem('notificacoes');
                const notificacoes = armazenadas ? JSON.parse(armazenadas) : [];
                setNotificacoes(notificacoes);
            } catch (error) {
                console.error("Erro ao carregar notificações:", error);
            }
        };
        carregarNotificacoes();
    }, []);

    const agendarNotificacao = async () => {
        const trigger = {
            hour: parseInt(horaSelecionada),
            minute: parseInt(minutoSelecionado),
            repeats: true,
            ...(frequencia === 'Semanalmente' && { weekday: getWeekday(diaSelecionado) }),
        };

        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Hora de cuidar da sua planta! 🌿😊',
                    body: textoLembrete,
                },
                trigger,
            });
            const novaNotificacao = {
                id: notificationId,
                hora: horaSelecionada,
                minuto: minutoSelecionado,
                frequencia,
                dia: diaSelecionado,
                texto: textoLembrete,
                ativa: true,
            };

            // Recupera as notificações atuais
            const armazenadas = await AsyncStorage.getItem('notificacoes');
            const notificacoes = armazenadas ? JSON.parse(armazenadas) : [];

            // Adiciona a nova notificação à lista
            notificacoes.push(novaNotificacao);

            // Salva a lista atualizada
            await AsyncStorage.setItem('notificacoes', JSON.stringify(notificacoes));

            // Confirmação do conteúdo salvo
            const confirmacao = await AsyncStorage.getItem('notificacoes');
            console.log("Notificações salvas:", JSON.parse(confirmacao));

            setNotificacoes(notificacoes);
            setModalAdicionar(false);

        } catch (error) {
            console.error("Erro ao agendar notificação:", error);
        }
    };

    const diasDaSemana = [
        { id: '1', dia: 'Seg' },
        { id: '2', dia: 'Ter' },
        { id: '3', dia: 'Qua' },
        { id: '4', dia: 'Qui' },
        { id: '5', dia: 'Sex' },
        { id: '6', dia: 'Sáb' },
        { id: '7', dia: 'Dom' },
    ];

    const getWeekday = (dia) => {
        const dias = { 'Dom': 1, 'Seg': 2, 'Ter': 3, 'Qua': 4, 'Qui': 5, 'Sex': 6, 'Sáb': 7 };
        console.log("Dia no getWeekday:", dia);
        return dias[dia]; // Retorna o índice para ser usado pelo Notifications
    };

    // Data atual
    const hoje = new Date();
    // Primeiro dia da semana (domingo)
    const inicioDaSemana = startOfWeek(hoje, { weekStartsOn: 1 });
    const dataAtual = format(hoje, 'dd MMMM, yyyy', { locale: pt });

    // Adiciona a data ao objeto de cada dia da semana
    const diasComDatas = diasDaSemana.map((dia, index) => {
        const dataDoDia = addDays(inicioDaSemana, index); // Calcula a data de cada dia da semana
        return {
            ...dia,
            data: format(dataDoDia, 'dd'), // Formata a data
        };
    });

    // Função para excluir uma notificação agendada
    const excluirNotificacao = async (id) => {
        try {
            await Notifications.cancelScheduledNotificationAsync(id);
            setNotificacoes(prev => prev.filter(notificacao => notificacao.id !== id));
        } catch (error) {
            console.log('Erro ao cancelar notificação:', error);
        }
    };

    // Função para ativar/desativar notificações
    const toggleAtiva = async (id, ativa) => {
        const notificacaoAtualizada = notificacoes.map(notificacao =>
            notificacao.id === id ? { ...notificacao, ativa: !ativa } : notificacao
        );

        setNotificacoes(notificacaoAtualizada);
        await AsyncStorage.setItem('notificacoes', JSON.stringify(notificacaoAtualizada));

        if (ativa) {
            Notifications.cancelScheduledNotificationAsync(id);
        } else {
            const notificacao = notificacoes.find(n => n.id === id);
            Notifications.scheduleNotificationAsync(notificacao.id);
        }
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.botaoDia}
            onPress={() => { setDiaSelecionado(item.dia); }}
        >
            <Text style={styles.textoBotao}>{item.dia}{"\n"}{item.data}</Text>
        </TouchableOpacity>
    );

    const renderItem2 = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={{ width: "75%" }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: "#3a6138" }}>{`${item.texto}`}</Text>
                <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 18, color: "#648c62" }}>{"\n"}{`${item.frequencia} às ${item.hora}:${item.minuto}`} </Text>
            </Text>
            <Switch
                value={item.ativa}
                onValueChange={() => toggleAtiva(item.id, item.ativa)}
            />
            <TouchableOpacity onPress={() => excluirNotificacao(item.id)}>
                <Icon name="close-circle" style={{ color: "#db453d", fontSize: 35 }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Adicionar lembrete </Text>
            </View>
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, fontStyle: "italic", color: "#587f56", margin: 5, marginTop: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, }}>Hoje:</Text>
                    {"\n"}{dataAtual}
                </Text>
                <View style={styles.ViewCalendar}>
                    <Text style={styles.textoSelecionar}>Selecione um dia da semana e clique em adicionar:</Text>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalIndicator={true}
                            data={diasComDatas}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listaDias}
                        />
                        <View style={{ borderLeftWidth: 2, borderColor: "#a3d1a1" }}>
                            < TouchableOpacity style={styles.buttonAddLembrete} onPress={() => setModalAdicionar(true)}>
                                <Icon name="plus" style={{ fontSize: 50, color: "#2a3b29" }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.flatlist2}>
                    <FlatList
                        data={notificacoes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem2}
                        contentContainerStyle={styles.flatListContainer}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma notificação agendada</Text>}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAdicionar}
                onRequestClose={() => setModalAdicionar(false)}
            >
                <View style={styles.modalCalendarContainer}>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.modalCalendarContent}>
                        <View style={styles.modalCalendar}>
                            <Text style={styles.modalCalendarText}>Crie uma nova notificação</Text>
                            <Text style={styles.textModalTitle2}>Hora de cuidar da sua planta! 🌿📲</Text>
                            <TextInput
                                placeholder="Escreva seu lembrete"
                                placeholderTextColor="#8eb08d"
                                style={styles.textInput}
                                value={textoLembrete}
                                maxLength={30}
                                onChangeText={(text) => setTextoLembrete(text)}></TextInput>
                            <View style={styles.scrollContainer}>
                                <ScrollView
                                    style={styles.scroll}
                                    contentContainerStyle={styles.scrollContent}
                                    showsVerticalScrollIndicator={false}
                                    snapToInterval={80}
                                    snapToAlignment="center"
                                    decelerationRate="fast"
                                    onMomentumScrollEnd={(event) => {
                                        const index = Math.round(event.nativeEvent.contentOffset.y / 80);
                                        setHoraSelecionada(horas[index]);
                                    }}
                                >
                                    {horas.map((hora) => (
                                        <View key={hora} style={styles.item}>
                                            <Text style={styles.itemText}>{hora}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                                <Text style={styles.itemText}>{":"}</Text>
                                <ScrollView
                                    style={styles.scroll}
                                    contentContainerStyle={styles.scrollContent}
                                    showsVerticalScrollIndicator={false}
                                    snapToInterval={80}
                                    snapToAlignment="center"
                                    decelerationRate="fast"
                                    onMomentumScrollEnd={(event) => {
                                        const index = Math.round(event.nativeEvent.contentOffset.y / 80);
                                        setMinutoSelecionado(minutos[index]);
                                    }}
                                >
                                    {minutos.map((minuto) => (
                                        <View key={minuto} style={styles.item}>
                                            <Text style={styles.itemText}>{minuto}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <Text style={styles.selectedTime}>
                                Horário selecionado: {horaSelecionada}:{minutoSelecionado}
                            </Text>
                            <View style={styles.pickerSelect}>
                                <Text style={{ fontSize: 20, color: "#f6fff5", fontWeight: "bold", paddingHorizontal: 20, }}>Repetir:</Text>
                                <Picker
                                    selectedValue={frequencia}
                                    onValueChange={(itemValue) => setFrequencia(itemValue)}
                                    style={{ color: "#f6fff5", width: 190, }}
                                >
                                    <Picker.Item label="Hoje" value="Hoje" />
                                    <Picker.Item label="Diariamente" value="Diariamente" />
                                    <Picker.Item label="Semanalmente" value="Semanalmente" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.buttonCalendarContainer}>
                            <TouchableOpacity style={styles.buttonCalendar} onPress={() => agendarNotificacao()}>
                                <Text style={styles.buttonCalendarText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCalendar} onPress={() => setModalAdicionar(false)}>
                                <Text style={styles.buttonCalendarText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    buttonAddLembrete: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 5,
        backgroundColor: "#a3d1a1",
        borderRadius: 30,
        marginTop: 10,
        shadowColor: 'black',
        elevation: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    listaDias: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    botaoDia: {
        padding: 10,
        backgroundColor: '#cdebcc',
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
        elevation: 10,
        width: 75,
        borderWidth: 1,
        borderColor: '#a3d1a1',
    },
    textoBotao: {
        fontSize: 20,
        color: '#587f56',
        fontWeight: "bold",
        textAlign: "center"
    },
    modalCalendarContainer: {
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)',
    },
    modalCalendarContent: {
        backgroundColor: '#c3d6cc',
        justifyContent: "center",
        flex: 3,
    },
    modalCalendarText: {
        fontSize: 23,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#f6fff5",
        backgroundColor: "#587f56",
        padding: 25,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    buttonCalendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 50,
    },
    modalCalendar: {
        backgroundColor: "#f6fff5",
        borderRadius: 20,
        marginHorizontal: 35,
    },
    buttonCalendar: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#587f56", //"#587f56"
        borderRadius: 25,
        marginTop: 20,
        shadowColor: 'black',
        elevation: 8,
        width: 120,
    },
    buttonCalendarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textModalTitle2: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2a3b29",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        borderBottomWidth: 4,
        borderColor: "#6f8c6d",
    },
    textInput: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#587f56",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        borderBottomWidth: 4,
        borderColor: "#6f8c6d",
    },
    scrollContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 40,
        marginBottom: 40,
    },
    scroll: {
        height: 80,  // Altura fixa para cada ScrollView
        marginHorizontal: 10,
        backgroundColor: "#dfede2",
        borderRadius: 10,
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 0, // Para centralizar os itens corretamente

    },
    item: {
        height: 80,  // Alinhado com snapToInterval
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 60,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    pickerSelect: {
        color: "#f6fff5",
        backgroundColor: "#587f56",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 45,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    flatListContainer: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 13,
        backgroundColor: '#aed1be',
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 15,
    },
    textoSelecionar: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#587f56",
        paddingTop: 5,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderColor: "#a3d1a1",
        backgroundColor: "#ddeddd",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    flatlist2: {
        borderTopWidth: 3.5,
        borderBottomWidth: 3.5,
        borderColor: "#a3d1a1",
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        height: "58%",
        backgroundColor: "#f5faf5",
    },
    ViewCalendar: {
        borderColor: "#a3d1a1",
        borderWidth: 2,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#f5faf5",
    }

})