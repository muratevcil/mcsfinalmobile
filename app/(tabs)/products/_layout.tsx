import { Stack } from "expo-router";
import { View } from "react-native";

export default function ProductLayout(){
    return(
        <Stack>
            <Stack.Screen name="productdetail/[id]" options={{headerShown:true,title:'Product Details'}}></Stack.Screen>
            <Stack.Screen name="editproduct/[id]" options={{headerShown:true,title:'Edit Product'}}></Stack.Screen>
        </Stack>
    )
}