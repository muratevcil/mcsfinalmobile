import { Stack } from "expo-router";
import { screenOptionsFactory } from "expo-router/build/useScreens";


export default function ProfileLayout(){

    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:true, title:"Profile"}}></Stack.Screen>
            <Stack.Screen name="profilesecondtab" options={{headerShown:true, title:"Profile Second Tab", headerLeft:()=>null}}></Stack.Screen>
        </Stack>
    )

}