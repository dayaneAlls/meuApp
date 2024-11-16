// src/utils/notificationsUtils.js
import * as Notifications from 'expo-notifications';

// Função para limpar todas as notificações locais
export const limparNotificacoesLocais = async () => {
    try {
        const notificacoesAgendadas = await Notifications.getAllScheduledNotificationsAsync();
        await Promise.all(
            notificacoesAgendadas.map(async (notificacao) => {
                await Notifications.cancelScheduledNotificationAsync(notificacao.identifier);
            })
        );
    } catch (error) {
        console.log('Erro ao limpar notificações locais:', error);
    }
};
