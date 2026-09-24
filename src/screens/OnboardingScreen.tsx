import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const { width, height } = Dimensions.get('window');

// ─── Slide Data ──────────────────────────────────────────────────────────────
interface Slide {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
  bgColor: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    icon: '🛡️',
    title: 'Credora',
    subtitle: 'Your trusted Credit\nCo-operative Society',
    body: 'Empowering communities through transparent, accessible, and fair financial services.',
    bgColor: Colors.lavender,
  },
  {
    id: '2',
    icon: '🔐',
    title: 'Your Privacy,\nOur Promise',
    subtitle: '',
    body:
      'PAN, identity and a selfie — with your consent, and never your contacts or SMS.\n\n✅ Explicit consent at every step\n✅ Encrypted document storage\n✅ No data sold to third parties\n✅ Masked identifiers in all logs',
    bgColor: '#6A5A9E',
  },
  {
    id: '3',
    icon: '🌱',
    title: 'Start Your Journey',
    subtitle: 'Enter your mobile number to begin',
    body: '',
    bgColor: Colors.deepViolet,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phone, setPhone] = useState('');
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handleGetStarted = () => {
    if (phone.length >= 10) {
      // In production: trigger OTP flow
      navigation.replace('MemberTabs');
    }
  };

  const renderSlide = ({ item, index }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width }]}>
      <StatusBar barStyle="light-content" />

      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: item.bgColor }]}>
        <View style={styles.blobTL} />
        <View style={styles.blobBR} />
        <Text style={styles.heroIcon}>{item.icon}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        {item.subtitle ? (
          <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
        ) : null}
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {index === 2 ? (
          /* Step 3: Phone Input */
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Text style={styles.fieldLabel}>MOBILE NUMBER</Text>
            <View style={styles.phoneRow}>
              <View style={styles.dialCodeBox}>
                <Text style={styles.dialCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="10-digit number"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.primaryBtn,
                phone.length < 10 && styles.primaryBtnDisabled,
              ]}
              onPress={handleGetStarted}
              disabled={phone.length < 10}
              activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>GET STARTED →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.collectorLink}
              onPress={() => navigation.replace('CollectorTabs' as any)}>
              <Text style={styles.collectorText}>
                Collector?{' '}
                <Text style={styles.collectorHighlight}>Sign in here</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInLink}>
              <Text style={styles.signInText}>
                Already a member?{' '}
                <Text style={styles.signInHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        ) : (
          /* Steps 1 & 2: Informational */
          <>
            <Text style={styles.bodyText}>{item.body}</Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleNext}
              activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>
                {index === 0 ? 'LEARN MORE →' : 'CONTINUE →'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Gold Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList<Slide>
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(idx);
        }}
      />
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deepViolet,
  },
  slide: { flex: 1 },

  // Hero
  heroSection: {
    height: height * 0.44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  blobTL: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  blobBR: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  heroIcon: { fontSize: 72, marginBottom: Spacing.md },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 25,
  },

  // Content Card
  contentCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
    marginTop: -28,
  },
  bodyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 26,
    marginBottom: Spacing.xl,
  },

  // Phone Input
  fieldLabel: {
    ...Typography.label,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dialCodeBox: {
    backgroundColor: Colors.lavenderBg,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  dialCodeText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    backgroundColor: Colors.offWhite,
  },

  // Buttons
  primaryBtn: {
    backgroundColor: Colors.deepViolet,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  primaryBtnDisabled: { backgroundColor: Colors.lavenderLight },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  signInLink: { alignItems: 'center', marginTop: Spacing.xs },
  signInText: { fontSize: 13, color: Colors.textMuted },
  signInHighlight: { color: Colors.deepViolet, fontWeight: '700' },
  collectorLink: { alignItems: 'center', marginBottom: Spacing.sm },
  collectorText: { fontSize: 13, color: Colors.textMuted },
  collectorHighlight: { color: Colors.lavender, fontWeight: '700' },

  // Gold Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.gold, // #E2BA1E — gold active dot
    borderRadius: 4,
  },
});
