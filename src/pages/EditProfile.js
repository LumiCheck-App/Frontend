import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserCredentials,
  resetCredentialsState,
} from '../redux/updateUserCredentialsSlice';
import { loadUserFromStorage } from '../redux/userSlice';

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error, success, updatedFields } = useSelector(
    (state) => state.updateUserCredentials
  );
  const user = useSelector((state) => state.user.data);

  // Estados inicializados de forma mais segura
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(
    require('../../assets/user.png')
  );

  // Carrega dados do usuário quando disponível
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [success, navigation]);

  // Resetar estado quando sair da tela
  useEffect(() => {
    return () => {
      dispatch(resetCredentialsState());
    };
  }, [dispatch]);

  const handleSaveChanges = async () => {
    // Validações básicas
    if (!password.trim()) {
      Alert.alert(
        'Erro',
        'Por favor, insira sua senha para confirmar as alterações'
      );
      return;
    }

    if (!user) {
      Alert.alert('Erro', 'Dados do usuário não carregados');
      return;
    }

    // Validação de formato de email se foi alterado
    if (email !== user.email && email && !isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    // Validação de username se foi alterado
    if (username !== user.username && username && username.length < 3) {
      Alert.alert('Erro', 'Username deve ter pelo menos 3 caracteres');
      return;
    }

    const updates = {};

    // Comparar com os valores originais do usuário
    if (username !== user.username && username.trim()) {
      updates.newUsername = username.trim();
    }
    if (email !== user.email && email.trim()) {
      updates.newEmail = email.trim();
    }

    if (Object.keys(updates).length === 0) {
      Alert.alert('Aviso', 'Nenhuma alteração foi feita');
      return;
    }

    try {
      await dispatch(
        updateUserCredentials({
          currentPassword: password,
          ...updates,
        })
      ).unwrap();
    } catch (err) {
      // O erro já é tratado pelo Redux, mas podemos adicionar log aqui se necessário
      console.log('Erro ao atualizar credenciais:', err);
    }
  };

  // Função auxiliar para validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para mapear erros do backend para mensagens em português
  const getErrorMessage = (error) => {
    if (typeof error !== 'string') return 'Erro desconhecido';

    const errorMap = {
      'Incorrect password': 'Senha incorreta',
      'Username already taken': 'Username já está em uso',
      'Email already in use': 'Email já está em uso',
      'User not found': 'Usuário não encontrado',
    };

    return errorMap[error] || error;
  };

  // Mostrar loading se user ainda não carregou
  if (!user) {
    return (
      <BackgroundGradient>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-quickregular">Carregando...</Text>
        </View>
      </BackgroundGradient>
    );
  }

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Botão de voltar */}
              <View className="w-11/12 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View>
                <Image
                  source={profileImage}
                  className="w-40 h-40 rounded-full"
                  resizeMode="contain"
                />
              </View>

              <View className="w-11/12 mt-6">
                <Text className="text-xl font-quickbold text-black mb-4">
                  Username
                </Text>
                <TextInput
                  className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  autoCapitalize="none"
                  maxLength={30}
                />
              </View>

              <View className="w-11/12 mt-6">
                <Text className="text-xl font-quickbold text-black mb-4">
                  Email
                </Text>
                <TextInput
                  className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  maxLength={100}
                />
              </View>

              <View className="w-11/12 mt-20">
                <Text className="text-xl font-quickbold text-black mb-4">
                  Confirmar alterações com password
                </Text>
                <TextInput
                  className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  maxLength={50}
                />
              </View>

              {/* Mensagem de erro */}
              {error && (
                <View className="w-11/12 mt-4">
                  <Text className="text-red font-quickbold text-center">
                    {getErrorMessage(error)}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                className="w-11/12 bg-orange rounded-lg py-3 mt-6"
                onPress={handleSaveChanges}
                disabled={loading}
              >
                {loading ? (
                  <Text className="text-xl text-white font-quickbold text-center">
                    Processando...
                  </Text>
                ) : (
                  <Text className="text-xl text-white font-quickbold text-center">
                    Guardar Alterações
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
