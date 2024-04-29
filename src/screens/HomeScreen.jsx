import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import jsonData from '../../assets/data.json';
import img from '../../assets/images/image1.jpg';
import Spotlight from '../components/Spotlight';
import Recommendations from '../components/Recommendations';
import colors from '../../assets/styles/colors';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';

const windowWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();
const HomePage = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeContent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spotlight />
      <Recommendations />
      <Button
        title="Discover More"
        onPress={() => {
          console.log("Hi");
        }}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 20
  },
  button: {
    backgroundColor: colors.primary
  }
});

export default HomePage;