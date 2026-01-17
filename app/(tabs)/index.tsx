import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ MUITO IMPORTANTE:
  // Troca o X.X pelo IP do teu computador (vê no terminal com ipconfig)
  // Exemplo: 'http://192.168.1.152:3000/produtos'
  const API_URL = 'http://192.168.1.152:3000/produtos'; 

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      console.log("A tentar ligar a: " + API_URL);
      const response = await axios.get(API_URL);
      setProdutos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      // Se der erro, mostramos um alerta simples na consola ou um texto no ecrã
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📦 Stock Loja Social</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.qtd}>Qtd: {item.quantidade}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.aviso}>Nenhum produto encontrado ou erro de conexão.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50, // Damos espaço extra por causa do notch do telemóvel
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  qtd: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  aviso: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  }
});