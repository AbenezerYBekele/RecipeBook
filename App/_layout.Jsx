import {Stack} from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {backgroundColor: '#E67E22'},
                headerTintColor: '#fff',
                headerTitleStyle: {fontWeight: 'bold'},
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="MealsMenu"/>
            <Stack.Screen name="MealDetails" options={{title: 'Recipe'}}/>
            <Stack.Screen name="SavedMeals" options={{title: 'My Saved Recipes'}}/>
        </Stack>
    );
}