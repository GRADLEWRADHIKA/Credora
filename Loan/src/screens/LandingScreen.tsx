import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = ({ navigation }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.logoWrap, animatedStyle]}>
        <Text style={styles.logoIcon}>💰</Text>
        <Text style={styles.appName}>LoanRD</Text>
        <Text style={styles.tagline}>
          Borrow smart, repay daily through your own Recurring Deposit
        </Text>
      </Animated.View>

      <Animated.View style={[styles.buttonGroup, animatedStyle]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 100,
    paddingBottom: 50,
  },
  logoWrap: { alignItems: 'center' },
  logoIcon: { fontSize: 56, marginBottom: 16 },
  appName: { fontSize: 28, fontWeight: '700', color: '#2e7d32', marginBottom: 12 },
  tagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  buttonGroup: { width: '100%' },
  primaryButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#2e7d32', fontWeight: '600', fontSize: 16 },
});

export default LandingScreen;