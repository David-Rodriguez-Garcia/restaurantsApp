import { StyleSheet, Text, View, Button, Pressable, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SMButton from '../components/mainButton'
import RestaurantsFooter from '../components/RestaurantsFooter'
import { styles } from '../styles/principal'
import HeaderTitle from '../components/headerTitle'
import IconButton from '../components/logoButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';

export default function restaurantsContent(props) {
	const {restaurantsData, index} = props.route;

	const DATA = [{ name: 'Name:', data: restaurantsData[index].name },
    { name: 'Phone:', data: restaurantsData[index].phone },
    { name: 'Location:', data: restaurantsData[index].location },
    { name: 'Comments:', data: restaurantsData[index].comments },
    ]

    return (
        <View style={styles.mainInfoView}>
            <View style={styles.starsWrapper}>
                <Icon style={{ paddingHorizontal: 5 }} size={23} name={'star'} color={restaurantsData[index].rating >= 1 ? 'yellow' : 'white'} />
                <Icon style={{ paddingHorizontal: 5 }} size={23} name={'star'} color={restaurantsData[index].rating >= 2 ? 'yellow' : 'white'} />
                <Icon style={{ paddingHorizontal: 5 }} size={23} name={'star'} color={restaurantsData[index].rating >= 3 ? 'yellow' : 'white'} />
                <Icon style={{ paddingHorizontal: 5 }} size={23} name={'star'} color={restaurantsData[index].rating >= 4 ? 'yellow' : 'white'} />
                <Icon style={{ paddingHorizontal: 5 }} size={23} name={'star'} color={restaurantsData[index].rating == 5 ? 'yellow' : 'white'} />
            </View>
            <Image style={{ height: 150, width: 150 }} source={{ uri: restaurantsData[index].image }} />
            <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                <Text style={[styles.title, {
                    marginVertical: 10, textDecorationLine: 'underline'
                }]}>{restaurantsData[index].name}</Text>
                {
                    DATA.map((Element, Index) => {
                        return (
                            <View style={styles.contentWrapper} key={"mainView"+Index}>
                                <Text style={styles.fieldName}>
                                    {Element.name}
                                </Text>
                                <Text style={styles.fieldContent}>
                                    {Element.data}
                                </Text>
                            </View>
                        )
                    }
                    )
                }
            </ScrollView>
        </View>
    )
}