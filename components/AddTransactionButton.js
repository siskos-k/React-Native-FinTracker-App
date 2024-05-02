import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddTransactionButton = ({ onAddTransaction, isVisible, onToggleVisibility }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isNegative, setIsNegative] = useState(false); // Track if amount is negative

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Math.random().toString(),
      description,
      amount: parseFloat(amount),
      type: amount < 0 ? 'expense' : 'income', // Infer transaction type based on amount
    };
    setIsNegative(amount < 0); // Update negative flag for styling
    onAddTransaction(newTransaction);
    setDescription('');
    setAmount('');
  };

  const handleAmountChange = (text) => {
    setAmount(text);
    setIsNegative(parseFloat(text) < 0); // Update negative flag on input change
  };

  return (
    <View style={styles.container}>
      {isVisible && (
        <>
          <Text style={styles.textLabel}>Description:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setDescription}
            value={description}
          />
          <Text style={styles.textLabel}>Amount:</Text>
          <TextInput
            style={[styles.textInput, isNegative && styles.negativeAmount]}
            onChangeText={handleAmountChange}
            value={amount}
            keyboardType="numeric"
          />
          <Button title="Add Transaction" onPress={handleAddTransaction} />
        </>
      )}
      <TouchableOpacity onPress={onToggleVisibility} style={styles.toggleButton}>
        <MaterialCommunityIcons name={isVisible ? 'eye-off' : 'eye'} size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    marginBottom: 10,
  },
  negativeAmount: {
    borderColor: 'red', // Red border for negative amounts
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default AddTransactionButton;