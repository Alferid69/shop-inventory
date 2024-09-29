import { useEffect, useState } from "react";
import WelcomeScreen from "./welcome";
import Shop from "./shop";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    companyName: "",
  });

  const getUserInfoFromStorage = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : { isLoggedIn: false, companyName: "" };
    } catch (error) {
      console.error(error);
      return { isLoggedIn: false, companyName: "" };
    }
  };

  const saveUserInfoToStorage = async (userInfo) => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error saving userInfo:", error);
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const loadedUserInfo = await getUserInfoFromStorage();
      setUserInfo(loadedUserInfo);
    };

    loadUserInfo();
  }, []);

  const handleLogin = (isLoggedIn, companyName) => {
    const newUserInfo = { isLoggedIn, companyName };
    setUserInfo(newUserInfo);
    saveUserInfoToStorage(newUserInfo); // Save to storage whenever login happens
  };

  return (
    <>
      {!userInfo.isLoggedIn ? (
        <WelcomeScreen
          setIsLoggedIn={(status) => handleLogin(status, userInfo.companyName)}
          companyName={userInfo.companyName}
          setCompanyName={(name) => setUserInfo((prev) => ({ ...prev, companyName: name }))}
        />
      ) : (
        <Shop companyName={userInfo.companyName} />
      )}
    </>
  );
}
