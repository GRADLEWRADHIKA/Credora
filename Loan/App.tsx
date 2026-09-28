import React from 'react';
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
  UploadDocuments: { flowType: 'rd' | 'standard' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
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
            options={{ title: 'Choose Loan Type', headerBackVisible: false }}
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
            options={{ title: 'Your Daily Payment' }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
