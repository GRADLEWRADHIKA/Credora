import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

const { width } = Dimensions.get('window');

// ─── Mock Data (replace with API calls in production) ────────────────────────
const MEMBER = {
  name: 'Radhi Kumar',
  memberNo: 'MBR-000001',
  kycStatus: 'VERIFIED' as const,
};

const ENROLLMENT = {
  planName: 'Daily Dairy ₹50',
  dailyAmount: 50,
  currentDay: 42,
  totalDays: 100,
  totalDeposited: 2100,
  collectorName: 'Arjun S.',
};

const LOAN = {
  applicationNo: 'LOAN-CRED-000001',
  status: 'ACTIVE' as const,
  principal: 25000,
  outstanding: 18750,
  emi: 2291,
  nextDueDate: '2026-10-05',
};

// ─── Status Badge Config ──────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; bg: string; color: string }> = {
  VERIFIED: { label: '✅ KYC Verified', bg: Colors.successBg, color: Colors.success },
  PENDING: { label: '⏳ KYC Pending', bg: Colors.warningBg, color: Colors.warning },
  REJECTED: { label: '❌ KYC Rejected', bg: Colors.errorBg, color: Colors.error },
  ACTIVE: { label: '🟢 Active', bg: Colors.successBg, color: Colors.success },
  DISBURSED: { label: '💸 Disbursed', bg: Colors.infoBg, color: Colors.info },
  SUBMITTED: { label: '📋 Under Review', bg: Colors.warningBg, color: Colors.warning },
  APPROVED: { label: '✅ Approved', bg: Colors.successBg, color: Colors.success },
};

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={pbStyles.track}>
      <View
        style={[
          pbStyles.fill,
          { width: `${Math.min(100, Math.max(0, pct))}%` as any, backgroundColor: color },
        ]}
      />
    </View>
  );
}
const pbStyles = StyleSheet.create({
  track: { height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden', marginVertical: Spacing.sm },
  fill: { height: '100%', borderRadius: 4 },
});

// ─── 100-Day Grid ────────────────────────────────────────────────────────────
const CELL_SIZE = (width - Spacing.md * 2 - Spacing.lg * 2 - 9 * 3) / 10;

function HundredDayGrid({ currentDay }: { currentDay: number }) {
  return (
    <View style={gridStyles.grid}>
      {Array.from({ length: 100 }, (_, i) => (
        <View
          key={i}
          style={[
            gridStyles.cell,
            i < currentDay ? gridStyles.cellPaid : null,
            i === currentDay ? gridStyles.cellToday : null,
          ]}
        />
      ))}
    </View>
  );
}
const gridStyles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, paddingVertical: Spacing.sm },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  cellPaid: { backgroundColor: Colors.lavender },
  cellToday: { backgroundColor: Colors.gold },
});

// ─── Component ───────────────────────────────────────────────────────────────
export default function MemberDashboardScreen() {
  const progress = (ENROLLMENT.currentDay / ENROLLMENT.totalDays) * 100;
  const kycBadge = STATUS_CFG[MEMBER.kycStatus] ?? STATUS_CFG.PENDING;
  const loanBadge = STATUS_CFG[LOAN.status] ?? STATUS_CFG.ACTIVE;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* ── Hero Card ────────────────────────────────────────────────── */}
        <View style={styles.heroCard}>
          <View style={styles.heroBlobTL} />
          <View style={styles.heroBlobBR} />

          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.memberName}>{MEMBER.name}</Text>
              <Text style={styles.memberNo}>{MEMBER.memberNo}</Text>
            </View>
            <View style={[styles.kycDot, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={{ fontSize: 22 }}>
                {MEMBER.kycStatus === 'VERIFIED' ? '✅' : '⏳'}
              </Text>
            </View>
          </View>

          <View style={styles.heroBalanceRow}>
            <View>
              <Text style={styles.balanceLabel}>TOTAL DEPOSITED</Text>
              <Text style={styles.balanceAmt}>
                ₹{ENROLLMENT.totalDeposited.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.heroDivider} />
            <View>
              <Text style={styles.balanceLabel}>DAY</Text>
              <Text style={styles.balanceAmt}>
                {ENROLLMENT.currentDay}
                <Text style={styles.balanceSuffix}>/100</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* ── 100-Day Passbook ─────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📒 Daily Dairy Passbook</Text>
            <View style={[styles.chip, { backgroundColor: Colors.lavenderBg }]}>
              <Text style={[styles.chipText, { color: Colors.deepViolet }]}>
                {ENROLLMENT.planName}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View>
              <Text style={styles.metaLabel}>DAILY AMOUNT</Text>
              <Text style={styles.metaVal}>₹{ENROLLMENT.dailyAmount}</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>COLLECTOR</Text>
              <Text style={styles.metaVal}>{ENROLLMENT.collectorName}</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>PROGRESS</Text>
              <Text style={styles.metaVal}>{progress.toFixed(0)}%</Text>
            </View>
          </View>

          <ProgressBar pct={progress} color={Colors.lavender} />

          <Text style={styles.gridCaption}>Day-by-day completion grid</Text>
          <HundredDayGrid currentDay={ENROLLMENT.currentDay} />

          <View style={styles.legendRow}>
            {[
              { color: Colors.lavender, label: 'Paid' },
              { color: Colors.gold, label: 'Today' },
              { color: Colors.border, label: 'Upcoming' },
            ].map(l => (
              <View key={l.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Active Loan Card ─────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💰 Active Loan</Text>
            <View style={[styles.chip, { backgroundColor: loanBadge.bg }]}>
              <Text style={[styles.chipText, { color: loanBadge.color }]}>
                {loanBadge.label}
              </Text>
            </View>
          </View>
          <Text style={styles.appNo}>{LOAN.applicationNo}</Text>

          <View style={styles.loanRow}>
            <View style={styles.loanCol}>
              <Text style={styles.metaLabel}>PRINCIPAL</Text>
              <Text style={styles.loanAmt}>
                ₹{LOAN.principal.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.loanCol}>
              <Text style={styles.metaLabel}>OUTSTANDING</Text>
              <Text style={[styles.loanAmt, { color: Colors.error }]}>
                ₹{LOAN.outstanding.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          <View style={styles.nextEmiCard}>
            <Text style={styles.metaLabel}>NEXT EMI DUE</Text>
            <Text style={styles.emiDate}>
              {new Date(LOAN.nextDueDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={styles.emiAmt}>
              ₹{LOAN.emi.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* ── Quick Actions ─────────────────────────────────────────────── */}
        <View style={styles.actionsRow}>
          {[
            { icon: '📋', label: 'Apply Loan' },
            { icon: '📜', label: 'Statement' },
            { icon: '🏪', label: 'Passbook' },
          ].map(a => (
            <TouchableOpacity key={a.label} style={styles.actionBtn} activeOpacity={0.8}>
              <Text style={styles.actionIcon}>{a.icon}</Text>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  scrollContent: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  // Hero
  heroCard: {
    backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    position: 'relative',
    ...Shadow.hero,
  },
  heroBlobTL: {
    position: 'absolute', top: -40, left: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroBlobBR: {
    position: 'absolute', bottom: -30, right: -30,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  memberName: { fontSize: 22, fontWeight: '700', color: Colors.white, marginTop: 2 },
  memberNo: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 },
  kycDot: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  heroBalanceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  balanceLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.55)', letterSpacing: 1, marginBottom: 4 },
  balanceAmt: { fontSize: 28, fontWeight: '800', color: Colors.white },
  balanceSuffix: { fontSize: 16, fontWeight: '400', color: 'rgba(255,255,255,0.55)' },
  heroDivider: { width: 1, height: 44, backgroundColor: 'rgba(255,255,255,0.18)' },

  // Cards
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md, ...Shadow.card },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  chip: { borderRadius: BorderRadius.full, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  chipText: { fontSize: 11, fontWeight: '700' },

  // Meta
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaLabel: { fontSize: 9, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.8, marginBottom: 4 },
  metaVal: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  gridCaption: { fontSize: 11, color: Colors.textMuted, marginTop: Spacing.xs },
  legendRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xs },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontSize: 11, color: Colors.textMuted },

  // Loan
  appNo: { fontSize: 11, color: Colors.textMuted, marginBottom: Spacing.md, fontFamily: Platform?.OS === 'ios' ? 'Menlo' : 'monospace' },
  loanRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  loanCol: { flex: 1 },
  loanAmt: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  nextEmiCard: { backgroundColor: Colors.lavenderBg, borderRadius: BorderRadius.md, padding: Spacing.md },
  emiDate: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  emiAmt: { fontSize: 26, fontWeight: '800', color: Colors.deepViolet, marginTop: 2 },

  // Actions
  actionsRow: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: { flex: 1, backgroundColor: Colors.white, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center', ...Shadow.card },
  actionIcon: { fontSize: 28, marginBottom: Spacing.xs },
  actionLabel: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
});

// Needed for Platform reference in styles
import { Platform } from 'react-native';
