import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

// ─── Static Data ─────────────────────────────────────────────────────────────
const LOAN_PURPOSES = [
  { id: 'business', icon: '🏪', label: 'Business Expansion' },
  { id: 'education', icon: '📚', label: 'Education' },
  { id: 'medical', icon: '🏥', label: 'Medical Emergency' },
  { id: 'agriculture', icon: '🌾', label: 'Agriculture' },
  { id: 'home', icon: '🏠', label: 'Home Renovation' },
  { id: 'other', icon: '📋', label: 'Other Purpose' },
];

const MOCK_GUARANTORS = [
  { id: 'g1', memberNo: 'MBR-000012', name: 'Priya Sharma', kycStatus: 'VERIFIED' },
  { id: 'g2', memberNo: 'MBR-000034', name: 'Suresh Kumar', kycStatus: 'VERIFIED' },
  { id: 'g3', memberNo: 'MBR-000056', name: 'Anitha Rao', kycStatus: 'VERIFIED' },
];

// ─── EMI Calculator ──────────────────────────────────────────────────────────
function calcEMI(principal: number, ratePA: number, months: number): number {
  if (principal <= 0 || months <= 0) { return 0; }
  const r = ratePA / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <View style={siStyles.row}>
      {Array.from({ length: total }, (_, i) => (
        <React.Fragment key={i}>
          <View style={[siStyles.circle, i + 1 <= current ? siStyles.circleOn : null]}>
            <Text style={[siStyles.circleText, i + 1 <= current ? siStyles.circleTextOn : null]}>
              {i + 1 < current ? '✓' : String(i + 1)}
            </Text>
          </View>
          {i < total - 1 && (
            <View style={[siStyles.line, i + 1 < current ? siStyles.lineOn : null]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
const siStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md },
  circle: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  circleOn: { backgroundColor: Colors.deepViolet },
  circleText: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  circleTextOn: { color: Colors.white },
  line: { flex: 1, height: 2, backgroundColor: Colors.border, marginHorizontal: 4 },
  lineOn: { backgroundColor: Colors.deepViolet },
});

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoanApplicationScreen() {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('12');
  const [purpose, setPurpose] = useState('');
  const [guarantors, setGuarantors] = useState<string[]>([]);
  const [kfsAcked, setKfsAcked] = useState(false);
  const [eSign, setESign] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNo] = useState(`LOAN-CRED-${String(Date.now()).slice(-6)}`);

  const principal = parseFloat(amount) || 0;
  const months = parseInt(tenure) || 12;
  const emi = calcEMI(principal, 0.12, months);
  const totalRepayable = emi * months;
  const totalInterest = totalRepayable - principal;

  const toggleGuarantor = (id: string) => {
    setGuarantors(prev =>
      prev.includes(id)
        ? prev.filter(g => g !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev,
    );
  };

  const goNext = () => {
    if (step === 1 && (!amount || parseFloat(amount) <= 0)) {
      Alert.alert('Required', 'Please enter a valid loan amount.');
      return;
    }
    if (step === 1 && !purpose) {
      Alert.alert('Required', 'Please select a loan purpose.');
      return;
    }
    if (step === 2 && guarantors.length === 0) {
      Alert.alert('Required', 'Select at least 1 guarantor.');
      return;
    }
    if (step === 3 && !kfsAcked) {
      Alert.alert('Required', 'Please acknowledge the Key Fact Statement.');
      return;
    }
    setStep(prev => (prev + 1) as Step);
  };

  const handleSubmit = async () => {
    if (!eSign) { return; }
    setSubmitting(true);
    // Production: POST /api/v1/loan-applications
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  // ─── Success Screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successWrap}>
          <Text style={{ fontSize: 80 }}>🎉</Text>
          <Text style={styles.successTitle}>Application Submitted!</Text>
          <Text style={styles.successBody}>
            Our team will review your application within 2–3 business days.
          </Text>
          <View style={styles.refCard}>
            <Text style={styles.refLabel}>REFERENCE NUMBER</Text>
            <Text style={styles.refNo}>{refNo}</Text>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => { setSubmitted(false); setStep(1); setAmount(''); setPurpose(''); setGuarantors([]); setKfsAcked(false); setESign(false); }}>
            <Text style={styles.primaryBtnText}>APPLY ANOTHER LOAN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loan Application</Text>
        <Text style={styles.headerSub}>Step {step} of 4</Text>
      </View>

      <StepIndicator current={step} total={4} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── STEP 1: Amount & Purpose ───────────────────────────────── */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Loan Details</Text>
            <Text style={styles.stepSub}>How much do you need and why?</Text>

            <Text style={styles.fieldLabel}>LOAN AMOUNT (₹)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="e.g. 50000"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
            />

            {principal > 0 && (
              <View style={styles.emiPreview}>
                <Text style={styles.emiPreviewLabel}>
                  Indicative EMI @ 12% p.a. for {tenure} months:
                </Text>
                <Text style={styles.emiPreviewAmt}>₹{emi.toFixed(0)}/mo</Text>
              </View>
            )}

            <Text style={styles.fieldLabel}>TENURE (MONTHS)</Text>
            <View style={styles.tenureRow}>
              {['6', '12', '18', '24', '36'].map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tenureChip, tenure === t && styles.tenureChipOn]}
                  onPress={() => setTenure(t)}>
                  <Text style={[styles.tenureChipText, tenure === t && styles.tenureChipTextOn]}>
                    {t}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>LOAN PURPOSE</Text>
            <View style={styles.purposeGrid}>
              {LOAN_PURPOSES.map(p => (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.purposeCard, purpose === p.id && styles.purposeCardOn]}
                  onPress={() => setPurpose(p.id)}>
                  <Text style={{ fontSize: 28, marginBottom: 4 }}>{p.icon}</Text>
                  <Text style={[styles.purposeLabel, purpose === p.id && styles.purposeLabelOn]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ── STEP 2: Guarantors ─────────────────────────────────────── */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Select Guarantors</Text>
            <Text style={styles.stepSub}>
              Choose 1–2 active, KYC-verified members to co-sign.
            </Text>

            <View style={styles.infoBox}>
              <Text style={{ fontSize: 18 }}>ℹ️</Text>
              <Text style={styles.infoText}>
                Guarantors will receive a consent invite. They must accept before your
                application proceeds.
              </Text>
            </View>

            {MOCK_GUARANTORS.map(g => (
              <TouchableOpacity
                key={g.id}
                style={[styles.guarantorCard, guarantors.includes(g.id) && styles.guarantorCardOn]}
                onPress={() => toggleGuarantor(g.id)}
                activeOpacity={0.8}>
                <View style={styles.guarantorAvatar}>
                  <Text style={{ fontSize: 24 }}>👤</Text>
                </View>
                <View style={styles.guarantorInfo}>
                  <Text style={styles.guarantorName}>{g.name}</Text>
                  <Text style={styles.guarantorNo}>{g.memberNo}</Text>
                  <View style={[styles.chip, { backgroundColor: Colors.successBg, alignSelf: 'flex-start', marginTop: 4 }]}>
                    <Text style={[styles.chipText, { color: Colors.success }]}>✅ KYC Verified</Text>
                  </View>
                </View>
                <View style={[styles.selectCircle, guarantors.includes(g.id) && styles.selectCircleOn]}>
                  {guarantors.includes(g.id) && (
                    <Text style={{ color: Colors.white, fontSize: 14 }}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.hintText}>{guarantors.length}/2 guarantors selected</Text>
          </View>
        )}

        {/* ── STEP 3: Key Fact Statement ─────────────────────────────── */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Key Fact Statement</Text>
            <Text style={styles.stepSub}>
              Review all loan terms carefully before proceeding.
            </Text>

            <View style={styles.kfsCard}>
              {[
                { label: 'Principal Amount', value: `₹${principal.toLocaleString('en-IN')}` },
                { label: 'Interest Rate', value: '12% p.a. (reducing balance)' },
                { label: 'Annual Percentage Rate', value: '13.2% (incl. processing fee)' },
                { label: 'Loan Tenure', value: `${tenure} months` },
                { label: 'Monthly EMI', value: `₹${emi.toFixed(0)}` },
                { label: 'Total Repayable', value: `₹${totalRepayable.toFixed(0)}` },
                { label: 'Total Interest', value: `₹${totalInterest.toFixed(0)}` },
                { label: 'Processing Fee', value: '1% of principal' },
                { label: 'Penalty (overdue)', value: '2% per month on overdue' },
                { label: 'Prepayment Charges', value: 'Nil after 3 EMIs paid' },
              ].map(row => (
                <View key={row.label} style={styles.kfsRow}>
                  <Text style={styles.kfsLabel}>{row.label}</Text>
                  <Text style={styles.kfsValue}>{row.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.consentRow}>
              <Switch
                value={kfsAcked}
                onValueChange={setKfsAcked}
                trackColor={{ false: Colors.border, true: Colors.lavender }}
                thumbColor={kfsAcked ? Colors.deepViolet : Colors.white}
              />
              <Text style={styles.consentText}>
                I have read and understood the Key Fact Statement and agree to the loan terms.
              </Text>
            </View>
          </View>
        )}

        {/* ── STEP 4: E-Sign & Submit ────────────────────────────────── */}
        {step === 4 && (
          <View>
            <Text style={styles.stepTitle}>Digital Agreement</Text>
            <Text style={styles.stepSub}>
              Review and digitally sign your loan agreement.
            </Text>

            <View style={styles.agreementBox}>
              <Text style={styles.agreementTitle}>Loan Agreement Summary</Text>
              <Text style={styles.agreementText}>
                I, the undersigned borrower, hereby agree to borrow ₹
                {principal.toLocaleString('en-IN')} at 12% p.a. for {tenure}{' '}
                months. I confirm all information provided is accurate and I
                consent to the terms in the Key Fact Statement.
              </Text>
            </View>

            <View style={[styles.consentRow, { marginTop: Spacing.lg }]}>
              <Switch
                value={eSign}
                onValueChange={setESign}
                trackColor={{ false: Colors.border, true: Colors.lavender }}
                thumbColor={eSign ? Colors.deepViolet : Colors.white}
              />
              <Text style={styles.consentText}>
                I digitally sign and consent to this agreement. This constitutes a
                legally binding obligation.
              </Text>
            </View>

            <View style={styles.hashBox}>
              <Text style={styles.hashLabel}>DIGITAL SIGNATURE HASH</Text>
              <Text style={styles.hashValue}>
                {eSign
                  ? `sha256:${Date.now().toString(16)}a3f8e9d2c1b7`
                  : '— Pending consent —'}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, (!eSign || submitting) && styles.primaryBtnDisabled]}
              onPress={handleSubmit}
              disabled={!eSign || submitting}
              activeOpacity={0.85}>
              {submitting ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.primaryBtnText}>SUBMIT APPLICATION</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <View style={styles.navRow}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setStep(prev => (prev - 1) as Step)}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
          )}
          {step < 4 && (
            <TouchableOpacity
              style={[styles.nextBtn, step === 1 && { flex: 1 }]}
              onPress={goNext}
              activeOpacity={0.85}>
              <Text style={styles.nextBtnText}>NEXT STEP →</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: { backgroundColor: Colors.deepViolet, padding: Spacing.xl, paddingTop: Spacing.lg },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  stepTitle: { ...Typography.h3, marginBottom: 4 },
  stepSub: { ...Typography.body, marginBottom: Spacing.lg },
  fieldLabel: { ...Typography.label, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 14, fontSize: 20,
    fontWeight: '700', color: Colors.textPrimary, backgroundColor: Colors.white,
  },
  emiPreview: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.lavenderBg, borderRadius: BorderRadius.sm,
    padding: Spacing.md, marginTop: Spacing.sm,
  },
  emiPreviewLabel: { fontSize: 12, color: Colors.textSecondary, flex: 1 },
  emiPreviewAmt: { fontSize: 18, fontWeight: '800', color: Colors.deepViolet },
  tenureRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  tenureChip: {
    flex: 1, paddingVertical: 10, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border,
  },
  tenureChipOn: { backgroundColor: Colors.deepViolet, borderColor: Colors.deepViolet },
  tenureChipText: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  tenureChipTextOn: { color: Colors.white },
  purposeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  purposeCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: BorderRadius.md,
    padding: Spacing.md, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border,
    ...Shadow.card,
  },
  purposeCardOn: { borderColor: Colors.deepViolet, backgroundColor: Colors.lavenderBg },
  purposeLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
  purposeLabelOn: { color: Colors.deepViolet },
  infoBox: {
    flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.infoBg,
    borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.md,
    alignItems: 'flex-start',
  },
  infoText: { flex: 1, fontSize: 13, color: Colors.info, lineHeight: 20 },
  guarantorCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1.5, borderColor: Colors.border, ...Shadow.card,
  },
  guarantorCardOn: { borderColor: Colors.deepViolet, backgroundColor: Colors.lavenderBg },
  guarantorAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.lavenderBg, alignItems: 'center', justifyContent: 'center',
  },
  guarantorInfo: { flex: 1 },
  guarantorName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  guarantorNo: { fontSize: 12, color: Colors.textMuted },
  selectCircle: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  selectCircleOn: { backgroundColor: Colors.deepViolet, borderColor: Colors.deepViolet },
  hintText: { textAlign: 'center', color: Colors.textMuted, fontSize: 13, marginTop: Spacing.sm },
  chip: { borderRadius: BorderRadius.full, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  chipText: { fontSize: 11, fontWeight: '700' },
  kfsCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, ...Shadow.card, marginBottom: Spacing.lg,
  },
  kfsRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  kfsLabel: { fontSize: 13, color: Colors.textMuted, flex: 1 },
  kfsValue: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, textAlign: 'right', flex: 1 },
  consentRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md,
    padding: Spacing.md, ...Shadow.card,
  },
  consentText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  agreementBox: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, ...Shadow.card, marginBottom: Spacing.md,
  },
  agreementTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md },
  agreementText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 22 },
  hashBox: {
    backgroundColor: Colors.offWhite, borderRadius: BorderRadius.md,
    padding: Spacing.md, marginTop: Spacing.md, marginBottom: Spacing.lg,
  },
  hashLabel: { ...Typography.label, marginBottom: Spacing.xs },
  hashValue: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: Colors.textMuted,
  },
  primaryBtn: {
    backgroundColor: Colors.deepViolet, borderRadius: BorderRadius.md,
    paddingVertical: 16, alignItems: 'center', marginTop: Spacing.sm,
  },
  primaryBtnDisabled: { backgroundColor: Colors.lavenderLight },
  primaryBtnText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  navRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  backBtn: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: BorderRadius.md, paddingVertical: 14,
    alignItems: 'center', backgroundColor: Colors.white,
  },
  backBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  nextBtn: {
    flex: 2, backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.md, paddingVertical: 14, alignItems: 'center',
  },
  nextBtnText: { color: Colors.white, fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },
  successWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  successTitle: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  successBody: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.xl },
  refCard: {
    backgroundColor: Colors.lavenderBg, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, alignItems: 'center', width: '100%', marginBottom: Spacing.xl,
  },
  refLabel: { ...Typography.label, marginBottom: 4 },
  refNo: { fontSize: 18, fontWeight: '800', color: Colors.deepViolet },
});
