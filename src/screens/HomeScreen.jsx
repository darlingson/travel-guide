import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import jsonData from '../../assets/data.json';
import img from '../../assets/images/image1.jpg';
import Spotlight from '../components/Spotlight';
import Recommendations from '../components/Recommendations';

const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
 
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Spotlight/>
      <Recommendations/>
      <Button title="Discover More" onPress={{}} />
    </ScrollView>
  );
};

export default HomePage;
