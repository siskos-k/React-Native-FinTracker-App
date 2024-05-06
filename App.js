import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './Screens/MainScreen';
import InvestmentScreen from './Screens/InvestmentScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

    <Stack.Navigator initialRouteName="MainPage">
    <Stack.Screen name="MainPage" component={MainPage} options={{ title: 'Overview' }} />
    <Stack.Screen name="InvestmentScreen" component={InvestmentScreen} options={{ title: 'Investments' }} />
  </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
