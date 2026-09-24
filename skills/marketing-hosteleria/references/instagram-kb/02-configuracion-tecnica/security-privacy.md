> **Origen:** `torre_de_vega/instagram-skill-hosteleria/02-configuracion-tecnica/security-privacy.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Seguridad y privacidad para cuentas de negocio en Instagram

## TL;DR
- La autenticación de dos factores (2FA) es la medida individual más eficaz contra el robo de cuenta; se recomienda por app de autenticación (Google Authenticator, Authy) en lugar de SMS, vulnerable a ataques de SIM-swap.
- Las cuentas Business/Creador no pueden ponerse en privado: la privacidad se gestiona con controles de mensajes, aprobación de etiquetas y auditoría de apps conectadas.
- Los códigos de respaldo del 2FA deben guardarse fuera del teléfono del negocio (gestor de contraseñas o documento físico seguro), porque si se pierde el acceso al móvil son la única vía de recuperación.
- Revisar trimestralmente las apps y webs con acceso conectado a la cuenta evita accesos residuales de antiguas agencias o empleados.
- Instagram penaliza (limita alcance o bloquea temporalmente) el uso agresivo de automatización de mensajes o interacciones; hay límites concretos de la API que conviene conocer si se usan bots.

## Conceptos fundamentales

**2FA (autenticación de dos factores).** Añade un paso extra al iniciar sesión: además de la contraseña, se pide un código temporal. Instagram ofrece 2FA por SMS o por app de autenticación; la app es preferible porque no depende de la red telefónica y por tanto no es vulnerable a que alguien duplique la tarjeta SIM del negocio (SIM-swapping).

**Códigos de respaldo.** Al activar 2FA, Instagram genera códigos de un solo uso para entrar si se pierde el dispositivo con la app de autenticación. Deben guardarse en un gestor de contraseñas del equipo o en un lugar físico seguro, nunca solo como captura de pantalla en el mismo móvil que se podría perder junto con la app.

**Cuenta privada vs. pública en negocios.** A diferencia de una cuenta personal, una cuenta profesional (Business o Creador) no puede activarse como privada; si se necesitara, habría que revertir a cuenta personal, perdiendo botones de acción, Insights y acceso a Meta Business Suite. Para un negocio de hostelería que busca visibilidad, esto no suele ser un problema real, pero es importante saber que la "privacidad" se gestiona de otra forma: quién puede escribir por DM, quién puede etiquetar o mencionar, y qué comentarios se ocultan automáticamente.

**Control de mensajes y comentarios.** Desde Configuración > Privacidad, se puede limitar quién envía DMs directamente a la bandeja principal (vs. la de "solicitudes"), filtrar palabras ofensivas en comentarios automáticamente, y ocultar comentarios de cuentas sospechosas o spam (frecuente en negocios de hostelería con promociones falsas de "regalos" en los comentarios).

**Auditoría de apps conectadas.** Cada herramienta de terceros conectada (programadores de contenido, bots de DM, herramientas de analítica) tiene acceso a la cuenta mediante tokens. Es necesario revisar periódicamente en Configuración > Seguridad > Apps y sitios web qué integraciones siguen activas y revocar las que ya no se usan (por ejemplo, tras cambiar de agencia de marketing).

**Límites de automatización y API (2026).** Meta retiró la Basic Display API y endureció el control sobre la Graph API. Los límites relevantes para hostelería:
- Los límites de la API principal (publicaciones, insights, comentarios) son proporcionales a las impresiones de la cuenta (fórmula BUC), no un número fijo.
- Los DMs automatizados están limitados a **200 mensajes automatizados por hora por cuenta**.
- La búsqueda de hashtags está limitada a 30 hashtags únicos por semana por cuenta.
Superar estos límites de forma agresiva (bots de "dar like en masa" o mensajes masivos) puede derivar en restricciones temporales de la cuenta, más allá del límite técnico de la API.

## Datos y benchmarks 2026

| Medida de seguridad | Recomendación | Riesgo si se ignora | Fuente |
|---|---|---|---|
| 2FA | App de autenticación (no SMS) | Robo de cuenta por SIM-swap | privacyinternational.org/guide-step/3867 |
| Códigos de respaldo | Guardar fuera del móvil del negocio | Pérdida de acceso permanente | unfollr.com/blog/instagram-privacy-settings |
| Apps conectadas | Revisión trimestral | Acceso residual de terceros no autorizados | socialrails.com/blog/instagram-privacy-settings-complete-guide |
| DMs automatizados | Máx. 200/hora por cuenta | Bloqueo temporal de mensajería | getphyllo.com/post/instagram-api-rate-limits-explained |
| Búsqueda de hashtags vía API | Máx. 30 hashtags únicos/semana | Error de límite de API (80002) | singhamandeep.com/instagram-graph-api-rate-limits |

## Pasos accionables

1. Activar 2FA por app de autenticación desde Configuración y privacidad > Contraseña y seguridad > Autenticación de dos factores.
2. Guardar los códigos de respaldo en un gestor de contraseñas compartido del equipo (no en el móvil del negocio).
3. Crear una contraseña única y robusta para la cuenta, distinta de otras cuentas del negocio (Gmail, banco, etc.).
4. Revisar cada trimestre Configuración > Seguridad > Apps y sitios web, y revocar accesos de herramientas o agencias que ya no se usen.
5. Configurar filtros de comentarios ocultos (palabras clave típicas de spam: "gratis", "gana", enlaces sospechosos).
6. Ajustar quién puede enviar mensajes directos a la bandeja principal desde Configuración > Mensajes.
7. Si se usa un bot de DM o de reservas, verificar con el proveedor que respeta el límite de 200 mensajes automatizados/hora y que no simula comportamiento de spam (likes o comentarios masivos automáticos).
8. Documentar quién del equipo tiene acceso a la cuenta y con qué rol, y actualizar esa lista cuando alguien deja el negocio.

## Ejemplos reales

*Ejemplo ilustrativo:* Un bar de copas contrata a una agencia externa para gestionar su Instagram; al terminar la colaboración seis meses después, el propietario revisa Configuración > Apps conectadas y descubre que la herramienta de programación de la agencia sigue con acceso activo. Revocar ese acceso al finalizar cada colaboración es una práctica recomendada de forma consistente en las guías de seguridad 2026 consultadas.

## Errores comunes

- ❌ Usar 2FA por SMS en un número compartido con varios empleados → ✅ Usar app de autenticación vinculada a un dispositivo del responsable de la cuenta.
- ❌ Guardar los códigos de respaldo como nota en el mismo móvil que se usa para gestionar Instagram → ✅ Guardarlos en un gestor de contraseñas o documento físico seguro y separado.
- ❌ No revisar nunca las apps conectadas tras cambiar de proveedor de marketing → ✅ Revocar accesos activamente al terminar cualquier colaboración externa.
- ❌ Contratar un bot de crecimiento que da "me gusta" masivos automáticos para ganar seguidores → ✅ Evitar herramientas de automatización agresiva; violan los términos de Meta y arriesgan el bloqueo de la cuenta.
- ❌ Ignorar el límite de 200 DMs automatizados/hora al montar un bot de reservas de alto volumen → ✅ Diseñar el flujo de mensajería para escalar dentro de ese límite o repartir la carga.

## Recursos relacionados
- [[README.md]]
- [[business-settings.md]]
- [[integrations.md]]
- Ayuda oficial de seguridad de Instagram: https://help.instagram.com/566810106808145
- Centro de ayuda de Meta sobre 2FA: https://help.instagram.com

---
*Última actualización: 2026-09-02*
*Fuentes: https://privacyinternational.org/guide-step/3867/instagram-two-factor-authentication · https://socialrails.com/blog/instagram-privacy-settings-complete-guide · https://www.getphyllo.com/post/instagram-api-rate-limits-explained----and-how-to-scale-beyond-them-2026 · https://singhamandeep.com/instagram-graph-api-rate-limits-why-your-app-hits-429-errors-and-how-to-scale-2026/ · https://storrito.com/resources/instagram-penalizes-aggressive-automation/*
