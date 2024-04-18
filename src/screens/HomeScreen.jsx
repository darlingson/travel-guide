import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import jsonData from '../../assets/data.json';
const HomeScreen = () => {
    const [destinations, setDestinations] = useState([]);
  
    useEffect(() => {
      selectRandomDestinations();
    }, []);
  
    const selectRandomDestinations = () => {
      const shuffledData = jsonData.sort(() => 0.5 - Math.random());
      const selectedDestinations = shuffledData.slice(0, 5);
      setDestinations(selectedDestinations);
    };
  
    return (
      <View>
        {destinations.map((destination, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{destination.name}</Text>
            <Text>{destination.description}</Text>
            {/* You can display other destination details here */}
          </View>
        ))}
        <Button title="Discover More" onPress={selectRandomDestinations} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;