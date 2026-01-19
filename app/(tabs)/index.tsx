import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [loading, setLoading] = useState(true);


  const getRandomSeed = () => Math.floor(Math.random() * 10000).toString();


  const loadImage = () => {
    setLoading(true); 
    const seed = getRandomSeed();
    const newImageUrl = `https://picsum.photos/seed/${seed}/800/800?random=${Date.now()}`;
    setImageUrl(newImageUrl);

    fetch(`https://picsum.photos/seed/${seed}/info`)
      .then(response => response.json())
      .then(data => {
        setImageWidth(data.width);
        setImageHeight(data.height);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching image info:', error);
        Alert.alert('Ошибка', 'Не удалось получить информацию об изображении.');
        setLoading(false); 
      });
  };


  useEffect(() => {
    loadImage();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Случайная Картинка</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {!loading && imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}

      {!loading && (
        <Text style={styles.sizeText}>Размер: {imageWidth} x {imageHeight}</Text>
      )}

      <Button title="Обновить" onPress={loadImage} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;