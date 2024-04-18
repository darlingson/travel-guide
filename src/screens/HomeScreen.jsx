import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import jsonData from '../../assets/data.json';
const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    {jsonData.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          {/* Render other properties as needed */}
        </View>
      ))}
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;