import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import {
  TextInput,
  Button,
  PaperProvider,
  Text as PaperText,
  Divider,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { authService } from '../services/authService';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }) => {
  // 2. Initialize React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle Email/Password login
  const onEmailLogin = async (data: LoginFormValues) => {
    console.log('Attempting email login with:', data);
    const { user, error } = await authService.signInWithEmail(
      data.email,
      data.password,
    );
    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      console.log('Logged in user:', user?.uid);
      // Navigation will handle moving to the main app
    }
  };

  const onGoogleLogin = async () => {
    console.log('Attempting Google login...');
    const { user, error } = await authService.signInWithGoogle();
    if (error) {
      Alert.alert('Google Sign-In Failed', error.message);
    } else {
      console.log('Logged in user:', user?.uid);
      // Navigation will handle moving to the main app
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <PaperText variant="displayMedium" style={styles.title}>
          Welcome Back
        </PaperText>
        <PaperText variant="bodyLarge" style={styles.subtitle}>
          Log in to your Togetherly account
        </PaperText>

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
              outlineColor="#E8E6ED"
              activeOutlineColor="#7868E6"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.password}
              style={styles.input}
              outlineColor="#E8E6ED"
              activeOutlineColor="#7868E6"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={() => handleSubmit(onEmailLogin)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor="#B2A4FF" // Your primary accent color
        >
          Log In
        </Button>

        <Divider style={styles.divider} />

        {/* Google Sign-In Button */}
        <Button
          mode="outlined"
          onPress={onGoogleLogin}
          style={styles.googleButton}
          labelStyle={styles.googleButtonLabel}
          icon="google" // React Native Paper has built-in icons
        >
          Sign In with Google
        </Button>

        {/* Link to Signup Screen */}
        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLinkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF7FF', // Your primary background color
  },
  title: {
    color: '#483D8B', // Your primary text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#483D8B',
  },
  input: {
    marginTop: 15,
  },
  button: {
    marginTop: 30,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#DC3545', // Your danger/red color
    marginLeft: 5,
    marginTop: 5,
  },
  divider: {
    marginVertical: 30,
  },
  googleButton: {
    borderColor: '#7868E6',
  },
  googleButtonLabel: {
    color: '#7868E6',
  },
  signupLink: {
    marginTop: 25,
  },
  signupText: {
    textAlign: 'center',
    color: '#483D8B',
    fontSize: 14,
  },
  signupLinkText: {
    fontWeight: 'bold',
    color: '#7868E6', // Secondary accent color
  },
});

export default LoginScreen;
