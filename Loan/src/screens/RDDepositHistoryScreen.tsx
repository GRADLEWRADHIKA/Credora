import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

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
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeaderRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Deposited</Text>
            <Text style={styles.summaryAmount}>₹{totalDeposited}</Text>
            <Text style={styles.summarySubtext}>
              Out of ₹{targetAmount.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.percentText}>{progressPercent}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>
      </View>

      {/* Payment History */}
      <Text style={styles.sectionTitle}>Payment History</Text>

      {paymentHistory.map((record, index) => (
        <View key={index} style={styles.historyRow}>
          <Text style={styles.historyDate}>
            {record.date}
            {record.isToday ? '\nToday' : ''}
          </Text>
          <View style={styles.historyStatus}>
            <Text style={styles.checkIcon}>
              {record.status === 'Paid' ? '✅' : '⏳'}
            </Text>
            <View>
              <Text style={styles.historyAmount}>₹{record.amount}</Text>
              <Text style={styles.historyStatusText}>{record.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  summaryCard: {
    backgroundColor: '#f5f7f5',
    borderRadius: 12,
    padding: 16,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: { fontSize: 12, color: '#666' },
  summaryAmount: { fontSize: 22, fontWeight: '700', color: '#222', marginTop: 2 },
  summarySubtext: { fontSize: 11, color: '#888', marginTop: 2 },
  percentText: { fontSize: 13, fontWeight: '700', color: '#2e7d32' },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    color: '#222',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyDate: { fontSize: 13, color: '#444', lineHeight: 18 },
  historyStatus: { flexDirection: 'row', alignItems: 'center' },
  checkIcon: { fontSize: 16, marginRight: 8 },
  historyAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
    textAlign: 'right',
  },
  historyStatusText: { fontSize: 11, color: '#2e7d32', textAlign: 'right' },
});

export default RDDepositHistoryScreen;