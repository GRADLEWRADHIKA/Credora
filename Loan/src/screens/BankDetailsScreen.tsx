import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'BankDetails'>;

const BankDetailsScreen = ({ navigation, route }: Props) => {
  const { flowType } = route.params;

  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');

  const isValid =
    accountHolder.trim().length > 0 &&
    accountNumber.length >= 9 &&
    accountNumber === confirmAccountNumber &&
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.infoBanner}>
        <Icon name="info-outline" size={16} color={colors.primaryDark} />
        <Text style={styles.infoBannerText}>
          Your loan amount will be disbursed to this account.
        </Text>
      </View>

      <View style={[styles.card, shadow.card]}>
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="As per bank records"
          placeholderTextColor={colors.textMuted}
          value={accountHolder}
          onChangeText={setAccountHolder}
        />

        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          placeholderTextColor={colors.textMuted}
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={t => setAccountNumber(t.replace(/\D/g, ''))}
          maxLength={18}
        />

        <Text style={styles.label}>Confirm Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter account number"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          value={confirmAccountNumber}
          onChangeText={t => setConfirmAccountNumber(t.replace(/\D/g, ''))}
          maxLength={18}
        />
        {confirmAccountNumber.length > 0 &&
          accountNumber !== confirmAccountNumber && (
            <Text style={styles.errorText}>Account numbers do not match</Text>
          )}

        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. SBIN0001234"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="characters"
          value={ifsc}
          onChangeText={t => setIfsc(t.toUpperCase())}
          maxLength={11}
        />
      </View>

      <AnimatedButton
        title="Continue"
        disabled={!isValid}
        onPress={() => navigation.navigate('ReviewApplication', { flowType })}
        style={{ marginTop: spacing.lg }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySurface,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  infoBannerText: {
    ...typography.caption,
    color: colors.primaryDark,
    marginLeft: 8,
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
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
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4 },
});

export default BankDetailsScreen;
