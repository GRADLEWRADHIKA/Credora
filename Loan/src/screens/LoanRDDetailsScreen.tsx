import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'LoanRDDetails'>;

const LoanRDDetailsScreen = ({ navigation }: Props) => {
  const [loanAmount, setLoanAmount] = useState('8000');
  const [rdDailyDeposit, setRdDailyDeposit] = useState('50');
  const [dailyInstallment, setDailyInstallment] = useState('100');
  const [numberOfDays, setNumberOfDays] = useState('100');

  const totalRepayment =
    (parseFloat(dailyInstallment) || 0) * (parseFloat(numberOfDays) || 0);

  const handleSaveBorrower = () => {
    navigation.navigate('DailyPayment');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.formCard, shadow.card]}>
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ 8,000"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={loanAmount}
          onChangeText={setLoanAmount}
        />

        <Text style={styles.label}>RD Daily Deposit</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ 50"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={rdDailyDeposit}
          onChangeText={setRdDailyDeposit}
        />

        <Text style={styles.label}>Daily Installment</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ 100"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={dailyInstallment}
          onChangeText={setDailyInstallment}
        />

        <Text style={styles.label}>Number of Days</Text>
        <TextInput
          style={styles.input}
          placeholder="100"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={numberOfDays}
          onChangeText={setNumberOfDays}
        />
      </View>

      <View style={[styles.summaryBox, shadow.card]}>
        <View style={styles.summaryTitleRow}>
          <Icon name="receipt-long" size={18} color={colors.primary} />
          <Text style={styles.summaryTitle}>Summary</Text>
        </View>

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
          <Text style={styles.summaryValueBold}>₹{totalRepayment}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>RD Deposit (Daily)</Text>
          <Text style={styles.summaryValue}>₹{rdDailyDeposit || 0}</Text>
        </View>
        <View style={[styles.summaryRow, { marginBottom: 0 }]}>
          <Text style={styles.summaryLabel}>Interest (Approx.)</Text>
          <Text style={styles.summaryValue}>13% - 20%</Text>
        </View>
      </View>

     <AnimatedButton
  title="Save Borrower"
  icon="person-add-alt"
  onPress={handleSaveBorrower}
  style={{ marginTop: spacing.lg }}
/> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  label: { ...typography.label, marginBottom: 6, marginTop: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  summaryBox: {
    backgroundColor: colors.primarySurface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  summaryTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  summaryTitle: { ...typography.h3, color: colors.primaryDark, marginLeft: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { ...typography.body, fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  summaryValueBold: { fontSize: 14, fontWeight: '800', color: colors.primaryDark },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  saveButtonText: { color: colors.white, fontWeight: '700', fontSize: 16, marginRight: 8 },
});

export default LoanRDDetailsScreen;