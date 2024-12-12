import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de usar esta importación
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingrese ambos campos.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Login exitoso", "Has iniciado sesión correctamente.");
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
            let errorMessage = "Hubo un problema al iniciar sesión.";

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "La contraseña es incorrecta.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No se encontró un usuario con este correo.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de conexión, por favor intenta más tarde.";
                    break;
            }

            Alert.alert("Error", errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Iniciar sesión</Text>

            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su correo"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#ccc" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPressIn={() => setShowPassword(!showPassword)}>
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>¿No tienes cuenta aún? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        width: '100%',
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

