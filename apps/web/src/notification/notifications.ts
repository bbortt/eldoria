export interface NotificationType {
  title: string;
  body: React.ReactNode;
}

export interface NotificationSubscriber {
  publish: (notifications: NotificationType[]) => void;
}

const notifications: NotificationType[] = [];
const subscriptions: NotificationSubscriber[] = [];

export const subscribeToNotificationUpdates = (subscriber: NotificationSubscriber) => {
  subscriptions.push(subscriber);
  subscriber.publish(notifications);
};

export const addNotification = (notification: NotificationType): void => {
  notifications.push(notification);
  subscriptions.forEach(subscription => subscription.publish(notifications));
};
export const removeNotification = (index: number): void => {
  if (index >= 0 && index < notifications.length) {
    notifications.splice(index, 1);
    subscriptions.forEach(subscription => subscription.publish(notifications));
  }
};
export const clearNotifications = (): void => {
  notifications.splice(0, notifications.length);
};
