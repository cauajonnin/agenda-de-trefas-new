import './gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { AuthProviderList } from './src/context/authContext_list';
import { FirebaseAuthProvider } from './src/context/firebaseAuthContext';
import './src/firebaseConfig';

export default function App() {
  return (
    <FirebaseAuthProvider>
      <AuthProviderList>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProviderList>
    </FirebaseAuthProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
