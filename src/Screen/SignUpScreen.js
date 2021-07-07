import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({navigation}) => {
  const [Data, setData] = useState({
    Name: '',
    PassWord: '',
    Email: '',
    Image: null,
  });
  const [Loader, setLoader] = useState(false);

  const onChangeTextHandler = (name, value) => {
    setData({
      ...Data,
      [name]: value,
    });
  };

  const ImagePickerHandler = () => {
    launchImageLibrary(
      {
        quality: 0.5,
      },

      fileObj => {
        const uploadTask = storage()
          .ref()
          .child(`userProfile/${Math.floor(Math.random() * 10000000 + 1)}`)
          .putFile(fileObj && fileObj.assets && fileObj.assets[0].uri);
        uploadTask.on(
          'state_changed',
          snapshot => {
            setLoader(true);
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress === 100) {
              setLoader(false);
            }
          },
          error => {
            alert('Error in upload');
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              setData({
                ...Data,
                Image: downloadURL,
              });
            });
          },
        );
      },
    );
  };

  const SignUpHandler = async () => {
    if (!(Data.Email && Data.PassWord && Data.Name && Data.Image)) {
      return alert('Please Submit All Filed');
    }
    setLoader(true);
    try {
      const result = await auth().createUserWithEmailAndPassword(
        Data.Email,
        Data.PassWord,
      );
      firestore().collection('users').doc(result.user.uid).set({
        Name: Data.Name,
        Email: Data.Email,
        uid: result.user.uid,
        Profile: Data.Image,
      });
      setLoader(false);
      navigation.navigate('Home');
    } catch (err) {
      alert(err);
      setLoader(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          paddingHorizontal: 30,
          paddingVertical: 30,
          flex: 1,
        }}>
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Icon size={100} color="green" name="snapchat-square" />
          <Text style={{fontSize: 50, fontWeight: 'bold', color: 'green'}}>
            Sign Up
          </Text>
        </View>

        <TextInput
          mode="outlined"
          label="Enter Name"
          style={{paddingVertical: 10}}
          onChangeText={value => onChangeTextHandler('Name', value)}
        />

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
          icon="camera"
          mode="contained"
          style={{marginVertical: 10}}
          onPress={() => ImagePickerHandler()}>
          Profile Picture
        </Button>

        <Button
          mode="contained"
          onPress={() => SignUpHandler()}
          style={{marginVertical: 15}}>
          Sign Up
        </Button>
        <View style={{flexDirection: 'row'}}>
          <Text>Already Have Account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>Login Here</Text>
          </TouchableOpacity>
        </View>

        <View style={{margin: 100}}></View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
