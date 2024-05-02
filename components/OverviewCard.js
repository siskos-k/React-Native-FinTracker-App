// OverviewCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OverviewCard = ({ currentBalance }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Current Balance</Text>
      <Text style={styles.balanceText}>${currentBalance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default OverviewCard;
