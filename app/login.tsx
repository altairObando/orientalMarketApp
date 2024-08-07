import { Alert, StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { useState } from 'react';
import { useUserData } from '@/data/UserStore';
import { router } from 'expo-router';
import { RequestLogin } from '@/scripts/requestLogin';

export default function Login() {
  const [ userName, setUserName ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
  const setUserData = useUserData(state => state.setUserData);
  const onLoginClick = async ()=> {
    const loginData = await RequestLogin({ username: (userName ||''), password: (password || '') });
    if(!loginData.ok){
      Alert.alert(loginData.detail || 'Login error');
      return;
    }
    setUserData({ token: loginData.access, refreshToken: loginData.refresh, username: userName });
    router.replace('/');
  }
  return <Layout style={styles.container}>
    <Layout
      style={styles.container}
      level='4' >
      <Layout style={ styles.layout }>
        <Text>New Login</Text>        
        <Input autoCapitalize='none' placeholder='Username' value={userName} onChangeText={newValue => setUserName(newValue)} />
        <Input placeholder='Password' value={password} onChangeText={newValue => setPassword(newValue)} secureTextEntry />
        <Button onPress={onLoginClick}>Login</Button>
      </Layout>
    </Layout>
  </Layout>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    rowGap: 10,
    width: "100%", height: "100%"
  },
});