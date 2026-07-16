# Arquitectura del sistema

## 1. Descripción general

La plataforma está construida como una **aplicación web de página única (Single Page Application, SPA)**, un estilo arquitectónico en el que toda la interfaz se ejecuta en el navegador del usuario y se comunica con los servicios externos únicamente para intercambiar datos, sin recargar la página completa en cada interacción. Esta decisión favorece una experiencia de navegación fluida, adecuada para un entorno educativo donde el estudiante avanza constantemente entre temas, niveles de dificultad, contenidos y cuestionarios.

El sistema sigue una **arquitectura por capas**, en la que cada capa tiene una responsabilidad claramente delimitada y se comunica únicamente con las capas adyacentes. Esta organización favorece la mantenibilidad, facilita las pruebas y permite sustituir o modificar una capa sin afectar al resto del sistema. De abajo hacia arriba, las capas son: persistencia de datos, acceso a datos (servicios), lógica de dominio y estado, y presentación (interfaz de usuario).

Además, la arquitectura incorpora un **servicio externo de inteligencia artificial** (el asistente conversacional "Algorimi") como apoyo pedagógico complementario, desacoplado del resto del sistema.

## 2. Capas de la arquitectura

### 2.1 Capa de presentación

Es la capa con la que interactúa directamente el estudiante. Está compuesta por las distintas pantallas de la plataforma (bienvenida, cartelera de temas, contenidos, cuestionarios, retroalimentación de resultados y panel administrativo) y por los elementos de interfaz que se reutilizan entre ellas (tarjetas de tema, selector de dificultad, formulario de preguntas, indicadores de progreso, entre otros).

Esta capa es responsable de mostrar la información al usuario y de capturar sus acciones (selección de un tema, respuesta a una pregunta, envío de un cuestionario), pero **no contiene lógica de negocio ni accede directamente a la base de datos**. Su función es delegar esas responsabilidades a las capas inferiores.

### 2.2 Capa de estado y lógica de dominio

Esta capa concentra la información que debe estar disponible en toda la aplicación —como el progreso del estudiante, los niveles desbloqueados por tema y su nombre— así como las reglas del negocio educativo: cómo se califica un cuestionario, cuándo se considera aprobado un nivel, y cuándo un tema debe tratarse de forma especial (como el tema introductorio de aritmética, cuyos tres niveles están disponibles desde el inicio y no exige una calificación mínima, al tratarse de contenido de refuerzo y no de progresión).

Al mantener esta lógica separada de la interfaz, las reglas de evaluación y desbloqueo de contenidos pueden modificarse sin necesidad de alterar las pantallas que las utilizan.

### 2.3 Capa de acceso a datos (servicios)

Esta capa actúa como intermediaria entre la lógica de la aplicación y el origen real de los datos. Su particularidad es que **abstrae el origen de la información**: si el servicio de base de datos en la nube está disponible y configurado, los datos se obtienen desde allí; si no lo está, la aplicación recurre automáticamente a un conjunto de datos locales integrados en el propio código.

Este diseño cumple dos propósitos. Primero, garantiza que la plataforma pueda ejecutarse y demostrarse aun sin conexión a un backend configurado, lo cual resulta valioso en un contexto académico. Segundo, aísla al resto de la aplicación de los detalles técnicos de la base de datos: si en el futuro se cambiara el proveedor del backend, únicamente esta capa tendría que modificarse.

### 2.4 Capa de persistencia

La persistencia de la información se distribuye en dos ubicaciones según su naturaleza:

- **Base de datos en la nube (Supabase, sobre PostgreSQL):** almacena la información que debe estar disponible de forma centralizada y ser consultada por el administrador o docente, como los cuestionarios, los contenidos educativos, los resultados de las evaluaciones y las métricas de uso de cada estudiante.
- **Almacenamiento local del navegador:** guarda el progreso individual de cada estudiante (niveles desbloqueados, última ubicación visitada, nombre ingresado). Al no existir un sistema de autenticación de usuarios, este progreso se asocia al dispositivo y navegador utilizado, y no requiere sincronización con un servidor.

### 2.5 Servicio externo de apoyo pedagógico

De forma independiente a las capas anteriores, la plataforma integra un **asistente conversacional impulsado por inteligencia artificial**, disponible en un panel lateral accesible desde cualquier pantalla. Este componente se comunica directamente con un proveedor externo especializado en chatbots, sin intervención de la capa de servicios ni de la base de datos propia del sistema, dado que su función es exclusivamente conversacional y de apoyo al aprendizaje, no de gestión de datos académicos.

## 3. Comunicación entre componentes

La comunicación entre las capas sigue un flujo unidireccional y predecible:

1. La **interfaz de usuario** captura una acción del estudiante (por ejemplo, responder un cuestionario o abrir un contenido).
2. Esa acción se traduce en una solicitud hacia la **capa de estado** (si se trata de información que debe recordarse durante la sesión, como el progreso) o hacia la **capa de servicios** (si se trata de información que debe leerse o guardarse de forma persistente).
3. La capa de servicios decide, de forma transparente para el resto del sistema, si la operación se realiza contra la base de datos en la nube o contra los datos locales de respaldo.
4. El resultado de la operación regresa a la interfaz, que actualiza lo que el estudiante visualiza.

Este patrón evita que las pantallas conozcan detalles de implementación de la base de datos y concentra en un único punto las decisiones sobre el origen de los datos, lo que simplifica el mantenimiento y reduce el acoplamiento entre componentes.

## 4. Flujos principales del sistema

**Resolución de un cuestionario.** El estudiante responde las preguntas de un nivel; el sistema calcula la calificación obtenida, actualiza el progreso guardado en el dispositivo, envía el resultado a la base de datos para su registro histórico y, si la calificación supera el umbral establecido, desbloquea el siguiente nivel de dificultad.

**Consulta de contenidos.** Al ingresar a un nivel, la plataforma solicita los contenidos educativos correspondientes (videos, lecturas, guías, ejercicios, entre otros) a la base de datos; si esta no está disponible, se muestran los contenidos incorporados localmente. Cada vez que el estudiante abre un contenido, se registra ese evento como una métrica de uso.

**Consulta administrativa.** El docente o administrador accede a un panel donde puede revisar los cuestionarios y contenidos configurados, así como los resultados y las métricas cuantitativas de cada estudiante (número de intentos, calificación promedio, mejor calificación, repeticiones de un mismo cuestionario y cantidad de contenidos consultados), obtenidas a partir de la información almacenada en la base de datos.

## 5. Justificación de las decisiones arquitectónicas

La separación en capas y, en particular, el aislamiento de la capa de acceso a datos respecto al resto del sistema, responde a un principio de **bajo acoplamiento y alta cohesión**: cada componente tiene una responsabilidad única y bien definida, lo que facilita su comprensión, prueba y evolución de manera independiente.

La estrategia de **respaldo con datos locales** ante la ausencia de conexión con la base de datos responde a un requisito práctico del proyecto: permitir que la plataforma sea funcional y demostrable en cualquier entorno, sin depender de credenciales o disponibilidad de servicios externos.

Finalmente, la decisión de mantener el **progreso del estudiante en el propio dispositivo** y las **métricas agregadas en la base de datos centralizada** refleja la diferencia de propósito entre ambos tipos de información: el progreso es de uso personal e inmediato para el estudiante, mientras que las métricas cuantitativas están orientadas al seguimiento pedagógico por parte del docente o investigador, y por tanto deben estar centralizadas y ser consultables en conjunto.
