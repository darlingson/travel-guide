import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../assets/styles/colors';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import { ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();


const SearchScreen = ({ navigation }) => {
  // <View style={styles.container}>
  //   <Text>Home Screen</Text>
  // </View>
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Search Main Content'
        component={SearchScreenMainContent}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );

};
const SearchScreenMainContent = () => {
  const [suggestions,setSuggestions] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const navigation = useNavigation();
  const fetchSuggestions = ()=>{
    fetch('https://darlingson.pythonanywhere.com/destinations/recommendations')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setSuggestions(data.slice(0, 10));
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  }
  useEffect(()=>{
    fetchSuggestions();
  },[])
  const handleCardPress = (destination) => {
    navigation.navigate('DetailsScreen', { destination });
  };
  return (
<ScrollView>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextInput style={styles.input}></TextInput>
    <Button title="Submit" color="#841584" style={styles.button}></Button>
  </View>
  <ScrollView horizontal>
    <View style={styles.horizontalScroll}>
      <Text>Hiking</Text>
      <Text>Lakes</Text>
      <Text>Mountains</Text>
    </View>
  </ScrollView>
  <View style={styles.grid}>
    {isLoading ? <ActivityIndicator /> :
      <>
        {suggestions.map((destination, index) => (
          <TouchableOpacity key={destination.id} onPress={() => handleCardPress(destination)}>
            <Card key={destination.id} style={styles.card}>
              <Card.Title title={destination.name} style={{ fontSize: 20, fontWeight: 'bold' }} />
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
  </View>
</ScrollView>

  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundAlternative },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  button: {
    height: 40,
    flex: 1,
  },
  horizontalScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    margin: '1%',
  },
});

export default SearchScreen;