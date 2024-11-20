import React, { useState, useEffect, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format, addDays, startOfWeek } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, ScrollView, Switch, TextInput } from 'react-native';

export default function ModalLembretes({ setVisible, selectedPlant }) {

    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [modalAddRegistro, setModalAddRegistro] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [frequencia, setFrequencia] = useState('');
    const { listActivities, deleteLembrete, listCaresByPlant, addLembrete } = useContext(AuthContext);
    const [activities, setActivities] = useState([]);
    const [atividade, setAtividade] = useState('');
    const [notificationId, setNotificatioId] = useState([]);
    const [horaSelecionada, setHoraSelecionada] = useState("00");
    const [minutoSelecionado, setMinutoSelecionado] = useState("00");

    const [hora, setHora] = useState(() => {
        const horaAtual = new Date().getHours(); // Obtém a hora atual
        return String(horaAtual).padStart(2, "0"); // Formata para dois dígitos
    });
    const [minuto, setMinuto] = useState(() => {
        const minutoAtual = new Date().getMinutes(); // Obtém o minuto atual
        return String(minutoAtual).padStart(2, "0"); // Formata para dois dígitos
    });
    const [dia, setDia] = useState(() => {
        const hoje = new Date().getDate(); // Pega o dia atual (número)
        return String(hoje).padStart(2, "0"); // Retorna uma string formatada
    });
    const [mes, setMes] = useState(() => {
        const mesAtual = new Date().getMonth() + 1; // Pega o mês atual (número)
        return String(mesAtual).padStart(2, "0"); // Retorna uma string formatada
    });

    const horas = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
    const minutos = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    async function handleListActivities() {
        var response = await listActivities();
        setActivities(response.data.atividades);
    }

    async function handleRegister() {

        setDia(dia);
        setMes(mes);
        setModalAddRegistro(false);
    }

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

    useEffect(() => {
        const carregarNotificacoes = async () => {
            try {
                // Chama a função que busca os dados do backend
                const response = await listCaresByPlant(selectedPlant._id);
    
                // Verifica se os dados existem e acessa a propriedade correta
                if (response && response.data && Array.isArray(response.data.careList)) {
                    const notificacoesBackend = response.data.careList.map(cuidado => ({
                        id: cuidado.id, // ID específico da notificação
                        _id: cuidado._id, // Popula o _id do cuidado
                        hora: cuidado.hora,
                        minuto: cuidado.minuto,
                        frequencia: cuidado.frequencia,
                        dia: cuidado.dia,
                        atividade: cuidado.atividade,
                        plantaId: cuidado.planta_id,
                        ativa: cuidado.ativa
                    }));
    
                    // Atualiza as notificações no estado
                    setNotificacoes(notificacoesBackend);
                } else {
                    console.warn('Nenhuma notificação encontrada para a planta selecionada.');
                }
            } catch (error) {
                console.error("Erro ao carregar notificações:", error);
            }
        };
    
        // Configura o dia selecionado se não estiver definido
        if (!diaSelecionado) {
            const hoje = new Date();
            const diaAtualAbreviado = format(hoje, 'eee', { locale: pt })
                .charAt(0)
                .toUpperCase() + format(hoje, 'eee', { locale: pt }).slice(1, 3);
            setDiaSelecionado(diaAtualAbreviado);
        }
    
        carregarNotificacoes();
        handleListActivities();
    }, [selectedPlant._id, diaSelecionado]); // Adiciona dependências relevantes
    
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
                    body: atividade + (" " + selectedPlant.nome),
                },
                trigger,
            });
            const novaNotificacao = {
                id: notificationId,
                hora: horaSelecionada,
                minuto: minutoSelecionado,
                frequencia,
                dia: diaSelecionado,
                atividade,
                ativa: true,
            };

            addLembrete(selectedPlant._id, novaNotificacao);

            // Recupera as notificações atuais
            const armazenadas = await AsyncStorage.getItem('notificacoes');
            const notificacoes = armazenadas ? JSON.parse(armazenadas) : [];

            // Adiciona a nova notificação à lista
            notificacoes.push(novaNotificacao);

            // Salva a lista atualizada
            await AsyncStorage.setItem('notificacoes', JSON.stringify(notificacoes));

            // Confirmação do conteúdo salvo
            const confirmacao = await AsyncStorage.getItem('notificacoes');

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
        return dias[dia]; // Retorna o índice para ser usado pelo Notifications
    };

    // Data atual
    const hoje = new Date();
    // Primeiro dia da semana (domingo)
    const inicioDaSemana = startOfWeek(hoje, { weekStartsOn: 1 });
    const dataAtual = format(hoje, 'dd MMMM, yyyy', { locale: pt });
    const anoAtual = format(hoje, 'yyyy', { locale: pt });

    // Adiciona a data ao objeto de cada dia da semana
    const diasComDatas = diasDaSemana.map((dia, index) => {
        const dataDoDia = addDays(inicioDaSemana, index); // Calcula a data de cada dia da semana
        return {
            ...dia,
            data: format(dataDoDia, 'dd'), // Formata a data
        };
    });

    const handleDiaChange = (text) => {
        if (/^\d{0,2}$/.test(text) && (Number(text) >= 0 && Number(text) <= 31)) {
            setDia(text);
        }
    };

    const handleMesChange = (text) => {
        if (/^\d{0,2}$/.test(text) && (Number(text) >= 0 && Number(text) <= 12)) {
            setMes(text);
        }
    };

    // Função para excluir uma notificação agendada
    const excluirNotificacao = async (id) => { 
        try {
            console.log(id);
            // Remover lembrete associado (ajustar conforme necessário)
            deleteLembrete(id, selectedPlant._id);
    
            // Cancelar notificação agendada
            await Notifications.cancelScheduledNotificationAsync(id);
    
            // Atualizar a lista de notificações em estado e em armazenamento
            setNotificacoes(prev => {
                const notificacoesAtualizadas = prev.filter(notificacao => notificacao.id !== id);
                
                // Atualizar AsyncStorage com a lista atualizada
                AsyncStorage.setItem('notificacoes', JSON.stringify(notificacoesAtualizadas))
                    .catch(error => console.log('Erro ao atualizar AsyncStorage:', error));
    
                return notificacoesAtualizadas;
            });
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
            await Notifications.cancelScheduledNotificationAsync(id);
        } else {
            const notificacao = notificacoes.find(n => n.id === id);

            // Verifique se a notificação foi encontrada antes de tentar agendá-la
            if (notificacao) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: notificacao.title,
                        body: notificacao.body,
                    },
                    trigger: notificacao.trigger, // Aqui você usa os detalhes de trigger da notificação
                });
            }
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = diaSelecionado === item.dia;

        return (
            <TouchableOpacity
                style={[styles.botaoDia, isSelected && styles.botaoSelecionado]}
                onPress={() => setDiaSelecionado(item.dia)}
            >
                <Text style={[styles.textoBotao, isSelected && styles.textoSelecionado]}>
                    {item.dia}{"\n"}{item.data}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderItem2 = ({ item }) => (
        <View style={{ flexDirection: "row", }}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => { setModalAddRegistro(true); setNotificatioId(item) }}>
                <Text style={{ width: "75%" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: "#3a6138" }}>{`${item.atividade}`}</Text>
                    <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 18, color: "#648c62" }}>{"\n"}{`${item.frequencia} às ${item.hora}:${item.minuto}`} </Text>
                </Text>
                <Switch
                    value={item.ativa}
                    onValueChange={() => toggleAtiva(item.id, item.ativa)}
                />
                <TouchableOpacity onPress={() => excluirNotificacao(item._id)}>
                    <Icon name="close-circle" style={{ color: "#db453d", fontSize: 35 }} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="arrow-left" style={styles.iconVoltar} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Lembretes </Text>
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                        <Text style={{ fontSize: 15, color: "#587f56" }}>Notificações agendadas: </Text>
                    </View>
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
                            <Text style={styles.textModalTitle2}>Hora de cuidar da sua planta! 🌿😊</Text>
                            <View style={styles.pickerSelect}>
                                <Picker
                                    style={{ color: "#f6fff5", width: "100%" }}
                                    selectedValue={atividade}
                                    onValueChange={(itemValue) => setAtividade(itemValue)}
                                >
                                    <Picker.Item style={{ fontSize: 16 }} label="Selecione um tipo de cuidado:" value="" />
                                    {activities.map((activity) => (
                                        <Picker.Item
                                            key={activity._id}
                                            label={activity.descricao}
                                            value={activity.descricao}
                                        />
                                    ))}
                                </Picker>
                            </View>
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
                            <Text style={{ margin: 10 }}>
                                Horário selecionado: {horaSelecionada}:{minutoSelecionado}
                            </Text>
                            <View style={styles.pickerSelect}>
                                <Picker
                                    selectedValue={frequencia}
                                    onValueChange={(itemValue) => setFrequencia(itemValue)}
                                    style={{ color: "#f6fff5", width: "100%" }}
                                >
                                    <Picker.Item style={{ fontSize: 20 }} label="Repetir:" value="" />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddRegistro}
                onRequestClose={() => setModalAddRegistro(false)}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.modalCalendarContainer}>
                        <View style={{ flex: 10 }}></View>
                        <View style={styles.modalCalendarContent}>
                            <View style={{ backgroundColor: "#f6fff5", borderRadius: 20, marginHorizontal: 35, }}>
                                <Text style={styles.modalCalendarText2}>Registre uma atividade</Text>
                                <View style={styles.modalCalendar2}>
                                    <Text style={styles.itemText2}> Atividade: {notificationId.atividade}</Text>
                                    <View style={styles.scrollContainer2}>
                                        <Text style={styles.itemText2}>Horário: </Text>
                                        <ScrollView
                                            style={styles.scroll2}
                                            contentContainerStyle={styles.scrollContent}
                                            showsVerticalScrollIndicator={false}
                                            snapToInterval={50} // Ajuste conforme necessário
                                            snapToAlignment="center"
                                            decelerationRate="fast"
                                            onMomentumScrollEnd={(event) => {
                                                const index = Math.round(event.nativeEvent.contentOffset.y / 50);
                                                setHora(horas[index]); // Atualiza a hora selecionada
                                            }}
                                        >
                                            {horas.map((hora) => (
                                                <View key={hora} style={styles.item2}>
                                                    <Text style={styles.itemText2}>{hora}</Text>
                                                </View>
                                            ))}
                                        </ScrollView>

                                        <Text style={styles.itemText2}>:</Text>
                                        <ScrollView

                                            style={styles.scroll2}
                                            contentContainerStyle={styles.scrollContent}
                                            showsVerticalScrollIndicator={false}
                                            snapToInterval={50} // Ajuste conforme necessário
                                            snapToAlignment="center"
                                            decelerationRate="fast"
                                            onMomentumScrollEnd={(event) => {
                                                const index = Math.round(event.nativeEvent.contentOffset.y / 50);
                                                setMinuto(minutos[index]); // Atualiza o minuto selecionado
                                            }}
                                        >
                                            {minutos.map((minuto) => (
                                                <View key={minuto} style={styles.item2}>
                                                    <Text style={styles.itemText2}>{minuto}</Text>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                    <View style={styles.scrollContainer2}>
                                        <Text style={styles.itemText2}>Data: </Text>
                                        <TextInput
                                            style={styles.itemText2}
                                            value={dia}
                                            onChangeText={handleDiaChange}
                                            maxLength={2}
                                            keyboardType="number-pad"
                                        ></TextInput>
                                        <Text style={styles.itemText2}>/</Text>
                                        <TextInput
                                            style={styles.itemText2}
                                            value={mes}
                                            onChangeText={handleMesChange}
                                            maxLength={2}
                                            keyboardType="number-pad"
                                        ></TextInput>
                                        <Text style={styles.itemText2}>/ {anoAtual}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonCalendarContainer}>
                                <TouchableOpacity style={styles.buttonCalendar} onPress={() => handleRegister()}>
                                    <Text style={styles.buttonCalendarText}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCalendar} onPress={() => { setModalAddRegistro(false) }}>
                                    <Text style={styles.buttonCalendarText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    botaoSelecionado: {
        backgroundColor: '#7ac47d', // Cor do botão quando selecionado
    },
    textoSelecionado: {
        color: '#ffff', // Cor do texto quando selecionado
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
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    modalCalendarText2: {
        fontSize: 23,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#f6fff5",
        backgroundColor: "#587f56",
        padding: 10,
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
    modalCalendar2: {
        backgroundColor: "#f6fff5",
        borderRadius: 20,
        alignItems: "center"
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
    scrollContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 15,
        marginBottom: 15,
    },
    scrollContainer2: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    scroll: {
        height: 80,  // Altura fixa para cada ScrollView
        marginHorizontal: 10,
        backgroundColor: "#dfede2",
        borderRadius: 10,
    },
    scroll2: {
        height: 50,  // Altura fixa para cada ScrollView
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
    item2: {
        height: 50,  // Alinhado com snapToInterval
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 60,
    },
    itemText2: {
        fontSize: 25,
        fontWeight: "bold",
    },
    pickerSelect: {
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
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 13,
        backgroundColor: '#bee6be',
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 15,
        width: "100%",
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
    },
})