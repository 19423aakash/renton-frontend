import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = async (filename, keywords) => {
    const url = `https://loremflickr.com/1000/600/${keywords}`;
    const filePath = path.join(__dirname, 'src', 'assets', 'images', `${filename}.jpg`);

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Unexpected response ${res.statusText}`);

        const fileStream = fs.createWriteStream(filePath);
        await finished(Readable.fromWeb(res.body).pipe(fileStream));
        console.log(`Downloaded ${filename}.jpg`);
    } catch (error) {
        console.error(`Error downloading ${filename}.jpg:`, error);
    }
};

(async () => {
    await downloadImage('hero-car', 'sports,car,red');
})();
