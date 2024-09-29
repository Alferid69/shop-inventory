import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PASSWORD = "ALFERID1024";

const WelcomeScreen = ({ setIsLoggedIn, companyName, setCompanyName }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (password && companyName) {
      if (password === PASSWORD) setIsLoggedIn(true);
      else setError("ያስገቡት ፓስዎርድ ትክክል አይደለም።");
    } else setError("የድርጅት ስም እና ፓስዎርድ አላስገቡም።");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to ShopApp</Text>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="building-o"
          size={20}
          color="#7f8c8d"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name="lock"
          size={20}
          color="#7f8c8d"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,

  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#e74c3c",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});

export default WelcomeScreen;
