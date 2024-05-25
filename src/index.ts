import { Translation } from './services/Translation';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())

app.post('/', async (req, res) => {
    const translationService = new Translation();
    const { to, from } = req.query as { to: string; from: string }
    const { message } = req.body

    console.log({ to, from }, "{ to, from }")

    const translatedText = await translationService.translate(message, to, from);

    res.status(200).json({
        message: "success",
        translatedText,
        to,
        from
    })
});

app.get("/", (_, res) => {
    res.status(200).json({
        message: "/post"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});