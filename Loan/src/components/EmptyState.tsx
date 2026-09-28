import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, typography } from '../theme/theme';

interface Props {
  icon?: string;
  title: string;
  subtitle?: string;
}

const EmptyState = ({ icon = 'inbox', title, subtitle }: Props) => (
  <View style={styles.wrap}>
    <View style={styles.iconBadge}>
      <Icon name={icon} size={32} color={colors.textMuted} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing.xl * 1.5 },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: { ...typography.h3, marginBottom: 6 },
  subtitle: { ...typography.body, textAlign: 'center', paddingHorizontal: spacing.lg },
});

export default EmptyState;