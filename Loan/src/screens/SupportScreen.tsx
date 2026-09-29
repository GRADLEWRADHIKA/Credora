import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, radius, shadow, typography } from '../theme/theme';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'How is my daily RD deposit calculated?',
    answer:
      'Your daily deposit is based on your approved loan amount and chosen repayment duration. It is shown before you confirm your RD.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer:
      'A missed payment may attract a late fee and could affect your eligibility for future loans. Try to pay before the daily/monthly deadline shown on your payment screen.',
  },
  {
    question: 'Can I repay my loan early?',
    answer:
      'Yes. You can foreclose your loan and pay the outstanding balance at any time. Any applicable foreclosure charges will be shown before you confirm.',
  },
  {
    question: 'How long does document verification take?',
    answer:
      'Verification usually takes 24–48 hours after you submit your application and documents.',
  },
  {
    question: 'Is my personal data safe?',
    answer:
      'Your documents and details are used only for verification and servicing your loan, in line with our privacy policy.',
  },
];

const CONTACT_OPTIONS = [
  {
    icon: 'call',
    label: 'Call Support',
    action: () => Linking.openURL('tel:+911234567890'),
  },
  {
    icon: 'email',
    label: 'Email Us',
    action: () => Linking.openURL('mailto:support@loanrd.app'),
  },
  {
    icon: 'chat',
    label: 'WhatsApp',
    action: () => Linking.openURL('https://wa.me/911234567890'),
  },
];

const SupportScreen = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(prev => (prev === index ? null : index));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <View style={styles.contactRow}>
        {CONTACT_OPTIONS.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.contactCard, shadow.card]}
            onPress={option.action}
            activeOpacity={0.8}
          >
            <View style={styles.contactIconBadge}>
              <Icon name={option.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.contactLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>
        Frequently Asked Questions
      </Text>
      <View style={[styles.faqCard, shadow.card]}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <View
              key={i}
              style={[
                styles.faqRow,
                i === FAQS.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <TouchableOpacity
                style={styles.faqQuestionRow}
                onPress={() => toggle(i)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon
                  name={isOpen ? 'expand-less' : 'expand-more'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {isOpen && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 40 },
  sectionTitle: { ...typography.h3, marginBottom: spacing.sm },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between' },
  contactCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  contactIconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  faqRow: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: 8,
  },
  faqAnswer: {
    ...typography.body,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 6,
    paddingBottom: 6,
  },
});

export default SupportScreen;
