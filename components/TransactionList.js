import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TransactionList = ({ item, onUpdateTransaction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(item.description);
  const [editAmount, setEditAmount] = useState(item.amount.toString()); // Convert to string for input

  const handleEditPress = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSaveEdit = () => {
    const updatedTransaction = {
      ...item, // Keep existing properties
      description: editDescription,
      amount: parseFloat(editAmount), // Convert back to number
    };
    onUpdateTransaction(updatedTransaction); // Call the provided function from MainPage
    setIsEditing(false); // Exit edit mode
  };

  return (
    <View style={styles.transactionItem}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.editInput}
            onChangeText={setEditDescription}
            value={editDescription}
          />
          <TextInput
            style={styles.editInput}
            onChangeText={setEditAmount}
            value={editAmount}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleSaveEdit}>
            <Text style={styles.editText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={[styles.amountText, item.type === 'income' ? styles.incomeColor : styles.expenseColor]}>
            {item.amount.toFixed(2)}
          </Text>
          <TouchableOpacity onPress={handleEditPress}>
            <MaterialIcons name="edit" size={24} color="#333" />
          </TouchableOpacity>
        </>
      )}
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