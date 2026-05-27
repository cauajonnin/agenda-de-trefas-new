import { StyleSheet,Dimensions} from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 30,
        color: "#333",
        textAlign: 'center',
    },
    filterSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterButtonText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
    filterCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: themas.Colors.primary,
        backgroundColor: themas.Colors.lightGray,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 30,
        textAlign: 'center',
    },
    logoutButton: {
        alignSelf: 'flex-end',
        marginTop: 30,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})