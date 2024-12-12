import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firebase Firestore

export default function Home({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Cargar productos desde Firestore al inicio
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al cargar los productos.");
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
            navigation.replace("Login");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al cerrar sesión");
        }
    };

    const handleEditProduct = (productId) => {
        navigation.navigate("EditProduct", { productId });
    };

    const handleDeleteProduct = async (productId) => {
        const db = getFirestore();
        try {
            await deleteDoc(doc(db, "products", productId));
            Alert.alert("Producto eliminado", "El producto se ha eliminado correctamente.");
            loadProducts(); // Actualiza la lista de productos
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al eliminar el producto.");
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>Stock: {item.stock}</Text>
            <View style={styles.productActions}>
                <TouchableOpacity
                    onPress={() => handleEditProduct(item.id)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDeleteProduct(item.id)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Bienvenido a la aplicación</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddProduct")}
            >
                <Text style={styles.addButtonText}>Agregar Producto</Text>
            </TouchableOpacity>

            {/* Aquí se renderiza la lista de productos */}
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.productList}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#922b21",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    productItem: {
        width: "100%",
        padding: 15,
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        marginBottom: 15,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    productActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    productName: {
        fontWeight: "bold",
        fontSize: 18,
    },
    productList: {
        flexGrow: 1, // Para que la lista ocupe el espacio disponible
        width: "100%",
    },
});


