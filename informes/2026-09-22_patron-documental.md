# Patrón documental de Society

Estado: vigente · norma documental. Fecha de revisión: 2026-09-22.
Ámbito: todos los documentos del repositorio. Fuentes: encargo y auditoría. Índice único: [README](../README.md).

Cada documento vivo comienza con título, estado, fecha de revisión, ámbito/a quién obliga y fuentes. La fecha editorial no altera fechas de ensayos o consultas. Usar ISO YYYY-MM-DD; timestamps operativos UTC. Estados: vigente (decisión o diseño aplicable), referencia (investigación a revalidar), histórico (evidencia no normativa), obsoleto (sustituido), duplicado (índice o copia superada).

«Vigente» no significa implementado ni verificado: marcar por afirmación medido / documentado / inferencia / diseño / no verificado. Fuente técnica lleva URL/herramienta, fecha, configuración y límite de la comprobación. Una edición de enlaces no revalida precios o licencias. En fuentes antiguas se conserva fecha original; no actualizarla cosméticamente.

Jerarquía: encargo/decisión explícita de Víctor → README raíz para producto → informes vigentes de producción, dirección y estrategia por dominio → reglas del restaurante en su ámbito → referencias/investigaciones → históricos. Un hecho externo no cambia por autoridad editorial: consultar fuente primaria. Conflicto de mismo ámbito sin sustitución explícita se registra y bloquea la decisión dependiente.

Las preferencias de Torre de Vega no obligan a todos los restaurantes. Una excepción aprobada de pieza prevalece sobre el estilo del cliente solo para esa pieza; nunca autoriza inventar producto o saltar derechos. Reglas generales de prompting ceden a la ficha de capacidad y al cliente.

Modelo de encabezado:

```text
# Título
Estado: vigente · diseño, no implementado.
Fecha de revisión: YYYY-MM-DD. Fecha de evidencia: conservar la original.
Ámbito / a quién obliga: producto, cliente o pieza identificados.
Fuentes: enlaces o sección de fuentes; indicar lo no verificado.
Índice único: README raíz.
```

Archivar sin borrar evidencia. Un documento archivado dice por qué y enlaza su sucesor. El README enumera el repositorio resultante; los README secundarios solo redirigen. Scripts históricos y JSON de ensayos se preservan como artefactos, no se les inserta Markdown que rompa su formato.
