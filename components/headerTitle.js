import {Text, View} from 'react-native';
import {styles} from '../styles/principal'

export default function headerTitle(props){
    return (
        <View style={[styles.titleWrapper, props.viewStyle]}>
            <Text style={[styles.title, props.textStyle]}>
                {props.text}
            </Text>
        </View>
    )
}