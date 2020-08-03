import React, { useReducer, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setNavigator } from './src/navigationRef';
import { AuthContext, actions, authReducer } from './src/context/AuthContext';
import { Provider as UsersProvider } from './src/context/UsersContext';
import { Provider as UserImageProvider } from './src/context/UserImageContext';
import { Provider as UserAddressProvider } from './src/context/UserAddressContext';
import ResolveAuth from './src/screens/ResolveAuth';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import UsersList from './src/screens/UsersList';
import UserDetails from './src/screens/UserDetails';
import SendEmail from './src/screens/SendEmail';
import Account from './src/screens/Account';
import CameraScreen from './src/screens/CameraScreen';
import MapScreen from './src/screens/Maps';


import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginFlow = () => {
  return <Stack.Navigator
    initialRouteName="ResolveAuth">
    <Stack.Screen
      name="ResolveAuth"
      component={ResolveAuth}
      options={{
        header: () => null
      }} />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        title: 'Users- SignIn / SignUp',
        header: () => null
      }}
    // options={Login.navigationOptions}
    />
    <Stack.Screen
      name="Signup"
      component={SignUp}
      options={{
        title: 'Users- Registration',
        header: () => null
      }}
    />
  </Stack.Navigator>
}

const UsersFlow = () => {
  return <Stack.Navigator
    initialRoutename="Users"
  >
    <Stack.Screen
      name="Users"
      component={UsersList}
      options={{ title: 'Registered Users' }}
    />
    <Stack.Screen
      name="Details"
      component={UserDetails}
      options={{ title: 'User Details' }}
    />
    <Stack.Screen
      name="Send"
      component={SendEmail}
      options={{ title: 'Send Email' }}
    />
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={{ title: 'Use Camera' }}
    />
    <Stack.Screen
      name="Maps"
      component={MapScreen}
      options={{
        title: 'Add your address'
      }}
    />
  </Stack.Navigator>
}

const MainFlow = () => {
  return <Tab.Navigator
    initialRoutename="Users"
  >
    <Tab.Screen
      name="UsersFlow"
      component={UsersFlow}
    />
    <Tab.Screen
      name="Account"
      component={Account} />
  </Tab.Navigator>
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default () => {
  const [state, dispatch] = useReducer(authReducer, { token: null, errorMessage: '' });

  const boundActions = {};
  for (let key in actions) {
    boundActions[key] = actions[key](dispatch);
  }
  console.log({ state, boundActions });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    // registerForPushNotificationsAsync().then(device_token => setExpoPushToken(device_token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    console.log('expoPushToken  ', expoPushToken, 'end');
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, []);

  return <AuthContext.Provider value={{ state, ...boundActions }}>
    <UsersProvider>
      <UserImageProvider>
        <UserAddressProvider>
          <NavigationContainer ref={(navigation) => {
            setNavigator(navigation);
          }}>
            {!state.token ?
              <LoginFlow /> :
              <MainFlow />}
          </NavigationContainer>
        </UserAddressProvider>
      </UserImageProvider>
    </UsersProvider>
  </AuthContext.Provider>
}

async function registerForPushNotificationsAsync() {
  let device_token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push device_token for push notification!');
      return;
    }
    device_token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(device_token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return device_token;
}

// export default () => {
//   return <UsersProvider>
//     <App />
//   </UsersProvider>

// }

// export default () => {
//   return <NavigationContainer>
//     <UsersProvider>
//       <Navigator />
//     </UsersProvider>
//   </NavigationContainer>
// }
