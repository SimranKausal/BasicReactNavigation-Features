import React , {useState} from 'react'
import axios from 'axios'

import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
}
from "react-native"

const RegisterScreen = ({navigation}) =>{
    const [identifier, setIdentifier] = useState ('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreed, setAgreed] = useState(false)
    

    const onRegister = async () => {
  if (!identifier || !password || !confirmPassword) {
    Alert.alert("Missing info", "Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Password mismatch', 'Passwords do not match.');
    return;
  }

  if (!agreed) {
    Alert.alert('Terms required', 'Please accept the Terms & Conditions.');
    return;
  }

  try {
    const response = await axios.post('http://10.0.2.2:5000/register', {
      identifier,
      password,
    });

    const data = response.data;

    if (data.success) {
      Alert.alert("Success", data.message);
      navigation.navigate("OtpVerification", { identifier });
    } else {
      Alert.alert("Registration failed", data.message);
    }
  } catch (error) {
    Alert.alert("Error", "Could not connect to server. Please try again.");
  }
};

    return (
        <View style ={styles.container}>
        <Text style = {styles.heading}> Create Account</Text>
        <Text style = {styles.label}>Email or Mobile Number</Text>
         <TextInput
        style={styles.input}
        placeholder="you@example.com or 9876543210"
        value={identifier}
        onChangeText={setIdentifier}
      />

       <Text style={styles.label}>Password</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />


        <Text style={styles.label}>Confirm Password</Text>
         <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
           <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setAgreed(!agreed)}
      >
        <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>I agree to the Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.registerButtonText}>Create Account</Text>
      </TouchableOpacity>

       
        </View>
    ) }
    const styles = StyleSheet.create({
        container:{
          flex:1,
          padding:24,
          paddingTop: 60,
          backgroundColor: '#fff',
  },
     heading: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 12 },
    input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
   checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 10,
  },
   checkboxChecked: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
   checkboxLabel: { flex: 1, fontSize: 13, color: '#444' },
  registerButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
        });


        export default RegisterScreen;



    



