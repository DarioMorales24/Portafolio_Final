const SECCIONES_INFO = {
    "sobre-mi": { label: "Sobre_Mí.txt", icon: "icons/account.svg" },
    "experiencia": { label: "Experiencia.log", icon: "icons/briefcase.svg" },
    "conocimientos": { label: "Conocimientos.exe", icon: "icons/brain.svg" },
    "proyectos": { label: "Proyectos.dir", icon: "icons/settings.svg" },
    "papelera": { label: "Papelera", icon: "icons/trash.svg" },
    };

export default function NavBar({ openTabs, activeTab, onSelectTab, onCloseTab }) {
    
    // Si no hay ninguna pestaña abierta, no mostramos la barra
    if (!openTabs || openTabs.length === 0) return null;

    return (
        <div className="flex bg-[#151515] border-b border-gray-700 overflow-x-auto overflow-y-hidden text-sm">
        {openTabs.map((tabId) => {
            // Buscamos la info de la pestaña, si no existe ponemos una por defecto
            const info = SECCIONES_INFO[tabId] || { label: tabId, icon: "📄" };
            const isActive = activeTab === tabId;

            return (
            <div
                key={tabId}
                onClick={() => onSelectTab(tabId)}
                className={`
                group flex items-center justify-between gap-[15px] px-4 py-2 cursor-pointer 
                border-r border-gray-700 min-w-35 max-w-50 select-none
                transition-colors duration-200
                ${isActive 
                    ? "bg-[#0c0c0c] text-green-400 border-t-2 border-t-green-400" // Pestaña Activa
                    : "bg-[#1a1a1a] text-gray-500 hover:bg-[#202020] hover:text-gray-300 border-t-2 border-t-transparent" // Pestaña Inactiva
                }
                `}
            >
                {/* Icono y Nombre de la pestaña */}
                <div className="flex items-center gap-2 truncate">
                <img className="w-3 h-3" src={info.icon} alt={info.label} style={{filter:'brightness(0) saturate(100%) invert(100%)'}}/>
                <span className="truncate">{info.label}</span>
                </div>

                {/* Botón de cerrar pestaña (la 'X') */}
                <button
                onClick={(e) => {
                    e.stopPropagation(); // Evita que al hacer clic en cerrar se seleccione la pestaña
                    onCloseTab(tabId);
                }}
                className={`
                    flex items-center justify-center w-5 h-5 rounded hover:bg-red-900/50 hover:text-red-400 transition-colors
                    ${isActive ? "text-gray-400" : "text-gray-600"}
                `}
                title="Cerrar pestaña"
                aria-label={`Cerrar ${info.label}`}
                >
                ×
                </button>
            </div>
            );
        })}
        </div>
    );
}