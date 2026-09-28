import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'LoanOffer'>;

const LoanOfferScreen = ({ navigation }: Props) => {
  const loanAmount = 50000;
  const annualInterestRate = 14;
  const tenureMonths = 12;
  const processingFee = 500;

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayable = emi * tenureMonths;

  const detailRows = [
    {
      icon: 'percent',
      label: 'Interest Rate (p.a.)',
      value: `${annualInterestRate}%`,
    },
    { icon: 'event', label: 'Tenure', value: `${tenureMonths} months` },
    { icon: 'receipt', label: 'Processing Fee', value: `₹${processingFee}` },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.approvedBadge}>
        <Icon name="check-circle" size={16} color={colors.primary} />
        <Text style={styles.approvedBadgeText}>Offer Approved</Text>
      </View>

      <View style={[styles.amountCard, shadow.card]}>
        <Text style={styles.amountLabel}>Approved Loan Amount</Text>
        <Text style={styles.amountValue}>₹{loanAmount.toLocaleString()}</Text>
      </View>

      <View style={[styles.detailsCard, shadow.card]}>
        {detailRows.map((row, i) => (
          <View key={i} style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Icon name={row.icon} size={16} color={colors.textSecondary} />
              <Text style={styles.detailLabel}>{row.label}</Text>
            </View>
            <Text style={styles.detailValue}>{row.value}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabelBold}>Monthly EMI</Text>
          <Text style={styles.detailValueEmi}>₹{Math.round(emi)}</Text>
        </View>
        <View style={[styles.detailRow, { marginBottom: 0 }]}>
          <Text style={styles.detailLabelBold}>Total Payable</Text>
          <Text style={styles.detailValueEmi}>₹{Math.round(totalPayable)}</Text>
        </View>
      </View>

      <View style={styles.disclaimerRow}>
        <Icon name="info-outline" size={14} color={colors.textMuted} />
        <Text style={styles.disclaimer}>
          Final EMI and interest rate may vary slightly based on final
          verification and disbursal date.
        </Text>
      </View>

      <View style={{ marginTop: 'auto', paddingTop: spacing.md }}>
        <AnimatedButton
          title="Accept Offer"
          icon="check-circle-outline"
          onPress={() => navigation.navigate('EMISchedule')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40, flexGrow: 1 },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySurface,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: spacing.md,
  },
  approvedBadgeText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 6,
  },
  amountCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  amountLabel: { ...typography.label, marginBottom: 6 },
  amountValue: { fontSize: 30, fontWeight: '800', color: colors.textPrimary },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailLeft: { flexDirection: 'row', alignItems: 'center' },
  detailLabel: { ...typography.body, fontSize: 13, marginLeft: 8 },
  detailLabelBold: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  detailValue: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  detailValueEmi: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  disclaimerRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingRight: spacing.sm,
  },
  disclaimer: { ...typography.caption, marginLeft: 6, flex: 1, lineHeight: 16 },
  acceptButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  acceptButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
});

export default LoanOfferScreen;
