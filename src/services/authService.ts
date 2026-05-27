import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Login com email e senha
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user, message: 'Login realizado com sucesso!' };
  } catch (error: any) {
    let errorMessage = 'Erro ao fazer login';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Usuário não encontrado';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Senha incorreta';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email inválido';
    }
    return { success: false, error: errorMessage };
  }
};

// Cadastro com email e senha
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user, message: 'Email criado com sucesso!' };
  } catch (error: any) {
    let errorMessage = 'Erro ao criar conta';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email já existe! Por favor, use outro email ou faça login.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'A senha deve ter pelo menos 6 caracteres';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email inválido';
    }
    return { success: false, error: errorMessage };
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: 'Erro ao fazer logout' };
  }
};

// Observar mudanças no estado de autenticação
export const authStateChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Obter usuário atual
export const getCurrentUser = () => {
  return auth.currentUser;
};
