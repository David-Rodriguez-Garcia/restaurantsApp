import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SMButton from '../components/mainButton'
import RestaurantsFooter from '../components/RestaurantsFooter'
import {styles} from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import IconButton from '../components/logoButton';
import RestaurantsContent from '../components/MyRestaurantsContent'

const MyRestaurantsScreen = ({navigation, route}) => {
    //Note: the stars that appear on the top are buttons, when they shouldn't be
    //const {name, phone, location, comments} = route.params;
    const {restaurantsData, index} = route.params;
    /*console.log('Guardian 1');
    console.log(typeof restaurantsData);
    console.log(JSON.stringify(restaurantsData), index);*/
    //console.log(restaurantsData[index].name, 
    //    restaurantsData, index);

    //TODO -> Delete margin bottom from HeaderTitle??
    return (
        <View style={styles.mainView}>
            <View style={styles.secondView}>
                <HeaderTitle text='My Restaurants' />
                <RestaurantsContent route={route.params}/>
                <RestaurantsFooter route={route.params} onPress={() => { navigation.goBack() }} text={'Go Back'} />
            </View>
        </View>
    );
}

/*const styles = StyleSheet.create({
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

export default MyRestaurantsScreen;