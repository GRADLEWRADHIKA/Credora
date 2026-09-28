import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import EmptyState from '../components/EmptyState';

interface EMIRecord {
  month: number;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Upcoming';
}

const StandardRepaymentHistoryScreen = () => {
  const totalEMIs = 12;
  const paidEMIs = 3;
  const emiAmount = 4491;
  const totalPaid = paidEMIs * emiAmount;
  const totalPayable = totalEMIs * emiAmount;
  const progressPercent = Math.round((paidEMIs / totalEMIs) * 100);

  const records: EMIRecord[] = [
    { month: 1, dueDate: '01 Oct 2026', amount: emiAmount, status: 'Paid' },
    { month: 2, dueDate: '01 Nov 2026', amount: emiAmount, status: 'Paid' },
    { month: 3, dueDate: '01 Dec 2026', amount: emiAmount, status: 'Paid' },
    { month: 4, dueDate: '01 Jan 2027', amount: emiAmount, status: 'Upcoming' },
    { month: 5, dueDate: '01 Feb 2027', amount: emiAmount, status: 'Upcoming' },
    { month: 6, dueDate: '01 Mar 2027', amount: emiAmount, status: 'Upcoming' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.summaryCard, shadow.card]}>
        <View style={styles.summaryHeaderRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Paid</Text>
            <Text style={styles.summaryAmount}>₹{totalPaid.toLocaleString()}</Text>
            <Text style={styles.summarySubtext}>Out of ₹{totalPayable.toLocaleString()}</Text>
          </View>
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>{progressPercent}%</Text>
          </View>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        <Text style={styles.emiCountText}>
          {paidEMIs} of {totalEMIs} EMIs paid
        </Text>
      </View>

      <Text style={styles.sectionTitle}>EMI History</Text>

      {records.length === 0 ? (
  <EmptyState
    icon="receipt-long"
    title="No EMI Records Yet"
    subtitle="Your EMI schedule and payments will appear here once your loan is active."
  />
) : (
  <View style={[styles.historyCard, shadow.card]}>
    {records.map((record, i) => (
          <View
            key={record.month}
            style={[styles.historyRow, i === records.length - 1 && { borderBottomWidth: 0 }]}
          >
            <View>
              <Text style={styles.historyMonth}>EMI #{record.month}</Text>
              <Text style={styles.historyDate}>{record.dueDate}</Text>
            </View>
            <View style={styles.historyStatus}>
              <Icon
                name={record.status === 'Paid' ? 'check-circle' : 'schedule'}
                size={18}
                color={record.status === 'Paid' ? colors.primary : colors.accent}
                style={{ marginRight: 8 }}
              />
              <View>
                <Text style={styles.historyAmount}>₹{record.amount}</Text>
                <Text
                  style={[
                    styles.historyStatusText,
                    { color: record.status === 'Paid' ? colors.primary : colors.danger },
                  ]}
                >
                  {record.status}
                </Text>
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
  summaryCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  summaryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  summaryLabel: { ...typography.label },
  summaryAmount: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: 2 },
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
  emiCountText: { ...typography.caption, marginTop: 8 },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  historyCard: { backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.md },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyMonth: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  historyDate: { ...typography.caption, marginTop: 2 },
  historyStatus: { flexDirection: 'row', alignItems: 'center' },
  historyAmount: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, textAlign: 'right' },
  historyStatusText: { fontSize: 11, textAlign: 'right', marginTop: 2, fontWeight: '600' },
});

export default StandardRepaymentHistoryScreen;