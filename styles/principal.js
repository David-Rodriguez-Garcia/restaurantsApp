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
    //for the add restaurant form wrapper
    formWrapper: {
        flex: 1,
        width: '80%',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    formFieldView: {
        flex: 0,
        flexShrink: 0,
        //flexWrap: 'wrap',this was a test for opening the keyboard
        //without killing the UI
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    //if we use formTitle we have a styling already made for it - buttonDesc
    formTextInput: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 10,
        width: '100%',
        color: 'white',
        //flexShrink: 30,
        //minWidth: '80%'
    },
    //the view that contains the two buttons
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
        //backgroundColor: 'blue',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'blue',
    },
    //title that describes a logoButton outside of it
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
    //wraps up all the info about the restaurant. The data AND rating
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
    //for the view that wraps the info about the restaurants displayed - NOT THE RATING
    contentWrapper:{
        //TODO - IMPORTANT. KNOW WHY ScrollView doesn't work well with flex: 1 - Interesting
            //for that read -> https://medium.com/@peterpme/taming-react-natives-scrollview-with-flex-144e6ff76c08
        //flex: 1,
        flexGrow: 1,
        //justifyContent: 'space-around',
        //alignItems: 'center',
        width: '70%',
    },
    //for the title of the fields when displaying the restaurants
    fieldName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-start',
    },
    //for the content to be displayed
    fieldContent: {
        fontStyle: 'italic',
        fontSize: 13,
        color: 'white',
        alignSelf: 'flex-end',
    },
})

module.exports = {styles}