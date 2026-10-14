import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StudentRoster from './src/components/StudentRoster';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <StudentRoster />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#312E81', // Matches the header background for seamless status bar blend
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
