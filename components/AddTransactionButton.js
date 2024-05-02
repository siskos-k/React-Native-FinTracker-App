// AddTransactionButton.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AddTransactionButton = ({ onAddTransaction }) => {
  const handlePress = () => {
    // Example transaction
    const newTransaction = {
      id: Date.now().toString(),
      description: 'New Transaction',
      amount: 150,
      type: 'income'
    };
    onAddTransaction(newTransaction);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title="Add Transaction" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
  }
});

export default AddTransactionButton;
