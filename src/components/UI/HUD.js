import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const HUD = ({ playerHP, playerKi, level, battleLog }) => {
  return (
    <View style={styles.container}>
      {/* Top Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>LVL</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>HP</Text>
          <Text style={styles.statValue}>{Math.max(0, playerHP)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>KI</Text>
          <Text style={styles.statValue}>{Math.max(0, playerKi)}</Text>
        </View>
      </View>

      {/* Battle Log */}
      <View style={styles.battleLog}>
        <ScrollView
          contentContainerStyle={styles.logContent}
          showsVerticalScrollIndicator={false}
        >
          {battleLog.map((log, idx) => (
            <Text key={idx} style={styles.logText}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: '#0f3460',
    borderTopWidth: 2,
    borderTopColor: '#00d4ff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#00d4ff',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statValue: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  battleLog: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 10,
  },
  logContent: {
    paddingVertical: 5,
  },
  logText: {
    color: '#bdc3c7',
    fontSize: 11,
    lineHeight: 16,
  },
});

export default HUD;
