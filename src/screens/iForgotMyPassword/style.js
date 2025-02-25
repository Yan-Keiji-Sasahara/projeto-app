import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    button: {
      padding: 10,
      borderRadius: 8,
      width: 70,
      alignItems: "center",
    },
    buttonText: {
      color: "#007bff",
      fontSize: 20,
      fontWeight: "bold",
      width:"300%",
    },
    otherOptions:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "50%",
      marginLeft:"15%",

    },
  });

export default styles;