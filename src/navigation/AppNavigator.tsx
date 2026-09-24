import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';

// ─── Screens ────────────────────────────────────────────────────────────────
import OnboardingScreen from '../screens/OnboardingScreen';
import KYCUploadScreen from '../screens/KYCUploadScreen';
import MemberDashboardScreen from '../screens/MemberDashboardScreen';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import CollectorDashboardScreen from '../screens/CollectorDashboardScreen';
import RecordCollectionScreen from '../screens/RecordCollectionScreen';

// ─── Type Definitions ────────────────────────────────────────────────────────
export type RootStackParamList = {
  Onboarding: undefined;
  MemberTabs: undefined;
  CollectorTabs: undefined;
  KYCUpload: { memberId: string };
  LoanApplication: undefined;
  RecordCollection: { enrollmentId: string; memberNo: string };
};

export type MemberTabParamList = {
  Dashboard: undefined;
  Loans: undefined;
  KYC: { memberId: string };
};

// ─── Navigators ──────────────────────────────────────────────────────────────
const Stack = createNativeStackNavigator<RootStackParamList>();
const MemberTab = createBottomTabNavigator<MemberTabParamList>();

const TAB_ICONS: Record<string, string> = {
  Dashboard: '🏠',
  Loans: '💰',
  KYC: '🪪',
};

function MemberTabs() {
  return (
    <MemberTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.deepViolet,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 64,
          paddingBottom: 10,
          paddingTop: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused }) => (
          <View style={[tabStyles.icon, focused && tabStyles.iconActive]}>
            <Text style={{ fontSize: 22 }}>{TAB_ICONS[route.name] ?? '●'}</Text>
          </View>
        ),
      })}>
      <MemberTab.Screen name="Dashboard" component={MemberDashboardScreen} />
      <MemberTab.Screen name="Loans" component={LoanApplicationScreen} />
      <MemberTab.Screen
        name="KYC"
        component={KYCUploadScreen}
        initialParams={{ memberId: '' }}
      />
    </MemberTab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  icon: { alignItems: 'center', justifyContent: 'center' },
  iconActive: {},
});

// ─── Root Navigator ──────────────────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MemberTabs" component={MemberTabs} />
        <Stack.Screen name="KYCUpload" component={KYCUploadScreen} />
        <Stack.Screen name="LoanApplication" component={LoanApplicationScreen} />
        <Stack.Screen name="CollectorTabs" component={CollectorDashboardScreen} />
        <Stack.Screen name="RecordCollection" component={RecordCollectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
