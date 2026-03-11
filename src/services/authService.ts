import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import api from '../lib/api';

export const authService = {
  async registerUser(email: string, password: string, name: string) {
    // 1. Firebase Auth Registration
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Send Email Verification
    const actionCodeSettings = { url: 'http://localhost:5173/login' };
    await sendEmailVerification(userCredential.user, actionCodeSettings);

    // 3. Keep MongoDB in sync (Auto-joins workspaces if invited)
    const response = await api.post('/auth/signup', {
      name,
      email,
      firebaseUid: userCredential.user.uid,
      password 
    });

    return { userCredential, response };
  },

  async loginUser(email: string, password: string) {
    // 1. Firebase Login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // 2. Check if verified
    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      throw new Error('NOT_VERIFIED');
    }

    // 3. Exchange or Login with Backend
    const firebaseToken = await userCredential.user.getIdToken();
    const response = await api.post('/auth/login', {
      email,
      firebaseToken,
      firebaseUid: userCredential.user.uid
    });
    
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
  },

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(auth, email);
  },

  async inviteTeamMember(email: string, name: string, role: string, phone: string, managerToken: string) {
    try {
      // Create team member strictly in our backend - Firebase account is dynamically generated upon Signup link acceptance
      const response = await api.post('/team/add-member', {
        name,
        email,
        role,
        phone
      }, {
        headers: { Authorization: `Bearer ${managerToken}` }
      });

      return response.data;
    } catch (err: any) {
      throw err;
    }
  },

  async logout() {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
