import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card } from 'react-native-paper';
import colors from '../../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Spotlight = () => {
    const [spotlight, setSpotlight] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        fetch('https://darlingson.pythonanywhere.com/destinations/spotlight')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setSpotlight(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    },[]);
    const handleCardPress = (destination) => {
        navigation.navigate('DetailsScreen', { destination });
    }
    return (
        <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Spotlight</Text>
        {isLoading ? <ActivityIndicator/>:
        <ScrollView contentContainerStyle={{ padding: 10 }}>
        <TouchableOpacity key={spotlight.id} onPress={() => handleCardPress(destination)}>
            <Card style={styles.card}>
                <Card.Title title={spotlight.name} />
                <Card.Content>
                    <Text>
                        {spotlight.description}
                    </Text>
                    <Text>
                        {spotlight.location}
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
        </ScrollView>
        }
        </View>
    );
}
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
export default Spotlight;