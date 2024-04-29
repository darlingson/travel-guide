import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import PagerView from 'react-native-pager-view';
import colors from "../../assets/styles/colors";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
function DetailsScreen({ route }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { destination } = route.params;
  const baseUrl = 'https://darlingson.pythonanywhere.com/destination/image?path=';
  const onImageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };
  // const processedImageUrls = destination.imageUrls.map((imageName) => {
  //   return `${baseUrl}${imageName}`;
  // });

  let processedImageUrls = ["https://darlingson.pythonanywhere.com/destination/image?path=chingoni_2_by_unesco", "https://darlingson.pythonanywhere.com/destination/image?path=chingoni_1_by_unesco"];
  return (
    <View style={style.container}>
      <ScrollView >
        <View style={style.page}>
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
        </View>
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
        <View style={style.infoContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ padding: 10 }}>
              {/* <Text>{destination.distance}</Text> */}
              <Text>310 KM</Text>
              <Text style={{ color: colors.textLight, fontSize: 12 }}>Distance from Lilongwe</Text>
            </View>
            <View style={{ borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.primary, padding: 10 }}>
              <Text>K 500.00 per Person</Text>
              {/* <Text style={{ color: colors.textLight, fontSize: 12, }}>Price</Text> */}
            </View>
            <View style={{ padding: 10 }}>
              {/* <Text>{destination.distance}</Text> */}
              <Text> <Ionicons name="sunny-outline" /> 25°C</Text>
              {/* <Text style={{ color: colors.textLight, fontSize: 12 }}>Current Weather</Text> */}
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>View On Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  page: {
    height: 300,
  },
  pager: {
    flex: 1,
    padding: 10,
    height: 300,
    backgroundColor: colors.primary,
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
  },
  imageNumber: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 18,
    color: colors.secondary,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'cover',

  },
  infoHeader: {
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
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 18,
    backgroundColor: colors.secondary,
    textAlign: 'center',
    borderRadius: 16,
    fontWeight: 'bold',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
export default DetailsScreen