import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';

const HomeScreen = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MAGICA DRAGON BALL</Text>
          <Text style={styles.subtitle}>Master the Art of Ki</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.playButton]}
            onPress={() => onNavigate('battle', { level: 1, opponent: 'Raditz' })}
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.characterButton]}
            onPress={() => onNavigate('character')}
          >
            <Text style={styles.buttonText}>CHARACTER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.settingsButton]}
            onPress={() => console.log('Settings')}
          >
            <Text style={styles.buttonText}>SETTINGS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Tournament Mode • Multiplayer • Campaign</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
    textShadowColor: '#0099cc',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffd700',
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  playButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff0000',
  },
  characterButton: {
    backgroundColor: '#4ecdc4',
    borderColor: '#00d4ff',
  },
  settingsButton: {
    backgroundColor: '#95a5a6',
    borderColor: '#7f8c8d',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#bdc3c7',
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default HomeScreen;
