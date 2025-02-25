import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    menuContainer: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      elevation: 5,
      marginRight: 10,
      marginTop: 10,
    },
    menuItem: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    menuText: {
      fontSize: 16,
      color: 'black',
    },
  });  

export default styles;