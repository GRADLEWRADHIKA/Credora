import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import EmptyState from '../components/EmptyState';

interface PaymentRecord {
  date: string;
  isToday?: boolean;
  amount: number;
  status: 'Paid' | 'Pending';
}

const RDDepositHistoryScreen = () => {
  const totalDeposited = 250;
  const targetAmount = 5000;
  const progressPercent = Math.round((totalDeposited / targetAmount) * 100);

  const paymentHistory: PaymentRecord[] = [
    { date: '26 Sep 2026', isToday: true, amount: 50, status: 'Paid' },
    { date: '25 Sep 2026', amount: 50, status: 'Paid' },
    { date: '24 Sep 2026', amount: 50, status: 'Paid' },
    { date: '23 Sep 2026', amount: 50, status: 'Paid' },
    { date: '22 Sep 2026', amount: 50, status: 'Paid' },
    { date: '21 Sep 2026', amount: 50, status: 'Paid' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.summaryCard, shadow.card]}>
        <View style={styles.summaryHeaderRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Deposited</Text>
            <Text style={styles.summaryAmount}>₹{totalDeposited}</Text>
            <Text style={styles.summarySubtext}>Out of ₹{targetAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>{progressPercent}%</Text>
          </View>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payment History</Text>
       {paymentHistory.length === 0 ? (
  <EmptyState
    icon="history"
    title="No Payments Yet"
    subtitle="Your payment history will show up here once you make your first deposit."
  />
) : (
  <View style={[styles.historyCard, shadow.card]}>
    {paymentHistory.map((record, index) => (
      <View key={index} style={styles.historyRow}>
        <Text style={styles.historyDate}>
          {record.date}
          {record.isToday ? '\nToday' : ''}
        </Text>
        <View style={styles.historyStatus}>
          <Icon
            name={record.status === 'Paid' ? 'check-circle' : 'schedule'}
            size={18}
            color={record.status === 'Paid' ? colors.primary : colors.accent}
            style={{ marginRight: 8 }}
          />
          <View>
            <Text style={styles.historyAmount}>₹{record.amount}</Text>
            <Text style={styles.historyStatusText}>{record.status}</Text>
          </View>
        </View>
      </View>
    ))}
  </View>
)}
</ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  summaryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  summaryLabel: { ...typography.label },
  summaryAmount: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginTop: 2 },
  summarySubtext: { ...typography.caption, marginTop: 2 },
  percentBadge: {
    backgroundColor: colors.primarySurface,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  percentText: { fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyDate: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  historyStatus: { flexDirection: 'row', alignItems: 'center' },
  historyAmount: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, textAlign: 'right' },
  historyStatusText: { fontSize: 11, color: colors.primary, textAlign: 'right' },
});

export default RDDepositHistoryScreen;