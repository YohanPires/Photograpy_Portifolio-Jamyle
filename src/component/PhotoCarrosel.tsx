import "../index.css";

import Foto1 from "../imagens/Album3/20220410124941_IMG_1376.jpg";
import Foto2 from "../imagens/Album3/20220702165602_IMG_1810.jpg";
import Foto3 from "../imagens/Album3/20221126084953_IMG_4148.jpg";
import Foto4 from "../imagens/Album3/IMG_20220414_090608_489.webp";

const photos = [
  Foto1,
  Foto2,
  Foto3,
  Foto4,
];

export default function PhotoCarousel() {
  const duplicatedPhotos = [...photos, ...photos];

  return (
    <section className="carousel-section">
      <div className="carousel-track">
        {duplicatedPhotos.map((photo, index) => (
          <div key={index} className="carousel-card">
            <img src={photo} alt={`Foto ${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}