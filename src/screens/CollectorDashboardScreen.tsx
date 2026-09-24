import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

const MOCK_ROUTE = [
  { id: 'e1', memberNo: 'MBR-000001', name: 'Radhi Kumar', planName: 'Daily Dairy ₹50', amount: 50, collected: false, day: 42 },
  { id: 'e2', memberNo: 'MBR-000007', name: 'Priya Sharma', planName: 'Daily Dairy ₹100', amount: 100, collected: true, day: 38 },
  { id: 'e3', memberNo: 'MBR-000019', name: 'Suresh Kumar', planName: 'Daily Dairy ₹50', amount: 50, collected: false, day: 71 },
  { id: 'e4', memberNo: 'MBR-000022', name: 'Anitha Rao', planName: 'Daily Dairy ₹200', amount: 200, collected: false, day: 15 },
];

export default function CollectorDashboardScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [route] = useState(MOCK_ROUTE);

  const filtered = route.filter(
    r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.memberNo.toLowerCase().includes(search.toLowerCase()),
  );

  const totalTarget = route.reduce((s, r) => s + r.amount, 0);
  const totalCollected = route.filter(r => r.collected).reduce((s, r) => s + r.amount, 0);
  const totalPending = totalTarget - totalCollected;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Today's Route</Text>
          <Text style={styles.headerDate}>{today}</Text>
        </View>
        <TouchableOpacity style={styles.qrBtn}>
          <Text style={{ fontSize: 26 }}>📷</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        {[
          { label: 'TARGET', amount: totalTarget, bg: Colors.deepViolet },
          { label: 'COLLECTED', amount: totalCollected, bg: Colors.success },
          { label: 'PENDING', amount: totalPending, bg: Colors.warning },
        ].map(s => (
          <View key={s.label} style={[styles.summaryCard, { backgroundColor: s.bg }]}>
            <Text style={styles.summaryLabel}>{s.label}</Text>
            <Text style={styles.summaryAmount}>₹{s.amount}</Text>
          </View>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search member name or ID..."
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      {/* Route List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {filtered.map(item => (
          <View
            key={item.id}
            style={[styles.routeCard, item.collected && styles.routeCardDone]}>
            <View style={styles.memberAvatar}>
              <Text style={{ fontSize: 22 }}>👤</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberMeta}>
                {item.memberNo} · {item.planName} · Day {item.day}/100
              </Text>
            </View>
            <View style={styles.routeRight}>
              <Text style={styles.routeAmount}>₹{item.amount}</Text>
              {item.collected ? (
                <View style={[styles.chip, { backgroundColor: Colors.successBg }]}>
                  <Text style={[styles.chipText, { color: Colors.success }]}>✅ Done</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.collectBtn}
                  onPress={() =>
                    navigation?.navigate?.('RecordCollection', {
                      enrollmentId: item.id,
                      memberNo: item.memberNo,
                    })
                  }
                  activeOpacity={0.85}>
                  <Text style={styles.collectBtnText}>COLLECT</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.deepViolet,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
  headerDate: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  qrBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  summaryRow: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md },
  summaryCard: {
    flex: 1, borderRadius: BorderRadius.md,
    padding: Spacing.md, alignItems: 'center',
  },
  summaryLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.5, marginBottom: 4 },
  summaryAmount: { fontSize: 18, fontWeight: '800', color: Colors.white },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.white, marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border, ...Shadow.card,
  },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: Colors.textPrimary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxl },
  routeCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border, ...Shadow.card,
  },
  routeCardDone: { opacity: 0.6 },
  memberAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.lavenderBg, alignItems: 'center', justifyContent: 'center',
  },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  memberMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  routeRight: { alignItems: 'flex-end', gap: 6 },
  routeAmount: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  collectBtn: {
    backgroundColor: Colors.deepViolet, borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm, paddingVertical: 6,
  },
  collectBtnText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  chip: { borderRadius: BorderRadius.full, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
  chipText: { fontSize: 11, fontWeight: '700' },
});
