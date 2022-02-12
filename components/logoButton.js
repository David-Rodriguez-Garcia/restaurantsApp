import { StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function mainButton(props){
    return (
        <Pressable
        onPress={props.onPress}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button, props.style]}>
            <Icon size={props.size} name={props.name} color={props.color} />
        </Pressable>
    )
}



const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
})