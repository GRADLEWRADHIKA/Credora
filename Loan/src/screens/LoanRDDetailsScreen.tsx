import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';


type Props = NativeStackScreenProps<RootStackParamList, 'LoanRDDetails'>;

const LoanRDDetailsScreen = ({ navigation }: Props) => {
  const [loanAmount, setLoanAmount] = useState('8000');
  const [rdDailyDeposit, setRdDailyDeposit] = useState('50');
  const [dailyInstallment, setDailyInstallment] = useState('100');
  const [numberOfDays, setNumberOfDays] = useState('100');

  const totalRepayment =
    (parseFloat(dailyInstallment) || 0) * (parseFloat(numberOfDays) || 0);

  const handleSaveBorrower = () => {
  console.log({
    loanAmount,
    rdDailyDeposit,
    dailyInstallment,
    numberOfDays,
    totalRepayment,
  });
  navigation.navigate('DailyPayment');
};

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Loan Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ 8,000"
        keyboardType="number-pad"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />

      <Text style={styles.label}>RD Daily Deposit</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ 50"
        keyboardType="number-pad"
        value={rdDailyDeposit}
        onChangeText={setRdDailyDeposit}
      />

      <Text style={styles.label}>Daily Installment</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ 100"
        keyboardType="number-pad"
        value={dailyInstallment}
        onChangeText={setDailyInstallment}
      />

      <Text style={styles.label}>Number of Days</Text>
      <TextInput
        style={styles.input}
        placeholder="100"
        keyboardType="number-pad"
        value={numberOfDays}
        onChangeText={setNumberOfDays}
      />

      {/* Summary Box */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Loan Amount</Text>
          <Text style={styles.summaryValue}>₹{loanAmount || 0}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Daily Installment</Text>
          <Text style={styles.summaryValue}>₹{dailyInstallment || 0}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Repayment</Text>
          <Text style={styles.summaryValue}>₹{totalRepayment}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>RD Deposit (Daily)</Text>
          <Text style={styles.summaryValue}>₹{rdDailyDeposit || 0}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Interest (Approx.)</Text>
          <Text style={styles.summaryValue}>13% - 20%</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveBorrower}>
        <Text style={styles.saveButtonText}>Save Borrower</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 13, color: '#555', marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  summaryBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 13, color: '#444' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#222' },
  saveButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default LoanRDDetailsScreen;