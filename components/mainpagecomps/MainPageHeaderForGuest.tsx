import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Router, useRouter } from "expo-router";
export function MainPageHeaderForGuest(){
    const router = useRouter();
    const redirectToLogin= async()=>{
        router.replace('/auth/login');
    }

    return(
        <View style={styles.mainPageHeaderContainer}>
            <Image source={require('./../../assets/images/mainlogo.png')} style={{height:'50%',width:'30%'}}></Image>
            <TouchableOpacity>

            <Text style={styles.mainPageWelcomeText}>Welcome, {<TouchableOpacity onPress={redirectToLogin}>
                <Text style={styles.loginText}>login</Text></TouchableOpacity>} to access for cart features.</Text>

            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    mainPageHeaderContainer: {
      height: '10%',
      width: '100%',
      backgroundColor: 'blue',
  
      flexDirection: 'row', // yatay hizalama
      justifyContent: 'space-between', // biri sola, biri sağa
      alignItems: 'center', // dikey ortalama
      paddingHorizontal: '5%' // içten boşluk
    },
    mainPageLogo: {
      fontSize: 12,
      fontFamily: 'Arial',
      color: 'white',
    },
    mainPageWelcomeText: {
      color: 'white',
      textAlign: 'right',
      fontSize:12,
      alignItems:'center'
    },
    loginText: {
      color: 'aqua',
      
    }
  });
