import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
const TransactionList = ({ item, onUpdateTransaction }) => {
  const { description, amount, type } = item;

  const handleEditPress = () => {
    // Trigger function to navigate to edit screen or handle update logic here
    onUpdateTransaction(item);
  };

  return (
    <View style={styles.transactionItem}>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text style={[styles.amountText, type === 'income' ? styles.incomeColor : styles.expenseColor]}>
        {amount.toFixed(2)}
      </Text>
      <TouchableOpacity onPress={handleEditPress}>
        <MaterialIcons name="edit" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  descriptionText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
  },
  incomeColor: {
    color: 'green',
  },
  expenseColor: {
    color: 'red',
  },
});

export default TransactionList;