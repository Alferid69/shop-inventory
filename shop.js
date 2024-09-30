import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const Shop = ({ companyName, setIsUpdating }) => {
  const getClothesFromStorage = async () => {
    try {
      const storedClothes = await AsyncStorage.getItem("clothes");
      return storedClothes ? JSON.parse(storedClothes) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getSoldClothesFromStorage = async () => {
    try {
      const storedSoldClothes = await AsyncStorage.getItem("soldClothes");
      return storedSoldClothes ? JSON.parse(storedSoldClothes) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [clothes, setClothes] = useState([]);
  const [soldClothes, setSoldClothes] = useState([]);
  const [newCloth, setNewCloth] = useState({
    type: "",
    price: "",
    quantity: "",
  });
  const [sale, setSale] = useState({ type: "", price: "", quantity: "" });
  const [totalSales, setTotalSales] = useState(0);
  const [selectedType, setSelectedType] = useState("all");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const clothesFromStorage = await getClothesFromStorage();
      const soldClothesFromStorage = await getSoldClothesFromStorage();
      setClothes(clothesFromStorage);
      setSoldClothes(soldClothesFromStorage);
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveClothesToStorage = async () => {
      try {
        await AsyncStorage.setItem("clothes", JSON.stringify(clothes));
      } catch (error) {
        console.error(error);
      }
    };

    saveClothesToStorage();
  }, [clothes]);

  useEffect(() => {
    const saveSoldClothesToStorage = async () => {
      try {
        await AsyncStorage.setItem("soldClothes", JSON.stringify(soldClothes));
      } catch (error) {
        console.error("Error saving sold clothes:", error);
      }
    };

    // Save sold clothes whenever soldClothes changes
    if (soldClothes.length > 0) {
      saveSoldClothesToStorage();
    }
  }, [soldClothes]);

  // Effect to calculate total sales and filter based on selected type
  useEffect(() => {
    calculateTotalSales();
    filterSales();
  }, [soldClothes, selectedType]);

  const calculateTotalSales = () => {
    const total = soldClothes.reduce((sum, item) => sum + item.total, 0);
    setTotalSales(total);
  };

  const filterSales = () => {
    let filtered = soldClothes;

    if (selectedType !== "all") {
      filtered = filtered.filter((sold) => sold.type === selectedType);
    }

    setFilteredSales(filtered);
  };

  const handleClothChange = (name, value) => {
    setNewCloth({ ...newCloth, [name]: value });
  };

  const registerCloth = () => {
    // edit feature
    if (editMode.isEdit) updateCloth();
    if (newCloth.type && newCloth.price && newCloth.quantity) {
      const existingClothIndex = clothes.findIndex(
        (cloth) => cloth.type === newCloth.type
      );

      if (existingClothIndex !== -1) {
        // Cloth already exists, so update the quantity
        const updatedClothes = [...clothes];
        updatedClothes[existingClothIndex].quantity =
          parseInt(updatedClothes[existingClothIndex].quantity) +
          parseInt(newCloth.quantity); // Convert to number and update quantity

        setClothes(updatedClothes);
      } else {
        // Cloth doesn't exist, so add new cloth
        setClothes([...clothes, newCloth]);
      }

      // Reset the input fields
      setNewCloth({ type: "", price: "", quantity: "" });
    }
  };

  const handleSaleChange = (name, value) => {
    setSale({ ...sale, [name]: value });
  };

  const registerSale = () => {
    if (sale.type && sale.price && sale.quantity) {
      const soldQuantity = parseInt(sale.quantity, 10);
      const salePrice = parseFloat(sale.price);
      const total = salePrice * soldQuantity;

      setClothes((prevClothes) =>
        prevClothes.map((cloth) => {
          if (cloth.type === sale.type) {
            const updatedQuantity = parseInt(cloth.quantity, 10) - soldQuantity;
            if (updatedQuantity >= 0) {
              return { ...cloth, quantity: updatedQuantity.toString() };
            } else {
              Alert.alert("Error", "Not enough stock available!");
              return cloth;
            }
          }
          return cloth;
        })
      );

      const currentDate = new Date().toISOString().split("T")[0];
      const updatedSoldClothes = [
        ...soldClothes,
        { ...sale, total, date: currentDate },
      ];

      setSoldClothes(updatedSoldClothes);
      setSale({ type: "", price: "", quantity: "" });
    }
  };

  const resetShop = () => {
    Alert.alert(
      "Confirm",
      "ከማጥፋቶ በፊት ወደ PDF/CSV መቀየር አይርሱ። ሙሉ መረጃ የሚጠፋ ይሆናል። እርግጠኛ ኖት? !",
      [
        { text: "ይቅር አይጥፋ።", style: "cancel" },
        {
          text: "አዎ ይጥፋ!",
          onPress: async () => {
            await AsyncStorage.removeItem("soldClothes");
            await AsyncStorage.removeItem("clothes");
            // await AsyncStorage.clear();
            setClothes([]);
            setSoldClothes([]);
            setTotalSales(0);
          },
        },
      ]
    );
  };

  const convertArrayToCSV = (data) => {
    const csvRows = [];

    // Get the headers (keys of the objects)
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(",")); // Join the headers with a comma

    // Loop over the rows and add the values
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"'); // Escape quotes
        return `"${escaped}"`;
      });
      csvRows.push(values.join(",")); // Join the values with a comma
    }

    return csvRows.join("\n"); // Add a new line after each row
  };

  const exportDataToCsv = async (data) => {
    try {
      const csvContent = convertArrayToCSV(data); // Convert JSON data to CSV format
      const fileUri = `${
        FileSystem.documentDirectory
      }sales_report_${new Date().toString()}.csv`;

      // Write the CSV content to a file
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        // Share the CSV file
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  // PDF Export
  const exportDataToPdf = async (data) => {
    try {
      const html = `
        <html>
  <head>
    <style>
      /* Styling for the entire table */
      table {
        width: 100%;
        border-collapse: collapse; /* Remove extra space between borders */
        margin-top: 20px; /* Add space between the heading and the table */
      }

      /* Styling for the table cells */
      th, td {
        padding: 10px; /* Add spacing inside cells */
        text-align: left; /* Align text to the left */
        border: 1px solid black; /* Ensure borders are visible */
      }

      /* Styling for the table header */
      th {
        background-color: #f2f2f2; /* Light background color for header */
        font-weight: bold; /* Make the header bold */
      }

      /* Optional: Styling for alternating row colors */
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      /* Optional: Add space between the body and the table */
      body {
        padding: 20px;
      }

      h1 {
        font-family: Arial, sans-serif;
        text-align: center;
        color: #333; /* Dark gray text color */
      }
    </style>
  </head>
  <body>
    <h1>አጠቃላይ ሽያጭ</h1>
    <table>
      <tr>
        <th>ስም</th>
        <th>የተሸጠ ብዛት</th>
        <th>ዋጋ</th>
        <th>ገቢ</th>
        <th>ያልተሸጠ ቀሪ</th>
        <th>ቀን</th>
      </tr>
      ${data
        .map(
          ({
            type,
            totalQuantity,
            price,
            totalRevenue,
            availableQuantity,
            date,
          }) => `
        <tr>
          <td>${type}</td>
          <td>${totalQuantity}</td>
          <td>${price}</td>
          <td>${totalRevenue}</td>
          <td>${availableQuantity}</td>
          <td>${date}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  </body>
</html>

      `;

      // Generate the PDF from HTML
      const { uri } = await Print.printToFileAsync({ html });

      // Move the file to the documents directory for sharing
      const fileUri = `${
        FileSystem.documentDirectory
      }sales_report_${new Date().toString()}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const renderSoldCloth = ({ item }) => (
    <View style={styles.soldItem}>
      <Text>ስም: {item.type}</Text>
      <Text>ዋጋ: ${item.price}</Text>
      <Text>የተሸጠ ብዛት: {item.quantity}</Text>
      <Text>ድምር: ${item.total}</Text>
      <Text>ቀን: {item.date}</Text>
    </View>
  );

  const getSalesSummary = () => {
    const summary = {};

    // Initialize summary with all cloth types
    clothes.forEach(({ type, quantity, price }) => {
      summary[type] = {
        availableQuantity: parseInt(quantity, 10),
        totalQuantity: 0,
        totalRevenue: 0,
        price: parseFloat(price),
        date: new Date().toDateString(),
      };
    });

    // Calculate the total quantity and revenue from all soldClothes, not filteredSales
    soldClothes.forEach(({ type, quantity, total }) => {
      if (summary[type]) {
        summary[type].totalQuantity += parseInt(quantity, 10);
        summary[type].totalRevenue += total;
      }
    });

    // Convert the summary object into an array
    return Object.entries(summary).map(([type, data]) => ({
      type,
      ...data,
    }));
  };

  let salesSummary = getSalesSummary();

  // In your render function
  const renderSummary = () => {
    const summary = getSalesSummary();
    return Object.keys(summary).map((type) => (
      <View key={type} style={styles.summaryItem}>
        <Text>ስም: {summary[type].type}</Text>
        <Text>የቀረ: {summary[type].availableQuantity}</Text>
        <Text>የተሸጠ ብዛት: {summary[type].totalQuantity}</Text>
        <Text>አጠቃላይ ገቢ: ${summary[type].totalRevenue}</Text>
      </View>
    ));
  };

  // edit feature
  const [editMode, setEditMode] = useState({
    item: null,
    isEdit: false,
    isSaleEdit: false,
  });

  const updateCloth = () => {
    const updatedClothes = clothes.map((cloth, index) =>
      index === editMode.item ? newCloth : cloth
    );
    setClothes(updatedClothes);
    setEditMode({ item: null, isEdit: false });
  };

  const editCloth = (index) => {
    setEditMode({ item: index, isEdit: true });
    setNewCloth(clothes[index]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{companyName} Inventory</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsUpdating(true)}
          >
            <FontAwesome name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerBase}>
          <View style={styles.registerContainer}>
            <Text style={styles.label}>እቃ መመዝገቢያ</Text>
            <TextInput
              placeholder="እቃ ስም"
              value={newCloth.type}
              onChangeText={(value) => handleClothChange("type", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="ዋጋ"
              value={newCloth.price}
              keyboardType="numeric"
              onChangeText={(value) => handleClothChange("price", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="ብዛት"
              value={newCloth.quantity}
              keyboardType="numeric"
              onChangeText={(value) => handleClothChange("quantity", value)}
              style={styles.input}
            />
            <TouchableOpacity
              style={[styles.buttonBase, styles.registerButton]}
              onPress={registerCloth}
            >
              <Text style={styles.buttonText}>
                {editMode.isEdit ? "እቃ አስተካክል" : "እቃ መዝግብ"}
              </Text>
            </TouchableOpacity>

            {clothes.length > 0 && (
              <View style={styles.availableItemsContainer}>
                <Text style={styles.label}>የተመዘገቡ እቃዎች</Text>
                <FlatList
                  data={clothes}
                  keyExtractor={(item, index) => `${item.type}-${index}`}
                  renderItem={({ item, index }) => (
                    <>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>ስም: {item.type}</Text>
                        <Text style={styles.itemText}>ዋጋ: ${item.price}</Text>
                        <Text style={styles.itemText}>
                          ቀሪ ብዛት: {item.quantity}
                        </Text>
                        <TouchableOpacity
                          style={styles.editItemButton}
                          onPress={() => editCloth(index)}
                        >
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                />
              </View>
            )}
          </View>

          <View style={styles.sellContainer}>
            <Text style={styles.label}>እቃ መሸጫ</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={sale.type}
                onValueChange={(value) => handleSaleChange("type", value)}
                style={styles.input}
              >
                <Picker.Item label="እቃ ስም" value="all" />
                {clothes.map((cloth) => (
                  <Picker.Item
                    key={cloth.type}
                    label={cloth.type}
                    value={cloth.type}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="ዋጋ"
              value={sale.price}
              keyboardType="numeric"
              onChangeText={(value) => handleSaleChange("price", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="ብዛት"
              value={sale.quantity}
              keyboardType="numeric"
              onChangeText={(value) => handleSaleChange("quantity", value)}
              style={styles.input}
            />
            <TouchableOpacity
              style={[styles.buttonBase, styles.sellButton]}
              onPress={registerSale} // Handle the click here
            >
              <Text style={styles.buttonText}>ሽያጭ መዝግብ</Text>
            </TouchableOpacity>

            {soldClothes.length > 0 && (
              <View style={styles.soldItemsContainer}>
                <Text style={styles.label}>የተሸጡ እቃዎች</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedType}
                    onValueChange={(value) => setSelectedType(value)}
                  >
                    <Picker.Item label="ሁሉም አይነት" value="all" />
                    {clothes.map((cloth) => (
                      <Picker.Item
                        key={cloth.type}
                        label={cloth.type}
                        value={cloth.type}
                      />
                    ))}
                  </Picker>
                </View>

                <FlatList
                  data={filteredSales}
                  keyExtractor={(item) => item.quantity + item.type}
                  renderItem={renderSoldCloth}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.summary}>
          <Text style={styles.label}>የሽያጭ ማጠቃለያ</Text>
          {renderSummary()}
          <Text>የዛሪ አጠቃላይ ሽያጭ: ${totalSales}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.buttonBase, styles.exportButton]}
            onPress={() => exportDataToCsv(salesSummary)}
          >
            <Text style={styles.exportButtonText}>ወደ CSV ቀይር</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonBase, styles.pdfButton]}
            onPress={() => exportDataToPdf(salesSummary)}
          >
            <Text style={styles.exportButtonText}>ወደ PDF ቀይር</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonBase, styles.resetButton]}
            onPress={resetShop}
          >
            <Text style={styles.resetButtonText}>ሙሉ እቃ አጥፋ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;
