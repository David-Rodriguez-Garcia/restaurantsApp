import { StyleSheet, Text, View, Button, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SMButton from '../components/mainButton'
import RestaurantsFooter from '../components/RestaurantsFooter'
import {styles} from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import SoloFooter from '../components/soloFooter'

import LogoButton from '../components/logoButton'

import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PreferencesScreen = ({navigation}) => {

    //set the preferences correctly when leading
    useEffect(() => {
        getPref();
    }, []);

    //get the prefferences to set it correctly
    const getPref = async () => {
        try {
            const pref = await AsyncStorage.getItem('RatingOrder');
            if (pref === 'wrf'){
                setBrf(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //best rated first
    const [brf, setBrf] = useState(true)

    const BRF = async () => {
        if (!brf){
            setBrf(true);
            try{
                await AsyncStorage.setItem('RatingOrder', 'brf');
            } catch (error){
                console.log(error);
            }
        }
    }
    const WRF = async () => {
        if (brf){
            setBrf(false);
            try{
                await AsyncStorage.setItem('RatingOrder', 'wrf');
            } catch (error){
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.secondView}>
                <HeaderTitle text='Preferences' />
                <View style={{width: '100%', padding: 30}}>
                    <Text style={[styles.title, {textDecorationLine: 'underline'}]}>Order by stars</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <LogoButton onPress={BRF} style={{borderWidth: 0}} name='circle' size={15} color={brf ? 'yellow' : 'white'} />
                            <Text onPress={BRF} style={{color: 'white', textAlign: 'center', fontSize: 16}}>Best rated first</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <LogoButton onPress={WRF} style={{borderWidth: 0}} name='circle' size={15} color={brf ? 'white' : 'yellow'} />
                            <Text onPress={WRF} style={{color: 'white', textAlign: 'center', fontSize: 16}}>Worst rated first</Text>
                    </View>
                </View>
                <SoloFooter onPress={() => {navigation.goBack()}} text={'Go Back'}/>
            </View>
        </View>
    );
}


export default PreferencesScreen;