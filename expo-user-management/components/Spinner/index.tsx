import React from 'react';
import { View } from 'react-native';
import { Bounce } from 'react-native-animated-spinkit';

console.log('this')
const Spinner = () => (
  <View>
    <Bounce size={80} color="white" />
  </View>
);

export default Spinner;
