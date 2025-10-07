import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const Title: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text style={styles.title} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Title;
