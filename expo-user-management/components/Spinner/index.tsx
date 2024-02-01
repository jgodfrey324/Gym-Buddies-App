import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Spinner = () => (
  <View>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

export default Spinner;
