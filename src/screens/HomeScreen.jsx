import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import jsonData from '../../assets/data.json';
import img from '../../assets/images/image1.jpg';

const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    selectRandomDestinations();
  }, []);

  const selectRandomDestinations = () => {
    const shuffled = jsonData.sort(() => 0.5 - Math.random());
    setDestinations(shuffled.slice(0, 5));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {destinations.map((destination, index) => (
        <Card key={destination.id}>
          <Card.Title title={destination.name} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {destination.imagePaths.map((imagePath, index) => (
              <Image
                key={index}
                style={{ width: windowWidth / 2 - 30, height: 100, margin: 5, borderRadius: 8 }}
                source={img }
                resizeMode="cover"
              />
            ))}
          </View>
          <Card.Content>
            <Text>{destination.description}</Text>
          </Card.Content>
        </Card>
      ))}
      <Button title="Discover More" onPress={selectRandomDestinations} />
    </ScrollView>
  );
};

export default HomePage;
