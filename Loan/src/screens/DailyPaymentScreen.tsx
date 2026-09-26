import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyPayment'>;

interface UpcomingPayment {
  label: string;
  amount: number;
  isToday?: boolean;
}

const DailyPaymentScreen = ({ navigation }: Props) => {
  const [isPending, setIsPending] = useState(true);

  const todayAmount = 50;
  const totalDeposited = 250;

  const upcomingPayments: UpcomingPayment[] = [
    { label: 'Today', amount: 50, isToday: true },
    { label: '22 Sep', amount: 50 },
    { label: 'Today', amount: 50 },
    { label: 'Today', amount: 50 },
    { label: 'Today', amount: 50 },
  ];

  const handlePayNow = () => {
    // Wire up real payment logic here later
    setIsPending(false);
    navigation.navigate('RDDepositHistory');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Today's Payment Card */}
      <View style={styles.paymentCard}>
        <View style={styles.paymentCardHeader}>
          <View>
            <Text style={styles.paymentCardTitle}>Today's RD Payment</Text>
            <Text style={styles.paymentAmount}>₹{todayAmount}</Text>
            <Text
              style={[
                styles.statusText,
                { color: isPending ? '#d84315' : '#2e7d32' },
              ]}
            >
              {isPending ? 'Pending' : 'Paid'}
            </Text>
          </View>
          <Text style={styles.clockIcon}>⏰</Text>
        </View>

        <Text style={styles.deadlineText}>⏱ Pay before 8:00 PM</Text>

        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Payments */}
      <Text style={styles.sectionTitle}>Upcoming Payments</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {upcomingPayments.map((payment, index) => (
          <View
            key={index}
            style={[
              styles.upcomingChip,
              payment.isToday && styles.upcomingChipToday,
            ]}
          >
            <Text style={styles.upcomingLabel}>{payment.label}</Text>
            <Text style={styles.upcomingAmount}>₹{payment.amount}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Total Deposited */}
      <View style={styles.totalRow}>
        <Text style={styles.totalIcon}>📊</Text>
        <View>
          <Text style={styles.totalLabel}>Total Deposited</Text>
          <Text style={styles.totalValue}>₹{totalDeposited}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  paymentCard: {
    backgroundColor: '#f5f7f5',
    borderRadius: 12,
    padding: 18,
  },
  paymentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentCardTitle: { fontSize: 13, color: '#555', marginBottom: 4 },
  paymentAmount: { fontSize: 26, fontWeight: '700', color: '#222' },
  statusText: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  clockIcon: { fontSize: 26 },
  deadlineText: { fontSize: 12, color: '#666', marginTop: 14, marginBottom: 14 },
  payNowButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  payNowButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    color: '#222',
  },
  upcomingChip: {
    backgroundColor: '#f5f7f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    alignItems: 'center',
  },
  upcomingChipToday: { backgroundColor: '#e8f5e9' },
  upcomingLabel: { fontSize: 11, color: '#666', marginBottom: 4 },
  upcomingAmount: { fontSize: 13, fontWeight: '700', color: '#222' },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  totalIcon: { fontSize: 20, marginRight: 10 },
  totalLabel: { fontSize: 12, color: '#666' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#222' },
});

export default DailyPaymentScreen;