import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import jsonData from '../../assets/data.json';
import img from '../../assets/images/image1.jpg';

const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = () => {
    // const shuffled = jsonData.sort(() => 0.5 - Math.random());
    // setDestinations(shuffled.slice(0, 5));
    fetch('https://darlingson.pythonanywhere.com/destinations')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecommendations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {recommendations.map((destination, index) => (
        <Card key={destination.id}>
          <Card.Title title={destination.name} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* {destination.imagePaths.map((imagePath, index) => (
              <Image
                key={index}
                style={{ width: windowWidth / 2 - 30, height: 100, margin: 5, borderRadius: 8 }}
                source={img }
                resizeMode="cover"
              />
            ))} */}
          </View>
          <Card.Content>
            <Text>{destination.description}</Text>
          </Card.Content>
        </Card>
      ))}
      <Button title="Discover More" onPress={fetchRecommendations} />
    </ScrollView>
  );
};

export default HomePage;
