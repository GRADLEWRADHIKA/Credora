import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from './src/theme/theme';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ChooseLoanTypeScreen from './src/screens/ChooseLoanTypeScreen';
import LoanApplicationScreen from './src/screens/LoanApplicationScreen';
import RecurringDepositScreen from './src/screens/RecurringDepositScreen';
import LoanRDDetailsScreen from './src/screens/LoanRDDetailsScreen';
import DailyPaymentScreen from './src/screens/DailyPaymentScreen';
import RDDepositHistoryScreen from './src/screens/RDDepositHistoryScreen';
import LoanOfferScreen from './src/screens/LoanOfferScreen';
import EMIScheduleScreen from './src/screens/EMIScheduleScreen';
import StandardRepaymentHistoryScreen from './src/screens/StandardRepaymentHistroyScreen';
import SplashScreen from './src/screens/SplashScreen';
import UploadDocumentsScreen from './src/screens/UploadDocumentScreen';
import BankDetailsScreen from './src/screens/BankDetailsScreen';
import ReviewApplicationScreen from './src/screens/ReviewApplicationScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import ApplicationSubmittedScreen from './src/screens/ApplicationSubmittedScreen';
import LoanAgreementScreen from './src/screens/LoanAgreementScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SupportScreen from './src/screens/SupportScreen';
import MainTabs from './src/navigation/MainTabs';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  ChooseLoanType: undefined;
  LoanApplication: { flowType: 'rd' | 'standard'; loadAmount?: number };
  RecurringDeposit: undefined;
  LoanRDDetails: undefined;
  DailyPayment: undefined;
  RDDepositHistory: undefined;
  LoanOffer: undefined;
  EMISchedule: undefined;
  StandardRepaymentHistory: undefined;
  Notifications: undefined;
  Support: undefined;
  MainTabs: undefined;
  BankDetails: { flowType: 'rd' | 'standard' };
  UploadDocuments: { flowType: 'rd' | 'standard' };
  ReviewApplication: { flowType: 'rd' | 'standard' };
  OTPVerification: { flowType: 'rd' | 'standard' };
  ApplicationSubmitted: { flowType: 'rd' | 'standard' };
  LoanAgreement: { flowType: 'rd' | 'standard' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ animation: 'slide_from_right' }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Log In' }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: 'Sign Up' }}
          />
          <Stack.Screen
            name="ChooseLoanType"
            component={ChooseLoanTypeScreen}
            options={({ navigation }) => ({
              title: 'Choose Loan Type',
              headerBackVisible: false,
              headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MainTabs')}
                    hitSlop={10}
                  >
                    <Icon
                      name="dashboard"
                      size={22}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                    hitSlop={10}
                  >
                    <Icon
                      name="notifications-none"
                      size={22}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="LoanApplication"
            component={LoanApplicationScreen}
            options={{ title: 'Loan Application' }}
          />
          <Stack.Screen
            name="RecurringDeposit"
            component={RecurringDepositScreen}
            options={{ title: 'Recurring Deposit' }}
          />
          <Stack.Screen
            name="LoanRDDetails"
            component={LoanRDDetailsScreen}
            options={{ title: 'Loan & RD Details' }}
          />
          <Stack.Screen
            name="DailyPayment"
            component={DailyPaymentScreen}
            options={({ navigation }) => ({
              title: 'Your Daily Payment',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}
                  hitSlop={10}
                >
                  <Icon
                    name="notifications-none"
                    size={22}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="RDDepositHistory"
            component={RDDepositHistoryScreen}
            options={{ title: 'RD Deposit History' }}
          />
          <Stack.Screen
            name="LoanOffer"
            component={LoanOfferScreen}
            options={{ title: 'Loan Offer' }}
          />
          <Stack.Screen
            name="EMISchedule"
            component={EMIScheduleScreen}
            options={{ title: 'EMI Schedule' }}
          />
          <Stack.Screen
            name="StandardRepaymentHistory"
            component={StandardRepaymentHistoryScreen}
            options={{ title: 'Repayment History' }}
          />
          <Stack.Screen
            name="UploadDocuments"
            component={UploadDocumentsScreen}
            options={{ title: 'Upload Documents' }}
          />
          <Stack.Screen
            name="BankDetails"
            component={BankDetailsScreen}
            options={{ title: 'Bank Details' }}
          />
          <Stack.Screen
            name="ReviewApplication"
            component={ReviewApplicationScreen}
            options={{ title: 'Review Application' }}
          />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
            options={{
              title: 'Verify OTP',
              headerBackVisible: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="LoanAgreement"
            component={LoanAgreementScreen}
            options={{
              title: 'Loan Agreement',
              headerBackVisible: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="LoanAgreement"
            component={LoanAgreementScreen}
            options={{
              title: 'Loan Agreement',
              headerBackVisible: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={({ navigation }) => ({
              title: 'Notifications',
              animation: 'slide_from_bottom',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Support')}
                  hitSlop={10}
                >
                  <Icon
                    name="help-outline"
                    size={22}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Support"
            component={SupportScreen}
            options={{
              title: 'Help & Support',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="ApplicationSubmitted"
            component={ApplicationSubmittedScreen}
            options={{ headerShown: false, animation: 'fade' }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false, animation: 'fade' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
