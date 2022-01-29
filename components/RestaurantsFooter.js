import { StyleSheet, Text, View, Button, Pressable, Alert } from 'react-native';
import SMButton from './mainButton'
import { useNavigation } from '@react-navigation/native';
import IconButton from './logoButton';

import {useState, useEffect} from 'react';
//second view footer

import * as Linking from 'expo-linking'
export default function RestaurantsFooter(props) {
    //to use navigation without passing it as a prop
    const navigation = useNavigation();

    const {restaurantsData, index} = props.route;

    const onRightPressCB = () => {
        if (restaurantsData.length - 1 != index){
            let newIndex = index + 1;
            //console.log('Guardian 2');
            //console.log(restaurantsData, newIndex);
            //stupid error -> Passing newIndex and then trying to extract the variable index, instead of passing index as the 'key' name
            //we are using replace() instead of navigate() so the scrollView position rerenders. Otherwise, it won't go back to it's original position
            navigation.replace('MyRestaurants', {restaurantsData, index: newIndex});
        } else {
            Alert.alert('Error', 'Already in the last restaurant')
        }
    }
    const onLeftPressCB = () => {
        if (index != 0){
            let newIndex = index - 1;
            //we are using replace() instead of navigate() so the scrollView position rerenders. Otherwise, it won't go back to it's original position
            navigation.replace('MyRestaurants', {restaurantsData, index: newIndex});
        } else {
            Alert.alert('Error', 'Already in the first restaurant')
        }
    }
    //when loading the page we should calculate the postion to set teh left & right buttons availability

    const phoneCall = () => {
        Linking.openURL('tel:'+restaurantsData[index].phone)
    }

    return (
        <View style={styles.footerWrapper}>
                <View style={styles.movilityWrapper}>
                    <IconButton onPress={onLeftPressCB} style={{opacity: index == 0 ? 0.5 : 1}} size={30} name='arrow-left' color='white'/>
                    <IconButton onPress={phoneCall} size={30} name='phone' color='white'/>
                    <IconButton onPress={onRightPressCB} style={{opacity: restaurantsData.length - 1 == index ? 0.5 : 1}} size={30} name='arrow-right' color='white' />
                </View>
            <SMButton onPress={() => {navigation.goBack()}} text={props.text} style={styles.backButton}  />
        </View>
    )
}

const styles = StyleSheet.create({
    footerWrapper: {
        justifyContent: 'flex-end',
        width: '100%',
    },
    backButton: {
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 3,
        width: '100%',
    },
    //wraps the movility buttons (next / go back)
    movilityWrapper: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 25,
        paddingHorizontal: 10
    },
})