import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../assets/styles/colors';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import { ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Pressable } from 'react-native';
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
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{ headerShown: false }}
        >
      </Stack.Screen>
    </Stack.Navigator>
  );

};
const SearchScreenMainContent = () => {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchTyped, setIsSearchTyped] = useState(false)
  const [searchText, setSearchText] = useState("")
  const navigation = useNavigation();
  const fetchSuggestions = () => {
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
  useEffect(() => {
    fetchSuggestions();
  }, [])
  const handleCardPress = (destination) => {
    navigation.navigate('DetailsScreen', { destination });
  };
  const handleSearch = () => {
    console.log("value of the search bar is: " + searchText)
    navigation.navigate('SearchResults', { keywords: searchText })
  }
  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncatedDescription = words.slice(0, 10).join(' ');
    if (words.length > 10) {
      return truncatedDescription + '...';
    }
    return truncatedDescription;
  };
  return (
    <ScrollView>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        placeholder="Search"
      />
      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.text}>Search</Text>
      </Pressable>
    </View>
    <ScrollView horizontal>
      <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
        <Text style={{ fontWeight: 'bold', margin: 10, fontSize: 20, borderColor: 'black', borderWidth: 1, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: colors.primary }}>Hiking</Text>
        <Text style={{ fontWeight: 'bold', margin: 10, fontSize: 20, borderColor: 'black', borderWidth: 1, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: colors.primary }}>Lakes</Text>
        <Text style={{ fontWeight: 'bold', margin: 10, fontSize: 20, borderColor: 'black', borderWidth: 1, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: colors.primary }}>Mountains</Text>
      </View>
    </ScrollView>
    <View style={styles.grid}>
      {isLoading ? <ActivityIndicator /> :
        <>
          {suggestions.map((destination, index) => (
            <TouchableOpacity key={destination.id} onPress={() => handleCardPress(destination)} style={{ width: '100%',justifyContent: 'center', alignItems: 'center' }}>
              <Card style={{ backgroundColor: colors.secondary, margin: 10, borderRadius: 10,width: '90%' }}>
                <Card.Title title={destination.name} style={{ fontSize: 20, fontWeight: 'bold' }} />
                <Card.Content>
                  <Text>{truncateDescription(destination.description)}</Text>
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
const SearchResults = ({route}) => {
  const [results, setResults] = useState([])
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const {keywords} = route.params
  const fetchResults = () => {
    fetch('https://darlingson.pythonanywhere.com/destinations/search?keyword=' + keywords)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results)
        setResults(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fetchResults();
  }, [])
  return (
    <>
      {
        isLoading ? <ActivityIndicator /> :
          <>
            {results.map((destination, index) => (
              <TouchableOpacity key={destination.id} onPress={() => navigation.navigate('DetailsScreen', { destination })}>
                <Card key={destination.id} style={{ backgroundColor: colors.secondary, margin: 10, borderRadius: 10 }}>
                  <Card.Title title={destination.name} style={{ fontSize: 20, fontWeight: 'bold' }} />
                  <Card.Content>
                    <Text>{destination.district}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </>
      }
    </>
  )
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
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
    width: '38',
  },
});

export default SearchScreen;