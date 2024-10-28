import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
`import { StatusBar } from 'react-native';`
import AppNavigator from './navigators/AppNavigator'

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <AppNavigator/>
        <Toast/>
      </NavigationContainer>
  );
}