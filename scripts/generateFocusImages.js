const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const focusAreas = [
  {
    name: 'AI Systems & Agents',
    filename: 'ai-systems-agents.png',
    prompt: '3D abstract composition: floating interconnected SPHERES and FLOWING WAVES representing AI neural networks. Smooth curved organic shapes with depth. ONLY use these exact colors: earthy olive green #6B8E4E, sage green #8FAF6E, light green #9BC57D on soft cream #F5F5DC background. Isometric view, soft shadows, clean 3D render. Professional venture capital aesthetic. Square format, centered.',
  },
  {
    name: 'Digital IP & Platforms',
    filename: 'digital-ip-platforms.png',
    prompt: '3D abstract composition: stacked CUBES and RECTANGULAR BLOCKS forming a tower platform structure. Sharp angular geometric shapes with depth. ONLY use these exact colors: earthy olive green #6B8E4E, sage green #8FAF6E, light green #9BC57D on soft cream #F5F5DC background. Isometric view, soft shadows, clean 3D render. Professional venture capital aesthetic. Square format, centered.',
  },
  {
    name: 'Data-Driven Ventures',
    filename: 'data-driven-ventures.png',
    prompt: '3D abstract composition: ascending CYLINDERS and CONES arranged in upward growth pattern like bar charts. Vertical geometric shapes with depth. ONLY use these exact colors: earthy olive green #6B8E4E, sage green #8FAF6E, light green #9BC57D on soft cream #F5F5DC background. Isometric view, soft shadows, clean 3D render. Professional venture capital aesthetic. Square format, centered.',
  },
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const stream = fs.createWriteStream(filepath);
      response.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    });
  });
}

async function generateImages() {
  console.log('Starting image generation for Focus Areas...\n');

  for (const area of focusAreas) {
    try {
      console.log(`Generating image for: ${area.name}`);
      console.log(`Prompt: ${area.prompt.substring(0, 100)}...\n`);

      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: area.prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural',
      });

      const imageUrl = response.data[0].url;
      const filepath = path.join(__dirname, '..', 'public', 'images', area.filename);

      console.log(`Downloading image to: ${filepath}`);
      await downloadImage(imageUrl, filepath);
      console.log(`✓ Successfully generated: ${area.name}\n`);
    } catch (error) {
      console.error(`✗ Error generating ${area.name}:`, error.message);
      console.error(error);
    }
  }

  console.log('Image generation complete!');
  console.log('\nGenerated files:');
  focusAreas.forEach((area) => {
    console.log(`  - /public/images/${area.filename}`);
  });
}

generateImages();
