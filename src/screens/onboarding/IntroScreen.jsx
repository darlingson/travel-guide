import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/styles/colors";

const IntroScreen = ({ onNextClicked }) => {
    return (
        <ImageBackground
            source={require('../../../assets/images/Mulanje_Mountain_western_side.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <Text style={styles.description}>
                    Malawi, known as the "Warm Heart of Africa", boasts stunning scenery
                    from the shores of Lake Malawi to the heights of Mulanje Mountain.
                </Text>
                <TouchableOpacity onPress={onNextClicked} style={styles.button}>
                    <Text style={styles.buttonText}>Start Onboarding</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)', // Adjust opacity for better readability
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20
    },
    description: {
        fontSize: 18,
        color: 'white',
        textAlign: 'justify',
        marginBottom: 20
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

export default IntroScreen;
