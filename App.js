import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, StyleSheet, Text, View } from "react-native";



function useAxios(parameter) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchMovies() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        setError(null);
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setData(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [setData]);

  return { data, error, isLoading };
}

function App() {
  const { data, error, isLoading } = useAxios();
  const logoUri = "https://i.imgur.com/MokWc6m.png";
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          source={{ uri: logoUri }}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Zolute demo</Text>
      </View>

      {isLoading && <Text style={styles.text}>Loading data...</Text>}
      {data && <Text style={styles.text}>{data.body}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    marginTop: 50
  },
  logo: {
    height: 150,
    marginBottom:40
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: "1%",
    textAlign: "center"
  },
  text: {
    
    fontSize: 16,
    marginVertical: "1%",
    textAlign: "center",
    maxWidth: 400
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
