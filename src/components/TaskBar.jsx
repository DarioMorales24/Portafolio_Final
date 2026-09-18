import { useEffect, useState } from "react";

const APPS = [
    {
        id: "sobre-mi",
        label: "Sobre Mí",
        icon: "account.svg",
    },
    {
        id: "experiencia",
        label: "Experiencia",
        icon: "briefcase.svg",
    },
    {
        id: "conocimientos",
        label: "Conocimientos",
        icon: "brain.svg",
    },
    {
        id: "proyectos",
        label: "Proyectos",
        icon: "settings.svg",
    },
];

function TaskBarButton({ icon, label, active, onClick }) {
    return (
        <button
            type="button"
            title={label}
            onClick={onClick}
            className={`
                relative
                flex
                h-11
                w-10 md:w-11
                items-center
                justify-center
                rounded-md
                transition-all
                duration-200
                hover:bg-white/10
                ${active ? "bg-white/10" : ""}
            `}
        >
            <img
                src={`/icons/${icon}`}
                alt={label}
                className="h-[25px] w-[25px] object-contain invert"
            />

            {active && (
                <span
                    className="
                        absolute
                        bottom-1
                        h-0.5
                        w-4
                        rounded-full
                        bg-green-400
                    "
                />
            )}
        </button>
    );
}

export default function TaskBar({
    openTabs,
    activeTab,
    onOpenWindow,
}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);

    // Actualiza el reloj cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const time = currentTime.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const date = currentTime.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <>
            {/* Capa invisible para cerrar el menú al hacer clic fuera */}
            {isStartOpen && (
                <div
                    className="fixed inset-0 z-[90]"
                    onClick={() => setIsStartOpen(false)}
                />
            )}

            {/* Menú de inicio */}
            {isStartOpen && (
                <div
                    className="
                        fixed
                        bottom-[68px]
                        left-2
                        z-[95]
                        w-72
                        rounded-xl
                        border
                        border-white/10
                        bg-[#1a1a1a]/95
                        p-3
                        shadow-2xl
                        backdrop-blur-xl
                    "
                >
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Anclado
                    </p>

                    <div className="flex flex-col gap-0.5">
                        {APPS.map((app) => (
                            <button
                                key={app.id}
                                type="button"
                                onClick={() => {
                                    onOpenWindow(app.id);
                                    setIsStartOpen(false);
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-md
                                    px-3
                                    py-2
                                    text-left
                                    transition-colors
                                    duration-150
                                    hover:bg-white/10
                                "
                            >
                                <img
                                    src={`/icons/${app.icon}`}
                                    alt=""
                                    className="h-6 w-6 object-contain invert"
                                />
                                <span className="text-sm text-gray-200">
                                    {app.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Usuario al pie, como en Windows */}
                    <div className="mt-3 flex items-center gap-3 border-t border-white/10 px-2 pt-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-900/50 text-base">
                            👤
                        </span>
                        <span className="text-sm font-semibold text-white">
                            Darío
                        </span>
                    </div>
                </div>
            )}

        <div
            className="
                fixed
                bottom-0
                left-0
                z-[100]
                flex
                h-16
                w-full
                items-center
                justify-between
                border-t
                border-white/10
                bg-[#111111]/80
                px-3
                backdrop-blur-xl
            "
        >
            {/* Lado izquierdo */}
            <div className="flex items-center gap-1">
                {/* Windows: abre/cierra el menú de inicio */}
                <button
                    type="button"
                    title="Inicio"
                    onClick={() => setIsStartOpen((prev) => !prev)}
                    className={`
                        flex
                        h-11
                        w-10 md:w-11
                        items-center
                        justify-center
                        rounded-md
                        transition-all
                        duration-200
                        hover:bg-white/10
                        ${isStartOpen ? "bg-white/10" : ""}
                    `}
                >
                    <img
                        src="/icons/window.svg"
                        alt="Inicio"
                        className="h-[25px] w-[25px] object-contain"
                    />
                </button>

                {/* Buscar */}
                <button
                    type="button"
                    title="Buscar"
                    className="
                        flex
                        h-11
                        w-10 md:w-11
                        items-center
                        justify-center
                        rounded-md
                        transition-all
                        duration-200
                        hover:bg-white/10
                    "
                >
                    <img
                        src="/icons/search.svg"
                        alt="Buscar"
                        className="h-[25px] w-[25px] object-contain invert"
                    />
                </button>

                {/* Explorador */}
                <button
                    type="button"
                    title="Explorador de archivos"
                    className="
                        flex
                        h-11
                        w-10 md:w-11
                        items-center
                        justify-center
                        rounded-md
                        transition-all
                        duration-200
                        hover:bg-white/10
                    "
                >
                    <img
                        src="/icons/folder.svg"
                        alt="Explorador"
                        className="h-[25px] w-[25px] object-contain invert"
                    />
                </button>

                {/* Separador */}
                <div className="mx-1 h-7 w-px bg-white/10" />

                {/* Aplicaciones */}
                {APPS.map((app) => (
                    <TaskBarButton
                        key={app.id}
                        icon={app.icon}
                        label={app.label}
                        active={openTabs.includes(app.id)}
                        onClick={() => onOpenWindow(app.id)}
                    />
                ))}

                {/* Papelera: solo aparece en la barra mientras está abierta */}
                {openTabs.includes("papelera") && (
                    <>
                        {/* Separador */}
                        <div className="mx-1 h-7 w-px bg-white/10" />

                        <TaskBarButton
                            icon="trash.svg"
                            label="Papelera"
                            active
                            onClick={() => onOpenWindow("papelera")}
                        />
                    </>
                )}
            </div>

            {/* Lado derecho */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    title="Wi-Fi"
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-md
                        hover:bg-white/10
                    "
                >
                    <img
                        src="/icons/wifi.svg"
                        alt="Wi-Fi"
                        className="h-[15px] w-[15px] object-contain invert"
                    />
                </button>

                <button
                    type="button"
                    title="Volumen"
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-md
                        hover:bg-white/10
                    "
                >
                    <img
                        src="/icons/volume.svg"
                        alt="Volumen"
                        className="h-[15px] w-[15px] object-contain invert"
                    />
                </button>

                <button
                    type="button"
                    title="Batería"
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-md
                        hover:bg-white/10
                    "
                >
                    <img
                        src="/icons/battery.svg"
                        alt="Batería"
                        className="h-[15px] w-[15px] object-contain invert"
                    />
                </button>

                <div
                    className="
                        ml-1
                        flex
                        min-w-[70px]
                        flex-col
                        items-center
                        justify-center
                        rounded-md
                        px-2
                        py-1
                        hover:bg-white/10
                    "
                >
                    <span className="text-xs text-white">
                        {time}
                    </span>

                    <span className="text-[10px] text-gray-400">
                        {date}
                    </span>
                </div>
            </div>
        </div>
        </>
    );
}