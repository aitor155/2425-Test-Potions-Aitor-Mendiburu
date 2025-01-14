import { getDiseases, getPlayerData, getIngredients } from "../api.mjs";
import potionCreation from "../index.mjs";

let diseases;
let ingredientsFiltered = [];
let playerData;
let potion;

beforeAll(async () => {
  // Fetch data before running tests
  jest.spyOn(console, 'log').mockImplementation(() => {});  // Mocks console.log
  const [diseasesData, ingredientsResponse, playerDataResponse] = await Promise.all([
    getDiseases(),
    getIngredients(),
    getPlayerData("aitor.mendiburu@ikasle.aeg.eus")
  ]);

  diseases = diseasesData;
  // Filter ingredients to include only those with effects containing "restore"
  ingredientsFiltered = ingredientsResponse.data
    .filter(ingredient => ingredient.effects.some(effect => effect.includes("restore")))
    .slice(0, 4); // Limit to maximum 4 ingredients

  playerData = playerDataResponse;
});

afterAll(() => {
    console.log.mockRestore();  // Restores the original console.log after tests
  });

describe('create correctly the antidote potion', () => {
  it('should create antidote potion', () => {
    potion = potionCreation(ingredientsFiltered, diseases, playerData);
    console.log("la potion " + potion);
    expect(potion.type).toBe("antidote");
  });
});