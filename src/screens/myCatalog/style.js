import { StyleSheet, Dimensions } from "react-native";

// Calcula a largura da imagem com 3 colunas, considerando margens
const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 40) / 3; // 40px de margem total

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        paddingTop: 20, 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 80, // Espaço extra para o botão
    },
    itemContainer: {
        width: imageSize,
        margin: 5,
        alignItems: 'center',
    },
    image: {
        width: imageSize,
        height: imageSize * 0.75, // Mantém proporção 4:3
        borderRadius: 5,
    },
    titleInput: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 5,
        height: 35,
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
