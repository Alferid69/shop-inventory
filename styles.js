import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12, // Ensures a good height for touch interaction
    paddingHorizontal: 20, // Adds width to the button
    borderRadius: 8, // Rounded corners for a modern feel
    alignItems: "center", // Center text inside the button
    justifyContent: "center",
    marginVertical: 10, // Spacing between buttons and other elements
  },
  registerButton: {
    backgroundColor: "#0086B3", // Matching the register container theme
    borderColor: "#005F80",
    borderWidth: 1,
  },
  sellButton: {
    backgroundColor: "#B35A00", // Matching the sell container theme
    borderColor: "#804200",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#f4f7fb",
    paddingBottom: 59
  },
  availableItemsContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#0086B3'
  },
  soldItemsContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#804200'
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  item: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative'
  },
  soldItem: {
    padding: 16,
    backgroundColor: "#fdfdfd",
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    shadowColor: "#333",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  picker: {
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  summary: {
    padding: 16,
    marginVertical: 24,
    borderRadius: 8,
    backgroundColor: "#f9fafc",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,

  },
  summaryItem: {
    padding: 16,
    backgroundColor: "#e8f0fe",
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#d0d7e5",
    borderWidth: 1,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  exportButton: {
    backgroundColor: "#4CAF50", // Green background for export buttons
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Ensure buttons are evenly spaced
    columnGap: 18,
    margin: 10,
    backgroundColor: "#f9f9f9", // Light background to separate the section
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pdfButton: {
    backgroundColor: "#FF9800", // Orange background for PDF export
  },
  resetButton: {
    backgroundColor: "#f44336", // Red background for reset button
    borderColor: "#d32f2f",
    borderWidth: 1,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A", // A sleek gray color
    backgroundColor: "#F0F0F5", // Soft background to make it stand out
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
    elevation: 2, // Adds a subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    borderWidth: 1,
    marginBottom: 6,
  },
  containerBase: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  registerContainer: {
    backgroundColor: "#E6F7FF", // Soft blue for register section
    borderColor: "#0086B3", // Darker blue border for emphasis
    borderWidth: 3,
    borderRadius: 10,
    padding: 8,
  },
  sellContainer: {
    backgroundColor: "#FFF1E6", // Light peach for sell section
    borderColor: "#B35A00", // A warm brown border
    borderWidth: 3,
    borderRadius: 10,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 14,
    backgroundColor: '#5a67d8', // Background color for the header
    padding: 15, // Padding around the header
    borderRadius: 10, // Rounded corners
    elevation: 3, // Add some shadow for depth
    marginBottom: 15, // Spacing below the header
    
  },
  title: {
    fontSize: 22, // Larger font size for the title
    fontWeight: 'bold', // Bold text
    color: '#fff', // White color for the text
  },
  editButton: {
    backgroundColor: '#6b7280', // Button background color
    borderRadius: 50, // Circular button
    padding: 10, // Padding inside the button
    justifyContent: 'center', // Center icon in button
    alignItems: 'center', // Center icon in button
  },
  editItemButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
    position: 'absolute',
    end: 10,
    top: '50%'
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});