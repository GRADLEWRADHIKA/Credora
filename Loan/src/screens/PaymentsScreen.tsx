import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import EmptyState from '../components/EmptyState';

type LoanType = 'rd' | 'standard';

// Placeholder — replace with real active-loan data later
const activeLoanType: LoanType = 'rd';

interface RDRecord {
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

interface EMIRecord {
  month: number;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Upcoming';
}

const RD_HISTORY: RDRecord[] = [
  { date: '28 Sep 2026', amount: 50, status: 'Paid' },
  { date: '27 Sep 2026', amount: 50, status: 'Paid' },
  { date: '26 Sep 2026', amount: 50, status: 'Paid' },
  { date: '25 Sep 2026', amount: 50, status: 'Paid' },
];

const EMI_HISTORY: EMIRecord[] = [
  { month: 1, dueDate: '01 Oct 2026', amount: 4491, status: 'Paid' },
  { month: 2, dueDate: '01 Nov 2026', amount: 4491, status: 'Upcoming' },
  { month: 3, dueDate: '01 Dec 2026', amount: 4491, status: 'Upcoming' },
];

const PaymentsScreen = () => {
  const [tab, setTab] = useState<LoanType>(activeLoanType);

  const rows =
    tab === 'rd'
      ? RD_HISTORY.map(r => ({
          label: r.date,
          amount: r.amount,
          status: r.status,
        }))
      : EMI_HISTORY.map(r => ({
          label: `EMI #${r.month} — ${r.dueDate}`,
          amount: r.amount,
          status: r.status,
        }));

  return (
    <View style={styles.screen}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'rd' && styles.tabButtonActive]}
          onPress={() => setTab('rd')}
        >
          <Text
            style={[styles.tabLabel, tab === 'rd' && styles.tabLabelActive]}
          >
            RD Deposits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === 'standard' && styles.tabButtonActive,
          ]}
          onPress={() => setTab('standard')}
        >
          <Text
            style={[
              styles.tabLabel,
              tab === 'standard' && styles.tabLabelActive,
            ]}
          >
            EMI Payments
          </Text>
        </TouchableOpacity>
      </View>

      {rows.length === 0 ? (
        <EmptyState
          icon="receipt-long"
          title="No Payments Yet"
          subtitle="Your payment history will show up here once your loan is active."
        />
      ) : (
        <View style={styles.listWrap}>
          <View style={[styles.card, shadow.card]}>
            {rows.map((row, i) => (
              <View
                key={i}
                style={[
                  styles.row,
                  i === rows.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Icon
                    name={row.status === 'Paid' ? 'check-circle' : 'schedule'}
                    size={16}
                    color={
                      row.status === 'Paid' ? colors.primary : colors.accent
                    }
                    style={{ marginRight: 6 }}
                  />
                  <View>
                    <Text style={styles.rowAmount}>₹{row.amount}</Text>
                    <Text style={styles.rowStatus}>{row.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: 4,
    marginBottom: spacing.md,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: radius.sm - 2,
    alignItems: 'center',
  },
  tabButtonActive: { backgroundColor: colors.primary },
  tabLabel: { fontSize: 12.5, fontWeight: '700', color: colors.textSecondary },
  tabLabelActive: { color: colors.white },
  listWrap: { flex: 1 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { fontSize: 13, color: colors.textPrimary, fontWeight: '500' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'right',
  },
  rowStatus: { fontSize: 11, color: colors.textMuted, textAlign: 'right' },
});

export default PaymentsScreen;
