import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../../assets/styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ onNextClicked }) => {
    const [isSignIn, setIsSignIn] = useState(false);

    const handleToggleSignIn = () => {
        setIsSignIn(!isSignIn);
    };
    return (
        <SafeAreaView>
        <ScrollView>
            {isSignIn ? <SignIn onNextClicked={onNextClicked} onSignInToggle={handleToggleSignIn} /> : <SignUp onNextClicked={onNextClicked} onSignInToggle={handleToggleSignIn}/>}
        </ScrollView>
        </SafeAreaView>
    );
};
const SignUp =({  onNextClicked, onSignInToggle  }) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [favoriteActivity, setFavoriteActivity] = useState('');
    const [country, setCountry] = useState('');
    const [district, setDistrict] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const handleSignUp = async () => { 
        try { 
            setIsLoading(true);
            const formData = new FormData();
            formData.append('username', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword);
            formData.append('location', location);
            formData.append('favorite_activity', favoriteActivity);
            formData.append('country', country);
            formData.append('district', district);
            formData.append('phone_number', phoneNumber);
    
            const response = await fetch( 
                'http://darlingson.pythonanywhere.com/register',{
                method: 'POST',
                body: formData
            });
    
            setIsLoading(false);
            if (!response.ok) {
                const responseData = await response.text();
                setErrors(responseData)
                throw new Error('Server error: ' + response.status + ', ' + responseData);
            }
            else if (response.ok){
                onNextClicked();
            }
            const data = await response.json();
            console.log(data); 
        } 
        catch (error) { 
            setIsLoading(false);
            console.error(error); 
        } 
    };
    
    return (
        <View style={styles.container}>
        {errors && <Text style={styles.errorText}>{errors}</Text>}
            {isLoading ? (
                <Text>Loading...</Text>
            ) : ""}
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <Picker
                selectedValue={favoriteActivity}
                style={styles.picker}
                onValueChange={(itemValue) => setFavoriteActivity(itemValue)}
            >
                <Picker.Item label="Select Favorite Travel Activity" value="" />
                <Picker.Item label="Hiking" value="Hiking" />
                <Picker.Item label="Camping" value="Camping" />
                <Picker.Item label="Cycling" value="Cycling" />
                <Picker.Item label="Mountaineering" value="Mountaineering" />
                <Picker.Item label="Fishing" value="Fishing" />
                <Picker.Item label="Hunting" value="Hunting" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Country of Origin"
                value={country}
                onChangeText={setCountry}
            />
            {country === 'Malawi' &&
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="District"
                        value={district}
                        onChangeText={setDistrict}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </>
            }
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignInToggle} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}
const SignIn =({  onNextClicked, onSignInToggle  }) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await fetch('http://darlingson.pythonanywhere.com/login', {
                method: 'POST',
                body: formData
            });
            setIsLoading(false);
            if (!response.ok) {
                const responseData = await response.json();
                setErrors(responseData.error);
                throw new Error('Server error: ' + response.status + ', ' + responseData.error);
            }
            else if (response.ok){
                // const value = await AsyncStorage.getItem('onBoardingStatus');
                let result
                try {
                    result = await AsyncStorage.setItem('onBoardingStatus', 'true');                    
                    const data = await response.json();
                    const token = data.token;
                    await AsyncStorage.setItem('token', token);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
                onNextClicked();
            }
    }
    catch (error) {
        setIsLoading(false);
        console.error(error);
    }
    };
    return (
        <View style={styles.container}>
        {errors && <Text style={styles.errorText}>{errors}</Text>}
            {isLoading && <Text>Signing in</Text> }
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignInToggle} style={styles.link}>
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    picker: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        marginBottom: 15
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    link: {
        marginTop: 20
    },
    linkText: {
        color: colors.primary,
        fontSize: 16
    }
});

export default SignUpScreen;
