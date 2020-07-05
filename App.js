import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as UsersProvider } from './src/context/UsersContext';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import UsersList from './src/screens/UsersList';
import UserDetails from './src/screens/UserDetails';
import SendEmail from './src/screens/SendEmail';


const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator
    initialRoutename="Login"
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Users- Login / SignUp' }}
      // options={Login.navigationOptions}
    />
    <Stack.Screen
      name="Signup"
      component={SignUp}
      options={{ title: 'Users- Registration' }}
    />
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
  </Stack.Navigator>
}

const App = () => {
  return <NavigationContainer>
    <UsersProvider>
      <Navigator />
    </UsersProvider>
  </NavigationContainer>
}

export default () => {
  return <UsersProvider>
    <App />
  </UsersProvider>

}

// export default () => {
//   return <NavigationContainer>
//     <UsersProvider>
//       <Navigator />
//     </UsersProvider>
//   </NavigationContainer>
// }