import React,{ useState } from "react";
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {Text, View,Image, Alert} from 'react-native'
import { useNavigation,NavigationProp  } from '@react-navigation/native';
import {MaterialIcons,Octicons} from '@expo/vector-icons';
import { useFirebaseAuth } from '../../context/firebaseAuthContext';

export default function Login (){
    const navigation = useNavigation<NavigationProp<any>>();
    const { login, register, loading } = useFirebaseAuth();

    const [email,setEmail]               = useState('');
    const [password,setPassword]         = useState('');
    const [showPassword,setShowPassword] = useState(true);
    const [isLogin,setIsLogin]           = useState(true);
    const [passwordError,setPasswordError] = useState(false);
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');


    async function handleAuth() {
        try {
            console.log('handleAuth chamado', { isLogin, email, password });
            
            // Resetar erro de senha
            setPasswordError(false);
            setPasswordErrorMessage('');
            
            if(!email ||!password){
                console.log('Campos vazios');
                setPasswordError(true);
                setPasswordErrorMessage('Informe os campos obrigatórios');
                return Alert.alert('Atenção','Informe os campos obrigatórios!')
            }

            if(password.length < 6){
                console.log('Senha curta');
                setPasswordError(true);
                setPasswordErrorMessage('A senha deve ter pelo menos 6 caracteres');
                return Alert.alert('Atenção','A senha deve ter pelo menos 6 caracteres!')
            }

            console.log('Chamando função de autenticação');
            const result = isLogin 
                ? await login(email, password)
                : await register(email, password);
            
            console.log('Resultado da autenticação:', result);

            if(result.success){
                const message = isLogin 
                    ? (result.message || 'Login realizado com sucesso!') 
                    : (result.message || 'Email criado com sucesso!');
                console.log('Mostrando alerta de sucesso:', message);
                Alert.alert('Sucesso', message);
                navigation.reset({routes:[{name :'BottomRoutes'}]});
            } else {
                console.log('Mostrando alerta de erro:', result.error);
                // Mostrar erro visual no campo de senha para qualquer erro de login
                if(isLogin) {
                    setPasswordError(true);
                    setPasswordErrorMessage(result.error || 'Erro ao fazer login');
                }
                Alert.alert('Atenção', result.error || 'Ocorreu um erro');
            }
        } catch (error) {
            console.log('Erro no handleAuth:', error)
            Alert.alert('Erro','Ocorreu um erro ao processar a solicitação')
        }
    }


    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo} 
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>{isLogin ? 'Bem vindo de volta!' : 'Crie sua conta'}</Text>
            </View>
            <View style={style.boxMid}>
                <Input 
                    title="ENDEREÇO E-MAIL"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                    onIconRigthPress={()=>console.log('OLA')}
                />
                <Input 
                    title="SENHA"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError(false);
                        setPasswordErrorMessage('');
                    }}
                    IconRigth={Octicons}
                    iconRightName={showPassword?"eye-closed":"eye"}
                    onIconRigthPress={()=>setShowPassword(!showPassword)}
                    secureTextEntry={true}
                    multiline={false}
                    error={passwordError}
                    errorMessage={passwordErrorMessage}
                />
            </View>
            <View style={style.boxBottom}>
                <Button  text={isLogin ? "ENTRAR" : "CADASTRAR"} loading={loading} onPress={()=>handleAuth()}/>
            </View>
            <Text style={style.textBottom}>
                {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
                <Text  style={style.textBottomCreate} onPress={()=>setIsLogin(!isLogin)}>
                    {isLogin ? 'Crie agora' : 'Faça login'}
                </Text>
            </Text>
        </View>
    )
}