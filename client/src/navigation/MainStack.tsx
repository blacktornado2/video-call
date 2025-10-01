import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CallScreen from '../screens/CallScreen';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";

const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Call" 
      component={CallScreen} 
      initialParams={{ roomId: '12345' }} // Hardcoded roomId
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="phone" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainStack;
