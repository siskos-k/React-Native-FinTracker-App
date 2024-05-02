import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import OverviewCard from '../components/OverviewCard';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionList from '../components/TransactionList';

const MainPage = () => {
  // State variables for managing data
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  //  Example: Fetch initial data (Adapt this to your data source)
  useEffect(() => {
    const initialTransactions = [
       { id: '1', description: 'Salary', amount: 3000, type: 'income' },
       { id: '2', description: 'Groceries', amount: -80, type: 'expense' }, 
    ]; 
    setTransactions(initialTransactions);
  }, []);

  // Functions to handle adding and updating transactions (basic implementation)
  const addTransactionHandler = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    // Update balance based on transaction type (implement logic here)
  };

  const updateTransactionHandler = (updatedTransaction) => {
    // Find the transaction to update
    const transactionIndex = transactions.findIndex(item => item.id === updatedTransaction.id);
    
    // Update the transaction data and state
    if (transactionIndex !== -1) {
      const updatedTransactions = [...transactions];
      updatedTransactions[transactionIndex] = updatedTransaction;
      setTransactions(updatedTransactions);
      // Update balance based on transaction changes (implement logic here)
    }
  };

  return (
    <View style={styles.container}>
      <OverviewCard currentBalance={balance} /> 
      
      <AddTransactionButton onAddTransaction={addTransactionHandler} />  
      
      <FlatList 
        style={styles.transactionList}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionList 
            item={item} 
            onUpdateTransaction={updateTransactionHandler} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  transactionList: {
    flex: 1,
    marginBottom: 20,
  },
});

export default MainPage;