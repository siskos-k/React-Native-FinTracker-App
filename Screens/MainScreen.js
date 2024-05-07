import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import OverviewCard from '../components/OverviewCard';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionList from '../components/TransactionList';
import { useNavigation } from '@react-navigation/native';

const MainPage = () => {
  const navigation = useNavigation();

  // State variables for managing data
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); 
  const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [addTransactionVisible, setAddTransactionVisible] = useState(false);

  // Handle toggling the add transaction modal
  const toggleAddTransactionVisibility = () => {
    setAddTransactionVisible(!addTransactionVisible);
  };

  // Example: Fetch initial data
  useEffect(() => {
    const initialTransactions = [
       { id: '1', description: 'Salary', amount: 3000, type: 'income' },
       { id: '2', description: 'Groceries', amount: -80, type: 'expense' },
    ]; 
    setTransactions(initialTransactions);
  }, []);

  // Currency conversion logic
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const conversionRates = {
      USD: { EUR: 0.92, GBP: 0.79 },
      EUR: { USD: 1.087, GBP: 0.86 },
      GBP: { USD: 1.266, EUR: 1.163 },
    };

    if (fromCurrency === toCurrency) return amount;

    const conversionRate = conversionRates[fromCurrency][toCurrency];
    return (amount * conversionRate);
  };

  // Calculate balance with conversion
  useEffect(() => {
    const total = transactions.reduce((acc, transaction) => {
      const convertedAmount = convertCurrency(transaction.amount, 'USD', selectedCurrency);
      return acc + convertedAmount;
    }, 0);
    setBalance(total);
  }, [transactions, selectedCurrency]);

  // Render currency selection modal
  const openCurrencySelection = () => setCurrencyModalVisible(true);
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setCurrencyModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, User!</Text>
      <OverviewCard 
    currentBalance={balance} 
    selectedCurrency={selectedCurrency} // Pass the currency
/>
      <AddTransactionButton 
        onAddTransaction={() => {} /* Define or use existing function */}
        isVisible={addTransactionVisible}
        onToggleVisibility={toggleAddTransactionVisibility}
      />
            <View style={{margin:15}}/>

      <FlatList 
        data={transactions.map(item => ({
          ...item,
          amount: convertCurrency(item.amount, 'USD', selectedCurrency)
        }))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionList 
            item={item} 
            onUpdateTransaction={() => {} /* Define or use existing function */}
          />
        )}
      />
      <TouchableOpacity style={styles.currencyButton} onPress={openCurrencySelection}>
        <Text style={styles.currencyText}>Currency: {selectedCurrency}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCurrencyModalVisible}
        onRequestClose={() => setCurrencyModalVisible(false)}>
         <View style={styles.modalView}>
    <View style={styles.modalContent}> 
      <TouchableOpacity onPress={() => handleCurrencySelect('USD')}>
        <Text style={styles.currencyOptionText}>USD $</Text>
      </TouchableOpacity>
     
          <TouchableOpacity onPress={() => handleCurrencySelect('EUR')}>
            <Text style={styles.currencyOptionText}>EUR €</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCurrencySelect('GBP')}>
            <Text style={styles.currencyOptionText}>GBP £</Text>
          </TouchableOpacity>
          </View>
        </View>

      </Modal>
      <TouchableOpacity style={styles.investmentsButton} onPress={() => navigation.navigate('InvestmentScreen')}>
        <Text style={styles.investmentsButtonText}>View Investments</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 35,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  currencyButton: {
    padding: 10,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  currencyText: {
    fontSize: 16,
  },
  
  modalView: {
    flex: 1, // Make the modal container take up the full screen
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  modalContent: { // Style for the actual modal content
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  investmentsButton: {
    backgroundColor: '#4578AB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },  currencyOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5, // Some spacing
  },
  currencyOptionText: {
    fontSize: 18,
  },
});

export default MainPage;
