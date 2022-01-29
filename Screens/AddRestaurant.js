import { StyleSheet, Text, View, Button, Pressable, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Constants from 'expo-constants';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SMButton from '../components/mainButton'
import RestaurantsFooter from '../components/RestaurantsFooter'
import {styles} from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import SoloFooter from '../components/soloFooter'
import LogoButton from '../components/logoButton'

import {useEffect, useState} from 'react'
import * as SQLite from 'expo-sqlite'
import * as ImagePicker from 'expo-image-picker'

//opening the database
const db = SQLite.openDatabase("restaurants_app");
/*    {
        name: 'restaurants_app',
        location: 'default',
    },
    () => {console.log('Success');},
    () => {console.log('Error opening the SQLite database');}
)*/

const AddRestaurantScreen = ({navigation}) => {
    
    /*Deleted - Using placeholder - It would go over the TextInputs
    <Text style={styles.formTitle}>Name:</Text>
    <Text style={styles.formTitle}>Location:</Text>
    <Text style={styles.formTitle}>Phone:</Text>
    <Text style={styles.formTitle}>Comments:</Text>
    */
   
   const [image, setImage] = useState(null);
   const getImage = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: 'Images',
           allowsEditing: true,
           aspect: [1,1],
           quality: 1,
        });
        
        //console.log(result);
        
        if (!result.cancelled){
            setImage(result.uri);
        }
    }
    
    
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [comments, setComments] = useState('');
    //we use useEffect to execute the function createTable when the screen loads
    useEffect(() => {
        createTable();
    }, []);
    
    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS restaurant'
            +'(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, phone TEXT, comments TEXT, image TEXT, rating INTEGER);')
        })
    }
    
    async function submitData(){
        //number of stars the restaurant has:
        //empty fields
        let eName = false;
        let eLocation = false;
        let ePhone = false;
        let eComments = false;
        
        //for regExp
        let rName = false;
        let rLocation = false;
        let rPhone = false;
        let rComments = false;
        
        if (name.length === 0) eName = true;
        if (location.length === 0) eLocation = true;
        if (phone.length === 0) ePhone = true;
        if (comments.length === 0) eComments = true;
        if (eName || eLocation || ePhone || eComments){
            Alert.alert('ERROR', 'All fields must be provided');
        }else{
            //TODO -> Hacer las regExp
            if (/[^A-Za-z0-9\'\u0020]/.test(name)) rName = true;
            if (/[^A-Za-z0-9\'\u0020]/.test(location)) rLocation = true;
            if (/[^0-9\u0020]/.test(phone)) rPhone = true;
            if (/[^A-Za-z0-9\'\u0020.,;:-]/.test(comments)) rComments = true;
            
            if (!image){
                Alert.alert('ERROR', 'An image must be selected');
            }else if (rName || rLocation || rPhone || rComments){
                if (rName){
                    Alert.alert('Error', 'Using forbidden characters in the Name field');
                }
                if (rLocation){
                    Alert.alert('Error', 'Using forbidden characters in the Location field');
                }
                if (rPhone){
                    Alert.alert('Error', 'Using forbidden characters in the Phone field');
                }
                if (rComments){
                    Alert.alert('Error', 'Using forbidden characters in the Comments field');
                }
                
            }else if (rating == 0){
                Alert.alert('Error', 'You must assign a rating to the restaurant');
            }else{
                await db.transaction(async (tx) => {
                    await tx.executeSql(`INSERT INTO restaurant (name, location, phone, comments, image, rating)`
                    + ` VALUES ("${name}", "${location}", "${phone}", "${comments}", "${image}", "${rating.toString()}");`)
                })
                navigation.navigate('Home');
            }
        }
    }

    const [rating, setRating] = useState(0);
    
    return (
        <View style={styles.mainView}>
            <View style={styles.secondView}>
                <HeaderTitle text='Add Restaurant' />
                
                <View style={styles.formWrapper}>
                    <View style={styles.formFieldView}>
                        <TextInput placeholder='Name' onChangeText={(text) => {setName(text)}} maxLength={20} placeholderTextColor={'white'} style={styles.formTextInput}></TextInput>
                    </View>
                    <View style={styles.formFieldView}>
                        <TextInput placeholder='Location' onChangeText={(text) => {setLocation(text)}} maxLength={40} placeholderTextColor={'white'} style={styles.formTextInput}></TextInput>
                    </View>
                    <View style={styles.formFieldView}>
                        <TextInput placeholder='Phone' onChangeText={(text) => {setPhone(text)}} maxLength={15} keyboardType='number-pad' placeholderTextColor={'white'} style={styles.formTextInput}></TextInput>
                    </View>
                    <View style={[styles.formFieldView, {flex: 0}]}>
                        <TextInput placeholder='Comments' onChangeText={(text) => {setComments(text)}} maxLength={200} placeholderTextColor={'white'} style={[styles.formTextInput, {marginVertical: 10}]}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <LogoButton style={{borderWidth: 0}} onPress={() => setRating(1)} size={23} name={'star'} color={rating >= 1 ? 'yellow': 'white'} />
                        <LogoButton style={{borderWidth: 0}} onPress={() => setRating(2)} size={23} name={'star'} color={rating >= 2 ? 'yellow': 'white'} />
                        <LogoButton style={{borderWidth: 0}} onPress={() => setRating(3)} size={23} name={'star'} color={rating >= 3 ? 'yellow': 'white'} />
                        <LogoButton style={{borderWidth: 0}} onPress={() => setRating(4)} size={23} name={'star'} color={rating >= 4 ? 'yellow': 'white'} />
                        <LogoButton style={{borderWidth: 0}} onPress={() => setRating(5)} size={23} name={'star'} color={rating == 5 ? 'yellow': 'white'} />
                    </View>
                    <View style={styles.formButtonsView}>
                        <View style={{alignItems: 'center'}}>
                            <LogoButton name='image' onPress={getImage} color='white' size={23}/>
                            <Text style={styles.buttonDesc}>Image</Text>
                        </View>
                        <SMButton text='Add' onPress={() => submitData()}/>
                    </View>
                </View>
                
                <SoloFooter onPress={() => { navigation.goBack() }} text={'Go Back'} />
            </View>
        </View>
    );
}

/*
const styles = StyleSheet.create({
    titleWrapper: {
        height: '20%',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    mainView: {
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'gold',
    },
    secondView: {
        height: '90%',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        overflow: 'hidden',
    },
    button: {
        width: 150,
        height: 60,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        //backgroundColor: 'blue',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        justifyContent: 'space-between',
        height: '30%',
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})*/

export default AddRestaurantScreen;