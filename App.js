import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from './src/config/firebaseConfig';
import Login from './src/screens/login';
import CreateAccount from './src/screens/createAccount';
import IForgotMyPassword from './src/screens/iForgotMyPassword';
import Contacts from './src/screens/contacts'; 
import ContactProfile from './src/screens/contactProfile';
import Chat from './src/screens/chat';
import Catalog from './src/screens/catalog';
import MyCatalog from './src/screens/myCatalog';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });

    return unsubscribe; 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="ContactProfile" component={ContactProfile} /> 
            <Stack.Screen name="MyCatalog" component={MyCatalog} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Catalog" component={Catalog} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="IForgotMyPassword" component={IForgotMyPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}