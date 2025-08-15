import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_MEALS_KEY = 'SAVED_MEALS';

export const getSavedMealIds = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(SAVED_MEALS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading saved meals', e);
        return [];
    }
};

export const saveMealId = async (mealId) => {
    try {
        const savedIds = await getSavedMealIds();
        if (!savedIds.includes(mealId)) {
            const newSavedIds = [...savedIds, mealId];
            const jsonValue = JSON.stringify(newSavedIds);
            await AsyncStorage.setItem(SAVED_MEALS_KEY, jsonValue);
        }
    } catch (e) {
        console.error('Error saving meal', e);
    }
};

export const removeMealId = async (mealId) => {
    try {
        const savedIds = await getSavedMealIds();
        const newSavedIds = savedIds.filter((id) => id !== mealId);
        const jsonValue = JSON.stringify(newSavedIds);
        await AsyncStorage.setItem(SAVED_MEALS_KEY, jsonValue);
    } catch (e) {
        console.error('Error removing meal', e);
    }
};