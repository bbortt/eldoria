import {
  addNotification,
  clearNotifications,
  NotificationSubscriber,
  NotificationType,
  removeNotification,
  subscribeToNotificationUpdates,
} from './notifications';

describe('Notifications with Subscriptions', () => {
  let mockSubscriber: NotificationSubscriber;
  let publishedNotifications: NotificationType[];

  beforeEach(() => {
    publishedNotifications = [];
    mockSubscriber = {
      publish: (notifications: NotificationType[]) => {
        publishedNotifications = notifications;
      },
    };

    clearNotifications();
  });

  describe('subscribeToNotificationUpdates', () => {
    it('should receive initial notifications on subscription', () => {
      const notification = { title: 'Initial', body: 'Test' };
      addNotification(notification);
      subscribeToNotificationUpdates(mockSubscriber);
      expect(publishedNotifications).toEqual([notification]);
    });

    it('should publish updates to multiple subscribers', () => {
      let secondPublishedNotifications: NotificationType[] = [];
      const secondSubscriber: NotificationSubscriber = {
        publish: (notifications: NotificationType[]) => {
          secondPublishedNotifications = notifications;
        },
      };

      subscribeToNotificationUpdates(mockSubscriber);
      subscribeToNotificationUpdates(secondSubscriber);

      const notification = { title: 'Test', body: 'Content' };
      addNotification(notification);

      expect(publishedNotifications).toEqual([notification]);
      expect(secondPublishedNotifications).toEqual([notification]);
    });
  });

  describe('addNotification', () => {
    it('should receive notifications when new notification is added', () => {
      subscribeToNotificationUpdates(mockSubscriber);
      const notification = { title: 'Test', body: 'Content' };
      addNotification(notification);
      expect(publishedNotifications).toEqual([notification]);
    });
  });

  describe('removeNotification', () => {
    it('should receive notifications when notification is removed', () => {
      subscribeToNotificationUpdates(mockSubscriber);
      addNotification({ title: 'First', body: 'One' });
      addNotification({ title: 'Second', body: 'Two' });
      removeNotification(0);
      expect(publishedNotifications).toEqual([{ title: 'Second', body: 'Two' }]);
    });

    it('should not trigger publication update when notification with invalid index is removed', () => {
      subscribeToNotificationUpdates(mockSubscriber);
      addNotification({ title: 'Test', body: 'Content' });
      publishedNotifications = []; // Reset to check if publish is called
      removeNotification(-1);
      removeNotification(1);
      expect(publishedNotifications).toEqual([]);
    });
  });
});
