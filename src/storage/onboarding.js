import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = 'hasSeenOnboarding';

export const setHasSeenOnboarding = async () => {
  await AsyncStorage.setItem(KEY, 'true')
}

export const getHasSeenOnboarding = async () => {
  const value = await AsyncStorage.getItem(KEY)
  return value === 'true'
}