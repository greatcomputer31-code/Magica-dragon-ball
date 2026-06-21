import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const CharacterScreen = ({ onNavigate }) => {
  const [character, setCharacter] = useState({
    name: 'Player',
    level: 1,
    exp: 0,
    hp: 100,
    ki: 100,
    power: 50,
    defense: 30,
    speed: 40,
  });

  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(character.name);

  const handleNameChange = () => {
    setCharacter({ ...character, name: newName });
    setEditName(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => onNavigate('home')}
      >
        <Text style={styles.backText}>← BACK</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.characterCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>⚡</Text>
            </View>
          </View>

          {/* Character Name */}
          <View style={styles.nameContainer}>
            {editName ? (
              <View style={styles.nameEditContainer}>
                <TextInput
                  style={styles.nameInput}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="Enter character name"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleNameChange}
                >
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setEditName(true)}>
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.editHint}>Tap to edit name</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Character Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>CHARACTER STATS</Text>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Level</Text>
              <Text style={styles.statValue}>{character.level}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Experience</Text>
              <Text style={styles.statValue}>{character.exp}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>HP</Text>
              <View style={styles.statBar}>
                <View
                  style={[
                    styles.statBarFill,
                    { width: `${character.hp}%`, backgroundColor: '#ff6b6b' },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{character.hp}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Ki</Text>
              <View style={styles.statBar}>
                <View
                  style={[
                    styles.statBarFill,
                    { width: `${character.ki}%`, backgroundColor: '#00d4ff' },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{character.ki}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Power</Text>
              <Text style={styles.statValue}>{character.power}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Defense</Text>
              <Text style={styles.statValue}>{character.defense}</Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Speed</Text>
              <Text style={styles.statValue}>{character.speed}</Text>
            </View>
          </View>

          {/* Spells Section */}
          <View style={styles.spellsContainer}>
            <Text style={styles.spellsTitle}>AVAILABLE SPELLS</Text>
            {['Kamehameha', 'Destructo Disk', 'Energy Shield'].map(
              (spell, idx) => (
                <View key={idx} style={styles.spellItem}>
                  <Text style={styles.spellName}>• {spell}</Text>
                  <Text style={styles.spellInfo}>Ki: 20 | Power: {30 + idx * 5}</Text>
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: 40,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  characterCard: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  avatarText: {
    fontSize: 50,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    backgroundColor: '#0f3460',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  editHint: {
    color: '#bdc3c7',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  statsContainer: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
    letterSpacing: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 80,
  },
  statBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  statValue: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'right',
  },
  spellsContainer: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 15,
  },
  spellsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
    letterSpacing: 1,
  },
  spellItem: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  spellName: {
    color: '#ffd700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  spellInfo: {
    color: '#bdc3c7',
    fontSize: 12,
  },
});

export default CharacterScreen;
