import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import styles from '../styles.js';

const MealsMenu = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: `${category} Recipes` });

        const fetchMeals = async () => {
            if (!category) {
                setLoading(false);
                setError("No category specified.");
                return;
            }
            const isIngredient = ['Chicken', 'Beef'].includes(category);
            const endpoint = isIngredient ? 'filter.php?i=' : 'filter.php?c=';
            const url = `https://www.themealdb.com/api/json/v1/1/${endpoint}${category}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const textResponse = await response.text();
                try {
                    const data = JSON.parse(textResponse);
                    setMeals(data.meals || []);
                } catch (parseError) {
                    console.error("Failed to parse JSON:", textResponse);
                    throw new Error("The server returned an invalid response.");
                }

            } catch (e) {
                console.error("Error fetching data:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [category]);

    const renderMealItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mealItemContainer}
            onPress={() => router.push({ pathname: '/MealDetails', params: { id: item.idMeal } })}
        >
            <View style={styles.card}>
                <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.strMeal}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#E67E22" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{fontSize: 18, color: '#E74C3C', textAlign: 'center', padding: 20}}>
                    Failed to load recipes. {error}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {meals.length > 0 ? (
                <FlatList
                    data={meals}
                    keyExtractor={item => item.idMeal}
                    renderItem={renderMealItem}
                    numColumns={2}
                    contentContainerStyle={styles.categoryGrid}
                />
            ) : (
                <View style={styles.centered}>
                    <Text>No meals found for {category}.</Text>
                </View>
            )}
        </View>
    );
};

export default MealsMenu;