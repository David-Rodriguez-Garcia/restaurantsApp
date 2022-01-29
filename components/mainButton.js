import { StyleSheet, Text, Pressable } from 'react-native';

export default function mainButton(props){
    return (
        <Pressable
        onPress={props.onPress}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button, props.style]}
        >
            <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
        </Pressable>
    )
}



const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 60,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }

})