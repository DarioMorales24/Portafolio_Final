import { useEffect, useState } from "react";
import TechIcon from "./TechIcon";

// ============================================================
// DATOS EDITABLES: cambia aquí tu información real
// ============================================================
const DATOS = {
    nombre: "Darío Morales A.",
    edad: 27,
    telefono: "+56 9 6679 6088",
    email: "dm.andrades2706@gmail.com",
    ubicacion: "Chile",
    rol: "Desarrollador Fullstack",

    saludo: "Hola, soy Darío",
    subtitulo: "Y me gusta construir cosas.",
    descripcionCorta:
        "Soy un desarrollador de Software cursando Ingeniería en Informática en Duoc UC, con conocimientos en desarrollo frontend y backend.",
    descripcionLarga:
        "Soy una persona tranquila, trabajadora y paciente, con facilidad para el trabajo en equipo, tolerancia al estrés y aprendizaje rápido.",

    github: "https://github.com/DarioMorales24",
    cv: "/cv/CV_08-2026.pdf",
    foto: "/assets/perfil.png",
};

const TECNOLOGIAS_PRINCIPALES = [
    "Java",
    "Spring",
    "PostgresSQL",
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Git",
    "Docker",
];

const ESTUDIOS = [
    {
        titulo: "Ingeniería en Informática",
        institucion: "Duoc UC",
        año: "2024 - Actualidad",
        url: "",
    },
    {
        titulo: "Educación Básica y Media",
        institucion: "Colegio Claudio Matte",
        año: "2007 - 2016",
        url: "",
    },
];

const CERTIFICACIONES = [
    {
        titulo: "Programación Full Stack",
        institucion: "Duoc UC",
        año: "2026",
        url: "https://www.linkedin.com/in/dario-morales-a395b5384/overlay/Certifications/1313846486/treasury?profileId=ACoAAF7F3o0B12IvT6UtHUbtPI8EEYxfAaTuxxg",
    },
    {
        titulo: "Artificial Intelligence Professional Certification - CAIPC®",
        institucion: "CertiProf",
        año: "",
        url: "https://cmkr.co/pdf/downloads/?certificate_id=56792&sid=105116912&nrg_id=1118675&test_id=1819738&aid=4238890&utype=SD&cert_token=fcb516fa33811bdcf3a3fe65107b5034&tprtoken=JE4K",
    },
    {
        titulo: "Big Data Professional Certificate - BDPC",
        institucion: "CertiProf",
        año: "",
        url: "https://www.credly.com/badges/6e94e559-9413-4b37-9fca-dc70d9b488df/linked_in_profile",
    },
];
// ============================================================
// HOOK: máquina de escribir reutilizable
// Todos los textos empiezan al mismo tiempo (simultáneos)
// ============================================================
function useTypewriter(texto, velocidad = 25) {
    const [escrito, setEscrito] = useState("");

    useEffect(() => {
        setEscrito("");
        let i = 0;

        const intervalo = setInterval(() => {
            i++;
            setEscrito(texto.slice(0, i));
            if (i >= texto.length) clearInterval(intervalo);
        }, velocidad);

        return () => clearInterval(intervalo);
    }, [texto, velocidad]);

    return escrito;
}

// ============================================================
// JSON del mini terminal (con tu información)
// ============================================================
const JSON_TERMINAL = `const developer = {
 nombre: "${DATOS.nombre}",
 edad: ${DATOS.edad},
 telefono: "${DATOS.telefono}",
 mail:"${DATOS.email}",
 ubicacion: "${DATOS.ubicacion}",
 rol: "${DATOS.rol}"
};`;

export default function SobreMi() {
    // Todos los textos se escriben a la vez
    const saludo = useTypewriter(DATOS.saludo, 60);
    const subtitulo = useTypewriter(DATOS.subtitulo, 60);
    const descCorta = useTypewriter(DATOS.descripcionCorta, 15);
    const descLarga = useTypewriter(DATOS.descripcionLarga, 10);
    const json = useTypewriter(JSON_TERMINAL, 12);

    return (
        <section className="w-full text-left">
            {/* ==================================
                PARTE SUPERIOR: texto + foto/terminal
                ================================== */}
            {/* Grid de 2 columnas iguales (como tu maqueta: 1fr 1fr, alto fijo) */}
            <div className="grid gap-4 md:grid-cols-2 md:h-[500px] py-4">

                {/* Columna izquierda: presentación, centrada verticalmente
                    para rellenar los 400px de alto */}
                <div className="flex min-w-0 flex-col justify-center">
                    <span className="inline-block w-fit rounded-full border border-green-800 bg-green-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-green-400">
                        Desarrollador fullstack
                    </span>

                    <h1 className="mt-6 min-h-[20px] text-[15px] font-bold text-white md:text-[15px]">
                        {saludo}
                    </h1>

                    <p className="mt-3 min-h-[32px] text-xl font-semibold text-green-400 md:text-2xl">
                        {subtitulo}
                    </p>

                    <p className="mt-6 min-h-[48px] text-sm leading-relaxed text-gray-300 md:text-base">
                        {descCorta}
                    </p>

                    <p className="mt-4 min-h-[96px] text-sm leading-relaxed text-gray-500">
                        {descLarga}
                    </p>

                    {/* Botones */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={DATOS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-md
                                border
                                border-green-500
                                bg-green-500/10
                                px-5
                                py-2
                                text-sm
                                font-semibold
                                text-green-400
                                transition-all
                                duration-200
                                hover:bg-green-500
                                hover:text-black
                            "
                        >
                            <TechIcon name="GitHub" size={18} />
                            GitHub ↗
                        </a>

                        <a
                            href={DATOS.cv}
                            download
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-md
                                border
                                border-gray-600
                                bg-[#202020]
                                px-5
                                py-2
                                text-sm
                                font-semibold
                                text-gray-200
                                transition-all
                                duration-200
                                hover:border-green-400
                                hover:text-green-400
                            "
                        >
                            Descargar CV ⬇
                        </a>
                    </div>
                </div>

                {/* Columna derecha: relativa, la terminal se superpone encima */}
                <div className="relative w-full">
                    {/* Foto centrada (80% ancho, max 320px, redonda) */}
                    <div className="flex h-full items-center justify-center">
                        <img
                            src={DATOS.foto}
                            alt="Foto de Darío"
                            className="aspect-square w-4/5 max-w-80 -translate-x-[45px] object-cover object-[70%_center]"
                        />
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-[#0c0c0c]"></div>
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-[#0c0c0c]"></div>
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-[#0c0c0c]"></div>
                    </div>

                    {/* Capa terminal: cubre toda la columna (inset-0) */}
                    <div className="absolute inset-0 z-10">
                        {/* Contenido: anclado abajo a la derecha con 10px de margen,
                            tamaño fijo para que no empuje nada mientras escribe */}
                        <div className="absolute bottom-[10px] right-[0px] w-62 overflow-hidden rounded-lg border border-gray-700 bg-[#0c0c0c]/95 shadow-2xl backdrop-blur-sm">
                        {/* Barra de la mini terminal */}
                        <div className="flex items-center gap-1.5 border-b border-gray-700 bg-[#1a1a1a] px-3 py-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs text-gray-500">
                                developer.js
                            </span>
                        </div>

                        {/* Altura fija para que no empuje el layout mientras se escribe */}
                        <pre className="h-[210px] overflow-hidden p-3 font-mono text-[14px] leading-relaxed text-green-400">
                            {json}
                            <span className="animate-pulse">█</span>
                        </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================================
                TECNOLOGÍAS PRINCIPALES
                ================================== */}
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-800 pt-6">
                <h3 className="shrink-0 text-lg font-bold uppercase tracking-widest text-green-400">
                    Tecnologías que uso
                </h3>

                <div className="flex flex-nowrap gap-4">
                    {TECNOLOGIAS_PRINCIPALES.map((tech) => (
                        <div
                            key={tech}
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-gray-800
                                bg-[#151515]
                                transition-all
                                duration-200
                                hover:-translate-y-1
                                hover:border-green-400
                            "
                            title={tech}
                        >
                            <TechIcon name={tech} size={26} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ==================================
                ESTUDIOS Y CERTIFICACIONES (2 columnas)
                ================================== */}
            <div className="mt-10 border-t border-gray-800 pt-6 pb-4">
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Columna: Estudios */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-green-400">
                            🎓 Estudios
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                            {ESTUDIOS.map((estudio) => (
                                <div
                                    key={estudio.titulo}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        rounded-lg
                                        border
                                        border-gray-800
                                        bg-[#151515]
                                        px-4
                                        py-3
                                        transition-all
                                        duration-200
                                        hover:border-green-400
                                    "
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-200">
                                            {estudio.titulo}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {estudio.institucion} · {estudio.año}
                                        </p>
                                    </div>

                                    {estudio.url && (
                                        <a
                                            href={estudio.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Ver certificación"
                                            className="
                                                flex
                                                h-7
                                                w-7
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded
                                                border
                                                border-gray-700
                                                text-green-400
                                                transition-all
                                                duration-200
                                                hover:border-green-400
                                                hover:bg-green-900/30
                                            "
                                        >
                                            ↗
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Columna: Certificaciones */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-green-400">
                            📜 Certificaciones
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">
                            {CERTIFICACIONES.map((cert) => (
                                <div
                                    key={cert.titulo}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        rounded-lg
                                        border
                                        border-gray-800
                                        bg-[#151515]
                                        px-4
                                        py-3
                                        transition-all
                                        duration-200
                                        hover:border-green-400
                                    "
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-200">
                                            {cert.titulo}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {cert.institucion} · {cert.año}
                                        </p>
                                    </div>

                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Ver certificación"
                                            className="
                                                flex
                                                h-7
                                                w-7
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded
                                                border
                                                border-gray-700
                                                text-green-400
                                                transition-all
                                                duration-200
                                                hover:border-green-400
                                                hover:bg-green-900/30
                                            "
                                        >
                                            ↗
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
