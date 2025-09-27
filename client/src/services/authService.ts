import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_WEBCLIENT_ID } from '@env';

// This should be done once, typically in your app's entry point, but here is fine too.
GoogleSignin.configure({
  webClientId: FIREBASE_WEBCLIENT_ID,
});

const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};

const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};

const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};

const signOut = async () => {
  try {
    await auth().signOut();
    // Also sign out from Google to allow account switching
    await GoogleSignin.signOut();
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// --- Auth State Listener ---

const onAuthStateChanged = callback => {
  return auth().onAuthStateChanged(callback);
};

export const authService = {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
};
