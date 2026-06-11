import { GalleryUniverse } from "@/components/gallery-universe";
import { Header } from "@/components/header";
import { getGalleryCategories, getGalleryImages } from "@/lib/gallery";

export default function GalleryPage() {
  const images = getGalleryImages();
  return <main className="gallery-page"><Header dark /><GalleryUniverse images={images} categories={getGalleryCategories(images)} /></main>;
}
