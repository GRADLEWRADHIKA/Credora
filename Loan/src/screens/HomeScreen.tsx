import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

interface ActivityItem {
  icon: string;
  label: string;
  time: string;
}

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    icon: 'payments',
    label: 'RD deposit of ₹50 received',
    time: 'Today, 9:02 AM',
  },
  { icon: 'check-circle', label: 'Aadhaar Card verified', time: 'Yesterday' },
  {
    icon: 'description',
    label: 'Application LN-2026-483920 submitted',
    time: '3 days ago',
  },
];

const HomeScreen = () => {
  // getParent() reaches the root stack, since this screen lives inside the MainTabs tab navigator
  const rootNavigation = useNavigation<RootNav>();
  const goToRootScreen = (screen: keyof RootStackParamList, params?: any) => {
    rootNavigation.getParent<RootNav>()?.navigate(screen as never, params);
  };

  const hasActiveLoan = true; // placeholder — replace with real loan state later

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Welcome back 👋</Text>

      {hasActiveLoan ? (
        <View style={[styles.loanCard, shadow.card]}>
          <View style={styles.loanCardHeader}>
            <Text style={styles.loanCardLabel}>Active Loan</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>RD-Based</Text>
            </View>
          </View>
          <Text style={styles.loanAmount}>₹8,000</Text>
          <View style={styles.loanProgressBar}>
            <View style={[styles.loanProgressFill, { width: '32%' }]} />
          </View>
          <Text style={styles.loanSubtext}>₹2,550 repaid of ₹8,000</Text>
          <TouchableOpacity onPress={() => goToRootScreen('DailyPayment')}>
            <Text style={styles.loanCardLink}>Make today's payment →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.noLoanCard, shadow.card]}>
          <Icon
            name="account-balance-wallet"
            size={28}
            color={colors.primary}
          />
          <Text style={styles.noLoanTitle}>No active loan</Text>
          <Text style={styles.noLoanSubtitle}>
            Apply for a loan to get started.
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        <TouchableOpacity
          style={[styles.quickAction, shadow.card]}
          onPress={() => goToRootScreen('ChooseLoanType')}
        >
          <Icon name="add-circle-outline" size={22} color={colors.primary} />
          <Text style={styles.quickActionLabel}>Apply for New Loan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickAction, shadow.card]}
          onPress={() => goToRootScreen('RDDepositHistory')}
        >
          <Icon name="history" size={22} color={colors.primary} />
          <Text style={styles.quickActionLabel}>Payment History</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={[styles.activityCard, shadow.card]}>
        {RECENT_ACTIVITY.map((item, i) => (
          <View
            key={i}
            style={[
              styles.activityRow,
              i === RECENT_ACTIVITY.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Icon
              name={item.icon}
              size={16}
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityLabel}>{item.label}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  greeting: { ...typography.h1, fontSize: 20, marginBottom: spacing.md },
  loanCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanCardLabel: { ...typography.label },
  statusPill: {
    backgroundColor: colors.primarySurface,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  loanAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  loanProgressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  loanProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  loanSubtext: { ...typography.caption, marginTop: 6 },
  loanCardLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12.5,
    marginTop: spacing.sm,
  },
  noLoanCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  noLoanTitle: { ...typography.h3, marginTop: spacing.sm },
  noLoanSubtitle: { ...typography.caption, marginTop: 2 },
  sectionTitle: {
    ...typography.h3,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  quickActionsRow: { flexDirection: 'row' },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 6,
  },
  activityCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityLabel: {
    fontSize: 12.5,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  activityTime: { ...typography.caption, marginTop: 2 },
});

export default HomeScreen;
