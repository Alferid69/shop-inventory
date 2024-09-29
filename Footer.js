import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        &copy; {new Date().getFullYear()} Alferid Hassen. All rights reserved.
      </Text>

      <View style={styles.socialMedia}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.facebook.com/alfe.man.33")
          }
        >
          <FontAwesome name="facebook" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://x.com/ItsNotorious69")}
        >
          <FontAwesome name="twitter" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.instagram.com/feridh69/")}
        >
          <FontAwesome name="instagram" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/Alferid69")}
        >
          <FontAwesome name="github" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    backgroundColor: "#5a67d8",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  socialMedia: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginVertical: 5,
  },

  link: {
    color: "#fff",
    marginHorizontal: 10,
  },
});

export default Footer;
