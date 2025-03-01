import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Usa la versione Slim per ridurre il bundle

const StarParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Carica solo il necessario per performance migliori
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles Loaded", container);
  };

  const options = useMemo(() => ({
    background: {
      color: { value: "#000014" }, // Sfondo molto scuro per simulare il cielo notturno
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble", // Effetto di bagliore quando si passa sopra con il mouse
        },
      },
      modes: {
        bubble: {
          size: 6,
          distance: 200,
        },
      },
    },
    particles: {
      color: { value: "#ffffff" }, // Colore bianco brillante
      links: {
        enable: false, // Disabilita i collegamenti tra le particelle
      },
      move: {
        enable: true,
        speed: 0.6, // Movimento dolce e leggero
        direction: "none",
        outModes: { default: "out" }, // Le stelle scompaiono ai bordi e riappaiono
      },
      number: {
        density: { enable: true, area: 800 },
        value: 100, // Numero di stelle
      },
      opacity: {
        value: 1,
        random: true, // Opacità casuale per dare un effetto scintillante
        animation: {
          enable: true,
          speed: 1.2,
          minimumValue: 0.3, // Fanno un effetto di fading (lampeggiano leggermente)
          sync: false,
        },
      },
      shape: {
        type: "star", // Particelle a forma di stellina ✨
      },
      size: {
        value: { min: 1, max: 4 }, // Dimensioni delle stelle
        random: true,
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
};

export default StarParticles;
