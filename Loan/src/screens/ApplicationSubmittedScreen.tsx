import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Share,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';
import { haptics } from '../utils/haptics';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationSubmitted'>;

const generateReferenceId = () => {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `LN-${new Date().getFullYear()}-${rand}`;
};

const ApplicationSubmittedScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;
  const referenceId = useMemo(generateReferenceId, []);

  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 10,
        bounciness: 12,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, fade]);

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: flowType === 'rd' ? 'RecurringDeposit' : 'LoanOffer' }],
    });
  };

  const handleShare = () => {
    Share.share({
      message: `My loan application reference ID is ${referenceId}.`,
    });
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.checkBadge, shadow.card, { transform: [{ scale }] }]}
      >
        <Icon name="check-circle" size={56} color={colors.primary} />
      </Animated.View>

      <Animated.View
        style={{ opacity: fade, alignItems: 'center', width: '100%' }}
      >
        <Text style={styles.title}>Application Submitted!</Text>
        <Text style={styles.subtitle}>
          We've received your application and it's now under review.
        </Text>

        <View style={[styles.refCard, shadow.card]}>
          <Text style={styles.refLabel}>Reference ID</Text>
          <View style={styles.refRow}>
            <Text style={styles.refValue}>{referenceId}</Text>
            <TouchableOpacity onPress={handleShare} hitSlop={10}>
              <Icon name="share" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <View style={styles.timelineRow}>
            <Icon name="check-circle" size={16} color={colors.primary} />
            <Text style={styles.timelineText}>Application received</Text>
          </View>
          <View style={styles.timelineRow}>
            <Icon name="schedule" size={16} color={colors.accent} />
            <Text style={styles.timelineText}>
              Verification in progress (usually 24–48 hrs)
            </Text>
          </View>
          <View style={styles.timelineRow}>
            <Icon
              name="radio-button-unchecked"
              size={16}
              color={colors.textMuted}
            />
            <Text style={[styles.timelineText, { color: colors.textMuted }]}>
              Disbursal to your bank account
            </Text>
          </View>
        </View>

        <AnimatedButton
          title={flowType === 'rd' ? 'Set Up Your RD' : 'View Loan Offer'}
          onPress={handleContinue}
          style={{ marginTop: spacing.xl, width: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: 80,
    alignItems: 'center',
  },
  checkBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
  },
  refCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.md,
  },
  refLabel: { ...typography.label, marginBottom: 4 },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  timelineCard: { width: '100%', paddingHorizontal: spacing.xs },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timelineText: { ...typography.body, fontSize: 13, marginLeft: 10 },
});

export default ApplicationSubmittedScreen;
