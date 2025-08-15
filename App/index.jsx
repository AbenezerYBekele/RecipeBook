import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles.js';

const MealSearchApp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery.trim().length > 0) {
                setLoading(true);
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
                    .then((response) => response.json())
                    .then((data) => setMeals(data.meals || []))
                    .catch((error) => console.error('Error fetching meals:', error))
                    .finally(() => setLoading(false));
            } else {
                setMeals([]);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const categories = [
        { name: 'Dessert', image: 'https://www.themealdb.com/images/media/meals/tqrrsq1511723764.jpg' },
        { name: 'Chicken', image: 'https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg' },
        { name: 'Seafood', image: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg' },
        { name: 'Beef', image: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg' },
        { name: 'Vegetarian', image: 'https://www.themealdb.com/images/media/meals/cuvqmb1580261611.jpg' },
        { name: 'Pasta', image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg' },
    ];

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mealItemContainer}
            onPress={() => router.push({ pathname: '/MealsMenu', params: { category: item.name } })}
        >
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (

        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/Backgruond.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                 <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingTop: 60, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Recipe Finder</Text>
                        <Text style={styles.headerSubtitle}>Find your next favorite meal</Text>
                    </View>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search for any meal..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity
                        style={{marginBottom: 20, backgroundColor: 'rgba(230, 126, 34, 0.8)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}}
                        onPress={() => router.push('/SavedMeals')}
                    >
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>View Saved Recipes</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator size="large" color="#fff" />}
                    {meals.length > 0 && !loading && (
                        <FlatList
                            style={styles.searchList}
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.card, styles.searchListItem]}
                                    onPress={() => router.push({ pathname: '/MealDetails', params: { id: item.idMeal } })}
                                >
                                    <Image source={{ uri: item.strMealThumb }} style={styles.searchListImage} />
                                    <Text style={styles.searchListTitle}>{item.strMeal}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                {searchQuery.length === 0 && (
                    <View style={{flex: 1.5, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                        <FlatList
                            data={categories}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.name}
                            numColumns={2}
                            contentContainerStyle={styles.categoryGrid}
                        />
                    </View>
                )}
            </ImageBackground>
        </View>
    );
};

export default MealSearchApp;