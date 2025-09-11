import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const RootStack = createNativeStackNavigator({
  screens: {
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
  return <Navigation />;
}

export default App;
