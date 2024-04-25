import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/styles/colors';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
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
  return (
    <View>
      <Text>Main Content</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundAlternative },
});

export default SearchScreen;