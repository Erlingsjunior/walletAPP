// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";

// export { ErrorBoundary } from "expo-router";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//     useEffect(() => {
//         SplashScreen.hideAsync();
//     }, []);

//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='index' />
//             <Stack.Screen name='meuCartao' />
//             <Stack.Screen name='adicionarCartao' />
//         </Stack>
//     );
// }

// ===== ATUALIZAR: APP/_LAYOUT.TSX (adicionar rota) =====
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='meuCartao' />
            <Stack.Screen name='adicionarCartao' />
            <Stack.Screen name='sucessoCadastro' />
            <Stack.Screen name='meusCartoes' />
        </Stack>
    );
}
