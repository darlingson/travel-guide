import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../../assets/styles/colors";

const OnBoardingScreen = ({ onNextClicked }) => {
    const features = [
        "Destination Discovery: Allow users to discover hidden gems",
        "Destination Information: Give users detailed information about various destinations across Malawi, including popular attractions, historical sites, cultural landmarks, restaurants, accommodations, and shopping areas.",
        "Offline Access: Download maps, guides, and other content for offline use, ensuring access even in areas with limited internet connectivity.",
        "Trip Planning Tools: Plan itineraries, with suggestions for activities, dining options, accommodations, and transportation, tailored to suit the preferences and interests of users.",
        "Weather Updates: Stay informed about the weather conditions in different parts of Malawi, helping you plan your activities and pack accordingly.",
        "Currency Converter: Convenient currency converter tool for budgeting and making purchases.",
        "Language Support: Translate phrases and expressions into local languages to enhance communication and interaction with fellow Malawians."
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Features:</Text>
            <View style={styles.featureList}>
                {features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                        <Text style={styles.featureText}>{feature}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={onNextClicked} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    featureList: {
        width: '100%',
        paddingHorizontal: 20
    },
    featureItem: {
        backgroundColor: 'lightgray',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    featureText: {
        fontSize: 16
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});

export default OnBoardingScreen;