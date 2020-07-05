import express from 'express';
import routes from  './routes';
import path from 'path'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});