// app/(tabs)/modal.tsx - VERSÃO SIMPLIFICADA
import { View, Text, StyleSheet } from "react-native";

export default function Modal() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
            <Text style={styles.subtitle}>Esta é uma tela modal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
    },
});
