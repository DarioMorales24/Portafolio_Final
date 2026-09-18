import { useState } from "react";

// ============================================================
// DATOS EDITABLES: agrega/quita experiencias aquí
// ============================================================
const EXPERIENCIAS = [
  {
    numero: "01",
    titulo: "Operario",
    detalle: "KFC",
    periodo: "2023 — Presente",
    puntos: [
      "Trabajo en equipo y atención al cliente",
      "Resolución de problemas en el día a día",
      "Trabajo bajo presión y cumplimiento de objetivos",
    ],
  },
  {
    numero: "02",
    titulo: "Inserta tu Oferta Laboral",
    detalle: "Tu empresa aquí ▼",
    periodo: "Próximamente...",
    puntos: [
      "Buscando mi primera oportunidad en desarrollo",
      "Construyendo proyectos mientras sigo aprendiendo",
      "¿Podría ser aquí donde empieza?",
    ],
  },
];

const CARD_HEIGHT = 210; // Alto fijo de cada tarjeta
const GAP = 12; // Espacio entre tarjetas
const STEP = CARD_HEIGHT + GAP;

export default function Experiencia() {
  const [indice, setIndice] = useState(0);

  const ultimo = EXPERIENCIAS.length - 1;

  return (
    <section className="flex h-full w-full flex-col items-center text-left">
      {/* Botón subir */}
      <button
        onClick={() => setIndice((i) => Math.max(0, i - 1))}
        disabled={indice === 0}
        className="
                    my-3
                    shrink-0
                    rounded-full
                    border
                    border-gray-700
                    bg-[#1a1a1a]
                    px-6
                    py-1.5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-gray-400
                    transition-all
                    duration-200
                    hover:border-green-400
                    hover:text-green-400
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    disabled:hover:border-gray-700
                    disabled:hover:text-gray-400
                "
      >
        ▲ Subir experiencia
      </button>

      {/* Área del timeline (sin scroll, se recorta lo que sobra) */}
      <div className="relative w-full min-h-0 flex-1 overflow-hidden">
        {/* Línea vertical de fondo */}
        <div className="absolute top-[30px] bottom-[30px] left-[27px] w-px bg-gray-700" />

        {/* Pista que se desplaza */}
        <div
          className="flex flex-col transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateY(${10 - indice * STEP}px)`,
          }}
        >
          {EXPERIENCIAS.map((exp, i) => {
            const esActiva = i === indice;

            return (
              <div
                key={exp.numero}
                className="flex items-start gap-4"
                style={{ height: `${CARD_HEIGHT}px` }}
              >
                {/* Punto numerado sobre la línea */}
                <div
                  className={`
                                        z-10
                                        flex
                                        h-14
                                        w-14
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-2
                                        text-sm
                                        font-bold
                                        transition-all
                                        duration-300
                                        ${
                                          esActiva
                                            ? "border-green-400 bg-green-900/40 text-green-400"
                                            : "border-gray-600 bg-[#1a1a1a] text-gray-500"
                                        }
                                    `}
                >
                  {exp.numero}
                </div>

                {/* Tarjeta de la experiencia */}
                <div
                  className={`
                                        h-full
                                        min-w-0
                                        flex-1
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        p-5
                                        transition-all
                                        duration-500
                                        ${
                                          esActiva
                                            ? "border-green-400/60 bg-[#151515] opacity-100 blur-0"
                                            : "border-gray-800 bg-[#101010] opacity-40 blur-[2px]"
                                        }
                                    `}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-gray-100">
                        {exp.titulo}
                      </h3>
                      <p className="text-sm text-gray-400">{exp.detalle}</p>
                    </div>

                    <span
                      className={`
                                                shrink-0
                                                rounded-full
                                                border
                                                px-3
                                                py-0.5
                                                text-xs
                                                font-semibold
                                                ${
                                                  esActiva
                                                    ? "border-green-700 bg-green-900/40 text-green-400"
                                                    : "border-gray-700 bg-[#1a1a1a] text-gray-500"
                                                }
                                            `}
                    >
                      {exp.periodo}
                    </span>
                  </div>

                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-gray-400">
                    {exp.puntos.map((punto) => (
                      <li key={punto}>{punto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón bajar */}
      <button
        onClick={() => setIndice((i) => Math.min(ultimo, i + 1))}
        disabled={indice === ultimo}
        className="
                    my-3
                    shrink-0
                    rounded-full
                    border
                    border-green-800
                    bg-green-900/30
                    px-6
                    py-1.5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-green-400
                    transition-all
                    duration-200
                    hover:bg-green-800/40
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    disabled:hover:bg-green-900/30
                "
      >
        ▼ Bajar experiencia
      </button>
    </section>
  );
}
