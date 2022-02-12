import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    titleWrapper: {
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderBottomColor: 'white',
        borderBottomWidth: 3,
        width: '100%',
        paddingBottom: 10,
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
        height: windowHeight
    },
    secondView: {
        height: windowHeight*0.9,
        width: windowWidth*0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        overflow: 'hidden',
    },
    modalMainView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        height: windowHeight,
        
    },
    modalSecondView: {
        flex: 2,
        width: windowWidth*0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    formWrapper: {
        flex: 1,
        width: '80%',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    formFieldView: {
        flex: 0,
        flexShrink: 0,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    formTextInput: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 10,
        width: '100%',
        color: 'white',
    },
    formButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    button: {
        width: 150,
        height: 60,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
    },
    buttonDesc: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 10
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    mainInfoView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
    },
    starsWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    contentWrapper:{
        flexGrow: 1,
        width: '70%',
    },
    fieldName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-start',
    },
    fieldContent: {
        fontStyle: 'italic',
        fontSize: 13,
        color: 'white',
        alignSelf: 'flex-end',
    },
})

module.exports = {styles}