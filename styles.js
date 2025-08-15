import { StyleSheet } from 'react-native';

const theme = {
    primary: '#E67E22',
    light: '#FDFEFE',
    dark: '#273746',
    grey: '#BDC3C7',
    lightGrey: '#F4F6F7',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.light,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerContainer: {
        padding: 20,
        borderRadius: 15,
        margin: 20,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333333',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'Aqua',
        marginTop: 5,
    },
    searchBar: {
        height: 50,
        width: '90%',
        backgroundColor: theme.light,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.grey,
    },
    categoryGrid: {
        paddingHorizontal: 10,
    },

    card: {
        backgroundColor: theme.lightGrey ,
        borderRadius: 12,
        margin: 8,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    mealItemContainer: {
        width: '50%',
    },
    cardImage: {
        width: '100%',
        height: 100,
        color: 'red',
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'ForestGreen',
        textAlign: 'center',
    },

    searchList: {
        width: '90%',
    },
    searchListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchListImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    searchListTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'DarkGoldenRod',
        flexShrink: 1,
    },


    detailsContainer: {
        paddingBottom: 30,
    },
    detailsImage: {
        width: '100%',
        height: 250,
    },
    detailsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.dark,
        textAlign: 'center',
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    detailsTag: {
        alignSelf: 'center',
        backgroundColor: theme.primary,
        color: theme.light,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 14,
        fontWeight: '600',
        overflow: 'hidden',
        marginBottom: 20,
    },
    detailsSectionCard: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        backgroundColor: theme.lightGrey,
        borderRadius: 10,
    },
    detailsSectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.dark,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: theme.primary,
        paddingBottom: 5,
    },
    ingredientText: {
        fontSize: 16,
        color: theme.dark,
        lineHeight: 24,
    },
    instructionsText: {
        fontSize: 16,
        color: theme.dark,
        lineHeight: 24,
        textAlign: 'left',
    },
    videoContainer: {
        width: '90%',
        aspectRatio: 16 / 9,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
    },
    video: {
        flex: 1,
    },
});

export default styles;