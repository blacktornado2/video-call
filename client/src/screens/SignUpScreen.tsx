import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
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
import { authService } from '../services/authService'; // Import the service

// 1. Define the validation schema with a password confirmation check
const signupSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Set the error on the confirmPassword field
  });

// Infer the TypeScript type from the schema
type SignupFormValues = z.infer<typeof signupSchema>;

// Note: You'll need to pass the `navigation` prop from your navigator
const SignupScreen = ({ navigation }) => {
  // 2. Initialize React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 3. Handle Email/Password signup
  const onEmailSignup = async (data: SignupFormValues) => {
    console.log('Attempting email signup with:', data);
    const { user, error } = await authService.signUpWithEmail(
      data.email,
      data.password,
    );

    if (error) {
      Alert.alert('Signup Failed', error?.message);
    } else {
      console.log('Signed up new user:', user?.uid);
      // After signup, Firebase automatically logs the user in.
      // Your navigation logic will detect the authenticated state and switch to the main app.
    }
  };

  // 4. Handle Google Sign-In (same as login)
  const onGoogleLogin = async () => {
    console.log('Attempting Google sign-in...');
    const { user, error } = await authService.signInWithGoogle();
    if (error) {
      Alert.alert('Google Sign-In Failed', error.message);
    } else {
      console.log('Signed in with Google, user:', user.uid);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <PaperText variant="displayMedium" style={styles.title}>
          Create Account
        </PaperText>
        <PaperText variant="bodyLarge" style={styles.subtitle}>
          Get started with Togetherly
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

        {/* Confirm Password Input */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.confirmPassword}
              style={styles.input}
              outlineColor="#E8E6ED"
              activeOutlineColor="#7868E6"
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onEmailSignup)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor="#B2A4FF" // Your primary accent color
        >
          Sign Up
        </Button>

        <Divider style={styles.divider} />

        {/* Google Sign-In Button */}
        <Button
          mode="outlined"
          onPress={onGoogleLogin}
          style={styles.googleButton}
          labelStyle={styles.googleButtonLabel}
          icon="google"
        >
          Sign Up with Google
        </Button>

        {/* Link to Login Screen */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkText}>Log In</Text>
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
    backgroundColor: '#FAF7FF',
  },
  title: {
    color: '#483D8B',
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
    color: '#DC3545',
    marginLeft: 5,
    marginTop: 5,
  },
  divider: {
    marginVertical: 25,
  },
  googleButton: {
    borderColor: '#7868E6',
  },
  googleButtonLabel: {
    color: '#7868E6',
  },
  loginLink: {
    marginTop: 25,
  },
  loginText: {
    textAlign: 'center',
    color: '#483D8B',
    fontSize: 14,
  },
  loginLinkText: {
    fontWeight: 'bold',
    color: '#7868E6', // Secondary accent color
  },
});

export default SignupScreen;
