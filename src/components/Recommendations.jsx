import { useEffect, useState } from "react";
import { ScrollView, View,ActivityIndicator } from "react-native";
import { Card, Text } from "react-native-paper";
const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
      fetchRecommendations();
    }, []);
  
    const fetchRecommendations = () => {
      fetch('https://darlingson.pythonanywhere.com/destinations')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRecommendations(data.slice(0,5));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
  
    return (
        <ScrollView>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Recommendations</Text>
            {isLoading? <ActivityIndicator/>:
            <>
            {recommendations.map((destination, index) => (
                <Card key={destination.id}>
                <Card.Title title={destination.name} style={{ fontSize: 20, fontWeight: 'bold' }}/>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                </View>
                <Card.Content>
                    <Text>{destination.description}</Text>
                </Card.Content>
                </Card>
            ))}
            </>
            }
        </ScrollView>
    );
};

export default Recommendations;