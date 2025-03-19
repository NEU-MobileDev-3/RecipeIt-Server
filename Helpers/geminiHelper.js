import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "TEST_API_KEY_HERE";
const GEMINI_DEFAULT_MODEL = "gemini-2.0-flash";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_DEFAULT_MODEL });

const DEFAULT_PROMPT_HEADER =
    "You are a helpful assistant which will help user to generate some potential food recipes based on the image content: \n" +
    "Please provide a brief description of the image content. \n" +
    "For example, you can say 'This is a picture of a table with tomatoes, pepperoni and cheese on it'. \n" +
    "If you can not recognize the image, please say 'I can not recognize the image'. \n" +
    "You can assume that the image only contains food ingredients. \n" +
    "For the recipe generation you need to follow the following rules: \n" +
    "1. The title of the recipe \n" +
    "2. The ingredients of the recipe \n" +
    "3. The steps to prepare the recipe \n" +
    "4. The time to prepare the recipe \n" +
    "5. The number of servings \n" +
    "Please use newline to separate the different parts of the recipe. \n" +
    "Please also add a new line to separate the different recipes.";

function createImagePart(base64Str, mimeType) {
    return {
        inlineData: {
            data: base64Str,
            mimeType
        },
    };
}

export async function generateRecipe(imgBase64) {
    const imageParts = [
        createImagePart(imgBase64, "image/jpeg")
    ];

    const generatedContent = await model.generateContent([
        DEFAULT_PROMPT_HEADER,
        ...imageParts]);

    return generatedContent.response.text();
}