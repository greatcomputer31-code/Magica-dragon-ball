import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import SpellDrawing from '../components/SpellDrawing';
import BattleArena from '../components/BattleArena';
import HUD from '../components/UI/HUD';

const { width, height } = Dimensions.get('window');

const BattleScreen = ({ battleData, onNavigate }) => {
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [playerKi, setPlayerKi] = useState(100);
  const [opponentKi, setOpponentKi] = useState(100);
  const [spellCast, setSpellCast] = useState(null);
  const [battleLog, setBattleLog] = useState(['Battle Started!']);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost

  const opponent = battleData?.opponent || 'Unknown Opponent';
  const level = battleData?.level || 1;

  const handleSpellCast = (spellType) => {
    if (playerKi < 20) {
      setBattleLog([...battleLog, 'Not enough Ki!']);
      return;
    }

    setSpellCast(spellType);
    setPlayerKi(Math.max(0, playerKi - 20));
    setBattleLog([...battleLog, `You cast ${spellType}!`]);

    // Simulate opponent counterattack
    setTimeout(() => {
      const damage = Math.floor(Math.random() * 30) + 10;
      setPlayerHP(Math.max(0, playerHP - damage));
      setBattleLog(prev => [...prev, `${opponent} attacks! -${damage} HP`]);

      // Check win/loss conditions
      if (opponentHP <= 0) {
        setGameState('won');
      } else if (playerHP - damage <= 0) {
        setGameState('lost');
      }
    }, 500);

    // Opponent takes damage
    const spellDamage = Math.floor(Math.random() * 40) + 20;
    setOpponentHP(Math.max(0, opponentHP - spellDamage));
  };

  const handleEndBattle = () => {
    onNavigate('home');
  };

  return (
    <View style={styles.container}>
      {/* Battle Arena */}
      <BattleArena
        playerHP={playerHP}
        opponentHP={opponentHP}
        opponent={opponent}
        spellCast={spellCast}
      />

      {/* HUD */}
      <HUD
        playerHP={playerHP}
        playerKi={playerKi}
        level={level}
        battleLog={battleLog}
      />

      {/* Spell Drawing System */}
      {gameState === 'playing' && (
        <SpellDrawing onSpellCast={handleSpellCast} />
      )}

      {/* Battle End Screen */}
      {gameState !== 'playing' && (
        <View style={styles.endScreen}>
          <Text style={styles.endTitle}>
            {gameState === 'won' ? 'VICTORY!' : 'DEFEAT!'}
          </Text>
          <Text style={styles.endMessage}>
            {gameState === 'won'
              ? `You defeated ${opponent}! +1000 EXP`
              : `You were defeated by ${opponent}. Try again!`}
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleEndBattle}
          >
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  endScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  endTitle: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
    textShadowColor: '#ff6b6b',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  endMessage: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ff0000',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default BattleScreen;
