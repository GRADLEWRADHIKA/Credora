import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ReviewApplication'>;

interface ReviewRow {
  label: string;
  value: string;
}

interface ReviewSection {
  icon: string;
  title: string;
  editTo: keyof RootStackParamList;
  rows: ReviewRow[];
}

const ReviewApplicationScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;
  const [agreed, setAgreed] = useState(false);

  // Placeholder data — replace with real form/route values in the data-wiring pass
  const sections: ReviewSection[] = [
    {
      icon: 'person',
      title: 'Personal Details',
      editTo: 'LoanApplication',
      rows: [
        { label: 'Full Name', value: 'Rohit Sharma' },
        { label: 'Mobile Number', value: '98765 43210' },
        { label: 'DOB', value: '14 Jan 1994' },
      ],
    },
    {
      icon: 'home',
      title: 'Address',
      editTo: 'LoanApplication',
      rows: [
        { label: 'City / State', value: 'Indore, Madhya Pradesh' },
        { label: 'PIN Code', value: '452001' },
      ],
    },
    {
      icon: 'account-balance-wallet',
      title: 'Loan Details',
      editTo: 'LoanApplication',
      rows: [
        { label: 'Loan Amount', value: '₹50,000' },
        { label: 'Purpose', value: 'Business Expansion' },
        { label: 'Type', value: flowType === 'rd' ? 'RD-Based Loan' : 'Standard EMI Loan' },
      ],
    },
    {
      icon: 'verified-user',
      title: 'KYC',
      editTo: 'LoanApplication',
      rows: [
        { label: 'Aadhaar', value: 'XXXX-XXXX-9021' },
        { label: 'PAN', value: 'ABCDE1234F' },
      ],
    },
    {
      icon: 'description',
      title: 'Documents',
      editTo: 'UploadDocuments',
      rows: [{ label: 'Uploaded', value: '5 of 5 documents' }],
    },
    {
      icon: 'account-balance',
      title: 'Bank Details',
      editTo: 'BankDetails',
      rows: [
        { label: 'Bank', value: 'State Bank of India' },
        { label: 'Account No.', value: 'XXXXXX1234' },
        { label: 'IFSC', value: 'SBIN0001234' },
      ],
    },
  ];

  const handleSubmit = () => navigation.navigate('OTPVerification', { flowType });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {sections.map((section, i) => (
        <View key={i} style={[styles.card, shadow.card]}>
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.iconBadge}>
                <Icon name={section.icon} size={16} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(section.editTo, { flowType } as never)}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          {section.rows.map((row, j) => (
            <View key={j} style={styles.row}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.consentRow}
        onPress={() => setAgreed(!agreed)}
        activeOpacity={0.8}
      >
        <Icon
          name={agreed ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color={agreed ? colors.primary : colors.textMuted}
        />
        <Text style={styles.consentText}>
          I confirm the above details are accurate to the best of my knowledge.
        </Text>
      </TouchableOpacity>

      <AnimatedButton
        title="Confirm & Submit"
        icon="check-circle-outline"
        disabled={!agreed}
        onPress={handleSubmit}
        style={{ marginTop: spacing.sm }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cardTitle: { ...typography.h3, fontSize: 15 },
  editLink: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rowLabel: { ...typography.caption, flex: 1 },
  rowValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, flex: 1, textAlign: 'right' },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  consentText: { ...typography.body, fontSize: 12.5, marginLeft: 8, flex: 1, lineHeight: 18 },
});

export default ReviewApplicationScreen;