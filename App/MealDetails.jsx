import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Share, Button, Platform } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles.js';
import { getSavedMealIds, saveMealId, removeMealId } from '../storage.js';

const MealDetails = () => {
    const { id } = useLocalSearchParams();
    const [mealData, setMealData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const navigation = useNavigation();


    const onShare = async () => {
        if (!mealData) return;
        try {
            await Share.share({
                title: mealData.strMeal,
                message: `Check out this recipe for ${mealData.strMeal}! Find it here: ${mealData.strSource || mealData.strYoutube}`,
                url: mealData.strSource || mealData.strYoutube,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const loadMealData = async () => {
            if (!id) return;
            setLoading(true);

            const savedIds = await getSavedMealIds();
            setIsSaved(savedIds.includes(id));

            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                const meal = data.meals ? data.meals[0] : null;
                setMealData(meal);

                if (meal) {
                    navigation.setOptions({
                        title: meal.strMeal.length > 25 ? `${meal.strMeal.substring(0, 22)}...` : meal.strMeal,
                        headerRight: () => (
                            <Button onPress={onShare} title={Platform.OS === 'ios' ? "Share" : "SHARE"} color={Platform.OS === 'ios' ? "#fff" : "#E67E22"}/>
                        ),
                    });
                }
            } catch (error) {
                console.error('Error fetching meal details:', error);
            } finally {
                setLoading(false);
            }
        };
        loadMealData();
    }, [id]);

    const handleToggleSave = async () => {
        if (isSaved) {
            await removeMealId(id);
            setIsSaved(false);
        } else {
            await saveMealId(id);
            setIsSaved(true);
        }
    };

    if (loading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#E67E22" /></View>;
    }

    if (!mealData) {
        return <View style={styles.centered}><Text>Recipe not found.</Text></View>;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`• ${measure} ${ingredient}`);
        }
    }


    let videoId = null;
    if (mealData.strYoutube) {

        const urlParams = new URLSearchParams(new URL(mealData.strYoutube).search);
        videoId = urlParams.get('v');
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.detailsContainer}>
            <Image source={{ uri: mealData.strMealThumb }} style={styles.detailsImage} />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15, paddingHorizontal: 10}}>
                <Text style={[styles.detailsTitle, {marginVertical: 0, flex: 1}]}>{mealData.strMeal}</Text>
                <TouchableOpacity onPress={handleToggleSave} style={{padding: 8, marginLeft: 10}}>
                    <Ionicons
                        name={isSaved ? "heart" : "heart-outline"}
                        size={36}
                        color={isSaved ? "#E74C3C" : "#E67E22"}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsTag}>{mealData.strCategory}</Text>

            <View style={styles.detailsSectionCard}>
                <Text style={styles.detailsSectionTitle}>Ingredients</Text>
                {ingredients.map((item, index) => (
                    <Text key={index} style={styles.ingredientText}>{item}</Text>
                ))}
            </View>

            <View style={styles.detailsSectionCard}>
                <Text style={styles.detailsSectionTitle}>Instructions</Text>
                <Text style={styles.instructionsText}>{mealData.strInstructions}</Text>
            </View>


            {videoId && (
                <View style={styles.videoContainer}>
                    <WebView
                        style={styles.video}
                        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default MealDetails;