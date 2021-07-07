import React, {useState} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import SocialButton from '../Components/SocialButton';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
GoogleSignin.configure({
  webClientId:
    '512824963592-7j0cvp5bksnl4hme0idfk24o0tc8nk65.apps.googleusercontent.com',
  offlineAccess: true,
});
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
      navigation.navigate('Home');
    } catch (err) {
      alert(err);
      setLoader(false);
    }
  };

  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      alert(`Something Wrong ${err}`);
    }
  }

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <KeyboardAvoidingView style={{paddingHorizontal: 30, paddingVertical: 30}}>
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
      {Platform.OS === 'android' ? (
        <View style={{marginTop: 25}}>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              )
            }
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() =>
              onGoogleButtonPress().then(() => alert('Signed in with Google!'))
            }
          />
        </View>
      ) : null}
      <View style={{margin: 100}}></View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
