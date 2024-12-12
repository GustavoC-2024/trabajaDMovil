import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig'; // Asegúrate de que la ruta sea correcta

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingrese ambos campos.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Te has registrado correctamente.');
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
            let errorMessage = "Hubo un problema al registrarse.";

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido.";
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = "El correo electrónico ya está en uso.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña debe tener al menos 6 caracteres.";
                    break;
            }

            Alert.alert("Error", errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Regístrate</Text>

            <Text style={styles.label}>Correo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signUpText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    input: {
        height: 40,
        width: '100%',
        paddingLeft: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
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
