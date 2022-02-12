import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import MainScreen from './Screens/Main';
import PreferencesScreen from './Screens/Preferences';
import MyRestaurantsScreen from './Screens/MyRestaurants';
import AddRestaurantScreen from './Screens/AddRestaurant';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Screen 
        name = 'Home'
        component = {MainScreen}
        />
        <Stack.Screen 
        name = 'Preferences'
        component = {PreferencesScreen}
        />
        <Stack.Screen 
        name = 'MyRestaurants'
        component = {MyRestaurantsScreen}
        />
        <Stack.Screen 
        name = 'AddRestaurant'
        component = {AddRestaurantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
