import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Toast from 'react-native-toast-message';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

export default function useSocket(userId) {
  useEffect(() => {
    if (!userId) return;

    const socket = io(API_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      socket.emit('join_user_room', userId);
    });

    socket.on('trophy_unlocked', (data) => {
      Toast.show({
        type: 'success',
        text1: 'Novo Troféu Desbloqueado',
        text2: data.title,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
}
