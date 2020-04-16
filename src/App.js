import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const repository = response.data;

    const repositoryIndex = repositories.findIndex(repo => repo.id === repository.id);

    const newRepositories = [...repositories];
    newRepositories.splice(repositoryIndex, 1, repository);

    setRepositories(newRepositories);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem = {({ item: repository }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>
                <View style={styles.techsContainer}>
                  { repository.techs.map(tech => (
                      <Text style={styles.tech} key={tech}>
                       {tech}
                      </Text>
                  )) }
                </View>
                <View style={styles.likesContainer}>
                  <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                  >
                   {repository.likes} curtidas
                 </Text>
                </View>
                <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />

        {/* <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  repository: {
    fontSize: 20,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  tech: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 6,
    backgroundColor: "#04d361",
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: "#fff",
    borderRadius: 20,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 5,
    textAlign: "center"
  },
});
