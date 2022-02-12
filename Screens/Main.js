import { Text, View, Modal, ScrollView, Image, Alert } from 'react-native';
import SMButton from '../components/mainButton'
import { styles } from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import SoloFooter from '../components/soloFooter'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoButton from '../components/logoButton'
import * as Linking from 'expo-linking'

import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'

const db = SQLite.openDatabase("restaurants_app");

const fileContent = require('../assets/infoContent.json');

const MainScreen = ({ navigation }) => {
    const toScreen = (screen, ...args) => {
        navigation.navigate(screen, ...args);
    }
    
    useEffect(() => {
        createTable();
        getAllRestaurants();
        
        const willFocusSubscription = navigation.addListener('focus', () => {
            getAllRestaurants();
        });
        return willFocusSubscription;
    }, []);
    
    const dropTable = () => {
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS restaurant;');
        })
    }
    
    const createTable = async () => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS restaurant'
            + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, phone TEXT, comments TEXT, image TEXT, rating INTEGER);')
        })
    }
    
    const [restaurantsData, setRestaurantsData] = useState('');
    const [restaurantCount, setRestaurantCount] = useState(0);
    async function getAllRestaurants() {
        let pref;
        try {
            pref = await AsyncStorage.getItem('RatingOrder');
            await db.transaction(async (tx) => {
                await tx.executeSql(`SELECT name, location, phone, comments, image, rating FROM restaurant ORDER BY rating ${pref == 'brf' ? 'DESC': 'ASC'}`, [], (tx, results) => {
                    setRestaurantCount(results.rows.length);
                    setRestaurantsData(results.rows._array);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    const clearRestaurants = () => {
        dropTable();
        createTable();
        getAllRestaurants();
    }

    const showRestaurants = () => {
        if (restaurantCount > 0){
            toScreen('MyRestaurants', { restaurantsData, index });
        }else{
            Alert.alert('Warning', 'There are no restaurants to show... Add a restaurant by clicking on the Add Restaurant Button')
        }
    }

    let index = 0;

    const [modal, setModal] = useState(false);
    return (
        <View style={styles.mainView}>
            <Modal
                animationType='slide'
                transparent
                visible={modal}
                onRequestClose={() => setModal(false)}>
                <View style={styles.modalMainView}>
                    <HeaderTitle text='Thank you for coming...' viewStyle={{backgroundColor: '#61DBFB', borderTopLeftRadius: 50,  borderTopRightRadius: 50}}/>
                    <Image source={require('../assets/reactNativeLogo.png')} style={{ flex: 1 }} resizeMode='contain' />
                    <View style={styles.modalSecondView}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Info</Text>
                            <View style={{alignItems: 'center'}}>
                                    <Image source={require('../assets/DAVID.jpg')} style={{height: 150, width: 150, margin: 20}} resizeMode='contain' />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>{fileContent.content}</Text>
                                    <View style={{flexDirection: 'row', margin: 20}}>
                                        <LogoButton onPress={() => Linking.openURL('tel:+34601027077')} style={{backgroundColor: 'black', marginRight: 10}} name='phone' size={30} color='white'/>
                                        <LogoButton onPress={() => Linking.openURL('mailto:davidrodriguez.dev@gmail.com')} style={{backgroundColor: 'black', marginLeft: 10}} name='envelope' size={30} color='white'/>
                                    </View>
                            </View>
                        </ScrollView>
                    </View>                
                    <SoloFooter text='Back' onPress={() => setModal(false)} buttonStyle={{backgroundColor: '#61DBFB'}} viewStyle={{backgroundColor: '#61DBFB', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}/>
                </View>
            </Modal>
            <View style={styles.secondView}>
                <HeaderTitle text='David Restaurants' />
                <Icon style={{paddingTop: 40}} size={80} name={'restaurant'} color={'white'} />
                <View style={styles.buttonWrapper}>
                    <Text style={{ color: 'white' }}>NUMBER OF RESTAURANTS: {restaurantCount}</Text>
                    <SMButton onPress={showRestaurants} text='My Restaurants' />
                    <SMButton onPress={() => { toScreen('AddRestaurant') }} text='Add Restaurant' />
                    <SMButton onPress={() => { toScreen('Preferences') }} text='Preferences' />
                    <SMButton textStyle={{textAlign: 'center'}} onPress={clearRestaurants} text='Clear all Restaurants' />
                </View>
                <SoloFooter text='Info' onPress={() => setModal(true)} />
            </View>
        </View>
    );
}



export default MainScreen;