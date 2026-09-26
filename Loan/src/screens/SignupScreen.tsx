import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSignup = () => {
    // Wire up real signup logic here later
    navigation.navigate('LoanApplication');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email or mobile number"
          value={emailOrMobile}
          onChangeText={setEmailOrMobile}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkTextBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingTop: 40, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#222', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 28 },
  label: { fontSize: 12, color: '#555', marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  signupButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  signupButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  linkRow: { marginTop: 20, alignItems: 'center' },
  linkText: { fontSize: 13, color: '#666' },
  linkTextBold: { color: '#2e7d32', fontWeight: '700' },
});

export default SignupScreen;