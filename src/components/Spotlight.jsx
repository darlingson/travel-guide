import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { ActivityIndicator, Button, Card } from 'react-native-paper';

const Spotlight = () => {
    const [spotlight, setSpotlight] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        fetch('https://darlingson.pythonanywhere.com/destinations/spotlight')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSpotlight(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    },[]);
    return (
        <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Spotlight</Text>
        {isLoading ? <ActivityIndicator/>:
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <Card>
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
        </ScrollView>
        }
        </View>
    );
}

export default Spotlight;