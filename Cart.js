import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firebase Firestore

export default function Cart({ route, navigation }) {
  const { product } = route.params;
  const [cart, setCart] = useState([{ ...product, quantity: 1 }]);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (updatedCart) => {
    let total = 0;
    updatedCart.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handlePlaceOrder = async () => {
    const db = getFirestore();
    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        products: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
        totalPrice,
        status: "pending",
        createdAt: new Date(),
      });
      Alert.alert("Pedido realizado", "Tu pedido ha sido realizado correctamente.");
      setCart([]); // Limpiar el carrito
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al realizar el pedido.");
    }
  };

  return (
    <View style={styles.container}>
      {cart.map(item => (
        <View key={item.id} style={styles.cartItem}>
          <Text>{item.name} - {item.quantity} x ${item.price}</Text>
          <Button title="Eliminar" onPress={() => handleRemoveItem(item.id)} />
        </View>
      ))}
      <Text>Total: ${totalPrice}</Text>
      <Button title="Realizar Pedido" onPress={handlePlaceOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    marginBottom: 10,
  },
});
