import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import jsonData from '../../assets/data.json';

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

  const renderCarouselItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item }}
        style={{ width: windowWidth - 40, height: 200, borderRadius: 8 }}
        resizeMode="cover"
      />
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {destinations.map((destination, index) => (
        <Card key={destination.id}>
          <Card.Title title={destination.name} />
          {console.log(destination.imagePaths)}
          <Carousel
            data={destination.imagePaths} // Using imagePaths array from each destination
            renderItem={renderCarouselItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />
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
