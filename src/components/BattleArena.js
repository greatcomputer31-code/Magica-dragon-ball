import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BattleArena = ({ playerHP, opponentHP, opponent, spellCast }) => {
  const [particleEffects, setParticleEffects] = useState([]);

  useEffect(() => {
    if (spellCast) {
      // Add particle effect
      const newEffect = {
        id: Date.now(),
        spell: spellCast,
      };
      setParticleEffects([...particleEffects, newEffect]);

      // Remove effect after animation
      setTimeout(() => {
        setParticleEffects(prev => prev.filter(e => e.id !== newEffect.id));
      }, 800);
    }
  }, [spellCast]);

  const getOpponentEmoji = () => {
    switch (opponent) {
      case 'Raditz':
        return '👹';
      case 'Vegeta':
        return '👺';
      case 'Frieza':
        return '👽';
      case 'Cell':
        return '🦗';
      case 'Majin Buu':
        return '🎈';
      default:
        return '⚔️';
    }
  };

  return (
    <View style={styles.container}>
      {/* Opponent Section */}
      <View style={styles.characterSection}>
        <Text style={styles.characterEmoji}>{getOpponentEmoji()}</Text>
        <Text style={styles.characterName}>{opponent}</Text>
        <View style={styles.hpBar}>
          <View
            style={[
              styles.hpBarFill,
              {
                width: `${Math.max(0, opponentHP)}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.hpText}>{Math.max(0, opponentHP)}/100 HP</Text>
      </View>

      {/* Effects Zone */}
      <View style={styles.effectsZone}>
        {particleEffects.map(effect => (
          <View key={effect.id} style={styles.particleEffect}>
            <Text style={styles.particleText}>
              {effect.spell === 'Kamehameha' && '⚡'}
              {effect.spell === 'Destructo Disk' && '🌪️'}
              {effect.spell === 'Energy Shield' && '🛡️'}
            </Text>
          </View>
        ))}
      </View>

      {/* Player Section */}
      <View style={styles.characterSection}>
        <Text style={styles.characterEmoji}>🧑</Text>
        <Text style={styles.characterName}>You</Text>
        <View style={styles.hpBar}>
          <View
            style={[
              styles.hpBarFill,
              {
                width: `${Math.max(0, playerHP)}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.hpText}>{Math.max(0, playerHP)}/100 HP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  characterSection: {
    alignItems: 'center',
    flex: 0.3,
  },
  characterEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  characterName: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hpBar: {
    width: 200,
    height: 20,
    backgroundColor: '#0f3460',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    marginBottom: 8,
  },
  hpBarFill: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  hpText: {
    color: '#bdc3c7',
    fontSize: 12,
  },
  effectsZone: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  particleEffect: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleText: {
    fontSize: 60,
    opacity: 0.8,
  },
});

export default BattleArena;
