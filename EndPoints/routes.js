import {generateRecipe} from "../Helpers/geminiHelper.js";

export default function RecipeRoutes(app) {
    // test endpoint
    app.get("/api/ping", (_, res) => {
        res.status(200).json({"message": "Server is running!"});
    });

    // recipe creation API
    app.post("/api/recipe/create", async (req, res) => {
        try {
            const generatedRecipes = await generateRecipe(req.body.imgBase64Str);

            res.status(200).json({ generated: generatedRecipes });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}