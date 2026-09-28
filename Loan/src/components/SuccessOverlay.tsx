import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, radius } from '../theme/theme';

interface Props {
  visible: boolean;
  message?: string;
  onDone: () => void;
}

const SuccessOverlay = ({ visible, message = 'Payment Successful', onDone }: Props) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 12 }),
        ]),
        Animated.delay(900),
      ]).start(() => onDone());
    } else {
      scale.setValue(0);
      opacity.setValue(0);
    }
  }, [visible, scale, opacity, onDone]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
        <View style={styles.checkCircle}>
          <Icon name="check" size={40} color={colors.white} />
        </View>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingVertical: 32,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  message: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
});

export default SuccessOverlay;