import { View } from 'react-native';
import RestaurantsFooter from '../components/RestaurantsFooter'
import {styles} from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import RestaurantsContent from '../components/MyRestaurantsContent'

const MyRestaurantsScreen = ({navigation, route}) => {
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

export default MyRestaurantsScreen;