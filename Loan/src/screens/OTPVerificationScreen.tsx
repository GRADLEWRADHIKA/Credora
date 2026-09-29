import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';
import { haptics } from '../utils/haptics';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;
const DEMO_OTP = '123456'; // placeholder — replace with real verification later

const OTPVerificationScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const code = digits.join('');
  const isComplete = code.length === OTP_LENGTH;

  const handleChange = (text: string, index: number) => {
    const value = text.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
  if (code === DEMO_OTP) {
    haptics.success();
    Keyboard.dismiss();
    navigation.navigate('ApplicationSubmitted', { flowType });
  } else {
    haptics.error();
    setError('Incorrect code. Please try again.');
  }
};

  const handleResend = () => {
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(''));
    setError('');
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.iconBadge, shadow.card]}>
        <Icon name="sms" size={30} color={colors.primary} />
      </View>

      <Text style={styles.title}>Verify Your Mobile Number</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to{'\n'}
        <Text style={styles.phoneText}>+91 XXXXX 43210</Text>
      </Text>

      <View style={styles.otpRow}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              inputs.current[index] = ref;
            }}
            style={[
              styles.otpBox,
              digit && styles.otpBoxFilled,
              error && styles.otpBoxError,
            ]}
            value={digit}
            onChangeText={t => handleChange(t, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.resendRow}>
        {secondsLeft > 0 ? (
          <Text style={styles.resendMuted}>
            Resend code in 00:{String(secondsLeft).padStart(2, '0')}
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>

      <AnimatedButton
        title="Verify & Continue"
        disabled={!isComplete}
        onPress={handleVerify}
        style={{ marginTop: spacing.xl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  phoneText: { fontWeight: '700', color: colors.textPrimary },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpBox: {
    width: 46,
    height: 54,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  otpBoxFilled: { borderColor: colors.primary },
  otpBoxError: { borderColor: colors.danger },
  errorText: { color: colors.danger, fontSize: 12, marginTop: spacing.sm },
  resendRow: { marginTop: spacing.lg },
  resendMuted: { ...typography.caption },
  resendLink: { color: colors.primary, fontWeight: '700', fontSize: 13 },
});

export default OTPVerificationScreen;
