'use client';

import { AnimatePresence, motion } from '@repo/ui/lib';
import { useEffect, useState } from 'react';

import { NotificationType, subscribeToNotificationUpdates } from '@/notification';

import { Notification } from './notification';
import styles from './notifications-container.module.css';

export const NotificationsContainer: React.FC = () => {
  const [notifications, setNotifications] = useState([] as NotificationType[]);
  const { NODE_ENV } = process.env;

  useEffect(() => {
    subscribeToNotificationUpdates({
      publish: (newNotifications: NotificationType[]) => {
        setNotifications([...newNotifications]);
      },
    });
  }, [setNotifications]);

  return (
    <div
      className={`
          ${styles.notificationsList} ${NODE_ENV === 'development' ? 'right-16' : 'right-4'}
    `}
      data-testid="notifications-container"
    >
      <AnimatePresence>
        {notifications.map((notification: NotificationType, index: number) => (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            key={index}
          >
            <Notification title={notification.title} index={index}>
              {notification.body}
            </Notification>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsContainer;
