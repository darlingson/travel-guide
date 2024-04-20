import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/styles/colors';

const SearchScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:colors.backgroundAlternative},
});

export default SearchScreen;