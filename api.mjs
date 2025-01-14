const API_URL_INGREDIENTS = `https://kaotika-server.fly.dev/ingredients`
const API_URL_DISEASES = `https://kaotika-server.fly.dev/diseases`

import { lethalDiseases } from './constants/diseases.mjs';

export const getIngredients = async () => {
    console.log("fetching ingredients")
    try {
        let response = await fetch(API_URL_INGREDIENTS);
        let json = await response.json();
        let ingredientsApi = json.data;
        const ingredients = ingredientsApi.map(({_id, name, description, value, effects, image, type}) => ({
            key: String(_id),
            name,
            description,
            value,
            effects,
            image: (`https://kaotika.vercel.app`+ image),
            type
        }));        
        return { success: true, data: ingredients }; // Return success response with ingredients
    } catch (error) {
        console.error("Failed to fetch ingredients:", error);
        return { success: false, error: error.message }; // Return error response
    }
}

export const getDiseases = async () => {
    console.log("fetching diseases")
    try {
        const response = await fetch(API_URL_DISEASES);
        const diseasesJson = await response.json();
        const API_Diseases = diseasesJson.data;
        const diseases = [...lethalDiseases, ...API_Diseases]; 
        return diseases;
    } catch (error) {
        console.error("Failed to fetch diseases:", error);
        return undefined;
    }
}

export const getPlayerData = async (email) => {

    console.log(`Fetching player data from KAOTIKA players API... Email: ${email}`);
  
    try {
  
      const kaotikaResponse = await fetch(`https://kaotika-server.fly.dev/players/email/${email}`);
  
      // Check if the KAOTIKA API responded with NOT FOUND status
      if (!kaotikaResponse.ok) {
        const kaotikaResponseData = await kaotikaResponse.json();
        if (kaotikaResponseData.status === 'NOT FOUND') {
          console.log(`Email ${email} has not been found on KAOTIKA's players API.`);
          throw new Error(`Email ${email} has not been found on KAOTIKA's players API.`);
        } else {
          throw new Error('Network response was not ok');
        }
      }
  
      // If the response is correct set player data.
      const kaotikaData = await kaotikaResponse.json();
      let playerData = kaotikaData.data; 

      return playerData
  
    } catch (error) {
      // setLoading(false);
      console.error('Request failed:', error);
      throw error;
    }
  }

