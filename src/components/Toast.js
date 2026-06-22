import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export function Toast({ visible, message }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  if (!visible) return null;
  return (
    <Animated.View style={[styles.toast, { opacity }]}>
      <Text style={styles.text}>✓ {message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    zIndex: 20,
    backgroundColor: '#167C5A',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 5,
  },
  text: { color: '#FFFFFF', fontWeight: '700' },
});
