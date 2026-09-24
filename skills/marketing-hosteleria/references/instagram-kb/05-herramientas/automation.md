> **Origen:** `torre_de_vega/instagram-skill-hosteleria/05-herramientas/automation.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Automatización: Zapier, Make y n8n para Instagram

## TL;DR
- **Zapier** cobra por tarea ejecutada, es el más rápido de configurar y el más adecuado si el negocio no tiene a nadie técnico en el equipo.
- **Make** ofrece un equilibrio entre facilidad visual y lógica compleja (condicionales, bucles), adecuado para flujos de dificultad media.
- **n8n** cobra por ejecución completa del flujo (no por paso), lo que puede reducir el coste entre un 80-90% frente a Zapier en volúmenes altos, pero requiere más conocimiento técnico o a alguien que lo mantenga; puede autoalojarse para control total de los datos.
- Todo flujo de automatización que interactúe con Instagram debe respetar los límites de la API (ver [[../02-configuracion-tecnica/security-privacy.md]]), especialmente el límite de 200 DMs automatizados/hora.
- Los casos de uso más rentables en hostelería no son "publicar automáticamente en Instagram", sino conectar Instagram/WhatsApp con reservas, CRM y email marketing para no perder leads.

## Conceptos fundamentales

**Diferencia de modelo de precio.** Zapier cuenta cada acción individual dentro de un flujo como una "tarea" facturable; Make y especialmente n8n cuentan la ejecución completa del flujo como una unidad. Para un flujo de 10 pasos que se ejecuta 10.000 veces al mes, esto puede suponer una diferencia de coste de hasta 80-90% a favor de n8n, pero a cambio n8n exige más configuración técnica (o un proveedor/freelance que lo mantenga).

**Cuándo usar cada uno:**
- **Zapier:** el negocio quiere algo que funcione ya, sin configurar nada complejo, y está dispuesto a pagar 20-50 $/mes por comodidad. Ideal para el primer flujo de automatización de un restaurante independiente.
- **Make:** cuando se necesita lógica más compleja (condicionales, rutas alternativas según el tipo de mensaje o reserva) pero el equipo tiene algo de capacidad técnica para configurarlo, sin llegar a ser desarrolladores.
- **n8n:** cuando el volumen de ejecuciones es alto (muchas reservas, muchos mensajes) y compensa invertir en una configuración más técnica, o cuando hay preferencia por mantener los datos en servidor propio (autoalojado) por motivos de privacidad/coste a largo plazo.

**IA integrada en las tres plataformas (2026).** Las tres herramientas han incorporado capacidades de IA nativas: n8n con integración de LangChain y más de 70 nodos de IA, Make con "Maia AI" y agentes de Make AI, y Zapier con "Zapier Agents" para ejecución autónoma de tareas sobre miles de apps conectadas. Esto permite, por ejemplo, que un flujo no solo reenvíe un mensaje de WhatsApp a una hoja de cálculo, sino que un agente de IA redacte una respuesta personalizada antes de enviarla.

**Casos de uso reales para hostelería (no solo "publicar posts"):**
1. **Reserva → CRM/hoja de cálculo:** cuando llega una reserva por WhatsApp o por el botón de Instagram, el flujo la registra automáticamente en una hoja de cálculo o CRM, evitando doble anotación manual.
2. **Comentario/DM con palabra clave → respuesta automática:** un cliente comenta "carta" o "precio" y el flujo dispara una respuesta automática con el enlace a la carta o a reservas.
3. **Nueva publicación en Instagram → email/newsletter:** cada vez que se publica un Reel o post nuevo, se añade automáticamente a un boletín semanal de novedades.
4. **Reseña negativa detectada → alerta al equipo:** monitorización de menciones o comentarios negativos que activa una notificación interna para responder rápido.
5. **Reserva confirmada → recordatorio automático 2h antes:** flujo que envía un recordatorio por WhatsApp antes de la reserva, reduciendo el "no-show".

## Datos y benchmarks 2026

| Herramienta | Precio | Pros | Contras | Fuente |
|---|---|---|---|---|
| Zapier | Desde gratis (tareas limitadas) hasta 20-50 $+/mes según volumen | Configuración inmediata, 8.000+ apps conectadas, Zapier Agents (IA) | Coste alto a volumen elevado (factura por tarea) | digitalapplied.com/blog/zapier-vs-make-vs-n8n-2026-automation-comparison |
| Make | Planes intermedios, factura por operaciones | Buen equilibrio visual/potencia, Maia AI y agentes | Curva de aprendizaje mayor que Zapier | intuz.com/blog/make-vs-n8n-vs-zapier-detailed-comparison |
| n8n | Gratis si se autoaloja (coste de servidor) · planes cloud de pago disponibles | Factura por ejecución completa, hasta 80-90% más barato a volumen alto, 70+ nodos de IA | Requiere más conocimiento técnico o soporte especializado | dev.to/atlasdigital/n8n-alternatives-2026 · parseur.com/blog/zapier-n8n-make |

## Pasos accionables

1. Empezar con un único flujo de alto impacto y bajo riesgo: reserva por WhatsApp/Instagram → registro automático en hoja de cálculo o CRM.
2. Si el negocio no tiene perfil técnico interno: montar ese primer flujo en Zapier, aceptando el coste algo mayor a cambio de simplicidad.
3. Si el volumen de reservas/mensajes es alto (varios locales, mucho tráfico) y se justifica invertir en configuración: migrar a n8n (autoalojado o cloud) para reducir coste a largo plazo.
4. Añadir progresivamente flujos secundarios: alertas de reseñas negativas, recordatorios automáticos de reserva, inclusión de nuevas publicaciones en newsletter.
5. Revisar siempre los límites de la API de Instagram (200 DMs automatizados/hora, límites de impresiones para otras acciones) al diseñar cualquier flujo que interactúe directamente con Instagram, para no arriesgar bloqueos temporales de la cuenta (ver [[../02-configuracion-tecnica/security-privacy.md]]).
6. Documentar cada flujo activo (qué hace, qué apps conecta, quién lo mantiene) para evitar automatizaciones "fantasma" que nadie recuerda cómo funcionan cuando falla algo.
7. Probar cualquier flujo nuevo con datos de prueba antes de activarlo en producción, especialmente los que envían mensajes automáticos a clientes reales.

## Ejemplos reales

*Ejemplo ilustrativo:* Un restaurante que recibe muchas reservas por WhatsApp automatiza con Make el registro de cada reserva confirmada en una hoja de cálculo compartida con el equipo de sala, y añade un recordatorio automático 2 horas antes de la reserva para reducir ausencias sin aviso. Este tipo de flujo de "reserva a recordatorio" es el caso de uso más citado y accionable en las fuentes 2026 consultadas sobre automatización para restauración.

## Errores comunes

- ❌ Automatizar el envío masivo de DMs promocionales a todos los seguidores → ✅ Respetar el límite de 200 DMs automatizados/hora y usar la automatización solo para respuestas contextuales, no para spam.
- ❌ Elegir n8n por ser "más barato" sin tener a nadie que sepa mantenerlo → ✅ Evaluar el coste total incluyendo el tiempo/persona necesaria para configurarlo y mantenerlo.
- ❌ Montar flujos complejos sin documentación y que nadie del equipo entiende cuando fallan → ✅ Documentar cada automatización activa de forma sencilla y accesible para el equipo.
- ❌ Activar un flujo de mensajes automáticos a clientes sin probarlo antes con datos ficticios → ✅ Probar siempre en un entorno de prueba antes de activar en producción.
- ❌ Automatizar solo la publicación de contenido y descuidar el flujo más valioso (gestión de reservas y respuesta a clientes) → ✅ Priorizar automatizaciones que ahorren tiempo operativo real (reservas, recordatorios) sobre las puramente de publicación.

## Recursos relacionados
- [[README.md]]
- [[../02-configuracion-tecnica/integrations.md]]
- [[../02-configuracion-tecnica/security-privacy.md]]
- Zapier: https://zapier.com/
- Make: https://www.make.com/
- n8n: https://n8n.io/

---
*Última actualización: 2026-09-02*
*Fuentes: https://dev.to/atlasdigital/n8n-alternatives-2026-zapier-vs-make-vs-n8n-for-social-media-automation-5170 · https://parseur.com/blog/zapier-n8n-make · https://www.intuz.com/blog/make-vs-n8n-vs-zapier-detailed-comparison/ · https://www.digitalapplied.com/blog/zapier-vs-make-vs-n8n-2026-automation-comparison · https://bundle.social/blog/automate-social-media-n8n*
