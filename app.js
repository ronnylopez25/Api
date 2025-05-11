import express from 'express'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import personaRoutes from './routes/persona.js'; 
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use('/api', personaRoutes);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})