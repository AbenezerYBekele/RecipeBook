# Recipe Finder App
A mobile recipe discovery application for iOS and Android built with Expo (React Native). This app allows users to search for recipes, browse by category, view detailed instructions, and save their favorite meals for later use.
## Screenshots
Home Screen
<p align="center">
  <img src="https://github.com/user-attachments/assets/8aa147c5-165f-4910-986d-94537a63bcf6" alt="Screenshot 1" width="200"/>
  <img src="https://github.com/user-attachments/assets/22dd482b-e2a6-4f52-a4b8-94f15f12bc3e" alt="Screenshot 2" width="200"/>
  <img src="https://github.com/user-attachments/assets/33f8189f-9fdf-4910-9bec-419415a139f4" alt="Dashboard" width="200"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b023692e-0649-40cc-ac23-e0d27ec7e6c4" alt="Screenshot 3" width="200"/>
  <img src="https://github.com/user-attachments/assets/1d037c1b-7e8a-461d-9b23-2f496bba5abf" alt="Screenshot 4" width="200"/>
  </p>

  ## ✨ Features

- **Recipe Search:**  
  Dynamically search for recipes by name with a debounced input to prevent excessive API calls.  

- **Category Browsing:**  
  Explore recipes across popular categories like *Chicken, Beef, Dessert, Vegetarian*, and more.  

- **Detailed Recipe View:**  
  - A list of ingredients with precise measurements  
  - Step-by-step cooking instructions  
  - An embedded YouTube video tutorial for visual guidance  

- **Save for Later:**  
  Save your favorite recipes to a local list for quick and easy access.  
  This list persists even after closing the app.  

- **Share Functionality:**  
  Easily share a link to a recipe with friends and family using the native device sharing options.  

## 🚀 Technology Stack

This project is built using a modern mobile development stack:

- **Framework:** React Native with Expo  
- **Navigation:** Expo Router (File-based routing)  
- **Local Storage:** `@react-native-async-storage/async-storage` for saving favorite recipes  
- **Video Playback:** `react-native-webview` to embed YouTube videos  
- **Language:** JavaScript (ES6+)  
- **Styling:** React Native `StyleSheet` with a centralized `styles.js` file  
- **API:** All recipe data is fetched from the free [TheMealDB API](https://www.themealdb.com/api.php)  

---

## 🔧 Setup and Installation

To run this project locally, follow these steps:

### 1. Prerequisites

- Node.js (LTS version recommended)  
- Git  
- Expo Go app on your physical iOS or Android device  

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/recipe-book.git
cd recipe-book
```

### 3. Install Dependencies
Install all the necessary packages using npm (or yarn).
```bash
npm install
```

### 4. Run the Application
Start the Expo development server. This will provide a QR code in your terminal.
```bash
npx expo start
```
### 5. Open on Your Device
Open the Expo Go app on your phone.
Scan the QR code from the terminal.
The app will bundle and open on your device.



