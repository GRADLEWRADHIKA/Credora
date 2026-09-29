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

type Props = NativeStackScreenProps<RootStackParamList, 'RecurringDeposit'>;

const RecurringDepositScreen = ({ navigation, route }: Props) => {
  const loanAmount = route.params?.loanAmount ?? 8000;
  const dailyRDDeposit = Math.round(loanAmount / 160);

  const steps = [
    'A fixed amount will be deposited daily in your RD.',
    'It helps you stay disciplined and repay your loan daily.',
    'Your RD will start after confirmation.',
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.card, shadow.card]}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Icon
              name="account-balance-wallet"
              size={22}
              color={colors.primary}
            />
          </View>
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

      <View style={[styles.card, shadow.card]}>
        <View style={styles.cardLeft}>
          <View style={[styles.iconBadge, { backgroundColor: '#fff3e0' }]}>
            <Icon name="savings" size={22} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardLabel}>Required Daily RD Deposit</Text>
            <Text style={styles.cardValue}>₹{dailyRDDeposit} / day</Text>
            <Text style={styles.cardSubtext}>
              Based on your loan amount of ₹{loanAmount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>How it works?</Text>
      <View style={[styles.stepsCard, shadow.card]}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepRow,
              index === steps.length - 1 && { marginBottom: 0 },
            ]}
          >
            <View style={styles.stepNumberCircle}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 'auto', paddingTop: spacing.md }}>
        <AnimatedButton
          title="Create RD"
          icon="savings"
          onPress={() => navigation.navigate('LoanAgreement', { flowType: 'rd' })}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40, flexGrow: 1 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  cardLabel: { ...typography.label, marginBottom: 2 },
  cardValue: { ...typography.h3, fontSize: 17 },
  cardSubtext: { ...typography.caption, marginTop: 2 },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editButtonText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  sectionTitle: {
    ...typography.h3,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  stepsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, ...typography.body, lineHeight: 19 },
});

export default RecurringDepositScreen;