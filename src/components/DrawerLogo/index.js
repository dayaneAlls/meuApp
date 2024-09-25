import React, { useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { AuthContext } from "../../contexts/auth";

export default function DrawerLog(props) {
    const { signOut, user } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image source={require('../../img/logo1.png')} style={{ resizeMode: 'contain' }}></Image>
                <Text style={{ color: '#f0f2ff', fontSize: 20, paddingTop: 30 }}>Bem-vindo!</Text>
                <Text style={{ color: '#f0f2ff', fontSize: 18, fontWeight: 'bold', marginBottom: 30 }}>{user}</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem {...props}
                label={'Sair'}
                onPress={() => signOut()}
            >
            </DrawerItem>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    drawerItem: {
        fontSize: 30,

    }
})