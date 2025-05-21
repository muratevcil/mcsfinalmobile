import { View,Text} from "react-native";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Route } from "expo-router";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect,useState } from "react";
import { GuestCard } from "../../../components/authcomponents/GuestCard";
import { TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from "../../../hooks/store/useAuthStore";
import { useAuthActions } from "../../../hooks/useAuthActions";
import { useCartStore } from "../../../hooks/store/useCartStore";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { apiService } from "../../../lib/api";
import ProfilePageUserCard from "../../../components/profile/UserCard";
import { SellerProduct } from "../../../lib/types/apitypes/SellerProducts";
import SellerProductList from "../../../components/profile/SellerProductList";
import { UserDetails } from "../../../lib/types/apitypes/UserDetails";

export default function ProfilePage(){

    const router = useRouter();
    const { jwt } = useAuthStore();
    const { handleQuit } = useAuthActions()
    const [refreshKey, setRefreshKey] = useState(0);
    const { emptyCart } = useCartStore();
    const [userRole,setUserRole] = useState<string[]>([]);
    const [canUserSeeMyProducts,setCanUserSeeMyProducts] = useState<boolean>(false);
    const [productsIfUserIsSeller,setProductsIfUserIsSeller] = useState<SellerProduct[]|null>(null);
    const [userDetails,setUserDetails] = useState<UserDetails|null>(null);
    const setJwt = useAuthStore((state)=>state.setJwt);
    const handleQuitAndClearCache = async () =>{
        handleQuit();
        setJwt(null);
    }

    const handleGetUserRole = async ()=>{
        const response:string[] = (await apiService.getUserRole()).response;
        setUserRole(response);
        const responseForUserDetails:UserDetails = (await apiService.getUserDetails()).response;
        setUserDetails(responseForUserDetails);
        
    }

    const handleCanUserSeeMyProducts= async () => {
        
        userRole.forEach(async eachRole => {
            if(eachRole == "ROLE_SELLER"){
                setCanUserSeeMyProducts(true);
                const response = (await apiService.getSellerProducts()).response;
                setProductsIfUserIsSeller(response);

            }
        });
    }
    
    useFocusEffect(
  useCallback(() => {
    handleGetUserRole();
    console.log(userDetails);
  }, [])
);

useEffect(() => {
  if (userRole.length > 0) {
    handleCanUserSeeMyProducts();
  }
}, [userRole]);

    return(
        <View>
            {
                jwt ?
                <>
                <ProfilePageUserCard name={userDetails?.username} email={userDetails?.email} profileImage={"https://img.icons8.com/?size=100&id=89871&format=png&color=FFFFFF"} onQuit={handleQuit}></ProfilePageUserCard>
                {productsIfUserIsSeller ? (
                        <SellerProductList products={productsIfUserIsSeller} />
                    
                ) : null}
                </>
                            :
                <GuestCard></GuestCard>
            }
        </View>
    )
    
}

const styles = StyleSheet.create({
    linkStyle : {
        color:'red'
    }
});
