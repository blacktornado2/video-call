import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    SignUp: {
      screen: SignUpScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
      options: { title: 'Welcome' },
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return (
      <Navigation />
  );
}

export default App;
