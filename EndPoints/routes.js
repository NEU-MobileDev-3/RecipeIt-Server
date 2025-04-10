import {generateRecipeByImage, generateRecipeByChat} from "../Helpers/geminiHelper.js";

export default function RecipeRoutes(app) {
    // test endpoint
    app.get("/api/ping", (_, res) => {
        res.status(200).json({"message": "Server is running!"});
    });

    // recipe creation API (By image)
    app.post("/api/recipe/create/image", async (req, res) => {
        try {
            const generatedRecipes = await generateRecipeByImage(req.body.imgBase64Str);

            res.status(200).json({ generated: generatedRecipes });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // recipe creation API (By text)
    app.post("/api/recipe/create/text", async (req, res) => {
        try {
            const generatedRecipes = await generateRecipeByChat(req.body.query);

            res.status(200).json({ generated: generatedRecipes });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}