import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  h3: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  h4: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400', color: Colors.textSecondary, lineHeight: 22 },
  bodyMd: { fontSize: 15, fontWeight: '400', color: Colors.textSecondary, lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', color: Colors.textMuted },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  amount: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -1 },
  amountSm: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
});
