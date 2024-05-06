import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import axios from 'axios'; // You'll need to install axios
import { Modal, Pressable, TextInput } from 'react-native'; // Import Modal and Pressable

const InvestmentScreen = () => {
    const [holdings, setHoldings] = useState({
      BTC: 1,
      ETH: 1
    });
       
  const [btcData, setBtcData] = useState(null);
  const [ethData, setEthData] = useState(null);
  const [btcModalVisible, setBtcModalVisible] = useState(false);
  const [ethModalVisible, setEthModalVisible] = useState(false);
  const [newBtcHolding, setNewBtcHolding] = useState('');
  const [newEthHolding, setNewEthHolding] = useState('');

  // Fetch data from CoinGecko 
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const btcResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin');
        const ethResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');

        setBtcData(btcResponse.data[0]);
        setEthData(ethResponse.data[0]);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        // Handle potential errors here (e.g., display an error message)
      }
    };

    fetchCoinData();
  }, []); 

  
    // Fetch prices from CoinGecko on component load
   
    const calculateTotalWorth = () => {
        if (btcData && ethData) {
          return (holdings.BTC * btcData.current_price) + (holdings.ETH * ethData.current_price);
        }
        return 0; // Return 0 if btcData or ethData is not available
      }
      
      const updateBtcHolding = () => {
        const updatedHoldings = { ...holdings, BTC: parseFloat(newBtcHolding) };
        setHoldings(updatedHoldings);
        setBtcModalVisible(false);
        setNewBtcHolding('');
      };
    
      const updateEthHolding = () => {
        const updatedHoldings = { ...holdings, ETH: parseFloat(newEthHolding) };
        setHoldings(updatedHoldings);
        setEthModalVisible(false);
        setNewEthHolding('');
      };
  return (
    <SafeAreaView style={styles.container}>
      {/* Overall Worth Section */}
      <View style={styles.totalWorthSection}>
        <Text style={styles.totalWorthTitle}>Total Worth:</Text>
        <Text style={styles.totalWorthValue}>${calculateTotalWorth().toFixed(2)}</Text>
      </View>

      {/* Cryptocurrency Holdings Section */}
      <View style={styles.holdingsSection}>
        {/* Bitcoin */}
        <Pressable style={styles.holdingItem} onPress={() => setBtcModalVisible(true)}> 
        {btcData && ( 
          <View style={styles.holdingItem}>
            <Text style={styles.holdingTitle}>Bitcoin (BTC)</Text>
            <View style={styles.holdingDetails}>
              <Text style={styles.holdingAmount}>{holdings.BTC} BTC</Text>
              <Text style={styles.holdingValue}>
                ${(holdings.BTC * btcData.current_price).toFixed(2)}
              </Text>
            </View>
            <Text style={styles.currentPrice}>
              Current Price: ${btcData.current_price.toFixed(2)}
            </Text> 
          </View>
        )}
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={btcModalVisible}
          onRequestClose={() => setBtcModalVisible(false)}> 
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update BTC Holdings</Text>
              <TextInput 
                style={styles.holdingInput}
                placeholder="Enter new BTC amount"
                keyboardType="numeric"
                onChangeText={setNewBtcHolding}
                value={newBtcHolding}
              />
              <View style={styles.modalButtons}>
                <Pressable 
                style={styles.modalButton} 
                onPress={updateBtcHolding}
                >
                  <Text style={styles.modalButtonText}>Update</Text>
                </Pressable>
                <Pressable 
                style={styles.modalButton} 
                onPress={() => setBtcModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

   {/* Cryptocurrency Holdings Section */}
        {/* Bitcoin */}
        {ethData && ( 
          <View style={styles.holdingItem}>
            <Text style={styles.holdingTitle}>Ethereum (ETH)</Text>
            <View style={styles.holdingDetails}>
              <Text style={styles.holdingAmount}>{holdings.ETH} BTC</Text>
              <Text style={styles.holdingValue}>
                ${(holdings.ETH * ethData.current_price).toFixed(2)}
              </Text>
            </View>
            <Text style={styles.currentPrice}>
              Current Price: ${btcData.current_price.toFixed(2)}
            </Text> 
          </View>
        )}
    
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  totalWorthSection: {
    backgroundColor: '#f2f2f2', // Light background
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  totalWorthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalWorthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32' // Example color - positive gain
  },
  holdingsSection: {
    // ...styles for the holdings section
  },
  holdingItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',  // Subtle shadow effect
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  holdingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  holdingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  holdingAmount: {
    // ...styles
  },
  holdingValue: {
    // ...styles
  },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)' 
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around' 
    },
    modalButton: {
      backgroundColor: '#f2f2f2', 
      padding: 10,
      borderRadius: 5
    },
    modalButtonText: {
      // ...styles for button text
    }
});

export default InvestmentScreen;