import { Platform } from 'react-native';

export async function scheduleOrderNotification(orderId) {
  if (Platform.OS === 'web') {
    return { delivered: false, reason: 'No navegador, a confirmação visual substitui a notificação local.' };
  }

  try {
    const Notifications = await import('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const current = await Notifications.getPermissionsAsync();
    let status = current.status;
    if (status !== 'granted') {
      const requested = await Notifications.requestPermissionsAsync();
      status = requested.status;
    }
    if (status !== 'granted') {
      return { delivered: false, reason: 'Permissão de notificações não concedida.' };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pedido recebido! 🍔',
        body: `O pedido #${orderId} já está sendo preparado.`,
        data: { orderId },
      },
      trigger: null,
    });
    return { delivered: true };
  } catch {
    return { delivered: false, reason: 'Notificação indisponível neste ambiente.' };
  }
}
