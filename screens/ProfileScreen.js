import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Toast from "react-native-toast-message";
import { signOut } from "firebase/auth";
import CustomHeader from "../components/CustomHeader";
import { firestore } from "../firebase.config";

const ProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const user = auth.currentUser;

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: type === "success" ? "Yay!" : "Oops!",
      text2: message || "Please try again",
    });
  };

  const fetchUserData = () => {
    if (!user) {
      console.log("User is not authenticated");
      return;
    }

    const q = query(
      collection(firestore, "users"),
      where("email", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserData(data);
          setImageUri(data.profileImage || null);
        });
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserData();
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    Alert.alert("Confirm Logging Out", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          setLoadingLogout(true);
          try {
            await signOut(auth);
            showToast("success", "Signed out successfully");
            setTimeout(() => {
              navigation.replace("LoginScreen");
            }, 1000);
          } catch (error) {
            showToast("error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <CustomHeader title={"Profile"} />
      </View>

      <View style={styles.userDetailView}>
        <Text style={styles.userName}>
          {userData?.firstname} {userData?.lastname}
        </Text>

        {/* Open Modal on Image Click */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <FontAwesome5
              name="user"
              size={35}
              style={styles.placeholderImage}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.userAddtionalView}>
        <View style={styles.addtionalView}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("MyAccount")}
          >
            <View style={{ gap: 5 }}>
              <Text style={styles.text}>My Account</Text>
              <Text style={styles.detailText}>
                Make changes to your account
              </Text>
            </View>
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.addtionalView}>
          <TouchableOpacity style={styles.touchable} onPress={handleLogout}>
            <View style={{ gap: 5 }}>
              <Text style={styles.text}>Log out</Text>
              <Text style={styles.detailText}>
                Further secure your account for safety
              </Text>
            </View>
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {loadingLogout && (
        <View style={styles.indicatorView}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Handles Android back button
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome5 name="times" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Conditional rendering for imageUri */}
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.modalImage} />
          ) : (
            <Text style={styles.errorMessage}>No image available</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
  },
  headerView: {
    width: "90%",
    alignItems: "center",
    paddingTop: 20,
  },
  userDetailView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 70,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 70,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: 80,
    color: "#aaa",
  },
  addtionalView: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  indicatorView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  userAddtionalView: {
    width: "90%",
    gap: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 19.5,
    color: "#181D27",
    fontWeight: "600",
  },
  detailText: {
    fontSize: 11,
    color: "#5B5C5C",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
},
});
