import { useEffect, useState } from "react";
import { ScrollView, View,ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import colors from "../../assets/styles/colors";
import { useNavigation } from "@react-navigation/native";
const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
      fetchRecommendations();
    }, []);
  
    const fetchRecommendations = () => {
      fetch('https://darlingson.pythonanywhere.com/destinations')
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);s
          setRecommendations(data.slice(0,5));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    const handleCardPress = (destination) => {
      navigation.navigate('DetailsScreen', { destination });
  };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Recommendations</Text>
            {isLoading? <ActivityIndicator/>:
            <>
            {recommendations.map((destination, index) => (
              <TouchableOpacity key={destination.id} onPress={() => handleCardPress(destination)}>
                <Card key={destination.id} style={styles.card}>
                <Card.Title title={destination.name} style={{ fontSize: 20, fontWeight: 'bold' }}/>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                </View>
                <Card.Content>
                    <Text>{destination.description}</Text>
                </Card.Content>
                </Card>
                </TouchableOpacity>
            ))}
            </>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor:colors.primary,
    paddingTop :20,
    paddingBottom :20
  },
  card: {
    backgroundColor:colors.secondary,
    paddingTop :20,
    paddingBottom :20,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:20
  }
});
export default Recommendations;