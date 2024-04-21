import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import PagerView from 'react-native-pager-view';
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
        <PagerView initialPage={0} style={style.pager}>
        {
          processedImageUrls.map((url, index) => {
            return (
              <View key={index}>
                <Image source={{ uri: url }} style={{ width: '100%', height: 300 }} />
              </View>
            );
          })
        }
        </PagerView>
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
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pager:{
    flex:1
  }
});
  export default DetailsScreen