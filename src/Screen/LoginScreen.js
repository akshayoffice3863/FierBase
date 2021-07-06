import React, {useState} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
const SignUpScreen = ({navigation}) => {
  const [Data, setData] = useState({
    PassWord: '',
    Email: '',
  });
  const [Loader, setLoader] = useState(false);
  const onChangeTextHandler = (name, value) => {
    setData({
      ...Data,
      [name]: value,
    });
  };

  const LoginHandler = async () => {
    if (!(Data.Email && Data.PassWord)) {
      return alert('Please Submit All Filed');
    }
    setLoader(true);
    try {
      await auth().signInWithEmailAndPassword(Data.Email, Data.PassWord);
      setLoader(false);
    } catch (err) {
      alert(err);
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{paddingHorizontal: 30, paddingVertical: 30}}
      behavior="position">
      {Loader ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      ) : null}
      <StatusBar backgroundColor="green" />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Icon size={100} color="green" name="snapchat-square" />
        <Text style={{fontSize: 50, fontWeight: 'bold', color: 'green'}}>
          Login
        </Text>
      </View>

      <TextInput
        mode="outlined"
        label="Enter Email"
        placeholder="Type something"
        style={{paddingVertical: 10}}
        onChangeText={value => onChangeTextHandler('Email', value)}
      />
      <TextInput
        label="Enter Password"
        secureTextEntry
        mode="outlined"
        onChangeText={value => onChangeTextHandler('PassWord', value)}
        style={{paddingVertical: 10, marginBottom: 10}}
      />

      <Button
        mode="contained"
        onPress={() => LoginHandler()}
        style={{marginVertical: 15}}>
        Login
      </Button>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't Have Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{color: 'green', fontWeight: 'bold'}}>Signup Here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
