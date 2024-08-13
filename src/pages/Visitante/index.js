import React, {useState}from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'


export default function Visitante() {

    const [planta, setPlanta] = useState('');

    function pesquisarPlantas(){
        alert('Pesquisar: ' + planta)
        setPlanta('')
    }
    return (
        <View style={styles.container}>
            <View style={styles.areaInput}>
                <TextInput
                placeholder="Pesquisar Plantas"
                style={styles.input}
                value={planta}
                onChangeText={(text) => setPlanta(text)}
                />
                <TouchableOpacity style={styles.btnPesquisar} onPress={pesquisarPlantas}>
                    <Text style={styles.txtPesquisar}>Pesquisar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <View style={styles.cardNoticia}>
                <Image source={require('../../img/logo1.png')} style={{
                            width: 130,
                            height: 118
                        }}></Image>
                    <Text>Testando o bloco de noticia</Text>
                </View>
            </TouchableOpacity>
        </View>

        //https://www.tuacasa.com.br/plantas-faceis-de-cuidar/
        //teste1234
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#ece3ce',
    },
    input: {
        color: '#3a4d39',
        height: 55,
        fontSize: 20,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#3a4d39',
        backgroundColor: 'rgba(232,211,182,.61)',
        marginTop: 20,
        borderRadius: 10,
        width: 310,
        margin: 5

    },
    btnPesquisar: {
        backgroundColor: '#3a4d39',
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 0.40,
        borderRadius: 24,
        height: 55,
        marginTop: 18,

    },
    txtPesquisar: {
        color: 'rgba(255,255,255,.9)',
        fontSize: 20,
        textAlign: 'center',
        padding: 12
    },
    cardNoticia: {
        backgroundColor: '#E8D3B6',
        padding:20,
        margin: 50,
    }
})
