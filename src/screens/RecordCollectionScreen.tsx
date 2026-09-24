import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

interface RouteParams {
  enrollmentId: string;
  memberNo: string;
}

export default function RecordCollectionScreen({ route, navigation }: any) {
  const params: RouteParams = route?.params ?? {
    enrollmentId: 'mock-enroll-001',
    memberNo: 'MBR-000001',
  };

  const [amount, setAmount] = useState('50');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{
    receiptNo: string;
    amount: string;
    date: string;
  } | null>(null);

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) { return; }
    setSubmitting(true);
    // Production: POST /api/v1/collections with idempotency key
    await new Promise(r => setTimeout(r, 1500));
    const receiptNo =
      'CRED-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitting(false);
    setReceipt({
      receiptNo,
      amount,
      date: new Date().toLocaleDateString('en-IN'),
    });
  };

  // ─── Receipt Screen ───────────────────────────────────────────────────────
  if (receipt) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.receiptWrap}>
          <Text style={styles.receiptHeroIcon}>🧾</Text>
          <Text style={styles.receiptTitle}>Collection Recorded!</Text>

          <View style={styles.receiptCard}>
            {[
              { label: 'MEMBER', value: params.memberNo },
              { label: 'AMOUNT', value: `₹${receipt.amount}`, large: true },
              { label: 'RECEIPT NO.', value: receipt.receiptNo, mono: true },
              { label: 'DATE', value: receipt.date },
              { label: 'STATUS', value: '✅ SETTLED', success: true },
            ].map(row => (
              <View key={row.label} style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>{row.label}</Text>
                <Text
                  style={[
                    styles.receiptValue,
                    row.large ? styles.receiptValueLarge : null,
                    row.mono ? styles.receiptValueMono : null,
                    row.success ? { color: Colors.success } : null,
                  ]}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.85}>
            <Text style={styles.doneBtnText}>DONE — NEXT MEMBER</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Collection Form ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack?.()}
          style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Collection</Text>
      </View>

      <View style={styles.content}>
        {/* Member Info Card */}
        <View style={styles.memberCard}>
          <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: Spacing.sm }}>
            👤
          </Text>
          <Text style={styles.memberNo}>{params.memberNo}</Text>
          <Text style={styles.memberMeta}>Daily Dairy ₹50 — Day 42/100</Text>
        </View>

        {/* Amount Input */}
        <Text style={styles.fieldLabel}>COLLECTION AMOUNT (₹)</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={Colors.textMuted}
          selectTextOnFocus
        />

        {/* Notes */}
        <Text style={styles.fieldLabel}>NOTES (OPTIONAL)</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any collection notes..."
          placeholderTextColor={Colors.textMuted}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        {/* Idempotency Info */}
        <View style={styles.idempotencyBox}>
          <Text style={styles.idempotencyText}>
            🔒 Idempotency key auto-generated — duplicate submissions are safely
            deduplicated.
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.85}>
          {submitting ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.submitBtnText}>RECORD COLLECTION</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.deepViolet,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  backBtn: { padding: 4 },
  backBtnText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  content: { flex: 1, padding: Spacing.md },
  memberCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },
  memberNo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.deepViolet,
    textAlign: 'center',
  },
  memberMeta: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  fieldLabel: { ...Typography.label, marginBottom: Spacing.xs, marginTop: Spacing.md },
  amountInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    minHeight: 80,
  },
  idempotencyBox: {
    backgroundColor: Colors.infoBg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  idempotencyText: { fontSize: 12, color: Colors.info, lineHeight: 18 },
  submitBtn: {
    backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: Colors.lavenderLight },
  submitBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 1 },

  // Receipt
  receiptWrap: { flex: 1, padding: Spacing.xl, justifyContent: 'center' },
  receiptHeroIcon: { fontSize: 72, textAlign: 'center', marginBottom: Spacing.md },
  receiptTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  receiptCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadow.hero,
    marginBottom: Spacing.xl,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  receiptLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },
  receiptValue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  receiptValueLarge: { fontSize: 22, color: Colors.deepViolet },
  receiptValueMono: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.textMuted,
  },
  doneBtn: {
    backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 1 },
});
