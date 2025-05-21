
import { CategoryComponentProps } from "../../lib/types/componenttypes/mainpage/CategoryComponentProps";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

export function Category({
    categoryId,
    categoryDescription,
    categoryName,
    categoryImgUrl}:CategoryComponentProps){

        return(
            <View style = {styles.viewContainer}>
                <Text style={styles.textStyle}>{categoryDescription}</Text>
                <Image source={{uri:categoryImgUrl}} style={{ width:75, height: 75 }}></Image>
            </View>
        )

}

const styles = StyleSheet.create({
    viewContainer:{
        margin:10,
        backgroundColor:'blue',
        padding:10,
        borderRadius:20
    },
    viewStyle:{
        borderRadius:20
    },
    textStyle:{
        color:'white',
        alignSelf:'center'
    }
});