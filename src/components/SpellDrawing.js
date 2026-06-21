import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';
import { gestureRecognizer } from '../utils/gestures';

const { width, height } = Dimensions.get('window');

const DRAW_AREA_HEIGHT = height * 0.35;

const SpellDrawing = ({ onSpellCast }) => {
  const [points, setPoints] = useState([]);
  const [lastSpell, setLastSpell] = useState(null);
  const canvasRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setPoints(prev => [...prev, { x: locationX, y: locationY }]);
    },
    onPanResponderRelease: () => {
      if (points.length > 10) {
        const recognizedSpell = gestureRecognizer(points);
        if (recognizedSpell) {
          setLastSpell(recognizedSpell);
          onSpellCast(recognizedSpell);
          // Clear after a brief delay
          setTimeout(() => {
            setPoints([]);
            setLastSpell(null);
          }, 800);
        } else {
          setPoints([]);
        }
      } else {
        setPoints([]);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Draw a spell pattern</Text>
      <View
        style={styles.drawingArea}
        {...panResponder.panHandlers}
      >
        {/* Simple representation of drawn points */}
        {points.length > 0 && (
          <View style={styles.pointsContainer}>
            {points.map((point, idx) => (
              <View
                key={idx}
                style={[
                  styles.point,
                  {
                    left: point.x,
                    top: point.y,
                  },
                ]}
              />
            ))}
          </View>
        )}
        {lastSpell && (
          <View style={styles.spellFeedback}>
            <Text style={styles.spellFeedbackText}>{lastSpell}!</Text>
          </View>
        )}
      </View>
      <View style={styles.spellHints}>
        <Text style={styles.hintText}>⭕ Circle: Kamehameha</Text>
        <Text style={styles.hintText}>〰️ Wave: Destructo Disk</Text>
        <Text style={styles.hintText}>◉ Spiral: Energy Shield</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DRAW_AREA_HEIGHT,
    backgroundColor: '#0f3460',
    borderTopWidth: 2,
    borderTopColor: '#00d4ff',
  },
  instructionText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  drawingArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderWidth: 2,
    borderColor: '#00d4ff',
    borderRadius: 10,
    margin: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  pointsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  point: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00d4ff',
    position: 'absolute',
  },
  spellFeedback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spellFeedbackText: {
    color: '#ffd700',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#ff6b6b',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  spellHints: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#0f3460',
  },
  hintText: {
    color: '#bdc3c7',
    fontSize: 11,
  },
});

export default SpellDrawing;
