import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

// ─── Types ───────────────────────────────────────────────────────────────────
type DocKey = 'identity' | 'address' | 'pan' | 'selfie';
type DocFile = { uri: string; name: string } | null;
type DocState = Record<DocKey, DocFile>;
type ConsentState = {
  kycReview: boolean;
  bureauCheck: boolean;
  bankVerification: boolean;
};

// ─── Config ──────────────────────────────────────────────────────────────────
const DOC_CONFIGS: {
  key: DocKey;
  label: string;
  subtitle: string;
  icon: string;
}[] = [
  {
    key: 'identity',
    label: 'Identity Document',
    subtitle: 'Aadhaar Card / Voter ID / Passport',
    icon: '🪪',
  },
  {
    key: 'address',
    label: 'Address Proof',
    subtitle: 'Utility Bill / Bank Statement / Lease',
    icon: '🏠',
  },
  {
    key: 'pan',
    label: 'PAN Card',
    subtitle: 'Permanent Account Number card',
    icon: '💳',
  },
  {
    key: 'selfie',
    label: 'Live Selfie',
    subtitle: 'Clear face photo in good lighting',
    icon: '🤳',
  },
];

const CONSENT_ITEMS: {
  key: keyof ConsentState;
  text: string;
}[] = [
  {
    key: 'kycReview',
    text: 'I consent to my documents being reviewed for KYC verification.',
  },
  {
    key: 'bureauCheck',
    text: 'I consent to credit bureau enquiry to assess my creditworthiness.',
  },
  {
    key: 'bankVerification',
    text: 'I consent to bank account verification as part of onboarding.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function KYCUploadScreen() {
  const [docs, setDocs] = useState<DocState>({
    identity: null,
    address: null,
    pan: null,
    selfie: null,
  });
  const [consent, setConsent] = useState<ConsentState>({
    kycReview: false,
    bureauCheck: false,
    bankVerification: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allConsentsGiven =
    consent.kycReview && consent.bureauCheck && consent.bankVerification;
  const allDocsUploaded = Object.values(docs).every(Boolean);
  const canSubmit = allConsentsGiven && allDocsUploaded;

  const pickDocument = (key: DocKey) => {
    // In production: use react-native-document-picker or react-native-image-picker
    Alert.alert('Select Document', `Choose source for ${key}`, [
      { text: 'Camera', onPress: () => simulatePick(key, 'camera') },
      { text: 'Gallery / Files', onPress: () => simulatePick(key, 'gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const simulatePick = (key: DocKey, source: string) => {
    setDocs(prev => ({
      ...prev,
      [key]: { uri: `file://${key}_${source}`, name: `${key}_document.jpg` },
    }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) { return; }
    setIsSubmitting(true);
    // Production: POST multipart/form-data to POST /api/v1/kyc/members/:id/kyc/submit
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // ─── Success State ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successWrap}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>KYC Submitted!</Text>
          <Text style={styles.successBody}>
            Your documents are under review. We'll notify you within 24–48 hours.
          </Text>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>VERIFICATION STATUS</Text>
            <View style={[styles.badge, { backgroundColor: Colors.warningBg }]}>
              <Text style={[styles.badgeText, { color: Colors.warning }]}>
                ⏳  PENDING REVIEW
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setSubmitted(false);
              setDocs({ identity: null, address: null, pan: null, selfie: null });
              setConsent({ kycReview: false, bureauCheck: false, bankVerification: false });
            }}>
            <Text style={styles.retryBtnText}>Upload More / Replace Documents</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Main Screen ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <Text style={styles.headerSub}>
          Complete identity verification to unlock all features
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Privacy Notice */}
        <View style={styles.privacyBox}>
          <Text style={styles.privacyIcon}>🔐</Text>
          <Text style={styles.privacyText}>
            Documents are encrypted, SHA-256 hashed, and stored securely. We
            collect only what's necessary — no contacts, no SMS.
          </Text>
        </View>

        {/* Required Documents */}
        <Text style={styles.sectionTitle}>Required Documents</Text>
        {DOC_CONFIGS.map(cfg => {
          const doc = docs[cfg.key];
          return (
            <TouchableOpacity
              key={cfg.key}
              style={[styles.docCard, doc && styles.docCardDone]}
              onPress={() => pickDocument(cfg.key)}
              activeOpacity={0.8}>
              <View style={styles.docIconWrap}>
                <Text style={{ fontSize: 26 }}>{cfg.icon}</Text>
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docLabel}>{cfg.label}</Text>
                <Text style={styles.docSub}>
                  {doc ? `✅ ${doc.name}` : cfg.subtitle}
                </Text>
              </View>
              <View style={[styles.uploadPill, doc && styles.uploadPillDone]}>
                <Text
                  style={[
                    styles.uploadPillText,
                    doc && styles.uploadPillTextDone,
                  ]}>
                  {doc ? 'DONE' : 'UPLOAD'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Selfie Preview */}
        {docs.selfie && (
          <View style={styles.selfiePreview}>
            <View style={styles.selfieFrame}>
              <Text style={{ fontSize: 56 }}>🤳</Text>
              <Text style={styles.selfieCaption}>Selfie captured</Text>
            </View>
          </View>
        )}

        {/* Consent Switches */}
        <Text style={styles.sectionTitle}>Your Explicit Consent</Text>
        <View style={styles.consentCard}>
          <Text style={styles.consentVersion}>
            Notice v1.0 · {new Date().toLocaleDateString('en-IN')}
          </Text>
          {CONSENT_ITEMS.map(item => (
            <View key={item.key} style={styles.consentRow}>
              <Switch
                value={consent[item.key]}
                onValueChange={v =>
                  setConsent(prev => ({ ...prev, [item.key]: v }))
                }
                trackColor={{ false: Colors.border, true: Colors.lavender }}
                thumbColor={consent[item.key] ? Colors.deepViolet : Colors.white}
              />
              <Text style={styles.consentText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Progress Hint */}
        {!canSubmit && (
          <Text style={styles.hintText}>
            {!allDocsUploaded
              ? '📎 Upload all 4 required documents above.'
              : '👆 Please enable all 3 consent switches.'}
          </Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          activeOpacity={0.85}>
          {isSubmitting ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.submitBtnText}>SUBMIT FOR VERIFICATION</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.deepViolet,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  privacyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.infoBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  privacyIcon: { fontSize: 20 },
  privacyText: { flex: 1, fontSize: 13, color: Colors.info, lineHeight: 20 },

  sectionTitle: {
    ...Typography.label,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },

  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  docCardDone: { borderColor: Colors.success },
  docIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lavenderBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: { flex: 1 },
  docLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  docSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  uploadPill: {
    backgroundColor: Colors.lavenderBg,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  uploadPillDone: { backgroundColor: Colors.successBg },
  uploadPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.lavender,
  },
  uploadPillTextDone: { color: Colors.success },

  selfiePreview: { marginVertical: Spacing.md },
  selfieFrame: {
    backgroundColor: Colors.lavenderBg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    padding: Spacing.xl,
  },
  selfieCaption: {
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    fontWeight: '600',
  },

  consentCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  consentVersion: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'right',
    marginBottom: Spacing.sm,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  hintText: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: Spacing.md,
  },
  submitBtn: {
    backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  submitBtnDisabled: { backgroundColor: Colors.lavenderLight },
  submitBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Success
  successWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  successIcon: { fontSize: 80, marginBottom: Spacing.lg },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  successBody: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.xl,
    ...Shadow.card,
  },
  statusLabel: { ...Typography.label, marginBottom: Spacing.sm },
  badge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  badgeText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  retryBtn: {
    borderWidth: 1.5,
    borderColor: Colors.deepViolet,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  retryBtnText: { color: Colors.deepViolet, fontSize: 14, fontWeight: '600' },
});
