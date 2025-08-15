import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getSavedMealIds } from '../storage.js';
import styles from '../styles';

const SavedMeals = () => {
    const [savedMeals, setSavedMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useFocusEffect(
        useCallback(() => {
            const fetchSavedMeals = async () => {
                setLoading(true);
                const mealIds = await getSavedMealIds();
                if (mealIds.length > 0) {

                    const mealPromises = mealIds.map(id =>
                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json())
                    );
                    const mealsData = await Promise.all(mealPromises);

                    const meals = mealsData.map(data => data.meals[0]);
                    setSavedMeals(meals);
                } else {
                    setSavedMeals([]);
                }
                setLoading(false);
            };

            fetchSavedMeals();
        }, [])
    );

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
        return <View style={styles.centered}><ActivityIndicator size="large" color="#E67E22" /></View>;
    }

    return (
        <View style={styles.container}>
            {savedMeals.length > 0 ? (
                <FlatList
                    data={savedMeals}
                    keyExtractor={item => item.idMeal}
                    renderItem={renderMealItem}
                    numColumns={2}
                    contentContainerStyle={styles.categoryGrid}
                />
            ) : (
                <View style={styles.centered}>
                    <Text style={{fontSize: 18, color: '#555'}}>You haven't saved any recipes yet.</Text>
                </View>
            )}
        </View>
    );
};

export default SavedMeals;