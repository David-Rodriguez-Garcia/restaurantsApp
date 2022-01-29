import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import SMButton from '../components/mainButton'

export default function soloFooter(props){
    return (
        <View style={[styles.footerWrapper, props.viewStyle]}>
            <SMButton onPress={props.onPress} text={props.text} style={[styles.soloButton, props.buttonStyle]} />
        </View>
    )
}

const styles = StyleSheet.create({
    footerWrapper: {
        justifyContent: 'flex-end',
        width: '100%',
        overflow: 'hidden',
    },
    soloButton: {
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 3,
        width: '100%',
    },
})