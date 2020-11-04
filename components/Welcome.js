import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Welcome = (props) => {
  this.state = {
    age: String,
  };

  return (
    <SafeAreaView>
      <Text>Bem vindo!, {props.name}</Text>
    </SafeAreaView>
  );
};

export default Welcome;
