import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../assets/styles/colors";

function DetailsScreen({ route }) {
  const { destination } = route.params;
    return (
      <View style={style.container}>
        <Text>Details Screen</Text>
        <Text>Name: {destination.name}</Text>
        <Text>Description: {destination.description}</Text>
      </View>
    );
  }
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "left",
    justifyContent: "left",
  },
});
  export default DetailsScreen
