import { StyleSheet, Text, View, Dimensions, Modal, ScrollView, ImageBackground, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SMButton from '../components/mainButton'
import RestaurantsFooter from '../components/RestaurantsFooter'
import { styles } from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import SoloFooter from '../components/soloFooter'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoButton from '../components/logoButton'
import * as Linking from 'expo-linking'

import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as FileSystem from 'expo-file-system'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//opening the database
const db = SQLite.openDatabase("restaurants_app");
/*{
    name: 'restaurants_app',
    location: 'default',
},
() => {console.log('Success');},
() => {console.log('Error opening the SQLite database');}
)*/

//get the file content that will be displayed on the modal
const fileContent = require('../assets/infoContent.json');
//console.log(fileContent);

const MainScreen = ({ navigation }) => {
    //to navigate to a Screen
    const toScreen = (screen, ...args) => {
        navigation.navigate(screen, ...args);
    }
    
    useEffect(() => {
        createTable();
        getAllRestaurants();
        
        //for refreshing the function when going back to it - study
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
    
    //where all the data will be saved
    const [restaurantsData, setRestaurantsData] = useState('');
    const [restaurantCount, setRestaurantCount] = useState(0);
    //best rated first
    async function getAllRestaurants() {
        let pref;
        //get the preferences to set the order of the restaurants
        try {
            pref = await AsyncStorage.getItem('RatingOrder');
            await db.transaction(async (tx) => {
                //we could do a select * instead...
                await tx.executeSql(`SELECT name, location, phone, comments, image, rating FROM restaurant ORDER BY rating ${pref == 'brf' ? 'DESC': 'ASC'}`, [], (tx, results) => {
                    //results is an object
                    //console.log(JSON.stringify(results));
                    //console.log(results.rows.length);
                    setRestaurantCount(results.rows.length);
                    //for (let i = 0; i < results.rows.length; i++){
                    //console.log('Name ' + i + ' ' + results.rows.item(i).name);
                    //}
                    setRestaurantsData(results.rows._array);
                })
            })
        } catch (error) {
            console.log(error);
        }
        /*ERROR WITH useState NOT UPDATING INSTANTLY
        
        const [brf, setBrf] = useState(true);//it was outside of the func
        //get the preferences to set the order of the restaurants
        try {
            const pref = await AsyncStorage.getItem('RatingOrder');
            console.log(pref, brf);
            if (pref === 'wrf'){
                setBrf(false);
            }else {
                setBrf(true);
            }
        } catch (error) {
            console.log(error);
        }
        await db.transaction(async (tx) => {
            //we could do a select * instead...
            console.log(`SELECT name, location, phone, comments, image, rating FROM restaurant ORDER BY rating ${brf ? 'DESC': 'ASC'}`, brf);
            await tx.executeSql(`SELECT name, location, phone, comments, image, rating FROM restaurant ORDER BY rating ${brf ? 'DESC': 'ASC'}`, [], (tx, results) => {
                //results is an object
                //console.log(JSON.stringify(results));
                //console.log(results.rows.length);
                setRestaurantCount(results.rows.length);
                //for (let i = 0; i < results.rows.length; i++){
                //console.log('Name ' + i + ' ' + results.rows.item(i).name);
                //}
                setRestaurantsData(results.rows._array);
            })
        })*/
    }

    const clearRestaurants = () => {
        dropTable();
        createTable();
        getAllRestaurants();
    }

    //to go to the MyRestaurants section
    const showRestaurants = () => {
        if (restaurantCount > 0){
            toScreen('MyRestaurants', { restaurantsData, index });
        }else{
            Alert.alert('Warning', 'There are no restaurants to show... Add a restaurant by clicking on the Add Restaurant Button')
        }
    }

    let index = 0;

    //to display or not the modal
    const [modal, setModal] = useState(false);
    return (
        <View style={styles.mainView}>
            <Modal
                animationType='slide'
                transparent
                visible={modal}
                /*So it closes when they press the back button*/
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
                {/*this view is for wrapping the Buttons*/}
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