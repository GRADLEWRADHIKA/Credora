import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';
import AnimatedButton from '../components/AnimatedButton';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const rootNavigation = useNavigation<RootNav>();

  // Placeholder data — replace with real user data once auth is wired
  const [fullName, setFullName] = useState('Rohit Sharma');
  const [email, setEmail] = useState('rohit.sharma@example.com');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    Alert.alert('Profile Updated', 'Your changes have been saved.');
    // Placeholder — no backend call yet
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          rootNavigation.getParent<RootNav>()?.reset({
            index: 0,
            routes: [{ name: 'Landing' }],
          }) ??
            rootNavigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, shadow.card]}>
          <Text style={styles.avatarInitial}>
            {fullName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.mobile}>+91 {mobileNumber}</Text>
      </View>

      <View style={[styles.card, shadow.card]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Details</Text>
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Text style={styles.editLink}>{editing ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, !editing && styles.inputDisabled]}
          value={fullName}
          onChangeText={setFullName}
          editable={editing}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, !editing && styles.inputDisabled]}
          value={email}
          onChangeText={setEmail}
          editable={editing}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={mobileNumber}
          editable={false}
        />
        <Text style={styles.helperText}>
          Mobile number cannot be changed here.
        </Text>

        {editing && (
          <AnimatedButton
            title="Save Changes"
            icon="check"
            onPress={handleSave}
            style={{ marginTop: spacing.md }}
          />
        )}
      </View>

      <View style={[styles.card, shadow.card]}>
        <Text style={styles.cardTitle}>Linked Bank Account</Text>
        <View style={styles.bankRow}>
          <Icon name="account-balance" size={20} color={colors.primary} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bankName}>State Bank of India</Text>
            <Text style={styles.bankAccount}>Account ending in 1234</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuRow}>
          <Icon name="help-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.menuLabel}>Help & Support</Text>
          <Icon name="chevron-right" size={20} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRow}>
          <Icon name="description" size={20} color={colors.textSecondary} />
          <Text style={styles.menuLabel}>Terms & Privacy Policy</Text>
          <Icon name="chevron-right" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <Icon name="logout" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: spacing.lg },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarInitial: { fontSize: 28, fontWeight: '800', color: colors.primaryDark },
  name: { ...typography.h3, fontSize: 17 },
  mobile: { ...typography.caption, marginTop: 2 },
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
    marginBottom: spacing.xs,
  },
  cardTitle: { ...typography.h3, fontSize: 15 },
  editLink: { color: colors.primary, fontWeight: '700', fontSize: 12.5 },
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
  inputDisabled: {
    backgroundColor: colors.surface,
    color: colors.textSecondary,
  },
  helperText: { ...typography.caption, marginTop: 4 },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  bankName: { fontSize: 13.5, fontWeight: '700', color: colors.textPrimary },
  bankAccount: { ...typography.caption, marginTop: 2 },
  menuList: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textPrimary,
    marginLeft: 10,
    fontWeight: '500',
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default ProfileScreen;
