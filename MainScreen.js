import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import OverviewCard from '../components/OverviewCard';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionList from '../components/TransactionList';

const MainScreen = () => {
  // State variables for managing data
  const [balance, setBalance] = useState(0); 
  const [transactions, setTransactions] = useState([]);

  //  Example: Fetch initial data (Adapt this to your data source)
  useEffect(() => {
    // Placeholder - Load from local storage or an API 
    const initialTransactions = [
       { id: '1', description: 'Salary', amount: 3000, type: 'income' },
       { id: '2', description: 'Groceries', amount: -80, type: 'expense' }, 
    ]; 
    setTransactions(initialTransactions);
  }, []);

  // Functions to handle adding and updating transactions (implementation later)
  const addTransactionHandler = (newTransaction) => { ... };
  const updateTransactionHandler = (updatedTransaction) => { ... };

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
    // ... Add styles for your list
  },
});

export default MainScreen;