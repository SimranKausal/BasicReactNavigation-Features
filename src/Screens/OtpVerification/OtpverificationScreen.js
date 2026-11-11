import React, {useState, useEffect} from "react"
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert
} from "react-native"

import axios from "axios";

const OtpVerificationScreen  =  ({navigation, route}) =>{
    const {identifier} = route.params
    const [otp, setOtp ] = useState('')

    useEffect(() => {
        onResend();
           }, []);


    const onVerify  = async () =>{
        if(!otp){
            Alert.alert('Missing OTP', "Please enter the otp sent to you.")
            return;
        }
    

    try{
        const response = await axios.post('http://10.0.2.2:5000/verify-otp',{
            identifier,
            otp,
        });

        const data = response.data;
        if(data.success){
            Alert.alert("Verified",data.message);
            navigation.navigate('Login')
        }
        else{
            Alert.alert('Verification Failed', data.message)
        }
    }
    catch (error){
    Alert.alert("Could not connect to the server.Please try again")
    }
};

const onResend = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/send-otp', {
        identifier,
      });

      const data = response.data;

      if (data.success) {
        Alert.alert('OTP Resent', 'A new OTP has been sent.');
      } else {
        Alert.alert('Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server. Please try again.');
    }
  };
return (
  <View style = {styles.container}>
    <Text style = {styles.heading}>Verify your Account</Text>
    <Text style = {styles.subheading}>Enter the OTP sent to {identifier}</Text>

    <TextInput style = {styles.input}
    placeholder = "Enter the 6-Digit OTP"
    value = {otp}
    onChangeText={setOtp}
    keyboardType="number-pad"
    maxLength={6}
    />

    <TouchableOpacity style = {styles.verifyButton} onPress = {onVerify}>
      <Text style = {styles.verifyButtonText}>Verify</Text>
     </TouchableOpacity>
    
   
  </View>
)

  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    paddingTop: 80,
    backgroundColor:'#fff'

  },

  heading:{
    fontSize:24,
    fontWeight:'800',
    marginBottom:8
  },

  
 subheading: {
 fontSize: 14, color: '#666', marginBottom: 24
 },

 input:{
   borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
  },
 
  verifyButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },

  verifyButtonText: {
     color: '#fff', fontSize: 16, fontWeight: '600'
     },

     resendText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 14,
  },


})

export default OtpVerificationScreen;



