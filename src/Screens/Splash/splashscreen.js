import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from "react-native"

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}> UrbanCart</Text>
      <ActivityIndicator size="large" style={{ marginTop: 30 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 28,
    fontWeight: '700'
  },
})

export default SplashScreen;