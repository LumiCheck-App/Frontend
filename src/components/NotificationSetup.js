import * as Notifications from "expo-notifications";
import { useEffect } from "react"; // Certifique-se de importar o useEffect
import { useNavigation } from "@react-navigation/native"; // Para a navegação

// Configuração de notificações
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Solicitar permissão para notificações
export const requestNotificationPermission = async () => {
    const settings = await Notifications.requestPermissionsAsync();
    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
        return true;
    }
    alert("Permissões para notificações não foram concedidas!");
    return false;
};

// Enviar uma notificação local
export const sendPushNotification = async (title, body, data = {}) => {
    setTimeout(async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title || "Notificação",
                body: body || "Você recebeu uma mensagem.",
                sound: "default",
                data: data, // Dados adicionais para redirecionamento
            },
            trigger: {
                seconds: 30, // Atraso em segundos
                repeats: false, // Certifique-se de que a repetição está desabilitada
                //nao esta a funcionar o atraso mas sem o trigger nao envia notificacoes
            },
        });
    }, 5000);
};