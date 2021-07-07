import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => navigation.navigate('LoginScreen'));
        }}>
        <MaterialCommunityIcons name="logout" size={40} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
