import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'LoanAgreement'>;

const CLAUSES = [
  {
    title: '1. Loan Amount & Disbursal',
    body:
      'The approved loan amount will be disbursed to your registered bank account within 24–48 hours of agreement acceptance, subject to final verification.',
  },
  {
    title: '2. Repayment Obligation',
    body:
      'You agree to repay the loan as per the schedule shown in your loan summary, whether through daily RD deposits or monthly EMIs, on or before each due date.',
  },
  {
    title: '3. Late Payment',
    body:
      'A missed or delayed payment may attract a late fee and may affect your ability to apply for future loans through this app.',
  },
  {
    title: '4. Interest & Charges',
    body:
      'Interest is calculated on the reducing balance method. Processing fees, if any, are non-refundable once the loan is disbursed.',
  },
  {
    title: '5. Foreclosure',
    body:
      'You may repay your outstanding balance in full at any time. Foreclosure charges, if applicable, will be shown before you confirm early repayment.',
  },
  {
    title: '6. Data Usage',
    body:
      'Information and documents submitted are used solely for verification, underwriting, and servicing this loan, in line with our privacy policy.',
  },
];

const LoanAgreementScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;
  const [agreed, setAgreed] = useState(false);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const handleScroll = (e: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const reachedEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 24;
    if (reachedEnd && !scrolledToEnd) setScrolledToEnd(true);
  };

  const handleContinue = () => {
    navigation.navigate(flowType === 'rd' ? 'LoanRDDetails' : 'EMISchedule');
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        <View style={[styles.headerBadge, shadow.card]}>
          <Icon name="description" size={26} color={colors.primary} />
        </View>
        <Text style={styles.title}>Loan Agreement</Text>
        <Text style={styles.subtitle}>
          Please read the terms below before proceeding.
        </Text>

        <View style={[styles.card, shadow.card]}>
          {CLAUSES.map((clause, i) => (
            <View key={i} style={i > 0 ? styles.clauseSpacing : undefined}>
              <Text style={styles.clauseTitle}>{clause.title}</Text>
              <Text style={styles.clauseBody}>{clause.body}</Text>
            </View>
          ))}
        </View>

        {!scrolledToEnd && (
          <Text style={styles.scrollHint}>Scroll to the end to continue</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.consentRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.8}
          disabled={!scrolledToEnd}
        >
          <Icon
            name={agreed ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color={!scrolledToEnd ? colors.border : agreed ? colors.primary : colors.textMuted}
          />
          <Text style={[styles.consentText, !scrolledToEnd && { color: colors.textMuted }]}>
            I have read and agree to the loan agreement terms.
          </Text>
        </TouchableOpacity>

        <AnimatedButton
          title="Accept & Continue"
          icon="check-circle-outline"
          disabled={!agreed}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.lg, alignItems: 'center' },
  headerBadge: {
    width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm,
  },
  title: { ...typography.h1, fontSize: 20, marginBottom: 4 },
  subtitle: { ...typography.body, textAlign: 'center', marginBottom: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, width: '100%' },
  clauseSpacing: { marginTop: spacing.md },
  clauseTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  clauseBody: { ...typography.body, fontSize: 12.5, lineHeight: 19, color: colors.textSecondary },
  scrollHint: { ...typography.caption, marginTop: spacing.sm, fontStyle: 'italic' },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  consentText: { ...typography.body, fontSize: 12.5, marginLeft: 8, flex: 1, lineHeight: 18 },
});

export default LoanAgreementScreen;