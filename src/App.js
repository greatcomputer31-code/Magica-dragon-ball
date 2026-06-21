import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/store';
import HomeScreen from './screens/HomeScreen';
import BattleScreen from './screens/BattleScreen';
import CharacterScreen from './screens/CharacterScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentBattle, setCurrentBattle] = useState(null);

  const handleNavigate = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) setCurrentBattle(data);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'battle':
        return <BattleScreen battleData={currentBattle} onNavigate={handleNavigate} />;
      case 'character':
        return <CharacterScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});

export default App;
