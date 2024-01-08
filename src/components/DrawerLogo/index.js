import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function DrawerLog(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image source={require('../../img/logo1.png')} style={{ resizeMode: 'contain' }}></Image>
                <Text style={{ color: '#f0f2ff', fontSize: 20 }}>Bem-vindo!</Text>
                <Text style={{ color: '#f0f2ff', fontSize: 18, fontWeight: 'bold', marginBottom: 30 }}>Usuário!</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label='Sair'
                labelStyle={{ fontSize: 18, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                onPress={() => alert('clicou')}>
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
})