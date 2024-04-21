import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../assets/styles/colors";
function DetailsScreen({ route }) {
  const { destination } = route.params;
  const baseUrl = 'https://darlingson.pythonanywhere.com/destination/image?path=';

  // const processedImageUrls = destination.imageUrls.map((imageName) => {
  //   return `${baseUrl}${imageName}`;
  // });

  let processedImageUrls = ["https://darlingson.pythonanywhere.com/destination/image?path=chingoni_2_by_unesco","https://darlingson.pythonanywhere.com/destination/image?path=chingoni_1_by_unesco"];
    return (
      <ScrollView contentContainerStyle={style.container}>
        <Text>Details Screen</Text>
        <Text>Name: {destination.name}</Text>
        <Text>Description: {destination.description}</Text>
      </ScrollView>
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