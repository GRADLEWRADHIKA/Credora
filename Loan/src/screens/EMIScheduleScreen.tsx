import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'EMISchedule'>;

interface EMIRow {
  month: number;
  dueDate: string;
  emi: number;
  balance: number;
}

const EMIScheduleScreen = ({ navigation }: Props) => {
  const loanAmount = 50000;
  const annualInterestRate = 14;
  const tenureMonths = 12;

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const schedule: EMIRow[] = [];
  let balance = loanAmount;
  const startDate = new Date(2026, 9, 1);
  let totalInterest = 0;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = emi - interest;
    balance -= principal;
    totalInterest += interest;

    const dueDate = new Date(startDate);
    dueDate.setMonth(startDate.getMonth() + month - 1);
    const dueDateLabel = dueDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    schedule.push({
      month,
      dueDate: dueDateLabel,
      emi: Math.round(emi),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  const totalPayable = schedule.reduce((sum, row) => sum + row.emi, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.summaryCard, shadow.card]}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Monthly EMI</Text>
            <Text style={styles.summaryValue}>₹{Math.round(emi)}</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Tenure</Text>
            <Text style={styles.summaryValue}>{tenureMonths} months</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Interest</Text>
            <Text style={styles.summaryValueSmall}>₹{Math.round(totalInterest)}</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Total Payable</Text>
            <Text style={styles.summaryValueSmall}>₹{totalPayable}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Payment Schedule</Text>

      <View style={[styles.tableCard, shadow.card]}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, { flex: 0.6 }]}>#</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.6 }]}>Due Date</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>EMI</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.4, textAlign: 'right' }]}>Balance</Text>
        </View>

        {schedule.map((row, i) => (
          <View
            key={row.month}
            style={[styles.tableRow, i === schedule.length - 1 && { borderBottomWidth: 0 }]}
          >
            <Text style={[styles.tableCell, { flex: 0.6 }]}>{row.month}</Text>
            <Text style={[styles.tableCell, { flex: 1.6 }]}>{row.dueDate}</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>₹{row.emi}</Text>
            <Text style={[styles.tableCell, { flex: 1.4, textAlign: 'right' }]}>
              ₹{row.balance}
            </Text>
          </View>
        ))}
      </View>

      <AnimatedButton
  title="View Repayment History"
  icon="history"
  onPress={() => navigation.navigate('StandardRepaymentHistory')}
  style={{ marginTop: spacing.lg }}
/>
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
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { ...typography.label, marginBottom: 4 },
  summaryValue: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  summaryValueSmall: { fontSize: 14, fontWeight: '700', color: colors.primaryDark },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  sectionTitle: { ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm },
  tableCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeaderCell: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableCell: { fontSize: 12, color: colors.textPrimary },
  proceedButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  proceedButtonText: { color: colors.white, fontWeight: '700', fontSize: 16, marginRight: 8 },
});

export default EMIScheduleScreen;