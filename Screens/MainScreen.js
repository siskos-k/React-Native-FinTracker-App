import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import OverviewCard from '../components/OverviewCard';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionList from '../components/TransactionList';
import { useNavigation } from '@react-navigation/native';

const MainPage = () => {
  const navigation = useNavigation();


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
  const calculateBalance = (transactions) => {
    const total = transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    setBalance(total);
  };
  
  useEffect(() => {
    calculateBalance(transactions); // Initial balance calculation
  }, [transactions]);
  const [addTransactionVisible, setAddTransactionVisible] = useState(false);

const toggleAddTransactionVisibility = () => {
  setAddTransactionVisible(!addTransactionVisible);
};



  
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}> 
        <Text style={styles.welcomeText}>Welcome, User!</Text> 
      </View>

      <OverviewCard currentBalance={balance} /> 
      <AddTransactionButton
  onAddTransaction={addTransactionHandler}
  isVisible={addTransactionVisible}
  onToggleVisibility={toggleAddTransactionVisibility}
/>
      
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
        <TouchableOpacity style={styles.investmentsButton} onPress={() => navigation.navigate('InvestmentScreen')}>
        <Text style={styles.investmentsButtonText}>View Investments</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    marginBottom: 15, // Add spacing below welcome text
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 35, // Add top margin
  },
  welcomeContainer: {
    marginBottom: 15, // Add spacing below welcome text
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
  },
  investmentsButton: {
    backgroundColor: '#4578AB', // Example color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center', // Center the text
  },
  investmentsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainPage;