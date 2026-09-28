import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

 const handleLogin = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    navigation.navigate('ChooseLoanType');
  }, 800);
};

  return (
    <View style={styles.screen}>
      <Animated.View style={animatedStyle}>
        <View style={[styles.logoBadge, shadow.card]}>
          <Icon
            name="account-balance-wallet"
            size={30}
            color={colors.primary}
          />
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

        <Text style={styles.label}>Email or Mobile Number</Text>
        <View style={styles.inputWrap}>
          <Icon
            name="person-outline"
            size={18}
            color={colors.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email or mobile number"
            placeholderTextColor={colors.textMuted}
            value={emailOrMobile}
            onChangeText={setEmailOrMobile}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <Icon
            name="lock-outline"
            size={18}
            color={colors.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <AnimatedButton
          title="Log In"
          onPress={handleLogin}
          style={{ marginTop: spacing.xl }}
        />

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.linkText}>
            Don't have an account?{' '}
            <Text style={styles.linkTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: 60,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...typography.h1, marginBottom: 4 },
  subtitle: { ...typography.body, marginBottom: spacing.xl },
  label: { ...typography.label, marginBottom: 6, marginTop: spacing.md },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: colors.textPrimary,
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  linkRow: { marginTop: spacing.lg, alignItems: 'center' },
  linkText: { fontSize: 13, color: colors.textSecondary },
  linkTextBold: { color: colors.primary, fontWeight: '700' },
});

export default LoginScreen;
