import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firebase Firestore

export default function AddProduct({ navigation }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const handleAddProduct = async () => {
        if (!name || !price || !stock) {
            Alert.alert("Error", "Por favor ingrese todos los campos.");
            return;
        }

        try {
            const db = getFirestore();
            const docRef = await addDoc(collection(db, "products"), {
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
            });
            Alert.alert("Producto agregado", "El producto se ha agregado correctamente.");
            navigation.goBack(); // Volver a la pantalla de inicio
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al agregar el producto.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Producto</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Agregar Producto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
