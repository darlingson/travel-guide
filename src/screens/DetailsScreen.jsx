import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import PagerView from 'react-native-pager-view';
import colors from "../../assets/styles/colors";
import { useState } from "react";
function DetailsScreen({ route }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageIndex,setImageIndex] = useState(0);
  const { destination } = route.params;
  const baseUrl = 'https://darlingson.pythonanywhere.com/destination/image?path=';
  const onImageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };
  // const processedImageUrls = destination.imageUrls.map((imageName) => {
  //   return `${baseUrl}${imageName}`;
  // });

  let processedImageUrls = ["https://darlingson.pythonanywhere.com/destination/image?path=chingoni_2_by_unesco","https://darlingson.pythonanywhere.com/destination/image?path=chingoni_1_by_unesco"];
    return (
      <ScrollView contentContainerStyle={style.container}>
        <PagerView initialPage={0} style={style.pager} onPageSelected={onImageSelected}>
          {
            processedImageUrls.map((url, index) => {
              return (
                <View key={index} collapsable={false}>
                  <Image source={{ uri: url }} style={style.image} />
                  {/* <Text style={style.imageNumber}>{currentPage + 1} of {processedImageUrls.length}</Text> */}
                </View>
              );
            })
          }
        </PagerView>
        <Text style={style.imageNumber}>{currentPage + 1} of {processedImageUrls.length}</Text>
        <View style={style.infoContainer}>
          <Text style={style.infoHeader}>Name</Text>
          <Text>{destination.name}</Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={style.infoHeader}>Location</Text>
          <Text>{destination.location}, {destination.district}</Text>
        </View>
        <View style={style.infoContainer}>
        <Text style={style.infoHeader}>Description</Text>
        <Text>{destination.description}</Text>
        </View>
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
    flex:1,
    padding:10
  },
  imageNumber: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 18,
    color: colors.secondary,
  },
  image: {
    flex: 1,
    width: '98%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'auto'
  },
  infoHeader : {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: colors.backgroundAlternative,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignContent: 'justify',
  }
});
export default DetailsScreen