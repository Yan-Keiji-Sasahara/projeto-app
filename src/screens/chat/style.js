import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10, 
        backgroundColor: '#fff'    
    },
    contactName: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    message: { 
        padding: 10, 
        backgroundColor: '#e1ffc7', 
        borderRadius: 10, 
        marginVertical: 5 
    },
    inputContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10 
    },
    input: { 
        flex: 1, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 10, 
        borderRadius: 5, 
    },
    sendButton: { 
        marginLeft: 10, 
        backgroundColor: '#007bff', 
        padding: 10, 
        borderRadius: 5 
    },
    sendText: { 
        color: '#fff' 
    },
    catalogButton: { 
        marginRight: 3, 
        padding: 3,
        marginLeft:-7, 
        backgroundColor: '#007bff', 
    },
    catalogText: { 
        fontSize: 24 
    },
  });

  export default styles;