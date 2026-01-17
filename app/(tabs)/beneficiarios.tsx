import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BeneficiariosScreen() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  // IP local do pc
  const API_URL = 'http://192.168.1.152:3000/beneficiarios'; 

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlunos(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎓 Estudantes Apoiados</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.headerCard}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.numero}>{item.nr_estudante}</Text>
              </View>
              <Text style={styles.curso}>{item.curso}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.aviso}>Sem estudantes registados.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50', // verde IPCA
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  numero: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  curso: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  aviso: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  }
});