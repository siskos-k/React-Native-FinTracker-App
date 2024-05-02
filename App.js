import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import MainScreen from './Screens/MainScreen';
// import MainPage from './Screens/MainPage';
// import MainPage from './Screens/MainScreen';
import MainPage from './Screens/MainScreen';
export default function App() {
  return (
    <MainPage/>
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
