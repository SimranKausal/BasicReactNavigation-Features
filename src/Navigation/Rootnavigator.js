import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/Splash/splashscreen';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import { getHasSeenOnboarding } from '../storage/onboarding';
import RegisterScreen from "../Screens/Register/RegisterScreen"
import OtpVerificationScreen from "../Screens/OtpVerification/OtpverificationScreen"

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [checking, setChecking] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    (async () => {
      const seen = await getHasSeenOnboarding();
      setInitialRoute(seen ? 'Auth' : 'Onboarding');
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={RegisterScreen} />
        <Stack.Screen name = "OtpVerification" component={OtpVerificationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;