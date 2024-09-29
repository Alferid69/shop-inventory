// UpdateCompanyName.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateCompanyName = ({ userInfo, setUserInfo, setIsUpdating}) => {
  const [newCompanyName, setNewCompanyName] = useState(userInfo.companyName);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (newCompanyName.trim() === "") {
      setError("Company name cannot be empty.");
      return;
    }
    try {
      const updatedUserInfo = { ...userInfo, companyName: newCompanyName };
      setUserInfo(updatedUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setIsUpdating(false) // Go back to the previous screen after saving
    } catch (error) {
      console.error("Error saving updated company name:", error);
      setError("Failed to update company name. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Update Company Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new company name"
        value={newCompanyName}
        onChangeText={setNewCompanyName}
      />

      <Button title="Update" onPress={handleUpdate} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "#ff4d4d",
    marginTop: 10,
  },
});

export default UpdateCompanyName;
