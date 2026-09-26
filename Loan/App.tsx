import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoanApplicationScreen from './src/screens/LoanApplicationScreen';
import RecurringDepositScreen from './src/screens/RecurringDepositScreen';
import LoanRDDetailsScreen from './src/screens/LoanRDDetailsScreen';
import DailyPaymentScreen from './src/screens/DailyPaymentScreen';
import RDDepositHistoryScreen from './src/screens/RDDepositHistoryScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  LoanApplication: undefined;
  RecurringDeposit: undefined;
  LoanRDDetails: undefined;
  DailyPayment: undefined;
  RDDepositHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;