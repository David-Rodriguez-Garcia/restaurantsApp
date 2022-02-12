import { Text, View, TextInput, Alert } from 'react-native';
import SMButton from '../components/mainButton'
import {styles} from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import SoloFooter from '../components/soloFooter'
import LogoButton from '../components/logoButton'

import {useEffect, useState} from 'react'
import * as SQLite from 'expo-sqlite'
import * as ImagePicker from 'expo-image-picker'

const db = SQLite.openDatabase("restaurants_app");

const AddRestaurantScreen = ({navigation}) => {
   
   const [image, setImage] = useState(null);
   const getImage = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: 'Images',
           allowsEditing: true,
           aspect: [1,1],
           quality: 1,
        });
                
        if (!result.cancelled){
            setImage(result.uri);
        }
    }
    
    
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [comments, setComments] = useState('');
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
        let eName = false;
        let eLocation = false;
        let ePhone = false;
        let eComments = false;
        
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

export default AddRestaurantScreen;