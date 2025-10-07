
import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, StyleProp, ViewStyle, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input: React.FC<TextInputProps> = ({ style, secureTextEntry, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, style]}
        {...props}
        secureTextEntry={isPassword && !showPassword}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingRight: 35, // espaço para o ícone
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
    transform: [{ translateY: -10 }],
    padding: 4,
  },
});

export default Input;

export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}