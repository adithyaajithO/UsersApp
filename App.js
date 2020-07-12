import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setNavigator } from './src/navigationRef';
import { AuthContext, actions, authReducer } from './src/context/AuthContext';
import { Provider as UsersProvider } from './src/context/UsersContext';
import ResolveAuth from './src/screens/ResolveAuth';
import Login from './src/screens/Login';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import UsersList from './src/screens/UsersList';
import UserDetails from './src/screens/UserDetails';
import SendEmail from './src/screens/SendEmail';
import Account from './src/screens/Account';


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
      options={{ title: 'Users- SignIn / SignUp' }}
    // options={Login.navigationOptions}
    />
    <Stack.Screen
      name="Signup"
      component={SignUp}
      options={{ title: 'Users- Registration' }}
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

export default () => {
  const [state, dispatch] = useReducer(authReducer, { token: null, errorMessage: '' });

  const boundActions = {};
  for (let key in actions) {
    boundActions[key] = actions[key](dispatch);
  }
  console.log({ state, boundActions });

  return <AuthContext.Provider value={{ state, ...boundActions }}>
    <UsersProvider>
      <NavigationContainer ref={(navigation) => {
        setNavigator(navigation);
      }}>
        {!state.token ?
          <LoginFlow /> :
          <MainFlow />}
      </NavigationContainer>
    </UsersProvider>
  </AuthContext.Provider>
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
