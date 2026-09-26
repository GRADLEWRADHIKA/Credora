import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = () => {
    // Wire up real auth logic here later
    navigation.navigate('LoanApplication');
  };

  return (
    <View style={styles.screen}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff', padding: 24, paddingTop: 40 },
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
  loginButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  loginButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  linkRow: { marginTop: 20, alignItems: 'center' },
  linkText: { fontSize: 13, color: '#666' },
  linkTextBold: { color: '#2e7d32', fontWeight: '700' },
});

export default LoginScreen;