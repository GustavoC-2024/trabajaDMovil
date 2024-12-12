import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Firebase Firestore

export default function EditProduct({ route, navigation }) {
    const { productId } = route.params;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            const db = getFirestore();
            const productDoc = await getDoc(doc(db, "products", productId));
            if (productDoc.exists()) {
                const product = productDoc.data();
                setName(product.name);
                setPrice(product.price.toString());
                setStock(product.stock.toString());
            }
        };
        loadProduct();
    }, [productId]);

    const handleUpdateProduct = async () => {
        if (!name || !price || !stock) {
            Alert.alert("Error", "Por favor ingrese todos los campos.");
            return;
        }

        try {
            const db = getFirestore();
            await updateDoc(doc(db, "products", productId), {
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
            });
            Alert.alert("Producto actualizado", "El producto se ha actualizado correctamente.");
            navigation.goBack(); // Volver a la pantalla de inicio
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar el producto.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Producto</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <Text style={styles.buttonText}>Actualizar Producto</Text>
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

