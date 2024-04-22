import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../../assets/styles/colors";

const OnBoardingScreen = ({ onNextClicked }) => {
    const features = [
        "Feature 1: Lorem ipsum dolor sit amet",
        "Feature 2: Consectetur adipiscing elit",
        "Feature 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        // Add more features as needed
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
