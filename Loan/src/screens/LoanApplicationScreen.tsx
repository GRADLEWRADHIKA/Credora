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
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'LoanApplication'>;

const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) => (
  <View style={[styles.sectionCard, shadow.card]}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconBadge}>
        <Icon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const LoanApplicationScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;

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
      <SectionCard icon="person" title="Personal Details">
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor={colors.textMuted}
          value={fullName}
          onChangeText={setFullName}
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>DOB</Text>
            <TextInput
              style={styles.input}
              placeholder="Select date"
              placeholderTextColor={colors.textMuted}
              value={dob}
              onChangeText={setDob}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Gender"
              placeholderTextColor={colors.textMuted}
              value={gender}
              onChangeText={setGender}
            />
          </View>
        </View>

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <Text style={styles.label}>Marital Status</Text>
        <TextInput
          style={styles.input}
          placeholder="Marital Status"
          placeholderTextColor={colors.textMuted}
          value={maritalStatus}
          onChangeText={setMaritalStatus}
        />
      </SectionCard>

      <SectionCard icon="home" title="Address Details">
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>House Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number"
              placeholderTextColor={colors.textMuted}
              value={houseNumber}
              onChangeText={setHouseNumber}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter area"
              placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="Select state"
              placeholderTextColor={colors.textMuted}
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
              placeholder="6 digit pin code"
              placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
              value={residenceType}
              onChangeText={setResidenceType}
            />
          </View>
        </View>
      </SectionCard>

      <SectionCard icon="account-balance-wallet" title="Loan Details">
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ 10,000"
          placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
              value={loanPurpose}
              onChangeText={setLoanPurpose}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Monthly Income</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter income"
              placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
              value={repaymentDuration}
              onChangeText={setRepaymentDuration}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Loan Year</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Year"
              placeholderTextColor={colors.textMuted}
              value={loanYear}
              onChangeText={setLoanYear}
            />
          </View>
        </View>
      </SectionCard>

      <SectionCard icon="work" title="Employment">
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Employment Type</Text>
            <TextInput
              style={styles.input}
              placeholder="Select type"
              placeholderTextColor={colors.textMuted}
              value={employmentType}
              onChangeText={setEmploymentType}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Company/Business</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
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
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={monthlyExpenses}
              onChangeText={setMonthlyExpenses}
            />
          </View>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Existing Loan / EMI</Text>
          <Switch
            value={hasExistingLoan}
            onValueChange={setHasExistingLoan}
            trackColor={{ false: '#ddd', true: colors.primaryLight }}
            thumbColor={colors.white}
          />
        </View>
      </SectionCard>

      <SectionCard icon="verified-user" title="KYC & ID Verification">
        <Text style={styles.label}>Aadhaar Number</Text>
        <View style={styles.verifyRow}>
          <TextInput
            style={[styles.input, styles.verifyInput]}
            placeholder="XXXX-XXXX-XXXX"
            placeholderTextColor={colors.textMuted}
            keyboardType="number-pad"
            value={aadhaarNumber}
            onChangeText={setAadhaarNumber}
          />
          <TouchableOpacity style={styles.verifyButton}>
            <Icon
              name="check-circle-outline"
              size={15}
              color={colors.primary}
            />
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>PAN Number</Text>
        <View style={styles.verifyRow}>
          <TextInput
            style={[styles.input, styles.verifyInput]}
            placeholder="ABCDE1234F"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="characters"
            value={panNumber}
            onChangeText={setPanNumber}
          />
          <TouchableOpacity style={styles.verifyButton}>
            <Icon
              name="check-circle-outline"
              size={15}
              color={colors.primary}
            />
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </SectionCard>

      <AnimatedButton
        title="Continue"
        onPress={() => navigation.navigate('UploadDocuments', { flowType })}
        style={{ marginTop: spacing.sm }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIconBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: { ...typography.h3 },
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
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfField: { width: '48%' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  verifyRow: { flexDirection: 'row', alignItems: 'center' },
  verifyInput: { flex: 1, marginRight: 8 },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySurface,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: radius.sm,
  },
  verifyButtonText: {
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 12,
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  continueButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
});

export default LoanApplicationScreen;
