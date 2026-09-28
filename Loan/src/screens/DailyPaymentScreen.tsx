import React, { useState } from 'react';
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
import SuccessOverlay from '../components/SuccessOverlay';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyPayment'>;

interface UpcomingPayment {
  label: string;
  amount: number;
  isToday?: boolean;
}

const DailyPaymentScreen = ({ navigation }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const todayAmount = 50;
  const totalDeposited = 250;

  const upcomingPayments: UpcomingPayment[] = [
    { label: 'Today', amount: 50, isToday: true },
    { label: '22 Sep', amount: 50 },
    { label: '23 Sep', amount: 50 },
    { label: '24 Sep', amount: 50 },
    { label: '25 Sep', amount: 50 },
  ];

  const handlePayNow = () => {
    if(!isPending) return;
    setIsPending(false);
    setShowSuccess(true);
  };

  return (
    <View style={styles.screen}>
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.paymentCard, shadow.card]}>
        <View style={styles.paymentCardHeader}>
          <View>
            <Text style={styles.paymentCardTitle}>Today's RD Payment</Text>
            <Text style={styles.paymentAmount}>₹{todayAmount}</Text>
            <View style={styles.statusPill}>
              <Icon
                name={isPending ? 'schedule' : 'check-circle'}
                size={13}
                color={isPending ? colors.danger : colors.primary}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: isPending ? colors.danger : colors.primary },
                ]}
              >
                {isPending ? 'Pending' : 'Paid'}
              </Text>
            </View>
          </View>
          <View style={styles.clockBadge}>
            <Icon name="access-time" size={26} color={colors.primary} />
          </View>
        </View>

        <View style={styles.deadlineRow}>
          <Icon name="timer" size={14} color={colors.textSecondary} />
          <Text style={styles.deadlineText}>Pay before 8:00 PM</Text>
        </View>

        <AnimatedButton title="Pay Now" onPress={handlePayNow} />
      </View>

      <Text style={styles.sectionTitle}>Upcoming Payments</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {upcomingPayments.map((payment, index) => (
          <View
            key={index}
            style={[
              styles.upcomingChip,
              shadow.card,
              payment.isToday && styles.upcomingChipToday,
            ]}
          >
            <Text
              style={[
                styles.upcomingLabel,
                payment.isToday && { color: colors.primaryDark },
              ]}
            >
              {payment.label}
            </Text>
            <Text style={styles.upcomingAmount}>₹{payment.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.totalCard, shadow.card]}>
        <View style={styles.totalIconBadge}>
          <Icon name="bar-chart" size={22} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.totalLabel}>Total Deposited</Text>
          <Text style={styles.totalValue}>₹{totalDeposited}</Text>
        </View>
      </View>
      </ScrollView>
      <SuccessOverlay
        visible={showSuccess}
        message="Payment Successful!"
        onDone={() => {
          setShowSuccess(false);
          navigation.navigate('RDDepositHistory');
        }}
      />
     </View>  
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  paymentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  paymentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentCardTitle: { ...typography.label, marginBottom: 4 },
  paymentAmount: { fontSize: 28, fontWeight: '800', color: colors.textPrimary },
  statusPill: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  statusText: { fontSize: 12, fontWeight: '700', marginLeft: 4 },
  clockBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  deadlineText: { ...typography.body, fontSize: 12, marginLeft: 6 },
  payNowButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  sectionTitle: {
    ...typography.h3,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  upcomingChip: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    alignItems: 'center',
  },
  upcomingChipToday: { backgroundColor: colors.primarySurface },
  upcomingLabel: { ...typography.caption, marginBottom: 4 },
  upcomingAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  totalIconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  totalLabel: { ...typography.label },
  totalValue: { ...typography.h3, fontSize: 17, marginTop: 2 },
});

export default DailyPaymentScreen;
