// app/(tabs)/two.tsx - VERSÃO SIMPLIFICADA
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <Text style={styles.subtitle}>Esta é a segunda tab</Text>
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
