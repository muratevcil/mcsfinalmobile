import { Stack } from "expo-router";

export default function AuthLayout(){


    return (
        <Stack>
            <Stack.Screen name = "login" options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name = "index"></Stack.Screen>
            <Stack.Screen name = "forgot"></Stack.Screen>
            <Stack.Screen name = "register"></Stack.Screen>
        </Stack>
    )


}