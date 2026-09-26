import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'RecurringDeposit'>;

const RecurringDepositScreen = ({ navigation }: Props) => {
  // Static for now — Step 8 will wire this up to pass real data between screens
  const loanAmount = 8000;
  const dailyRDDeposit = 50;

  const steps = [
    'A fixed amount will be deposited daily in your RD.',
    'It helps you stay disciplined and repay your loan daily.',
    'Your RD will start after confirmation.',
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Loan Amount Card */}
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.iconCircle}>💰</Text>
          <View>
            <Text style={styles.cardLabel}>Your Loan Amount</Text>
            <Text style={styles.cardValue}>₹{loanAmount.toLocaleString()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* RD Deposit Card */}
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.iconCircle}>🐷</Text>
          <View>
            <Text style={styles.cardLabel}>Required Daily RD Deposit</Text>
            <Text style={styles.cardValue}>₹{dailyRDDeposit} / day</Text>
            <Text style={styles.cardSubtext}>
              Based on your loan amount of ₹{loanAmount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* How it works */}
      <Text style={styles.sectionTitle}>How it works?</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumberCircle}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('LoanRDDetails')}
      >
        <Text style={styles.createButtonText}>Create RD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40, flexGrow: 1 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f7f5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconCircle: { fontSize: 22, marginRight: 12 },
  cardLabel: { fontSize: 12, color: '#666' },
  cardValue: { fontSize: 16, fontWeight: '700', color: '#222', marginTop: 2 },
  cardSubtext: { fontSize: 11, color: '#888', marginTop: 2 },
  editButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 14,
    color: '#222',
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  stepNumberCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 13, color: '#444', lineHeight: 18 },
  createButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 'auto',
  },
  createButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default RecurringDepositScreen;