import { useState, useEffect } from "react";
import TechIcon from "./TechIcon";

export default function ProjectCard({ project, isCenter }) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array de imágenes asegurado
    const images = project.images || ["/placeholder.jpg"];

    // Mini-carrusel interno
    useEffect(() => {
        let interval;

        // Solo cambia imágenes en la tarjeta central cuando está en hover
        if (isCenter && isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 1500);
        }

        return () => clearInterval(interval);
    }, [isCenter, isHovered, images.length]);

    // Al quitar el mouse, volver a la primera imagen
    useEffect(() => {
        if (!isHovered) {
            setCurrentImageIndex(0);
        }
    }, [isHovered]);

    return (
        <div
            className="
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-gray-800
                bg-[#151515]
                group
                transition-colors
                duration-300
                hover:border-green-400
            "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Imagen */}
            <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-black">
                <img
                    src={images[currentImageIndex]}
                    alt={`Captura de ${project.title}`}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-opacity
                        duration-300
                    "
                />

                {/* Indicadores del mini-carrusel */}
                {isCenter && images.length > 1 && (
                    <div
                        className="
                            absolute
                            bottom-2
                            left-0
                            right-0
                            flex
                            justify-center
                            gap-1.5
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                        "
                    >
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                    h-1.5
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                        index === currentImageIndex
                                            ? "w-4 bg-green-400"
                                            : "w-1.5 bg-gray-500/80"
                                    }
                                `}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="flex grow flex-col gap-[5px]">

                {/* Título y descripción */}
                <div className="p-[5px]">
                    <h3 className="mb-2 text-sm font-bold leading-tight text-green-400 text-center">
                        {project.title}
                    </h3>

                    <div>
                        <p className="text-[14px] leading-relaxed text-gray-400 text-center">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Tecnologías */}
                <div className="mt-auto">
                    <div className="flex flex-wrap justify-center gap-[8px]">
                        {project.technologies?.map((tech, index) => (
                            <div key={index}>
                                <TechIcon
                                    name={tech}
                                    size={28}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub */}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            mt-1
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-[5px]
                            rounded
                            border
                            border-green-900
                            bg-[#202020]
                            py-1.5
                            text-xs
                            text-green-400
                            transition-all
                            duration-300
                            hover:border-green-400
                            hover:bg-green-900/30
                        "
                    >
                        <TechIcon
                            name={"GitHub"}
                            size={24}
                        />

                        Ver Repositorio
                    </a>
                )}
            </div>
        </div>
    );
}