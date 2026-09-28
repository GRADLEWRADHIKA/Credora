import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseLoanType'>;

const ChooseLoanTypeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>WELCOME</Text>
      <Text style={styles.heading}>Choose Your Loan Type</Text>
      <Text style={styles.subheading}>
        Pick how you'd like to borrow and repay
      </Text>

      <TouchableOpacity
        style={[styles.card, shadow.card]}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('LoanApplication', { flowType: 'rd' })
        }
      >
        <View style={[styles.iconBadge, { backgroundColor: colors.primarySurface }]}>
          <Icon name="savings" size={26} color={colors.primary} />
        </View>
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>RD-Based Loan</Text>
          <Text style={styles.cardDesc}>
            Repay daily through a Recurring Deposit. Builds saving discipline
            alongside your loan.
          </Text>
        </View>
        <Icon name="chevron-right" size={22} color={colors.textMuted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, shadow.card]}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('LoanApplication', { flowType: 'standard' })
        }
      >
        <View style={[styles.iconBadge, { backgroundColor: '#fff3e0' }]}>
          <Icon name="account-balance" size={26} color={colors.accent} />
        </View>
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>Standard EMI Loan</Text>
          <Text style={styles.cardDesc}>
            Classic monthly EMI repayment. Simple, fixed schedule.
          </Text>
        </View>
        <Icon name="chevron-right" size={22} color={colors.textMuted} />
      </TouchableOpacity>

      <View style={styles.footerNote}>
        <Icon name="info-outline" size={16} color={colors.textMuted} />
        <Text style={styles.footerNoteText}>
          You can compare both options before applying
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: 56,
  },
  eyebrow: {
    ...typography.label,
    color: colors.primary,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  heading: { ...typography.h1, marginBottom: spacing.xs },
  subheading: { ...typography.body, marginBottom: spacing.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardTextWrap: { flex: 1 },
  cardTitle: { ...typography.h3, marginBottom: 4 },
  cardDesc: { ...typography.body, fontSize: 12.5, lineHeight: 18 },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerNoteText: {
    ...typography.caption,
    marginLeft: 6,
  },
});

export default ChooseLoanTypeScreen;