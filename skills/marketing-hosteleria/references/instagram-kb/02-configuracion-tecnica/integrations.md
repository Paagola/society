> **Origen:** `torre_de_vega/instagram-skill-hosteleria/02-configuracion-tecnica/integrations.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Integraciones: Facebook, WhatsApp Business y sistemas de reserva

## TL;DR
- La Página de Facebook es un requisito técnico previo para usar Meta Business Suite y anuncios, no solo un canal adicional.
- WhatsApp Business (app o API) se puede enlazar como destino de los botones de "Enviar mensaje" y de los CTA en Stories, permitiendo automatizar reservas por chat.
- Instagram **no procesa reservas por sí mismo**: siempre delega en un socio verificado (TheFork, OpenTable, CoverManager, SevenRooms, Resy, entre otros).
- En España, **CoverManager** destaca por su fuerte integración local (Instagram, Facebook, Google) y gestión de sala avanzada, mientras que **TheFork** domina en volumen de comensales y **OpenTable** tiene penetración limitada y aún cobra por cubierto en muchos planes.
- Un flujo típico 2026: Story con CTA → clic en "Mensaje" → WhatsApp con bot que pide fecha/hora/comensales → confirmación automática + recordatorio 2h antes.

## Conceptos fundamentales

**Página de Facebook vinculada.** Es la base técnica: sin una Página de Facebook enlazada no se puede usar Meta Business Suite, no se pueden lanzar anuncios de Instagram desde Ads Manager con todas las opciones, y algunos botones de acción no se activan correctamente. Se vincula desde Editar perfil > Página o desde la configuración de Meta Business Suite.

**WhatsApp Business.** Existen dos niveles: la app gratuita WhatsApp Business (para negocios pequeños, gestión manual o con respuestas rápidas) y la API de WhatsApp Business (para volumen alto, integrable con chatbots y CRMs de terceros como ManyChat, ChatFuel o herramientas de automatización tipo n8n/Make). Para hostelería, el flujo habitual es: el cliente ve una Story o publicación, toca "Mensaje", y aterriza en WhatsApp donde un bot recoge fecha, hora, número de comensales y confirma la reserva automáticamente, con recordatorio previo.

**Sistemas de reserva: comparación para España.**
- **TheFork (ElTenedor):** mayor volumen de usuarios en España, cobra comisión por comensal gestionado a través de su plataforma; fuerte visibilidad en su propia app/web además de Instagram.
- **CoverManager:** empresa con sede en Sevilla, fuerte en gestión avanzada de sala (planos de mesa, turnos) y en centralizar reservas de múltiples canales (web, Google, Instagram, Facebook) en un panel único; suele ser la referencia para restaurantes medianos/grandes en España.
- **OpenTable:** penetración limitada en el mercado español frente a EE.UU./Reino Unido, y en varios planes sigue cobrando por cubierto, lo que lo hace menos competitivo localmente frente a alternativas españolas.
- **SevenRooms, Resy:** presencia más orientada a mercados anglosajones y alta gama; su disponibilidad como socio de botón de acción de Instagram varía por país.

**Botón "Pedir comida".** Para delivery, el botón de acción se conecta con plataformas de pedido (varía por país y disponibilidad de socio); en España el flujo más común sigue siendo enlazar desde el link en bio a Glovo, Uber Eats o Just Eat en lugar de usar el botón nativo, ya que la cobertura de socios oficiales de "Order Food" es limitada fuera de EE.UU.

**Google Business Profile.** Aunque no es una "integración" directa de Instagram, mantener los mismos datos (nombre, dirección, teléfono, horario) entre Instagram y Google Business Profile mejora la coherencia y el SEO local, y CoverManager entre otros permite centralizar también reservas provenientes de Google Reserve.

## Datos y benchmarks 2026

| Sistema | Enfoque | Coste típico | Pros | Contras | Fuente |
|---|---|---|---|---|---|
| TheFork | Reservas, alto volumen | Comisión por comensal (aprox. 2€/cubierto en algunos planes) | Gran base de usuarios en España | Coste variable alto en volumen | deru.es/en/blog/software-restaurantes-reservas |
| CoverManager | Reservas + gestión de sala, multicanal (IG, FB, Google, web) | Suscripción mensual | Fuerte en España, centraliza canales | Curva de aprendizaje para gestión de sala avanzada | covermanager.com/en/integrations/opentable |
| OpenTable | Reservas | Por cubierto en algunos planes | Marca reconocida internacionalmente | Baja penetración y coste por cubierto en España | bouzondigital.com/en/thefork-alternatives |
| WhatsApp Business (app) | Mensajería directa | Gratis | Fácil de configurar, familiar para el cliente | Gestión manual si no hay API/bot | restaurant.eatapp.co/blog/whatsapp-for-restaurants-guide |
| WhatsApp Business API + bot | Mensajería automatizada | Variable (según proveedor: ManyChat, Twilio, etc.) | Automatiza reservas, confirmaciones y recordatorios | Requiere configuración técnica o proveedor externo | plugdialog.com/newsroom/restaurant-reservations-on-instagram... |

## Pasos accionables

1. Vincular la Página de Facebook del negocio desde Editar perfil > Página en Instagram.
2. Crear o vincular el perfil de WhatsApp Business con el mismo número que aparece en la carta y en Google.
3. Decidir el sistema de reservas según el perfil del negocio: CoverManager si se necesita gestión de sala y multicanal, TheFork si se prioriza visibilidad y volumen de comensales nuevos.
4. Conectar el sistema de reservas elegido al botón de acción de Instagram desde Editar perfil > Botones de acción.
5. Configurar en Stories destacadas o publicaciones fijadas un CTA "Reserva ahora" que dirija al botón de acción o a WhatsApp.
6. Si se espera volumen alto de mensajes, evaluar un bot en WhatsApp Business API (vía ManyChat u otra plataforma) para automatizar fecha/hora/comensales, dejando siempre una opción de hablar con una persona.
7. Sincronizar los datos de contacto (dirección, teléfono, horario) entre Instagram, Facebook, Google Business Profile y el sistema de reservas para evitar inconsistencias.
8. Revisar mensualmente qué canal de reserva (Instagram directo, WhatsApp, TheFork/CoverManager) trae más comensales para ajustar dónde poner el foco de contenido.

## Ejemplos reales

*Ejemplo ilustrativo:* Un restaurante de tapas en Sevilla usa CoverManager para centralizar reservas que llegan desde su web, Google y el botón de Instagram, y complementa con WhatsApp Business para consultas sobre grupos grandes o eventos privados que no encajan en el flujo estándar de reservas online. Este modelo combinado (sistema de reservas + WhatsApp para casos especiales) aparece repetidamente en las fuentes 2026 consultadas sobre restauración en España.

## Errores comunes

- ❌ No vincular la Página de Facebook, bloqueando el acceso completo a Meta Business Suite → ✅ Vincularla desde el primer día de configuración.
- ❌ Usar el botón de acción "Pedir comida" nativo sin comprobar si hay socio disponible en España → ✅ Verificar disponibilidad o usar el enlace en bio hacia Glovo/Uber Eats/Just Eat.
- ❌ Dejar WhatsApp Business sin respuestas automáticas fuera de horario → ✅ Configurar mensaje de ausencia con horario y enlace de reserva alternativo.
- ❌ Tener datos de contacto distintos entre Instagram, Google y la web (dirección o teléfono desactualizados) → ✅ Auditar y unificar la información NAP (nombre, dirección, teléfono) trimestralmente.
- ❌ Elegir un sistema de reservas solo por precio sin mirar la cobertura de integración con Instagram → ✅ Confirmar que el proveedor soporta el botón de acción de Instagram antes de contratar.

## Recursos relacionados
- [[README.md]]
- [[profile-optimization.md]]
- [[meta-business-suite.md]]
- CoverManager: https://www.covermanager.com/
- TheFork negocios: https://www.theforkmanager.com/
- Ayuda Instagram sobre botones de reserva: https://help.instagram.com/122793804938499

---
*Última actualización: 2026-09-02*
*Fuentes: https://www.covermanager.com/en/blog/selecting-and-using-restaurant-booking-apps-a-comparison · https://www.covermanager.com/en/integrations/opentable/ · https://deru.es/en/blog/software-restaurantes-reservas/ · https://www.bouzondigital.com/en/thefork-alternatives/ · https://plugdialog.com/newsroom/restaurant-reservations-on-instagram-how-to-turn-followers-into-bookings-in-2026 · https://restaurant.eatapp.co/blog/whatsapp-for-restaurants-guide*
