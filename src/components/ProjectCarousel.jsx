import { useEffect, useRef, useState } from "react";
import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel() {
    const autoplayTimeoutRef = useRef(null);

    const baseLength = projects.length;

    // Triplicamos los proyectos para mantener el loop infinito
    const extendedProjects = [
        ...projects,
        ...projects,
        ...projects,
    ];

    const [currentIndex, setCurrentIndex] = useState(baseLength);

    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // ==========================================
    // CONFIGURACIÓN DEL CARRUSEL
    // ==========================================

const [cardWidth, setCardWidth] = useState(250);
const CARD_GAP = cardWidth * 0.1;
const CARD_STEP = cardWidth + CARD_GAP;

useEffect(() => {
  const update = () => {
    const w = window.innerWidth;
    setCardWidth(Math.min(Math.max(200, w * 0.3), 300));
  };
  update();
  window.addEventListener('resize', update);
  return () => window.removeEventListener('resize', update);
}, []);

// ==========================================
    // AUTOPLAY
    // ==========================================

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            if (isAnimating) return;

            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
            setIsAnimating(true);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, isAnimating]);

    // ==========================================
    // LIMPIAR TIMEOUT
    // ==========================================

    useEffect(() => {
        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }
        };
    }, []);

    // ==========================================
    // INTERACCIÓN MANUAL
    // ==========================================

    const handleInteraction = () => {
        setIsAutoPlaying(false);

        if (autoplayTimeoutRef.current) {
            clearTimeout(autoplayTimeoutRef.current);
        }

        autoplayTimeoutRef.current = setTimeout(() => {
            setIsAutoPlaying(true);
        }, 10000);
    };

    // ==========================================
    // SIGUIENTE
    // ==========================================

    const next = () => {
        if (isAnimating) return;

        handleInteraction();

        setIsTransitioning(true);
        setIsAnimating(true);

        setCurrentIndex((prev) => prev + 1);
    };

    // ==========================================
    // ANTERIOR
    // ==========================================

    const previous = () => {
        if (isAnimating) return;

        handleInteraction();

        setIsTransitioning(true);
        setIsAnimating(true);

        setCurrentIndex((prev) => prev - 1);
    };

    // ==========================================
    // IR DIRECTAMENTE A UN PROYECTO
    // ==========================================

    const goToProject = (index) => {
        handleInteraction();

        setIsTransitioning(true);
        setIsAnimating(false);

        setCurrentIndex(baseLength + index);
    };

    // ==========================================
    // LOOP INFINITO
    // ==========================================

    const handleTransitionEnd = () => {
        setIsAnimating(false);

        // Llegamos demasiado atrás
        if (currentIndex <= baseLength - 1) {
            setIsTransitioning(false);

            setCurrentIndex(
                currentIndex + baseLength
            );

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });

            return;
        }

        // Llegamos demasiado adelante
        if (currentIndex >= baseLength * 2) {
            setIsTransitioning(false);

            setCurrentIndex(
                currentIndex - baseLength
            );

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });
        }
    };

    // ==========================================
    // ÍNDICE REAL
    // ==========================================

    const realIndex =
        ((currentIndex % baseLength) + baseLength) %
        baseLength;

    return (
        <section
            className="
                relative
                flex
                h-[90%]
                min-h-[360px]
                w-full
                flex-col
                items-center
            "
        >

            {/* ======================================
                ÁREA DEL CARRUSEL
            ====================================== */}

            <div
                className="
                    relative
                    flex
                    min-h-0
                    w-full
                    flex-1
                    items-center
                    justify-center
                    overflow-hidden
                "
            >

                {/* ==================================
                    CONTENEDOR DE LAS TARJETAS
                    (scale 1.2: se agranda; el overflow-hidden
                    recorta lo que sobra)
                ================================== */}

                <div
                    className="
                        relative
                        flex
                        h-full
                        w-full
                        scale-[1.2]
                        items-center
                        justify-center
                        overflow-hidden
                    "
                >

                    {extendedProjects.map((project, index) => {

                        const distance =
                            index - currentIndex;

                        // ==================================
                        // MANTENER 7 TARJETAS EN CIRCULACIÓN
                        // ==================================

                        if (Math.abs(distance) > 3) {
                            return null;
                        }

                        const isCenter =
                            distance === 0;

                        const absoluteDistance =
                            Math.abs(distance);

                        // ==================================
                        // POSICIÓN
                        // ==================================

                        const offset =
                            distance * CARD_STEP;

                        // ==================================
                        // ESCALA
                        // ==================================

                        let scale = 0.60;

                        if (absoluteDistance === 0) {
                            scale = 1.05;
                        } else if (absoluteDistance === 1) {
                            scale = 0.82;
                        } else if (absoluteDistance === 2) {
                            scale = 0.70;
                        } else if (absoluteDistance === 3) {
                            scale = 0.60;
                        }

                        // ==================================
                        // OPACIDAD
                        // ==================================

                        let opacity = 0.10;

                        if (absoluteDistance === 0) {
                            opacity = 1;
                        } else if (absoluteDistance === 1) {
                            opacity = 0.50;
                        } else if (absoluteDistance === 2) {
                            opacity = 0.30;
                        } else if (absoluteDistance === 3) {
                            opacity = 0.10;
                        }

                        // ==================================
                        // BLUR
                        // ==================================

                        let blur = "blur-[4px]";

                        if (absoluteDistance === 0) {
                            blur = "blur-0";
                        } else if (absoluteDistance === 1) {
                            blur = "blur-[2px]";
                        } else if (absoluteDistance === 2) {
                            blur = "blur-[3px]";
                        }

                        return (
                            <div
                                key={`${project.id}-${index}`}
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    w-[250px]
                                    h-[400px]
                                    max-h-full

                                    ${isCenter ? "z-30" : "z-10"}

                                    ${blur}

                                    ${
                                        isTransitioning
                                            ? "transition-all duration-500 ease-in-out"
                                            : "transition-none"
                                    }
                                `}
                                style={{
                                    opacity,

                                    transform: `
                                        translate(
                                            calc(-50% + ${offset}px),
                                            -50%
                                        )
                                        scale(${scale})
                                    `,
                                }}

                                // Solo la tarjeta central controla
                                // el final de la animación
                                onTransitionEnd={
                                    isCenter
                                        ? handleTransitionEnd
                                        : undefined
                                }

                                onMouseEnter={() => {
                                    if (isCenter) {
                                        setIsAutoPlaying(false);
                                    }
                                }}

                                onMouseLeave={() => {
                                    if (isCenter) {
                                        handleInteraction();
                                    }
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    isCenter={isCenter}
                                />
                            </div>
                        );
                    })}

                </div>


                {/* ==================================
                    BOTONES
                ================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-50
                        flex
                        w-full
                        items-center
                        justify-between
                        px-2
                    "
                >

                    {/* IZQUIERDA */}

                    <button
                        type="button"
                        onClick={previous}
                        aria-label="Proyecto anterior"
                        className="
                            pointer-events-auto

                            flex
                            h-9
                            w-9
                            items-center
                            justify-center

                            rounded-full

                            border
                            border-gray-600

                            bg-[#202020]

                            text-lg
                            text-gray-200

                            shadow-lg

                            transition-all
                            duration-200

                            hover:scale-110
                            hover:border-green-400
                            hover:bg-[#252525]
                            hover:text-green-400
                        "
                    >
                        ←
                    </button>


                    {/* DERECHA */}

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Proyecto siguiente"
                        className="
                            pointer-events-auto

                            flex
                            h-9
                            w-9
                            items-center
                            justify-center

                            rounded-full

                            border
                            border-gray-600

                            bg-[#202020]

                            text-lg
                            text-gray-200

                            shadow-lg

                            transition-all
                            duration-200

                            hover:scale-110
                            hover:border-green-400
                            hover:bg-[#252525]
                            hover:text-green-400
                        "
                    >
                        →
                    </button>

                </div>

            </div>


            {/* ======================================
                INDICADORES
            ====================================== */}

            <div
                className="
                    mt-2
                    flex
                    shrink-0
                    justify-center
                    gap-2
                "
            >
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        type="button"
                        onClick={() => goToProject(index)}
                        aria-label={`Ir al proyecto ${index + 1}`}
                        className={`
                            h-2
                            rounded-full
                            transition-all
                            duration-300

                            ${
                                index === realIndex
                                    ? "w-6 bg-gray-400"
                                    : "w-2 bg-gray-600 hover:bg-gray-400"
                            }
                        `}
                    />
                ))}
            </div>

        </section>
    );
}