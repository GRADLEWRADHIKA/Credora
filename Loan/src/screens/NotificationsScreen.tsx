import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import EmptyState from '../components/EmptyState';

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    icon: 'payments',
    title: 'Payment Reminder',
    body: 'Your daily RD deposit of ₹50 is due today before 8:00 PM.',
    time: 'Today, 9:00 AM',
    unread: true,
  },
  {
    id: '2',
    icon: 'check-circle',
    title: 'Application Approved',
    body: 'Your loan application LN-2026-483920 has been approved.',
    time: 'Yesterday, 4:12 PM',
    unread: true,
  },
  {
    id: '3',
    icon: 'description',
    title: 'Document Verified',
    body: 'Your Aadhaar Card has been successfully verified.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: '4',
    icon: 'account-balance-wallet',
    title: 'EMI Paid',
    body: 'Your EMI of ₹4,491 for October has been received.',
    time: '3 days ago',
    unread: false,
  },
  {
    id: '5',
    icon: 'info-outline',
    title: 'Welcome to LoanRD',
    body: 'Explore RD-based loans and Standard EMI loans tailored for you.',
    time: '5 days ago',
    unread: false,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[styles.row, shadow.card, item.unread && styles.rowUnread]}
      activeOpacity={0.8}
      onPress={() =>
        setNotifications(prev =>
          prev.map(n => (n.id === item.id ? { ...n, unread: false } : n)),
        )
      }
    >
      <View style={styles.iconBadge}>
        <Icon name={item.icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.textWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          {item.unread && <View style={styles.dot} />}
        </View>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {notifications.length === 0 ? (
        <EmptyState
          icon="notifications-none"
          title="No Notifications"
          subtitle="You're all caught up. We'll let you know when something needs your attention."
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.content}
          renderItem={renderItem}
          ListHeaderComponent={
            notifications.some(n => n.unread) ? (
              <TouchableOpacity onPress={markAllRead} style={styles.markAllRow}>
                <Text style={styles.markAllText}>Mark all as read</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  markAllRow: { alignItems: 'flex-end', marginBottom: spacing.sm },
  markAllText: { color: colors.primary, fontWeight: '700', fontSize: 12.5 },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rowUnread: { backgroundColor: colors.primarySurface },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  textWrap: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 13.5, fontWeight: '700', color: colors.textPrimary },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 6,
  },
  body: { ...typography.body, fontSize: 12.5, marginTop: 3, lineHeight: 17 },
  time: { ...typography.caption, marginTop: 4 },
});

export default NotificationsScreen;
