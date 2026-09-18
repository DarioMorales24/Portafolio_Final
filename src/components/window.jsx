import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SobreMi from "./SobreMi";
import Experiencia from "./Experiencia";
import ProjectCarousel from "./ProjectCarousel";
import TechIcon from "./TechIcon";
import technologies from "../data/technologies.json";

// Easter egg: archivos de la papelera de reciclaje
const ARCHIVOS_PAPELERA = [
    {
        nombre: "CodigoFinal.java",
        chiste: `public class CodigoFinal {\n    public static void main(String[] args) {\n        // Spoiler: no era el código final\n        System.out.println("Error: conflicto de merge en la línea 1");\n    }\n}`,
    },
    {
        nombre: "CodigoFinalFinal.java",
        chiste: `public class CodigoFinalFinal {\n    public static void main(String[] args) {\n        // Este archivo tiene 47 TODOs sin resolver\n        throw new RuntimeException("Funcionaba en mi máquina");\n    }\n}`,
    },
    {
        nombre: "CodigoFinalFinalAhoraSi.java",
        chiste: `public class CodigoFinalFinalAhoraSi {\n    public static void main(String[] args) {\n        // TODO: borrar este comentario antes de entregar\n        // (se olvidó borrarlo desde 2023)\n        while (true) {\n            System.out.println("¿Por qué no compila?");\n        }\n    }\n}`,
    },
    {
        nombre: "EsteSiEsElUltimoCodigoFinal.java",
        chiste: `public class EsteSiEsElUltimoCodigoFinal {\n    public static void main(String[] args) {\n        int programadores = 0;\n        // ¿Cuántos programadores se necesitan para cambiar una bombilla?\n        // Ninguno, es un problema de hardware.\n        System.out.println("La papelera es donde este código merecía estar.");\n    }\n}`,
    },
    {
        nombre: "League of Legends",
        icono: "icons/lol.svg",
        chiste: `;; Acceso directo eliminado ;;\n\nLeague of Legends.exe no encontrado.\n\n> Veces desinstalado: 657\n> Veces reinstalado: 658\n\nMotivo de la desinstalación n°657:\n"Esta vez sí lo dejo. Ranked me hace daño."\n\nNota del sistema:\nSe detectó que volverá a instalarse en aproximadamente 3 días.`,
    },
];

    // AHORA RECIBE LAS PROPS DEL DESKTOP
export default function Window({ openTabs, activeTab, setActiveTab, onCloseTab, onCloseWindow, onMinimize }) {
    const [mostrarCards, setMostrarCards] = useState(false);
    const [archivoAbierto, setArchivoAbierto] = useState(null);
    const [maximizado, setMaximizado] = useState(false);

    // Al cambiar de pestaña, volver a la lista de archivos de la papelera
    useEffect(() => {
        setArchivoAbierto(null);
    }, [activeTab]);

    // Efecto cascada para los conocimientos
    useEffect(() => {
        if (activeTab === "conocimientos") {
        const timer = setTimeout(() => setMostrarCards(true), 50);
        return () => clearTimeout(timer);
        } else {
        setMostrarCards(false);
        }
    }, [activeTab]);

    return (
        // Si está maximizada ocupa toda la pantalla; si no, se centra
        <div className={maximizado
            ? "absolute inset-0 w-full h-full border-0 bg-[#0b0b0b] font-mono text-green-400 overflow-hidden flex flex-col"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[53%] w-[98vw] max-w-[1400px] h-[96vh] shadow-2xl border border-gray-800 bg-[#0b0b0b] font-mono text-green-400 rounded-lg overflow-hidden flex flex-col"
        }>
        
            {/* Barra superior de Windows */}
            <div className="flex items-center justify-between border-b border-gray-700 bg-[#202020] px-3 py-2 shrink-0">
                <span className="text-sm text-gray-300">C:\Windows\System32\cmd.exe</span>
                <div className="flex gap-1">
                {/* Minimizar: esconde la ventana, las pestañas quedan en la barra de tareas */}
                <button
                    onClick={onMinimize}
                    title="Minimizar"
                    className="h-5 w-6 bg-gray-700 hover:bg-gray-600 text-white transition-colors">_</button>
                {/* Maximizar / restaurar */}
                <button
                    onClick={() => setMaximizado((prev) => !prev)}
                    title={maximizado ? "Restaurar" : "Maximizar"}
                    className="h-5 w-6 bg-gray-700 hover:bg-gray-600 text-white transition-colors">□</button>
                {/* Cerrar: cierra la ventana y todas las pestañas */}
                <button
                    onClick={onCloseWindow}
                    title="Cerrar"
                    className="h-5 w-6 bg-red-800 hover:bg-red-700 text-white transition-colors">×</button>
                </div>
            </div>

            {/* Pestañas dinámicas */}
            <NavBar 
                openTabs={openTabs} 
                activeTab={activeTab} 
                onSelectTab={setActiveTab} 
                onCloseTab={onCloseTab} 
            />

            {/* Contenedor principal con scroll independiente */}
            <main className="p-6 overflow-y-auto overflow-x-hidden grow relative">
                
                {/* Sobre mí: apartado con foto, terminal y estudios */}
                {activeTab === "sobre-mi" && <SobreMi />}

                {/* Experiencia: timeline vertical con navegación por botones */}
                {activeTab === "experiencia" && <Experiencia />}

                {/* Conocimientos */}
                {activeTab === "conocimientos" && (
                <section className="w-full pb-10">
                    <h2 className="mb-8 text-2xl font-bold text-green-400 text-center">
                    Conocimientos
                    </h2>

                    {/* CONTENEDOR PADRE: flex-wrap es obligatorio para que bajen de línea */}
                    <div className="mx-auto flex max-w-[850px] flex-wrap justify-center gap-[15px]">
    {technologies.map((tech, index) => {
        const delayPerItem = Math.min(100, 2000 / technologies.length);

        return (
            <div
                key={tech.name}
                className={`
                    aspect-square
                    w-[140px]
                    m-[10px]
                    flex-none
                    transition-all
                    duration-700
                    ease-out
                    ${
                        mostrarCards
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }
                `}
                style={{
                    transitionDelay: `${index * delayPerItem}ms`,
                }}
            >
                <div
                    className="
                        flex
                        h-full
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-800
                        bg-[#151515]
                        p-4
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:border-green-400
                        hover:bg-[#1b1b1b]
                        hover:shadow-[0_0_15px_rgba(74,222,128,0.2)]
                    "
                >
                    <TechIcon
                        name={tech.icon}
                        size={64}
                    />

                    <span
                        className="
                            mt-3
                            w-full
                            text-center
                            text-s
                            leading-tight
                            text-gray-300
                        "
                    >
                        {tech.name}
                    </span>
                </div>
            </div>
        );
    })}
</div>
                </section>
                )}

                {/* Papelera de reciclaje (easter egg) */}
                {activeTab === "papelera" && (
                <section className="w-full">
                    <p className="mb-6 text-gray-400">
                        C:\Users\Dario\papelera&gt; {(archivoAbierto === null) ? "dir" : `type ${ARCHIVOS_PAPELERA[archivoAbierto].nombre}`}
                    </p>

                    {archivoAbierto === null ? (
                        <>
                            {/* Listado de archivos */}
                            <div className="flex flex-col gap-1">
                                {ARCHIVOS_PAPELERA.map((archivo, index) => (
                                    <button
                                        key={archivo.nombre}
                                        onClick={() => setArchivoAbierto(index)}
                                        className="
                                            flex
                                            w-fit
                                            items-center
                                            gap-3
                                            rounded
                                            px-2
                                            py-1
                                            text-left
                                            text-green-400
                                            transition-colors
                                            duration-200
                                            hover:bg-white/5
                                            hover:text-green-300
                                        "
                                    >
                                        {archivo.icono ? (
                                            <img
                                                src={archivo.icono}
                                                alt=""
                                                className="h-5 w-5 object-contain invert"
                                            />
                                        ) : (
                                            <span className="text-lg">📄</span>
                                        )}
                                        <span>{archivo.nombre}</span>
                                    </button>
                                ))}
                            </div>

                            <p className="mt-4 text-gray-500">
                                {ARCHIVOS_PAPELERA.length} archivo(s) encontrados. Haz clic en uno para abrirlo.
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Contenido del archivo abierto */}
                            <pre className="whitespace-pre-wrap text-left text-green-400 font-mono">
                                {ARCHIVOS_PAPELERA[archivoAbierto].chiste}
                            </pre>

                            <button
                                onClick={() => setArchivoAbierto(null)}
                                className="
                                    mt-6
                                    rounded
                                    border
                                    border-green-900
                                    bg-[#202020]
                                    px-4
                                    py-1.5
                                    text-sm
                                    text-green-400
                                    transition-all
                                    duration-200
                                    hover:border-green-400
                                    hover:bg-green-900/30
                                "
                            >
                                cd ..
                            </button>
                        </>
                    )}
                </section>
                )}

                {/* Proyectos */}
                {activeTab === "proyectos" && (
                <section className="flex h-full min-h-0 w-full flex-col">

                    <h2 className="shrink-0 text-center text-2xl font-bold text-green-400">
                        Proyectos
                    </h2>

                    <div className="flex min-h-0 flex-1 items-center justify-center px-4">
                        <ProjectCarousel />
                    </div>

                </section>
            )}
            </main>
        </div>
    );
}