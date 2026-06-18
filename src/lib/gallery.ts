import "server-only";

import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type GalleryImage = {
  id: number;
  src: string;
  caption: string;
  category: string;
  width: number;
  height: number;
  displayWidth: number;
  x: number;
  y: number;
  rotation: number;
};

const galleryRoot = path.join(process.cwd(), "public/images/gallery");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function publicUrl(category: string, filename: string) {
  return `/images/gallery/${encodeURIComponent(category)}/${encodeURIComponent(filename)}`;
}

function stableScore(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const captionPools: Record<string, string[]> = {
  personal: [
    "A pause between destinations.",
    "Light, movement, and an unplanned moment.",
    "A frame from the personal archive.",
    "People and places encountered along the way.",
    "The detail that made the moment memorable.",
    "An ordinary scene, held for a little longer.",
    "A personal record of time and place.",
    "Looking closely at the world in motion.",
  ],
  memorabilia: [
    "A piece of sporting history.",
    "From the archive of memorable sporting moments.",
    "Where sport, memory, and culture meet.",
    "A reminder of the stories behind the spectacle.",
    "Collected from a life spent around sport.",
    "An object with a larger story to tell.",
    "A chapter from the sporting archive.",
    "The history of sport, preserved in detail.",
  ],
};

function captionFor(category: string, filename: string, index: number) {
  const captions = captionPools[category.toLowerCase()] || [
    "A photograph from the archive.",
    "A moment observed and remembered.",
    "A study in place, people, and light.",
    "From the wider photographic archive.",
  ];
  return captions[(stableScore(`${category}/${filename}`) + index) % captions.length];
}

export function getGalleryImages(): GalleryImage[] {
  if (!fs.existsSync(galleryRoot)) return [];

  const files = fs.readdirSync(galleryRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((directory) => fs.readdirSync(path.join(galleryRoot, directory.name), { withFileTypes: true })
      .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .map((entry) => ({ category: directory.name, filename: entry.name })))
    .sort((a, b) => stableScore(`${a.category}/${a.filename}`) - stableScore(`${b.category}/${b.filename}`));

  const columns = Math.max(5, Math.ceil(Math.sqrt(files.length * 1.65)));
  const rows = Math.ceil(files.length / columns);
  const centerColumn = (columns - 1) / 2;
  const centerRow = (rows - 1) / 2;

  return files.map((file, index) => {
    const imagePath = path.join(galleryRoot, file.category, file.filename);
    const dimensions = imageSize(fs.readFileSync(imagePath));
    const width = dimensions.width || 1200;
    const height = dimensions.height || 900;
    const column = index % columns;
    const row = Math.floor(index / columns);
    const displayWidth = 220 + ((index * 37) % 115);
    const pullX = (column - centerColumn) * 18;
    const pullY = (row - centerRow) * 16;

    return {
      id: index + 1,
      src: publicUrl(file.category, file.filename),
      caption: captionFor(file.category, file.filename, index),
      category: file.category,
      width,
      height,
      displayWidth,
      x: 130 + column * 182 + ((row * 43 + column * 19) % 70) - pullX,
      y: 115 + row * 205 + ((column * 31 + row * 23) % 82) - pullY,
      rotation: ((index * 17) % 13) - 6,
    };
  });
}

export function getGalleryCategories(images: GalleryImage[]) {
  return ["All", ...Array.from(new Set(images.map((image) => image.category)))];
}
