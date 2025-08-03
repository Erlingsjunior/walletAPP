import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2563EB",
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: "Wallet",
                    tabBarIcon: ({ color }) => null, // Remove ícones por enquanto
                }}
            />
            <Tabs.Screen
                name='two'
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => null, // Remove ícones por enquanto
                }}
            />
        </Tabs>
    );
}
