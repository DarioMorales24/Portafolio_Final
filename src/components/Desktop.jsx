import { useState } from "react";
import Window from "./window";
import TaskBar from "./TaskBar";

// Iconos del escritorio (los mismos SVG que la barra de tareas)
const SECCIONES = [
    { id: "sobre-mi", label: "Sobre Mí", icon: "account.svg" },
    { id: "experiencia", label: "Experiencia", icon: "briefcase.svg" },
    { id: "conocimientos", label: "Conocimientos", icon: "brain.svg" },
    { id: "proyectos", label: "Proyectos", icon: "settings.svg" },
];

// Papelera aparte, en la esquina opuesta
const PAPELERA = { id: "papelera", label: "Papelera", icon: "trash.svg" };

export default function Desktop() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    // Abrir aplicación
    const handleOpenApp = (id) => {
        if (!openTabs.includes(id)) {
            setOpenTabs([...openTabs, id]);
        }

        setActiveTab(id);
        setIsWindowOpen(true);
    };

    // Cerrar pestaña
    const handleCloseTab = (id) => {
        const newTabs = openTabs.filter((tab) => tab !== id);

        setOpenTabs(newTabs);

        if (activeTab === id) {
            setActiveTab(
                newTabs.length > 0
                    ? newTabs[newTabs.length - 1]
                    : null
            );
        }

        if (newTabs.length === 0) {
            setIsWindowOpen(false);
        }
    };

    // Minimizar ventana (las pestañas siguen vivas en la barra de tareas)
    const handleMinimizeWindow = () => {
        setIsWindowOpen(false);
    };

    // Cerrar ventana por completo (cierra todas las pestañas)
    const handleCloseWindow = () => {
        setOpenTabs([]);
        setActiveTab(null);
        setIsWindowOpen(false);
    };

    return (
        <div className="fixed inset-0 overflow-hidden">

            {/* Fondo animado */}
            <img
                src="wallpapers/desktop.gif"
                alt=""
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    pointer-events-none
                    select-none
                "
            />

            {/* Capa oscura */}
            <div className="pointer-events-none absolute inset-0 bg-black/10" />

            {/* Escritorio */}
            <div className="relative z-10 h-full w-full">
                <div className="flex h-full w-full flex-col flex-wrap content-start gap-6 p-6 sm:p-4">

                    {SECCIONES.map((seccion) => (
                        <button
                            key={seccion.id}
                            onClick={() => handleOpenApp(seccion.id)}
                            className="
                                flex
                                w-24 md:w-28
                                flex-col
                                items-center
                                gap-2
                                rounded-lg
                                p-3
                                transition-all
                                duration-200
                                hover:bg-white/10
                            "
                        >
                            <img
                                src={`icons/${seccion.icon}`}
                                alt={seccion.label}
                                className="h-12 w-12 object-contain drop-shadow-lg invert"
                            />

                            <span className="text-center text-sm font-semibold text-white drop-shadow-md">
                                {seccion.label}
                            </span>
                        </button>
                    ))}

                </div>

                {/* Papelera: abajo a la derecha, separada del resto */}
                <button
                    onClick={() => handleOpenApp(PAPELERA.id)}
                    className="
                        absolute
                        bottom-20
                        right-6
                        flex
                        w-24 md:w-28
                        flex-col
                        items-center
                        gap-2
                        rounded-lg
                        p-3
                        transition-all
                        duration-200
                        hover:bg-white/10
                    "
                >
                    <img
                        src={`icons/${PAPELERA.icon}`}
                        alt={PAPELERA.label}
                        className="h-12 w-12 object-contain drop-shadow-lg invert"
                    />
                    <span className="text-center text-sm font-semibold text-white drop-shadow-md">
                        {PAPELERA.label}
                    </span>
                </button>

                {/* Ventana */}
                {isWindowOpen && (
                    <Window
                        openTabs={openTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onCloseTab={handleCloseTab}
                        onCloseWindow={handleCloseWindow}
                        onMinimize={handleMinimizeWindow}
                    />
                )}
            </div>

            {/* Barra de tareas */}
            <TaskBar
                openTabs={openTabs}
                activeTab={activeTab}
                onOpenWindow={handleOpenApp}
            />

        </div>
    );
}