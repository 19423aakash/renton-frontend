import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vehicles = [
    { name: 'thar', keywords: 'jeep,offroad' },
    { name: 'classic350', keywords: 'motorcycle,classic' },
    { name: 'nexon', keywords: 'suv,white' },
    { name: 'mt15', keywords: 'motorcycle,racing' },
    { name: 'swift', keywords: 'red,car' },
    { name: 'ola', keywords: 'scooter,electric' },
];

const downloadImage = async (filename, keywords) => {
    const url = `https://loremflickr.com/800/600/${keywords}`;
    const filePath = path.join(__dirname, 'src', 'assets', 'images', `${filename}.jpg`);

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Unexpected response ${res.statusText}`);

        // Create stream
        const fileStream = fs.createWriteStream(filePath);
        await finished(Readable.fromWeb(res.body).pipe(fileStream));
        console.log(`Downloaded ${filename}.jpg`);
    } catch (error) {
        console.error(`Error downloading ${filename}.jpg:`, error);
    }
};

// Ensure directory exists
const dir = path.join(__dirname, 'src', 'assets', 'images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

(async () => {
    for (const v of vehicles) {
        await downloadImage(v.name, v.keywords);
    }
})();
