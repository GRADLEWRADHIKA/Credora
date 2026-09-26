import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'LoanApplication'>;

const LoanApplicationScreen = ({ navigation }: Props) => {
  // Personal Details
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  // Address Details
  const [houseNumber, setHouseNumber] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [residenceType, setResidenceType] = useState('');

  // Loan Details
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [monthlyIncomeLoan, setMonthlyIncomeLoan] = useState('');
  const [repaymentDuration, setRepaymentDuration] = useState('');
  const [loanYear, setLoanYear] = useState('');

  // Employment
  const [employmentType, setEmploymentType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [hasExistingLoan, setHasExistingLoan] = useState(false);

  // KYC
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>DOB</Text>
          <TextInput
            style={styles.input}
            placeholder="Select date"
            value={dob}
            onChangeText={setDob}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>
      </View>

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      <Text style={styles.label}>Marital Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Marital Status"
        value={maritalStatus}
        onChangeText={setMaritalStatus}
      />

      {/* Address Details */}
      <Text style={styles.sectionTitle}>Address Details</Text>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>House Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number"
            value={houseNumber}
            onChangeText={setHouseNumber}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Area</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter area"
            value={area}
            onChangeText={setArea}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Select state"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>PIN Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6 digit pin code"
            keyboardType="number-pad"
            value={pinCode}
            onChangeText={setPinCode}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Residence Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Select type"
            value={residenceType}
            onChangeText={setResidenceType}
          />
        </View>
      </View>

      {/* Loan Details */}
      <Text style={styles.sectionTitle}>Loan Details</Text>

      <Text style={styles.label}>Loan Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ 10,000"
        keyboardType="number-pad"
        value={loanAmount}
        onChangeText={setLoanAmount}
      />

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Loan Purpose</Text>
          <TextInput
            style={styles.input}
            placeholder="Select purpose"
            value={loanPurpose}
            onChangeText={setLoanPurpose}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Monthly Income</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter income"
            keyboardType="number-pad"
            value={monthlyIncomeLoan}
            onChangeText={setMonthlyIncomeLoan}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Repayment Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="Select duration"
            value={repaymentDuration}
            onChangeText={setRepaymentDuration}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Loan Year</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Year"
            value={loanYear}
            onChangeText={setLoanYear}
          />
        </View>
      </View>

      {/* Employment */}
      <Text style={styles.sectionTitle}>Employment</Text>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Employment Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Select type"
            value={employmentType}
            onChangeText={setEmploymentType}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Company/Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Monthly Income</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter income"
            keyboardType="number-pad"
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Monthly Expenses</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter expenses"
            keyboardType="number-pad"
            value={monthlyExpenses}
            onChangeText={setMonthlyExpenses}
          />
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Existing Loan/EMI</Text>
        <Switch value={hasExistingLoan} onValueChange={setHasExistingLoan} />
      </View>

      {/* KYC & ID Verification */}
      <Text style={styles.sectionTitle}>KYC & ID Verification</Text>

      <Text style={styles.label}>Aadhaar Number</Text>
      <View style={styles.verifyRow}>
        <TextInput
          style={[styles.input, styles.verifyInput]}
          placeholder="XXXX-XXXX-XXXX"
          keyboardType="number-pad"
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
        />
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>PAN Number</Text>
      <View style={styles.verifyRow}>
        <TextInput
          style={[styles.input, styles.verifyInput]}
          placeholder="ABCDE1234F"
          autoCapitalize="characters"
          value={panNumber}
          onChangeText={setPanNumber}
        />
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('RecurringDeposit')}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  label: { fontSize: 12, color: '#555', marginBottom: 4, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfField: { width: '48%' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  verifyRow: { flexDirection: 'row', alignItems: 'center' },
  verifyInput: { flex: 1, marginRight: 8 },
  verifyButton: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  verifyButtonText: { color: '#2e7d32', fontWeight: '600' },
  continueButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default LoanApplicationScreen;