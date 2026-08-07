

<!-- Start of picture text -->
: ee 4 ha<br><!-- End of picture text -->





<!-- Start of picture text -->
a]<br>Ar<br><!-- End of picture text -->

a] Ar 







##### **Universidad Central de Venezuela Facultad de Ciencias Escuela de Computación Centro de Enseñanza Asistida por Computador – CENEAC** 

**Implementación práctica y evaluación de rutas de aprendizaje personalizadas mediante el desarrollo de una plataforma web apoyada por Inteligencia Artificial** 

**Autor** : Heyzel Jesús Moncada González; Sonia Amira Nahit Veroes 

**C.I.:** V-27.916.103; V-26.498.817 

**Correo-e:** heyzelm7@gmail.com; amiranahit99@gmail.com 

**Tutora** : Profa. Yusneyi Carballo Barrera 

**Correo-e:** Yusneyi.carballo@ciens.ucv.ve **Fecha** : 15 de julio de 2026 

##### **RESUMEN** 

En los últimos años, el avance de las tecnologías, especialmente las herramientas basadas en inteligencia artificial (IA), ha transformado diversos sectores, incluyendo el educativo. Ante las limitaciones de los métodos de aprendizaje tradicionales frente a las demandas de un entorno cambiante, surge la necesidad de explorar enfoques más adaptativos, siendo las rutas de aprendizaje personalizado apoyadas por IA el concepto central de esta exploración. Este seminario tiene como propósito determinar las bases metodológicas y conceptuales necesarias para la futura creación y evaluación de dichas rutas de aprendizaje personalizado impulsadas por herramientas de IA. El objetivo es mejorar significativamente los procesos de aprendizaje, enseñanza y evaluación al fomentar un aprendizaje más eficiente y alineado con las necesidades y ritmo de cada estudiante, evaluando tanto su potencial impacto positivo como los desafíos técnicos, éticos y pedagógicos asociados a su implementación en el ámbito educativo. 

**Palabras Clave:** Herramientas basadas en Inteligencia Artificial, Educación, Enseñanza, Aprendizaje adaptativo, Métodos educativos tradicionales. 

# **Índice de Contenido** 

#### **Introducción** 

#### **Capítulo I. Planteamiento del Problema** 

- 1.1 Planteamiento del problema 

- 1.2 Objetivos del Trabajo Especial de Grado 

   - 1.2.1 Objetivo general 

   - 1.2.2 Objetivos específicos 

#### **Capítulo II. Marco Teórico** 

- 2.1 Aprendizaje Personalizado 

- 2.2 Aprendizaje Adaptativo 

- 2.3 Rutas Personalizadas 

   - 2.3.1 Diseños instruccionales 

- 2.4 Modelo ADDIE para el diseño instruccional 

- 2.5 Factores que Influyen en la Personalización del Aprendizaje 

- 2.6 La Inteligencia Artificial en la Educación: IA Conversacional y Generativa 

   - 2.6.1 Impacto de la inteligencia artificial en la educación 

2.6.2 Desafíos de la implementación de las herramientas basadas en IA en el sector Educativo 

- 2.7 Stack Tecnológico 

   - 2.7.1 SPA (Single Page Application) 

   - 2.7.2 La Nube (Cloud Computing) 

   - 2.7.3 BaaS (Backend as a Service) 

   - 2.7.4 Base de datos 

   - 2.7.5 Postgres (PostgreSQL) 

2.7.6 Node.js 

- 2.7.7 Vercel 

2.7.8 Vite 

##### 2.8 Antecedentes 

- 2.8.1 Uso de la inteligencia artificial en la personalización del aprendizaje 

2.8.2 Desarrollo de Rutas de Aprendizaje Personalizadas para el Apoyo en el Aprendizaje de Programación en la Universidad de los Andes 

- 2.8.3 Personalización del Proceso de Aprendizaje mediante Inteligencia Artificial 

2.8.4 Análisis de los Sistemas de Aprendizaje Personalizado Impulsados por Inteligencia Artificial y su Implementación en Contextos Educativos 

#### **Capítulo III. Marco Metodológico** 

3.1 Diseño de la Investigación 

- 3.2 Enfoque de la Investigación 

- 3.3 Técnicas de Recolección de Datos 

3.4 Instrumentos de Recolección de Datos 

3.5 Población 

3.6 Muestra y Muestreo 

3.7 Técnicas de Procesamiento de Datos 

3.8 Herramientas de Procesamiento de Datos 

##### **Capítulo IV. Desarrollo de la Solución** 

4.1 Motivación 

4.2 Descripción de la Implementación 

4.3 Alcance de la Implementación 

4.4 Descripción de la implementación adaptado al modelo ADDIE 

4.4.1 Fase de análisis 4.4.2 Fase de diseño 4.4.3 Fase de desarrollo 4.4.4 Fase de implementación 4.4.5 Fase de evaluación 

**Capítulo V. Reflexiones y Recomendaciones del Trabajo Especial de Grado Referencias Bibliográficas** 

Introducción 

# Introducción 

En la actualidad, el panorama educativo exige el desarrollo de metodologías que se adapten a las necesidades y motivaciones intrínsecas del alumnado. En este contexto, el Aprendizaje Personalizado se ha consolidado como uno de los enfoques pedagógicos más prometedores en la búsqueda de una educación más equitativa, significativa y alineada con las demandas del siglo XXI (Castillo, 2024). 

Este enfoque se fundamenta en poner al estudiantado en el centro del proceso, tomando en consideración las diferencias individuales, ya sean estilos de aprendizaje, contextos culturales o necesidades especiales, para crear un espacio más inclusivo. En la práctica, al recibir apoyo específico y adaptado, el estudiantado no solo mejora su confianza y autoestima, sino que este bienestar influye positivamente en su desempeño académico. 

Precisamente, de esta necesidad de implementar un apoyo individualizado y estructurado surge el concepto de las Rutas de Aprendizaje Personalizadas. Estas rutas permiten al estudiantado codiseñar su proceso junto con el grupo docente, trascendiendo la simple instrucción. Este componente metodológico está diseñado para que el estudiantado se apropie de su aprendizaje, encuentre un mayor significado y propósito, y se vuelva cada vez más independiente en sus habilidades de estudio (De Benito et al., 2020). 

Para concretar este nivel de personalización, los especialistas reconocen que las Tecnologías de la Información y Comunicación (TIC) son fundamentales. No solo tienen la capacidad de personalizar las experiencias de aprendizaje, sino que también facilitan el acceso a un amplio espectro de recursos educativos y plataformas que fomentan la colaboración y comunicación global entre docentes y estudiantes (UNESCO, s.f.). 

La integración efectiva de las TIC, no obstante, implica dos requisitos adicionales para el sector educativo. Primero, es crucial la capacitación de los futuros profesionales con las destrezas tecnológicas necesarias para desenvolverse eficazmente en los diversos ámbitos marcados por la sociedad digital. El Segundo requisito se centra en la adopción de las herramientas de Inteligencia Artificial (IA), puesto que esta tecnología está creciendo en 

1 

Introducción 

popularidad para crear modelos flexibles que permitan adaptar los procesos educativos rápidamente a contextos disruptivos o situaciones inesperadas, como lo demostró la pandemia del COVID-19 (Monge et al., 2024). 

Así la presente investigación plantea como objetivo: Desarrollar y evaluar rutas de aprendizaje personalizado apoyadas por Inteligencia Artificial en un entorno virtual. 

Lo que conlleva los siguiente objetivos específicos: 

- Diseñar la estructura instruccional de las rutas de aprendizaje personalizadas, definiendo la secuencia de contenidos, los recursos didácticos y los criterios de progresión. 

- Aplicar las rutas de aprendizaje diseñadas en un caso de estudio práctico, permitiendo a un grupo de estudiantes interactuar con los contenidos y la asistencia automatizada. 

- Definir el impacto de la implementación de IA en el sector educativo, así como los desafíos asociados a su implementación. 

- Evaluar la efectividad pedagógica de las rutas de aprendizaje mediante el análisis de los indicadores de rendimiento (KPIs) recolectados. 

- Diseñar la arquitectura y la interfaz de usuario de una plataforma web flexible e intuitiva, enfocada en garantizar una navegación fluida que facilite el acceso a las rutas de aprendizaje personalizadas. 

- Desarrollar un módulo de gestión e instrucción docente que permita la carga dinámica de recursos educativos y cuestionarios, así como la configuración paramétrica de los criterios de evaluación, incluyendo el establecimiento de calificaciones mínimas aprobatorias. 

- Implementar un panel de analíticas estructurado en Indicadores Clave de Rendimiento (KPIs), diseñado para monitorear, medir y visualizar el rendimiento académico y los niveles de interacción de los estudiantes dentro del entorno virtual. 

- Integrar un sistema de Inteligencia Artificial conversacional en la plataforma, orientado a proporcionar asistencia técnica y educativa a los estudiantes en tiempo real durante la ejecución de su ruta de aprendizaje. 

En cuanto a la estructura del documento, este se divide en varias secciones claves: 

Capítulo 1: Planteamiento del problema. Se describe la problemática que existe en la educación tradicional y los objetivos de esta investigación. 

2 

Introducción 

Capítulo 2: Marco Teórico. Aborda las bases del aprendizaje personalizado, el aprendizaje adaptativo, las rutas de aprendizaje personalizado y los principios que lo respaldan, como también conceptos esenciales sobre la inteligencia artificial, su impacto y aplicación en el ámbito educativo. 

Capítulo 3: Marco Metodológico.  Explica el enfoque y diseño de la investigación, como también cuáles serán las técnicas de recolección y procesamiento de los datos. 

Capítulo 4: Desarrollo del Trabajo Especial de Grado. En este capítulo se expone la motivación del proyecto, la descripción de los elementos implementados y el alcance establecido. Asimismo, se detallan las cuatro fases del modelo ADDIE aplicadas en el desarrollo de la investigación. 

3 

Capítulo I. Planteamiento del Problema 

# Capítulo I. Planteamiento del Problema 

## 1.1 Planteamiento del problema 

A pesar del avance tecnológico, la educación superior tiende a persistir en modelos pedagógicos tradicionales. Esta rigidez, cimentada en un currículo centralizado y en la resistencia a la innovación educativa, impone un ritmo de aprendizaje estandarizado que no responde a la diversidad de necesidades ni a los estilos de aprendizaje del estudiantado. Como consecuencia, este enfoque fomenta la desmotivación, el bajo rendimiento académico y, por ende, incrementa las tasas de deserción. 

En este sentido, la implementación de rutas de aprendizaje personalizadas se presenta como una alternativa técnica viable para flexibilizar la progresión curricular. Al adaptar la secuencia de los objetos de aprendizaje a las necesidades detectadas, esta estrategia permite que el estudiante transite por el currículo de forma diferenciada, lo que favorece un proceso educativo alineado con sus capacidades y fomenta un mayor compromiso con su trayectoria académica. 

Frente a este contexto, la incorporación de las Tecnologías de la Información y la Comunicación (TIC) surge como una solución prometedora; sin embargo, su implementación enfrenta barreras significativas. A escala global, la brecha digital restringe el acceso a la infraestructura necesaria. En el ámbito latinoamericano, estas limitaciones se agudizan debido a la resistencia institucional, la carencia de marcos normativos claros y la insuficiente formación docente para la gestión de entornos virtuales, lo cual dificulta una adopción plena y equitativa (Borja & Velasco, 2025). 

En la Universidad Central de Venezuela, se observa una complejidad adicional: si bien la institución dispone de infraestructura tecnológica y plataformas de gestión del aprendizaje, persiste una brecha sustancial en la accesibilidad y el aprovechamiento funcional de dichas herramientas por parte de la comunidad académica. 

Ante este escenario, la propuesta de desarrollar una plataforma orientada al despliegue de rutas de aprendizaje personalizadas se plantea como una estrategia para fortalecer la autonomía pedagógica. Este enfoque facilita la transición hacia un modelo de gestión flexible, capaz de adaptar el entorno virtual a las necesidades detectadas en el estudiantado. De este 

2 

Capítulo I. Planteamiento del Problema 

modo, se superan las limitaciones técnicas y de acceso asociadas a los sistemas centralizados actuales, permitiendo una mayor capacidad de respuesta ante las demandas educativas contemporáneas (Rangel, 2008). 

Se identificó que las plataformas de gestión de aprendizaje (LMS) convencionales y de terceros presentan limitaciones funcionales y arquitectónicas significativas. Estos sistemas suelen ofrecer entornos cerrados que no proporcionan las herramientas necesarias, la libertad de integración o la recolección de métricas granulares que el modelo propuesto exige. 

Al depender de infraestructuras de terceros, el alcance de la investigación se ve restringido por características predefinidas que no logran satisfacer las demandas de una verdadera personalización impulsada por IA. Ante esta incompatibilidad y la falta de plataformas que ofrecen los instrumentos requeridos, surge la necesidad técnica y metodológica de diseñar, desarrollar e implementar una solución web propia. 

La creación de esta plataforma a la medida permite superar las barreras impuestas por sistemas externos, garantizando el control total sobre la arquitectura del software, una integración fluida con los algoritmos de IA seleccionados y la capacidad de adaptar el entorno virtual a las necesidades exactas de la ruta de aprendizaje personalizada planteada en esta investigación. 

## 1.2 Objetivos del Trabajo Especial de Grado 

### 1.2.1 Objetivo general 

Desarrollar y evaluar rutas de aprendizaje personalizado apoyadas por Inteligencia Artificial  en un entorno virtual. 

### 1.2.2 Objetivos específicos 

1. Diseñar la estructura instruccional de las rutas de aprendizaje personalizadas, definiendo la secuencia de contenidos, los recursos didácticos y los criterios de progresión. 

2. Aplicar las rutas de aprendizaje diseñadas en un caso de estudio práctico, permitiendo a un grupo de estudiantes interactuar con los contenidos y la asistencia automatizada. 

3. Definir el impacto de la implementación de IA en el sector educativo, así como los desafíos asociados a su implementación. 

3 

Capítulo I. Planteamiento del Problema 

4. Evaluar la efectividad pedagógica de las rutas de aprendizaje mediante el análisis de los indicadores de rendimiento (KPIs) recolectados. 

5. Diseñar la arquitectura y la interfaz de usuario de una plataforma web flexible e intuitiva, enfocada en garantizar una navegación fluida que facilite el acceso a las rutas de aprendizaje personalizadas. 

6. Desarrollar un módulo de gestión e instrucción docente que permita la carga dinámica de recursos educativos y cuestionarios, así como la configuración paramétrica de los criterios de evaluación, incluyendo el establecimiento de calificaciones mínimas aprobatorias. 

7. Implementar un panel de analíticas estructurado en Indicadores Clave de Rendimiento (KPIs), diseñado para monitorear, medir y visualizar el rendimiento académico y los niveles de interacción de los estudiantes dentro del entorno virtual. 

8. Integrar un sistema de Inteligencia Artificial conversacional en la plataforma, orientado a proporcionar asistencia técnica y educativa a los estudiantes en tiempo real durante la ejecución de su ruta de aprendizaje. 

4 

Capítulo II. Marco Teórico 

# Capítulo II. Marco Teórico 

## 2.1 Aprendizaje Personalizado 

El aprendizaje personalizado se constituye como un enfoque pedagógico contemporáneo que centra su atención primordial en las diferencias individuales de los educandos, promoviendo de manera activa la autorregulación y la adaptación dinámica de los contenidos, los recursos y las metodologías a las necesidades particulares de cada estudiante. Estos elementos actúan como principios fundamentales y ejes rectores que permiten establecer una base teórica y conceptual sólida, la cual resulta indispensable tanto para el diseño riguroso de intervenciones educativas mediadas por la tecnología como para la evaluación sistemática de su efectividad en entornos académicos complejos (Velasco et al., 2023). 

Asimismo, este modelo educativo demanda la puesta en marcha de estrategias instruccionales específicas y debe ser llevado a cabo con un alto nivel de dedicación, precisión y atención minuciosa al detalle operativo y pedagógico. En consecuencia, su correcta implementación puede representar un grado mayor de complejidad en comparación con los métodos tradicionales de enseñanza, los cuales suelen estar enfocados de manera rígida en los objetivos del docente y en la simple transmisión masiva de contenidos. No obstante los desafíos que esto implica, este enfoque fomenta la asignación de un rol sustancialmente más activo, autónomo y participativo a los y las estudiantes dentro de su propio proceso educativo, facilitando de este modo la integración significativa y continua del aprendizaje en sus trayectorias cotidianas y profesionales (OIE-UNESCO, 2017). 

## 2.2 Aprendizaje Adaptativo 

El aprendizaje adaptativo y el aprendizaje personalizado guardan una estrecha relación, aunque no son conceptos idénticos. El aprendizaje adaptativo representa una subcategoría o una estrategia tecnológica avanzada que busca concretar el aprendizaje personalizado. Este enfoque se refiere específicamente a los sistemas y plataformas, frecuentemente impulsados por IA y análisis de datos, que ajustan de forma dinámica y en tiempo real el contenido, las actividades, la dificultad y la retroalimentación, basándose en el desempeño, progreso y comportamiento del o la estudiante (Morillo & Del Carmen, 2016). 

5 

Capítulo II. Marco Teórico 

Por otra parte, la tecnología en el contexto del aprendizaje adaptativo permite al equipo docente acceder a un amplio abanico de recursos, tales como plataformas de evaluación en tiempo real, aplicaciones interactivas o sistemas de retroalimentación automática. Dichas herramientas no solo contribuyen a personalizar el proceso educativo, sino que también posibilitan una gestión más eficiente del tiempo y los recursos, facilitando la atención a grupos numerosos de estudiantes con expectativas, intereses y necesidades diversas. 

## 2.3 Rutas de Aprendizaje 

Aprender siempre ha sido una necesidad del ser humano. Las ciencias de la educación desde su carácter holístico e integrador buscan continuamente y estratégicamente mecanismos que garanticen en los educandos el aprendizaje para la vida. 

Los principios de aprendizaje así propuestos por las ciencias de la educación mediante la pedagogía, que es la ciencia integradora, ofrecen el marco para el diseño de herramientas metacognitivas que permiten conocer la organización de la estructura cognitiva del educando, lo que se conoce como pensamiento complejo. (Morín, 2004). 

Igualmente, los docentes reconocen que el proceso educativo no se inicia desde cero, puesto que los estudiantes poseen un conjunto previo de vivencias y saberes que condicionan su proceso de aprendizaje y que pueden emplearse de forma constructiva. Esto significa que, para otorgar sentido a los contenidos nuevos, el conocimiento debe edificarse sobre la base de los conceptos y experiencias preexistentes (Colegiado Nacional de Desarrollo Educativo Cultural y Superación Profesional, 2013). 

Desde la perspectiva de Ausubel (1983), el aprendizaje se sustenta en la estructura cognitiva, entendida como el acervo de saberes que una persona posee en un área específica. Al vincular estos conocimientos previos con la nueva información de manera interactiva (y no mediante una simple acumulación de conceptos), se produce el aprendizaje significativo. 

En este contexto, una ruta de aprendizaje se entiende como un conjunto de experiencias educativas organizadas y secuenciadas, cuyo propósito fundamental es promover una comprensión más profunda, estructurada y el dominio progresivo de temas interconectados dentro de una disciplina. En otras palabras, se trata de una trayectoria compuesta por unidades o contenidos relacionados que facilitan al estudiante la adquisición sistemática de competencias 

6 

Capítulo II. Marco Teórico 

complejas en un área de conocimiento específica, evitando la fragmentación del saber y conectando lógicamente los conceptos previos con los nuevos aprendizajes. 

Cada ruta puede integrar de forma flexible diversos métodos de enseñanza, estrategias y mecanismos de evaluación que responden de manera diferenciada a las preferencias, ritmos y estilos cognitivos de los educandos. Por lo general, estos recorridos formativos orientados a la personalización conducen de manera efectiva hacia una meta o un objetivo final claramente definido, tales como la obtención de una certificación, el dominio de una competencia clave o la culminación exitosa de un trayecto académico formal (Núñez, 2022). 

De este modo, las rutas de aprendizaje responden a la necesidad de insertar asertivamente nuevos y significativos conocimientos en las estructuras cognitivas, permitiendo que todos los participantes disfruten del proceso mientras aprenden para la vida. Al respecto, Chacón (2013) establece que las rutas de aprendizaje se fundamentan en los siguientes principios pedagógicos y metodológicos: 

- La metodología de proyectos 

- la pedagogía Freinet 

- El constructivismo como principio fundamental de aprendizaje. 

- El aprendizaje cooperativo 

- La escuela como comunidad de aprendizaje, en la que todos sus componentes aprenden y enseñan. 

### 2.3.1 Diseños instruccionales 

El diseño instruccional se define como el conjunto de procesos organizados que permiten al docente estructurar estrategias de enseñanza de alta calidad. Esta disciplina constituye la ciencia encargada de crear especificaciones detalladas para el desarrollo, implementación, evaluación y mantenimiento de entornos que facilitan el aprendizaje, tanto en pequeñas como en grandes unidades de contenido. 

Bajo este enfoque, el docente es capaz de optimizar su práctica pedagógica mediante una planificación rigurosa, orientada a los lineamientos curriculares y ajustada a las necesidades identificadas, tanto al inicio como durante el desarrollo de la experiencia educativa (Amaro de Chacín, 2001). 

7 

Capítulo II. Marco Teórico 

Por otro lado, los estudiantes deben ser influenciados para desarrollar su aprendizaje a través de un paradigma constructivista, donde sean capaces de usar las características de este enfoque para obtener un aprendizaje significativo. Esto está sujeto a un conjunto de variables del entorno que forman parte de los procesos educativos e influyen en el trabajo del aprendiz. En consecuencia, el profesor debe enfrentarse a desafíos que posibiliten alcanzar un aprendizaje profundo en la mayoría de los estudiantes, a través del diseño de estrategias eficientes que tengan como fin una enseñanza de calidad. 

Las interacciones entre los distintos elementos del entorno educativo alimentan permanentemente el trabajo del estudiante. El enfoque principal se centra en el desarrollo del aprendizaje, el cual está determinado por el contexto de enseñanza, definido a su vez por la experiencia y las estrategias didácticas empleadas por el docente y cómo se proyecta esto en la clase. Asimismo, esto implica considerar las preferencias de aprendizaje, conocimientos previos, habilidades, valores, expectativas y motivación de cada estudiante. 

## 2.4 Modelo ADDIE para el diseño instruccional 

Este modelo de diseño instruccional es uno de los más empleados en entornos educativos gracias a su configuración flexible y adaptable. El mismo se constituye por cinco etapas fundamentales: análisis, diseño, desarrollo, implementación y evaluación. Su versatilidad permite que estas fases pueden ejecutarse de manera simultánea, favoreciendo la calidad y la efectividad del proceso educativo, cuyo propósito central es fomentar el aprendizaje autónomo del estudiante (Esquivel Gámez, 2014). 

En la fase inicial de análisis, el enfoque se centra en la planificación de estrategias pedagógicas mediante la valoración de las necesidades de aprendizaje, el examen de los contenidos curriculares y el estudio del entorno. A través de este proceso se identifica el perfil del grupo y las condiciones contextuales, facilitando la detección de problemáticas específicas para las cuales se diseñarán soluciones educativas. Para ello, es indispensable aplicar instrumentos como entrevistas, encuestas, observaciones y dinámicas de grupo, cuya información recolectada permite determinar con precisión las carencias de la población seleccionada (Esquivel Gámez, 2014). Posteriormente, tras identificar dichas necesidades, se definen las competencias de egreso necesarias para acortar la brecha académica, estableciendo además los requisitos de saberes previos y los recursos humanos, físicos y tecnológicos disponibles para garantizar la viabilidad de la estrategia (Bahamón, 2019). 

8 

Capítulo II. Marco Teórico 

Posteriormente, la fase de diseño se encarga de la descripción detallada de los objetivos de aprendizaje a partir del plan de curso y los resultados obtenidos en el diagnóstico previo. En este punto se planifican las estrategias didácticas y se seleccionan las herramientas o recursos necesarios, definiendo también los mecanismos de evaluación que permitirán medir el desempeño de los estudiantes frente a las metas propuestas (Sangrà, 2020). 

En cuanto a la etapa de desarrollo, esta comienza con la estructuración de los contenidos y recursos pertinentes para las unidades de aprendizaje. Se establecen actividades pedagógicas divididas en tres momentos: las actividades previas, que ofrecen al estudiante una visión panorámica para prepararlo; las actividades durante la clase, que consolidan los objetivos de la unidad; y las posteriores, enfocadas en fortalecer lo aprendido. En esta fase también se precisan los criterios de valoración orientados a la capacidad del estudiante para aplicar sus conocimientos en la resolución de problemas reales (Bahamón, 2019). 

Por su parte, la fase de implementación tiene como fin organizar el entorno de aprendizaje promoviendo la participación activa del aprendiz, etapa donde este comienza la construcción de sus nuevos conocimientos y el desarrollo de habilidades. Aquí se ejecutan las actividades y recursos planificados, integrando evaluaciones sumativas (Maribe, 2009). Finalmente, la fase de evaluación actúa de forma transversal a todo el diseño instruccional, integrando un enfoque formativo para realizar ajustes continuos a la propuesta desde sus inicios, y un enfoque sumativo aplicado tras la implementación para validar si los objetivos y las competencias planteadas fueron alcanzados exitosamente (Cuesta, 2010). 

**Figura 3** 

_<mark>Ilustración del modelo ADDIE.</mark>_ 

9 



<!-- Start of picture text -->
Revision Criss Revisidn<br>I<br>|<br>I<br>I<br>Implementacion (aie) ot»<br>|<br>|<br>:<br>Revisiin Revision<br>Desarrollo<br><!-- End of picture text -->

Capítulo II. Marco Teórico 

alumnado, sigue siendo difícil para el grupo docente identificar las rutas más adecuadas para cada perfil, lo cual, según la literatura, generalmente solo puede determinarse de forma fiable tras evaluar los resultados de varios cursos de prueba (Garrido et al., 2009). 

Durante el proceso de modelado de un curso, el grupo docente puede definir claramente los conceptos y desglosar las tareas en objetos de aprendizaje, pero ajustar estos elementos a los diferentes estilos de aprendizaje no es sencillo. Este proceso requiere una profunda reflexión pedagógica y un esfuerzo significativo para rediseñar los objetos de aprendizaje, determinar su ámbito de aplicación y definir cuáles son más apropiados para cada tipo de persona. 

## 2.6 La Inteligencia Artificial en la Educación: IA Conversacional y Generativa 

La IA es una rama de la ciencia de la computación que se centra en el desarrollo de algoritmos, modelos, sistemas y máquinas capaces de realizar tareas que requieran inteligencia humana. Estas tareas incluyen el reconocimiento de patrones, el aprendizaje automático, el procesamiento del lenguaje natural, la toma de decisiones, y la resolución de problemas complejos. En esencia, la IA busca imitar y, en algunos casos, mejorar las capacidades cognitivas humanas mediante la creación de algoritmos y modelos que permiten a las máquinas aprender y actuar de manera autónoma o semiautónoma (Górriz et al., 2020). 

En el panorama educativo actual, destaca la IA conversacional y la IA generativa. Estas tecnologías van más allá de ser meros conceptos abstractos; son la base para desarrollar herramientas que permiten a estudiantes y docentes interactuar directamente, abarcando desde sistemas que resuelven dudas mediante el diálogo hasta plataformas que crean contenido de aprendizaje personalizado. 

La IA generativa es un tipo de IA que utiliza el aprendizaje automático para crear contenido nuevo y original (ya sea texto, imágenes, video, código ò audio) a partir de amplios conjuntos de datos de entrenamiento. A diferencia de los motores de búsqueda o robots conversacional _(chatbots)_ tradicionales que solo recuperan información existente, un modelo de IA generativa emplea dicha información para producir contenido totalmente inédito, como canciones, poemas o artículos (Cevallos et al., 2023). 

11 

Capítulo II. Marco Teórico 

La IA Conversacional se fundamenta en componentes esenciales que le permiten procesar, entender y generar respuestas de manera natural. Para ello, se apoya en el Aprendizaje Automático ( _Machine Learning_ ), un subcampo de la IA que, a través de algoritmos y datos, refina continuamente su capacidad para reconocer patrones y hacer predicciones a medida que recibe más información. 

### 2.6.1 Impacto de la inteligencia artificial en la educación 

En el ámbito educativo la IA tiene el potencial de transformar profundamente los procesos de enseñanza, aprendizaje y evaluación, así como en la forma en que se accede al conocimiento y se capacita al personal docente. Su integración en la educación busca el desarrollo de programas que permitan la creación de entornos de aprendizaje personalizados y adaptativos, facilitando la adquisición de conocimiento por parte del estudiantado a través de estrategias basadas en los análisis predictivos de la IA (Cabrera, 2022). 

Las aplicaciones de la IA en la educación son variadas y abarcan aspectos clave del proceso educativo. Entre ellas, destacan los sistemas de tutoría inteligente, que ofrecen apoyo personalizado al estudiantado según sus fortalezas y debilidades. Además, las plataformas de aprendizaje adaptativo moldean el contenido y ritmo del curso según el progreso de cada estudiante. La IA también facilita el análisis de datos educativos, ayudando a las instituciones a identificar tendencias y tomar decisiones informadas para mejorar la retención estudiantil. Asimismo, la automatización de tareas administrativas permite a educadoras y educadores enfocarse más en la enseñanza y el apoyo directo (Holguín et al., 2024). 

### 2.6.2 Desafíos de la implementación de las herramientas basadas en IA en el sector Educativo 

En la actualidad, la educación afronta retos importantes en un mundo cada vez más globalizado y tecnológico. Dentro de este panorama, la IA surge como una herramienta digital fundamental con el potencial de fortalecer el desarrollo de habilidades y facilitar la creación de entornos de aprendizaje más dinámicos (Salinas, 2024). 

No obstante, a pesar de los avances de la IA, su aplicación en la educación exige la participación activa tanto del profesorado como del estudiantado. Para el alumnado, esto implica cultivar habilidades esenciales para el futuro, como el pensamiento crítico, la capacidad de 

12 

Capítulo II. Marco Teórico 

identificación, análisis, evaluación y fomento de la autonomía, junto con la resolución de problemas, la toma de decisiones y la reflexión ante los constantes cambios. 

El éxito de la IA como herramienta educativa radica en la capacidad de las instituciones para combinarla con metodologías pedagógicas tradicionales. Esta combinación busca integrar lo mejor que ofrece la tecnología con la riqueza de la enseñanza humana. Por ello, la formación debe enfocarse en desarrollar habilidades intrínsecamente humanas que las máquinas no pueden replicar, consolidando a las instituciones como impulsoras del aprendizaje continuo, capaces de enseñar a las personas a pensar de manera original. 

En este sentido, es imperativo que la implementación global de la IA en la educación se rija por un enfoque centrado en el ser humano. Es crucial que la IA sirva para disminuir las desigualdades en el acceso al conocimiento, la investigación y la diversidad cultural. Así, esta tecnología no solo evitará ampliar, sino que contribuirá activamente a cerrar la brecha tecnológica entre y dentro de los países. La visión de una "IA para todos" busca asegurar que cada persona pueda aprovechar al máximo la revolución tecnológica actual y acceder a sus beneficios, especialmente en términos de innovación y conocimiento (Unesco, s.f.). 

## 2.7 Stack Tecnológico 

Un _stack_ tecnológico, o pila de tecnologías, se define como el conjunto estructurado e interdependiente de lenguajes de programación, bibliotecas, entornos de trabajo ( _frameworks_ ), sistemas de gestión de bases de datos y herramientas de infraestructura que operan en conjunto para el diseño, desarrollo y ejecución de una aplicación de software. Bajo los modelos de arquitectura web contemporáneos, este ecosistema se divide fundamentalmente en dos capas operativas: el _frontend_ (lado del cliente), responsable de la interfaz, la accesibilidad y la experiencia del usuario; y el _backend_ (lado del servidor), encargado del procesamiento lógico, la gestión de datos y la orquestación de las integraciones externas. 

La selección de los componentes que integran un _stack_ tecnológico representa una decisión arquitectónica crítica en la ingeniería de software. Esta elección determina no sólo la viabilidad técnica del desarrollo, sino también la escalabilidad, el rendimiento, la seguridad y la flexibilidad del sistema para acoplarse a tecnologías emergentes e infraestructuras de terceros. 

13 

Capítulo II. Marco Teórico 

En el contexto de esta investigación, el diseño de un entorno virtual para la gestión de rutas de aprendizaje personalizadas impuso requerimientos técnicos rigurosos, tales como el procesamiento de métricas de rendimiento en tiempo real (KPIs) y la integración de modelos conversacionales de Inteligencia Artificial. Para dar respuesta a estas exigencias operativas y superar las limitaciones de flexibilidad identificadas en plataformas de terceros, se estableció una arquitectura de software a la medida. A continuación, se definen y fundamentan los términos, las herramientas, lenguajes y entornos específicos que componen el _stack_ tecnológico seleccionado para la construcción e implementación de la plataforma web propuesta: 

### 2.7.1 SPA (Single Page Application) 

Una _Single Page Application_ (SPA) se define como una aplicación independiente de alta complejidad que trasciende el concepto tradicional de página web. A diferencia de las arquitecturas convencionales, esta se fundamenta en una estructura extremadamente modular donde la interfaz se segmenta en componentes autónomos organizados según su rol funcional. Este diseño permite que los elementos de la aplicación se generen de manera dinámica, favoreciendo una arquitectura capaz de gestionar tanto el lado del cliente como el almacenamiento de datos con mayor precisión y orden. 

La adopción de este modelo tecnológico responde a la necesidad de optimizar el rendimiento y la mantenibilidad de sistemas digitales avanzados. Al basarse en la reutilización de componentes y la minimización de la duplicación de código, la SPA permite transmitir al cliente exclusivamente los datos necesarios para renderizar cada vista, lo que incrementa significativamente la eficiencia operativa. Además, esta estructura modular facilita la implementación de pruebas automatizadas para cada componente, asegurando una mayor estabilidad ante cambios futuros y una integración fluida con herramientas de Inteligencia Artificial (Gavrilă et al., 2019). 

### 2.7.2 La Nube (Cloud Computing) 

La computación en la nube, o Cloud Computing, se define como un paradigma informático que traslada el modelo tradicional de procesamiento y almacenamiento hacia la red. En esencia, consiste en ofrecer diversos servicios, tales como almacenamiento, aplicaciones y correo electrónico, a través de Internet, los cuales son gestionados y ejecutados por servidores remotos, permitiendo al usuario final acceder a ellos mediante un navegador web. Bajo este enfoque, el 

14 

Capítulo II. Marco Teórico 

usuario no requiere poseer una infraestructura local compleja ni conocer la arquitectura física subyacente, ya que esta se presenta como una abstracción transparente donde los servicios y aplicaciones pueden crecer, ser más eficientes y confiables según la demanda. 

Esta arquitectura se sustenta en características fundamentales como el autoservicio a la carta, la rapidez, la elasticidad y la puesta en común de recursos. El modelo integra capas de servicio que incluyen el software (SaaS), la plataforma (PaaS) y la infraestructura (IaaS), permitiendo que múltiples consumidores compartan recursos físicos y virtuales de forma dinámica. Asimismo, la virtualización juega un papel crítico al permitir la abstracción de los recursos tecnológicos, logrando que una aplicación sea independiente del hardware sobre el cual se ejecuta y garantizando la alta disponibilidad y seguridad de la información almacenada. 

### 2.7.3 BaaS (Backend as a Service) 

El _Backend as a Service_ (BaaS) es un modelo de servicio en la nube que permite a los desarrolladores subcontratar los componentes funcionales en segundo plano de una aplicación, tales como la gestión de bases de datos, la autenticación de usuarios, el almacenamiento en la nube y las notificaciones push. Al delegar estas tareas a proveedores externos, los desarrolladores pueden centrarse exclusivamente en la lógica y el diseño del _frontend_ , utilizando interfaces de programación de aplicaciones (API) y kits de desarrollo de software (SDK) para integrar funcionalidades prescritas sin necesidad de gestionar servidores, contenedores o máquinas virtuales. 

Esta estrategia resulta especialmente beneficiosa para acelerar los ciclos de creación y lanzamiento de aplicaciones web y móviles, ya que elimina la carga operativa asociada con la configuración y mantenimiento de la infraestructura _backend_ . En lugar de dirigir todos los aspectos técnicos de la producción, el desarrollador actúa como un director de cine que delega las tareas técnicas en especialistas, permitiéndole priorizar la experiencia y las interacciones que percibe el usuario final, optimizando así los tiempos de desarrollo y la escalabilidad del producto. 

15 

Capítulo II. Marco Teórico 

### 2.7.4 Base de datos 

Una base de datos se define como un conjunto organizado de información almacenada electrónicamente, la cual permite ser accedida, gestionada y actualizada de manera eficiente. Su propósito fundamental es servir como un repositorio para el almacenamiento y la recuperación de diversos tipos de información, facilitando la introducción de datos y el trabajo con estructuras complejas, especialmente en contextos de análisis estadísticos. 

En un sentido más técnico, el sistema de base de datos abarca el conjunto integrado por la base de datos propiamente dicha, el Sistema de Gestión de Bases de Datos (SGBD) y los programas de aplicación que brindan servicio a una organización. Este modelo se basa en la abstracción de datos, la cual separa la estructura física de la estructura lógica, permitiendo que el usuario interactúe mediante especificaciones externas sin necesidad de conocer los detalles de la implementación interna, optimizando así la administración y consulta de la información. 

### 2.7.5 Postgres (PostgreSQL) 

PostgreSQL (también conocido como Postgres) es un potente sistema de gestión de bases de datos objeto-relacional de código abierto que cuenta con varias décadas de desarrollo activo. Este motor se destaca por extender el lenguaje SQL combinándolo con una amplia gama de características diseñadas para almacenar y escalar de forma segura los cargas de datos más complejas, manteniendo una sólida reputación basada en su arquitectura probada, confiabilidad e integridad de los datos. 

Asimismo, el sistema ofrece una alta extensibilidad y conformidad con los estándares de la industria, permitiendo la gestión eficiente de consultas complejas, transacciones seguras bajo propiedades ACID y la manipulación de diversos tipos de datos. Gracias a su arquitectura robusta y a una comunidad global activa, es capaz de soportar desde entornos de ejecución monousuario hasta aplicaciones web de alta concurrencia y grandes volúmenes de información. 

### 2.7.6 Node.js 

Node.js es un entorno de ejecución para JavaScript de código abierto y multiplataforma, construido sobre el motor V8 de Google Chrome, que permite a los desarrolladores ejecutar código fuera de los límites tradicionales del navegador web. Su arquitectura está diseñada específicamente para facilitar la construcción de aplicaciones de red rápidas y altamente 

16 

Capítulo II. Marco Teórico 

escalables, permitiendo manejar grandes volúmenes de solicitudes de manera simultánea sin comprometer el rendimiento del sistema. 

Asimismo, la plataforma opera bajo un modelo de E/S sin bloqueo impulsado por eventos y orientado a hilos individuales, lo que optimiza de forma notable la gestión de operaciones concurrentes y reduce la latencia en las respuestas. Gracias a estas características, Node.js se ha consolidado como una solución ideal para el desarrollo de servicios web modernos, APIs robustas y aplicaciones en tiempo real que requieren un procesamiento ágil y eficiente. 

### 2.7.7 Vercel 

Vercel es una plataforma de infraestructura en la nube y desarrollo de experiencias web diseñada para optimizar la creación, el despliegue y la gestión de aplicaciones modernas. Su propuesta central consiste en abstraer la complejidad de la configuración de servidores mediante la integración directa con repositorios de código, lo que permite automatizar los procesos de compilación y publicación a través de una red global de distribución que asegura alta velocidad y disponibilidad para los usuarios. 

La plataforma ofrece compatibilidad nativa con diversos frameworks y modelos de ejecución basados en funciones sin servidor y en el borde, optimizando tanto el procesamiento de la lógica de backend como la renderización dinámica. Sus capacidades de automatización para generar entornos de previsualización por cada cambio realizado agilizan significativamente las fases de prueba y revisión, simplificando la transición hacia la producción con altos estándares de escalabilidad y robustez. 

### 2.7.8 Vite 

Vite es una herramienta de compilación de próxima generación para el desarrollo frontend que redefine la experiencia del programador al ofrecer un entorno de trabajo extremadamente rápido y ligero. A diferencia de los empaquetadores tradicionales, aprovecha las capacidades de los módulos nativos de ECMAScript (ESM) en el navegador y el preempaquetado de dependencias para lograr un inicio de servidor instantáneo y actualizaciones sumamente ágiles. 

Además, proporciona una robusta infraestructura de compilación optimizada para producción integrando herramientas como Rollup, soporte nativo para diversos frameworks (como Vue, React, Svelte, entre otros), y un sistema flexible de complementos. De este modo, 

17 

Capítulo II. Marco Teórico 

simplifica el flujo de trabajo moderno sin sacrificar la escalabilidad ni el rendimiento en aplicaciones web complejas. 

## 2.8 Antecedentes 

A continuación, se presentan antecedentes que se consideraron relevantes para la elaboración de este trabajo de seminario. Cada uno de ellos aporta elementos teóricos, metodológicos y empíricos que permiten sustentar la factibilidad de aplicar rutas de aprendizaje personalizadas apoyadas por IA en entornos educativos reales. Estos estudios ofrecen perspectivas complementarias sobre el diseño, implementación y evaluación de modelos adaptativos, así como sobre los desafíos éticos, técnicos y pedagógicos que implica su integración en el proceso educativo. 

### 2.8.1 Desarrollo de Rutas de Aprendizaje Personalizadas para el Apoyo en el Aprendizaje de Programación en la Universidad de los Andes 

Uno de los estudios recientes en el ámbito de las rutas de aprendizaje personalizadas es el desarrollado por Daniel Alfonso García Pilimur titulado Desarrollo de Rutas de Aprendizaje Personalizadas para el Apoyo en el Aprendizaje de Programación en la Universidad de los Andes (Universidad de los Andes, Bogotá, Colombia, 2024). Esta investigación se enmarca en el contexto de la enseñanza de programación a nivel universitario, una disciplina que presenta altos índices de deserción y dificultades cognitivas en el estudiantado de primer año (García, 2024). 

El objetivo principal del estudio fue diseñar e implementar un sistema de rutas de aprendizaje personalizadas que respondieron a las necesidades individuales del estudiantado, considerando variables como el nivel de conocimiento previo, el ritmo de aprendizaje y los estilos cognitivos. Para ello, García Pilimur empleó una metodología mixta, combinando análisis cuantitativos de desempeño académico con técnicas cualitativas de seguimiento personalizado. El sistema desarrollado integró algoritmos de recomendación y análisis de progresión, permitiendo ajustar dinámicamente los contenidos y actividades propuestas. 

El diseño instruccional se apoyó en principios de la teoría del aprendizaje adaptativo, permitiendo que el estudiantado accediera a recursos específicos según su perfil cognitivo y nivel de competencia. Además, se incorporaron mecanismos de retroalimentación automatizada que orientaban al o la estudiante en tiempo real, reforzando los conceptos clave y sugiriendo actividades complementarias cuando se detectaron dificultades persistentes. 

18 

Capítulo II. Marco Teórico 

Entre los hallazgos más relevantes se destaca una mejora significativa en la retención de conceptos fundamentales de programación, así como un incremento en la motivación y autonomía del estudiantado. El estudio concluye que las rutas de aprendizaje personalizadas no solo optimizan el proceso de enseñanza, aprendizaje y evaluación, sino que también promueven una experiencia educativa más equitativa y centrada en el o la estudiante. 

Aunque el estudio demuestra la eficacia del sistema en términos de rendimiento y motivación, no se detalla con suficiente profundidad el proceso de validación pedagógica del contenido generado por los algoritmos. Es decir, no queda claro si los materiales adaptados fueron revisados por docentes o especialistas antes de ser entregados al estudiantado, ni cómo se garantiza la coherencia con los objetivos curriculares de la asignatura. 

Dicho trabajo constituye un referente clave para el desarrollo de modelos instruccionales adaptativos apoyados en tecnologías inteligentes, y aporta evidencia empírica sobre la eficacia de la personalización en entornos universitarios. Su enfoque metodológico y sus resultados fortalecen el marco teórico de la presente investigación, al demostrar la viabilidad de implementar sistemas personalizados en contextos reales de formación técnica. 

### 2.8.2 Análisis de los Sistemas de Aprendizaje Personalizado Impulsados por Inteligencia Artificial y su Implementación en Contextos Educativos 

Este estudio examina el impacto y las aplicaciones de los sistemas de aprendizaje adaptativo impulsados por IA en educación superior. Utiliza la metodología PRISMA para revisar 10 artículos científicos clave publicados entre 2021 y 2024, enfocándose en cómo la IA permite adaptar contenidos y estrategias pedagógicas en tiempo real según el perfil del estudiantado (Cárdenas, 2024). 

Este estudio ofrece una visión detallada sobre la implementación práctica de sistemas de aprendizaje personalizado impulsados por IA, con énfasis en su aplicación directa en contextos educativos reales. A diferencia de otros trabajos centrados en marcos teóricos o percepciones generales, el estudio de Pinela Cárdenas documenta cómo el estudiantado interactúa con rutas adaptativas construidas mediante algoritmos de aprendizaje profundo, lo que permite observar su impacto en el rendimiento y la progresión académica. 

Se destacan tecnologías como redes neuronales y aprendizaje profundo, que permiten construir rutas personalizadas basadas en el nivel de conocimiento, ritmo de avance y desempeño académico. Además, se documentan casos de implementación en cursos 

19 

Capítulo II. Marco Teórico 

universitarios, donde el estudiantado interactúa directamente con plataformas adaptativas que ajustan los contenidos según sus respuestas y progresos. 

Aunque el estudio presenta una implementación clara y centrada en el o la estudiante, no aborda cómo se valida pedagógicamente el contenido adaptado por los algoritmos, ni si existe supervisión docente sobre las rutas generadas. Tampoco se especifica cómo se evita que los sesgos algorítmicos afecten la equidad en la personalización. 

20 

Capítulo III. Marco Metodológico 

# Capítulo III. Marco Metodológico 

## 3.1 Diseño de la Investigación 

El Trabajo Especial de Grado tiene como objetivo investigar cómo las rutas de aprendizaje personalizadas, apoyadas por herramientas de IA, contribuyen a la mejora de los procesos de enseñanza, aprendizaje y evaluación. Para abordar este objetivo, se emplea un diseño de investigación experimental. 

La investigación experimental se define como aquella que busca probar una hipótesis a través de la manipulación deliberada de una o más variables independientes, para observar su efecto sobre una o más variables dependientes, en un entorno controlado. Este enfoque es crucial para establecer relaciones de causa y efecto (Hernández Sampieri, Fernández Collado, & Baptista Lucio, 2014, p. 129). 

La elección de un diseño metodológico experimental se fundamenta en la necesidad imperativa de establecer relaciones de causa y efecto entre la intervención y los resultados. Dado que el objetivo primordial del Trabajo Especial de Grado es investigar cómo las rutas de aprendizaje personalizadas, asistidas por IA, contribuyen al proceso educativo, este diseño permitirá manipular una variable independiente (la aplicación del sistema de rutas adaptativas) y medir si ese cambio produce un resultado en la variable dependiente general (el proceso educativo). 

## 3.2 Enfoque de la Investigación 

El presente trabajo será diseñado bajo el planteamiento metodológico del enfoque mixto, ya que se adapta a las características y necesidades de la investigación. 

El enfoque mixto representa “un conjunto de procesos sistemáticos, empíricos y críticos de investigación e implican la recolección y el análisis de datos cuantitativos y cualitativos, así como su integración y discusión conjunta, para realizar inferencias producto de toda la información recabada y lograr un mayor entendimiento del fenómeno bajo estudio (Hernández Sampieri, Fernández Collado, & Baptista Lucio, 2014, p. 546). 

21 

Capítulo III. Marco Metodológico 

Esta elección se justifica en la necesidad de obtener una comprensión integral del fenómeno, lo cual demanda la combinación estratégica de la metodología cuantitativa (para la medición rigurosa  de métricas o Indicadores Clave de Rendimiento Educativo (KPI) y la validación estadística de la hipótesis) y la metodología cualitativa (para explorar la percepción, las experiencias y los procesos subjetivos del estudiantado sobre la intervención de rutas de aprendizaje personalizadas apoyadas por IA). Esta combinación metodológica no solo enriquece la información recopilada, sino que también aumenta la validez y profundidad de los resultados, al permitir que los hallazgos numéricos sean interpretados y contextualizados por las voces y vivencias de los participantes. 

Entre los indicadores considerados para evaluación cuantitativa se encuentran: 

- Tasa de finalización de cursos. 

- Puntuaciones en evaluaciones. 

- Tiempo de permanencia en la plataforma. 

- Tasa de abandono. 

- Mejora en el desempeño académico. 

En paralelo, la evaluación cualitativa buscará explorar: 

- <mark>Autonomía y autorregulación.</mark> 

- <mark>Retroalimentación del estudiantado.</mark> 

- <mark>Grado de dificultad percibido.</mark> 

- <mark>Satisfacción del profesorado.</mark> 

## 3.3 Técnicas de Recolección de Datos 

Se define la técnica de recolección de datos como el procedimiento o forma particular de obtener datos o información, la aplicación de una técnica conduce a la obtención de información, la cual debe ser resguardada mediante un instrumento de recolección de datos (Falcón & Herrera, 2005, pág. 12). 

Las técnicas de recolección de datos que se utilizarán en la presente investigación serán a) Administración de Pruebas Estandarizadas (Pre-test y Post-test) y b) Encuestas. 

22 

Capítulo III. Marco Metodológico 

Una prueba estandarizada es un instrumento de evaluación diseñado para aplicarse y calificarse de manera uniforme, con el propósito de medir conocimientos y habilidades en áreas específicas, permitiendo la comparación de resultados entre distintos contextos educativos (George Reyes, 2020). 

<mark>Una encuesta es una operación estadística que utiliza cuestionarios para recopilar datos de una muestra representativa de una población, con el objetivo de investigar y comprender sus opiniones, actitudes, comportamientos o características</mark> (Trejo, 2007). 

## 3.4 Instrumentos de Recolección de Datos 

Un instrumento de recolección de datos es cualquier recurso de que pueda valerse el investigador para acercarse a los fenómenos y extraer de ellos información. De este modo el instrumento sintetiza en sí toda la labor de la investigación, resume los aportes del marco teórico al seleccionar datos que corresponden a los indicadores y, por lo tanto, a las variables o conceptos utilizados (Sabino, 1992, p.88). 

Utilizaremos como instrumento los formularios para realizar las encuestas, esto facilitará la recolección de datos o información siguiendo una estructura y orden determinados. Por otro lado, para las pruebas estandarizadas se aplicarán exámenes puntuados. 

## 3.5 Población 

La población se define como un conjunto de todos los elementos que estamos estudiando, acerca de los cuales intentamos sacar conclusiones (Levin & Rubin, 1996, p.20). 

La población de estudio estará compuesta por estudiantes y docentes de la Escuela de Computación de la Facultad de Ciencias de la Universidad Central de Venezuela (UCV) quienes forman parte activa del proceso educativo. La selección de los participantes estará orientada a garantizar la diversidad de experiencias y opiniones, contribuyendo a la riqueza del análisis cualitativo. 

23 

Capítulo III. Marco Metodológico 

## 3.6 Muestra y Muestreo 

Se define como un subconjunto de una población o grupo de sujetos que forman parte de una misma población en que se llevará a cabo la investigación con el fin posterior de generalizar los hallazgos del todo (Hernández, 2018). 

En este trabajo se utilizará el método de muestreo no probabilístico, en el cual se toman los casos o unidades que estén disponibles en un momento dado, puesto que se solicitará tanto a estudiantes como a docentes de la carrera de Computación de la UCV formen parte del estudio. Se considera como tamaño mínimo de muestra una sección regular de una asignatura, generalmente compuesta por aproximadamente 30 estudiantes, un o una docente titular y un preparador o auxiliar docente. Sin embargo, se contempla la posibilidad de extender el estudio a la totalidad de las secciones del curso, lo que permitiría fortalecer la validez de los resultados. 

## 3.7 Técnicas de Procesamiento de Datos 

La técnica que se utilizará en el procesamiento de los datos para el caso de la encuesta será la estadística descriptiva que consiste en un conjunto de procesamientos que tienen por objeto presentar masas de datos por medio de tablas, gráficos o medidas de resumen (Faraldo & Pateiro, 2012). Mientras que para las pruebas estandarizadas será el <mark>análisis de datos,</mark> donde examinaremos y transformaremos los datos recopilados para obtener información útil. 

## 3.8 Herramientas de Procesamiento de Datos 

Una herramienta es un medio físico que nos permite registrar o medir la información (Tamayo, 2001, p. 190). 

Para llevar a cabo la tabulación de los datos obtenidos por el cuestionario, que se aplicará a estudiantes y docentes activos en la carrera de computación de la UCV usaremos el programa Microsoft Office Excel. Por otro lado, para las pruebas estandarizadas se utilizarán herramientas de análisis como _Power BI_ que f <mark>acilitan la conexión, transformación y modelado de datos, creando informes interactivos y paneles personalizados.</mark> 

24 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

# Capítulo IV. Desarrollo de la Solución 

## 4.1 Motivación 

La necesidad de modernizar los procesos de enseñanza, aprendizaje y evaluación en la Universidad Central de Venezuela se hace cada vez más evidente en un entorno caracterizado por la diversidad de estilos de aprendizaje y las limitaciones tecnológicas. Este estudio propone aplicar rutas de aprendizaje personalizadas en una asignatura virtual, como mecanismo para validar su efectividad y factibilidad en este contexto. 

La educación virtual o educación en línea ha cobrado relevancia en la UCV, especialmente tras los cambios generados por la pandemia de COVID-19 y la digitalización forzada de muchos cursos. Sin embargo, estas modalidades aún presentan desafíos significativos, como la falta de seguimiento individualizado, la escasa retroalimentación formativa y una participación desigual del estudiantado (Welson Vda. De Calderón et al., 2025). 

Ante este panorama, la mediación tecnológica deja de ser un simple soporte logístico para convertirse en un elemento dinamizador del acto pedagógico. La implementación de rutas personalizadas responde a la urgencia de transitar hacia modelos donde la tecnología no sólo distribuya contenidos, sino que actúe como un facilitador que gestione la complejidad del proceso educativo, garantizando que los recursos digitales estén alineados con las realidades particulares de los estudiantes. Se busca transformar el entorno virtual en un ecosistema que permita una gestión efectiva del tiempo y un acompañamiento constante, reduciendo la brecha entre la enseñanza tradicional y las exigencias del aprendizaje autónomo en la educación superior. <u>https://www.indteca.com/ojs/index.php/Revista_Scientific/article/view/1028/1403</u> 

En la investigación del Trabajo Especial de Grado se busca probar experimentalmente si un enfoque de aprendizaje personalizado puede mejorar: 

- El compromiso académico. 

- La comprensión de los contenidos. 

25 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

- La eficacia de la evaluación. 

- La satisfacción del estudiantado. 

Además, permitirá identificar los requisitos técnicos, humanos y pedagógicos para su posible implementación a mayor escala, evaluando aspectos como: 

- La viabilidad en cuanto a infraestructura disponible. 

- La disposición y preparación del cuerpo docente. 

- Los costos asociados y estrategias sostenibles. 

- La compatibilidad curricular con modelos adaptativos. 

- Las brechas de acceso tecnológico en el alumnado. 

Probar este modelo en un grupo de estudiantes de una materia dictada en modalidad virtual o en línea tiene un valor estratégico, ya que permite observar el desempeño del enfoque en un ambiente donde la interacción depende casi totalmente de las herramientas digitales. Esto ofrecerá una visión realista de esta alternativa de aprendizaje, su impacto y posibles limitaciones. 

## 4.2 Descripción de la Implementación 

El presente estudio se orienta al diseño e implementación de rutas de aprendizaje personalizadas, apoyadas por herramientas de Inteligencia Artificial (IA), en el contexto de la asignatura Algoritmos y Programación de la Licenciatura en Computación. El objetivo central es evaluar la eficacia de este modelo adaptativo en la mejora de los procesos de enseñanza, aprendizaje y evaluación dentro de un entorno real. Se busca transformar la metodología tradicional y homogénea, personalizando la secuencia y el ritmo de los contenidos a las 

26 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

necesidades individuales del estudiantado para medir el impacto directo en su desempeño y adquisición de competencias. 

A diferencia de los enfoques convencionales que dependen de plataformas de gestión del aprendizaje (LMS) preexistentes, esta propuesta contempla el desarrollo de una plataforma propia diseñada específicamente para el despliegue de rutas de aprendizaje personalizadas. Esta decisión estratégica permite superar las limitaciones de flexibilidad y las restricciones de configuración inherentes a los LMS comerciales, garantizando una arquitectura técnica capaz de integrar modelos de IA que se ajusten de manera precisa a los requerimientos pedagógicos del proyecto. 

La implementación de estas rutas se proyecta como una estrategia con beneficios concretos para el estudiantado y el cuerpo docente. Para los estudiantes, se espera una mejora en el rendimiento académico, una mayor autonomía en el estudio y una experiencia de aprendizaje altamente adaptativa. Para el grupo docente, la plataforma propia no solo facilita la mediación pedagógica, sino que también ofrece un entorno de control y analítica de datos sin las barreras de interoperabilidad que imponen los sistemas centralizados actuales. 

Estas expectativas se sustentan en resultados consistentes obtenidos en estudios realizados en universidades con contextos similares, donde se ha demostrado que las rutas de aprendizaje contribuyen significativamente a la retención de conocimientos y al incremento de la participación activa (ver Antecedentes en el Capítulo II, Marco Teórico). 

La construcción de estas rutas considera variables como los conocimientos previos, el ritmo de aprendizaje, los estilos cognitivos y las metas formativas de cada alumno. En términos operativos, la plataforma permitirá un recorrido educativo donde los recursos y las evaluaciones se ajustan dinámicamente, no solo en contenido, sino también en el formato y nivel de complejidad, ofreciendo una experiencia verdaderamente personalizada que responde a las demandas educativas contemporáneas. 

## 4.3 Alcance de la Implementación 

La implementación del estudio se desarrollará a lo largo de un periodo académico cortó, de manera independiente a la programación oficial de la asignatura Algoritmos y Programación. 

27 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

Este intervalo permitirá aplicar las fases previstas del proyecto (análisis, diseño, desarrollo, implementación, evaluación y resultados) en un entorno de prueba controlado. 

Se realizará un seguimiento detallado del desempeño de un grupo seleccionado de estudiantes, no muy numeroso, para analizar cómo las rutas personalizadas influyen en su proceso de aprendizaje. Dicho seguimiento se llevará a cabo durante el periodo de prueba definido, manteniendo una comunicación constante con los participantes para alcanzar los objetivos planteados. 

Este trabajo se limitará a: 

- La creación y configuración de una plataforma técnica dedicada exclusivamente al despliegue de rutas de aprendizaje personalizadas. 

- La incorporación de un único asistente virtual como herramienta de inteligencia artificial, orientado a la adaptación del contenido y a la retroalimentación continua. 

- La ejecución de pruebas dentro del entorno virtual para validar la viabilidad operativa y funcional de las rutas. 

- El análisis cualitativo y cuantitativo del impacto en el aprendizaje de una muestra acotada de estudiantes, sin pretender una generalización estadística a otras poblaciones. 

Es importante destacar que el estudio se ejecuta de forma paralela y externa a la planificación oficial de la asignatura, por lo que no interfiere con los objetivos, evaluaciones ni contenidos establecidos por el equipo docente. Estos recursos y actividades, alojados en la plataforma de despliegue, están diseñados como un complemento opcional para reforzar los contenidos del curso y fomentar la participación activa del o la estudiante. 

El propósito principal del estudio es analizar el impacto que la implementación de rutas de aprendizaje personalizadas puede tener en el rendimiento académico y en los procesos de evaluación del estudiantado. A través de la aplicación del asistente virtual y actividades diferenciadas en la plataforma de despliegue, se espera observar mejoras en la comprensión de contenidos, la autonomía del estudio y la participación activa de los estudiantes de Algoritmos y Programación. 

Además del impacto en el rendimiento estudiantil, un objetivo crucial de este estudio es medir la factibilidad y la carga operativa que implica para el grupo docente la aplicación de este 

28 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

enfoque adaptativo. Al utilizar las herramientas de seguimiento y automatización de la plataforma, se busca generar evidencia sobre cómo estas estrategias de diferenciación de rutas de aprendizaje no solo mejoran el aprendizaje, sino que también pueden aliviar el proceso evaluativo del profesorado. Específicamente, se analizará si la delegación de la retroalimentación y la asignación de práctica remedial al asistente virtual puede reducir el tiempo que los y las docentes dedican a tareas repetitivas, permitiéndoles concentrarse en la atención individualizada de casos más complejos y en la planificación avanzada. 

Al concluir este estudio, se planifica la elaboración y entrega de un informe final que sintetice los resultados obtenidos, tanto en términos cuantitativos como cualitativos. Este informe será compartido con el grupo docente responsable de la asignatura y con el Centro de Enseñanza Asistida por Computador (CENEAC) de la Escuela de Computación. 

## 4.4 Descripción de la implementación adaptado al modelo ADDIE 

El diseño del curso se desarrolló teniendo en cuenta las fases del modelo instruccional ADDIE, a continuación, se hace la descripción de lo implementado en cada una de las fases. 

### 4.4.1 Fase de análisis 

Para la ejecución de este proyecto, se ha seleccionado la Escuela de Computación de la Facultad de Ciencias de la Universidad Central de Venezuela (UCV), institución pública de referencia nacional dedicada a la formación de profesionales en el área de las ciencias de la computación y la tecnología. Esta unidad académica tiene como misión la generación de conocimiento científico y tecnológico, fomentando el desarrollo de competencias críticas, lógicas y analíticas en sus estudiantes, fundamentales para el desempeño en un entorno global altamente competitivo. 

La población objeto de estudio para el desarrollo e implementación de esta investigación está constituida por los estudiantes inscritos en la materia de Algoritmos y Programación de la Escuela de Computación. La muestra seleccionada comprende a los estudiantes regulares de dicha cátedra, así como a aquellos que se encuentran próximos a cursarla, quienes requieren consolidar sus habilidades de resolución de problemas mediante la lógica de programación. 

A partir de la experiencia académica y la observación directa en el desarrollo de la materia de Algoritmos y Programación, se identificó que el proceso de aprendizaje tradicional presenta 

29 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

limitaciones en cuanto a la atención de los ritmos individuales y las necesidades específicas de cada estudiante. Si bien existen diversas plataformas para el despliegue de contenido o recursos utilizados por materia, estas carecen de lo que se necesita para construir rutas de aprendizaje personalizadas que permitan al estudiante avanzar según su propio progreso y dominio temático. La transición hacia esquemas de aprendizaje mediados por herramientas digitales ha puesto de manifiesto la necesidad de entornos capaces de organizar los recursos de estudio según los conocimientos previos o el nivel real de cada estudiante, evitando así la frustración y facilitando un proceso de aprendizaje más fluido y adaptativo. 

En el marco de las competencias exigidas para el futuro profesional de la computación, es importante que los estudiantes no solo adquieran conocimientos teóricos, sino que desarrollen un pensamiento computacional sólido. En este sentido, el enfoque pedagógico de este proyecto se alinea con la necesidad de integrar la Inteligencia Artificial como apoyo para la personalización educativa, permitiendo que el estudiante sea el protagonista de su propio proceso de enseñanzaaprendizaje. 

Como parte del proceso de recolección de información, se llevó a cabo un diagnóstico fundamentado en el diálogo directo con la coordinación de la asignatura. Este acercamiento permitió obtener una perspectiva sobre las necesidades de aprendizaje y los desafíos persistentes en el desarrollo de la materia de Algoritmos y Programación. A través de este intercambio, se identificó que muchos de los estudiantes inician sus estudios universitarios arrastrando carencias significativas en el área de matemáticas desde su formación en la educación media y diversificada, lo cual se traduce en retos considerables al enfrentarse a estructuras complejas de programación. Ante esta situación, se subrayó la necesidad de un acompañamiento más dinámico y personalizado para el alcance de las competencias requeridas. Asimismo, esta consulta confirmó la relevancia de integrar herramientas tecnológicas que, además de centralizar los recursos, fomenten la autoevaluación y permitan al estudiante visualizar su progreso de manera constante. 

Con base en el análisis de resultados, se determinó que los estudiantes requieren priorizar las siguientes necesidades: 

- Acceso a rutas de aprendizaje personalizadas: Diseño de un flujo de temas lógico y adaptativo, que organiza los recursos de estudio según los conocimientos previos y el nivel de dominio real de cada estudiante. 

30 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

- Reforzamiento en bases fundamentales: Inclusión de módulos de nivelación en temas básicos de la materia y matemáticas, diseñados para cerrar brechas académicas y reducir la frustración en el aprendizaje. 

- Recursos didácticos diversificados e interactivos: Disponibilidad de materiales multimedia y elementos gamificados para cada unidad, que dinamizan el proceso de estudio y refuerzan la comprensión. 

- Acompañamiento mediante tutoría de IA: Integración de un tutor inteligente que brinda apoyo constante, resuelve dudas y ofrece retroalimentación personalizada durante el proceso. 

- Implementación de sistemas de evaluación continua: Uso de quizzes y actividades que validen la adquisición de competencias clave antes de avanzar al siguiente nivel, asegurando un progreso sólido. 

- Entornos digitales intuitivos: Plataformas enfocadas en una experiencia de usuario que fomente la autonomía del estudiante y facilite la autogestión de su proceso educativo. 

#### 4.4.1.1 Análisis comparativo de plataformas existentes 

Para contextualizar la viabilidad técnica, se realizó un estudio comparativo de Moodle y Canvas, dos de las plataformas más representativas en el ámbito educativo, analizando sus modelos de despliegue y su impacto en la personalización 

#### 4.4.1.2 Análisis Técnico de Plataformas de Gestión de Aprendizaje (LMS) Candidatas 

Como fase previa al desarrollo del entorno definitivo de la investigación, se realizó una evaluación diagnóstica de las dos plataformas de gestión de aprendizaje (LMS) más utilizadas en el ámbito académico: Moodle y Canvas LMS. El objetivo de este análisis fue determinar si alguna de estas herramientas de terceros poseía la flexibilidad arquitectónica necesaria para desplegar de forma nativa e integrada una ruta de aprendizaje personalizada apoyada por Inteligencia Artificial (IA). 

#### 4.4.1.3 Evaluación de Moodle (Modelo de Despliegue Local) 

Moodle fue evaluado inicialmente debido a su naturaleza de código abierto, lo que teóricamente ofrece un control absoluto sobre el entorno y una amplia capacidad de personalización mediante módulos externos. 

31 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

Sin embargo, tras realizar los entornos de prueba correspondientes, se identificaron limitaciones estructurales y operativas críticas para el alcance del proyecto: 

- **Dependencia de Infraestructura Externa:** Para habilitar el acceso a usuarios externos sin contar con servidores dedicados institucionales, la arquitectura requería puentes de red y túneles de comunicación de terceros, lo que introducía puntos críticos de fallo ajenos al control de la investigación. 

- **Restricciones de Conectividad y Red:** El ancho de banda residencial y doméstico disponible para las pruebas piloto resultó insuficiente para soportar el flujo de datos lento y colapsaría ante la concurrencia proyectada de los estudiantes de la cohorte. 

- **Falta de Escalabilidad:** La combinación de un hardware no dedicado y la alta demanda de peticiones simultáneas impedían garantizar la estabilidad y la disponibilidad continua (24/7) del servicio durante el periodo académico. 

#### 4.4.1.4 Evaluación de Canvas LMS (Modelo Basado en la Nube) 

Por otro lado, se analizó Canvas LMS a través de su entorno en la nube, una alternativa que mitigaba de forma inmediata los problemas de infraestructura, estabilidad física y escalabilidad técnica observados en Moodle, permitiendo además un acceso directo para el estudiantado. 

A pesar de sus ventajas operativas, la plataforma fue descartada debido a las siguientes restricciones metodológicas: 

- **Escasez de Herramientas de IA Integradas:** La suite del proveedor presenta una oferta sumamente rígida y limitada de herramientas de IA que puedan interactuar directamente con el flujo del estudiante de forma interactiva y dinámica (en su versión _Free for Teachers_ ). 

- **Rigidez en la Personalización:** Los flujos internos (como las _Rutas de Dominio_ ) operan bajo árboles de decisión estáticos y lineales. Esto impide la recolección de métricas de interacción granulares en tiempo real y restringe la flexibilidad requerida para que un agente conversacional de IA asista al estudiante y adapte la ruta dinámicamente. 

#### 4.4.1.5 Conclusión del Diagnóstico y Justificación de la Solución Propia 

El análisis comparativo demostró que ninguna de las plataformas comerciales o de código abierto evaluadas cumple en su totalidad con los requerimientos técnicos y 

32 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

metodológicos de esta investigación. Mientras que Moodle exigía una carga operativa de infraestructura inviable para el entorno del proyecto, Canvas limitaba la libertad de integración de algoritmos inteligentes y la flexibilidad del diseño instruccional. 

Ante este escenario, se concluyó que depender de sistemas de terceros restringía el alcance científico de la propuesta. Por lo tanto, se determinó la necesidad de diseñar y desarrollar una solución web propia. Esta plataforma a la medida garantiza el control total sobre la arquitectura del software, permitiendo estructurar una interfaz flexible, un panel docente con criterios de evaluación parametrizables, analíticas de rendimiento específicas (KPIs) y la integración nativa de un asistente conversacional basado en IA en tiempo real, adaptándose con exactitud a las necesidades de la ruta de aprendizaje planteada. 

### 4.4.2 Fase de diseño 

La fase de diseño tiene como propósito formular la estructura curricular y los lineamientos académicos de la propuesta educativa definida previamente (Bahamón, 2019). En esta etapa, se planifican los elementos indispensables para cerrar la brecha académica detectada, definiendo para ello el modelo pedagógico y didáctico, así como los objetivos de aprendizaje. Bajo esta premisa, el objetivo original del proyecto, que aspiraba a que los estudiantes de Computación de la Universidad Central de Venezuela desarrollaran habilidades para analizar, diseñar e implementar algoritmos con ética y eficacia, ha sido adaptado y transformado en una competencia central: lograr que el estudiante no sólo apruebe la materia, sino que construya una base lógica sólida, la cual servirá como cimiento fundamental para su futura práctica profesional. 

El enfoque didáctico seleccionado es el constructivista, donde el aprendizaje se concibe como un proceso activo en el que el estudiante construye su propio conocimiento a partir de sus experiencias previas y su interacción con el entorno. En este modelo, el alumno es el protagonista principal del proceso formativo; la plataforma está diseñada para facilitarle la construcción significativa de saberes mediante la exploración autónoma de rutas de aprendizaje, el uso de técnicas de autoestudio, la revisión de materiales multimedia y la ejecución de actividades interactivas y de autoevaluación que le permiten reflexionar sobre su propio proceso. 

Según Biggs (1993b, 84 1996), para lograr una enseñanza de calidad donde se diseñen y se cumplan estrategias didácticas innovadoras se requiere que los docentes reflexionen sobre su práctica pedagógica, dando como prioridad al estudiante para que sea el centro de los procesos educativos teniendo en cuenta sus necesidades y facilitando su aprendizaje. Cuya 

33 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

finalidad será un profesor responsable de definir los objetivos de aprendizaje, seleccionar y crear recursos, planear las actividades académicas, alineadas a lograr los objetivos de aprendizaje y finalmente la evaluación que tendrá como propósito realizar una retroalimentación de todo el proceso implementado y verificar el cumplimiento de los objetivos formulados. 

##### **La elección de recursos y materiales para el diseño de las Rutas de Aprendizaje** 

Al momento de organizar o planificar la metodología de la acción didáctica, nos encontramos con el dilema de seleccionar aquellos recursos y materiales que necesitaremos para llevar a cabo las actividades de aprendizaje. Al diseñar Rutas de Aprendizaje, debemos tomar en cuenta las actividades que se llevarán a cabo en cada etapa y en función de éstas seleccionar el recurso o elaborar el material que contribuya a cumplir con la función que esta tiene. 

Algunos criterios que podrían orientar nuestra elección se presentan a continuación como una adaptación de lo que Díaz (2005), indica en su libro "Modalidades de enseñanza centradas en el desarrollo de competencias", haciendo referencia a las funciones de los recursos didácticos. 

- **Que cumplan una función motivadora:** este criterio hace referencia a que deben ser capaces de captar la atención de los alumnos mediante un poder de atracción caracterizado por las formas, colores, tacto, acciones, sensaciones y todo aquello que pueda ser captado por los sentidos, a manera de enviar un mensaje positivo al cerebro y que pueda ser recordado y reproducido más adelante. 

- **Que cumplan una función estructuradora:** Partiendo del hecho que las Rutas de Aprendizaje partirán de una estructura curricular, se hace necesario que los recursos o materiales se constituyan como medios entre la realidad y los conocimientos, hasta el punto de cumplir funciones de organización de los aprendizajes y de alternativa a la misma realidad. 

- **Que cumplan una función didáctica:** es de suma importancia que exista una congruencia entre los recursos materiales que se pueden utilizar y los elementos del currículo en los que se fundamenta el hecho educativo. De no existir esta congruencia, podría caerse en el error frecuente de que estos recursos o materiales sirvan de simple adorno. 

- **Que cumplan una función facilitadora:** Las Rutas de Aprendizaje, en su naturaleza metodológica buscan facilitar la tarea docente, al mismo tiempo que garantiza el 

34 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

aprendizaje significativo y el logro de los objetivos propuestos, es por eso que al elegir un recurso o diseñar un material, esta función no debe pasarse por alto. 

Al alinear los anteriores componentes se dará una enseñanza innovadora y de calidad. A continuación, se puede ejemplificar la forma como se aplica el enfoque didáctico seleccionado en la ejecución de las actividades del curso de Algoritmos y Programación bajo una lógica progresiva donde cada tema representa un nodo de conocimiento. 

|**Módulos/Contenidos**|**Descripción**|**Estrategia de**<br>**Aprendizaje**|**Evaluación**|
|---|---|---|---|
|Aritmética Básica|Operaciones<br>fundamentales y<br>jerarquía de<br>operadores.|Ejemplos básicos y<br>documentación para<br>el refrescamiento de<br>conceptos previos.|Quiz de resolución y<br>jerarquía de<br>operaciones.|
|Variables|Almacenamiento de<br>valores y<br>asignación de<br>memoria.|Se les comparte y<br>facilita información en<br>la plataforma, los<br>documentos que son<br>necesarios<br>relacionados con la<br>temática y que le<br>ayudarán a la<br>resolución de las<br>actividades<br>planteadas.|Juego de<br>emparejamiento<br>entre variable y tipo<br>de dato.|
|Tipos de Datos|Categorización de<br>información<br>(numérica, texto,<br>booleana).|Clasificación<br>esquemática a través<br>de documentos y<br>videos de soporte.|Quiz de<br>categorización de<br>datos en escenarios<br>reales.|
|Condicionales|Estructuras de<br>control para la toma<br>de decisiones<br>lógicas|Ejemplos y videos<br>explicativos para<br>reconocimiento con<br>casos de la vida real.|Juego de flujogramas<br>interactivos para<br>resolver decisiones.|
|Bucles|Estructuras para la<br>repetición<br>controlada de<br>procesos.|Automatización<br>mediante juegos de<br>lógica que requieren<br>ciclos.|Quiz de identificación<br>de condiciones de<br>parada.|
|Arreglos|Gestión de<br>colecciones de<br>datos bajo un<br>mismo índice.|Representación<br>visual mediante<br>documentos y vídeos<br>de ejecución.|Juego de<br>ordenamiento y<br>acceso a posiciones<br>de memoria.|



35 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

|Estructuras de Datos|Organización<br>eficiente de<br>conjuntos de<br>información.|Estructuración<br>cognitiva mediante<br>documentos<br>comparativos y<br>videos.|Quiz de selección de<br>estructura según el<br>problema.|
|---|---|---|---|
|Funciones|Modularización y<br>reutilización de<br>fragmentos de<br>código.|Análisis de<br>descomposición de<br>problemas complejos<br>mediante videos.|Juego de ensamblaje<br>de bloques<br>funcionales.|
|Programación<br>Orientada a Objetos|Abstracción basada<br>en objetos, clases y<br>atributos.|Modelado del mundo<br>real mediante<br>documentos y<br>ejemplos visuales.|Quiz de asociación<br>de clases y objetos.|



La plataforma contará con un panel administrativo para la gestión de contenidos y un panel de estudiante para la visualización de rutas. El sistema está diseñado para: 

- Flexibilidad: Permitir al estudiante elegir su punto de partida y ritmo de aprendizaje, garantizando que el acceso al contenido sea adaptado a sus necesidades específicas. 

- Evaluación Continua: Cada unidad finaliza con un control de nivel que no solo mide el conocimiento, sino que actúa como un sistema de refuerzo; si el estudiante no supera el nivel, la plataforma le sugiere recursos adicionales para repasar antes de un nuevo intento. 

- Monitoreo: El docente o administrador puede realizar un seguimiento detallado del progreso de los estudiantes, identificando en qué temas se presentan mayores dificultades para realizar ajustes en la estrategia didáctica. 

En este escenario de aprendizaje personalizado, el proceso comienza cuando el o la estudiante accede a la plataforma, se le da una breve inducción de cómo usar la plataforma y coloca su nombre para ingresar al tablero de contenidos y comenzar con su ruta de aprendizaje personalizada. Al ingresar al tablero puede seleccionar un tema y definir una dificultad inicial o presentar un examen de suficiencia si considera que tiene conocimientos en algunos temas, para así desbloquear los niveles que demuestre tener conocimiento. 

Al presentar el examen de suficiencia los resultados del estudiante son enviados para su revisión en la cual, dependiendo de las preguntas que haya respondido correctamente, le serán desbloqueados los niveles Intermedio y Avanzado según corresponda, adicionalmente, tendrá 

36 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

una respuesta de retroalimentación instantánea y personalizada basada en sus conocimientos, generada por un modelo de IA. 

Basándose en su elección en el tablero de dificultades, se le presentarán los materiales correspondientes a ese nivel (Principiante, Intermedio o Avanzado). 

Posteriormente de acceder a los recursos, el o la estudiante debe responder un cuestionario que verifica su comprensión de los conceptos abordados. El flujo de la plataforma condiciona la progresión mediante umbrales específicos de calificación por nivel: si el usuario obtiene una calificación superior a 15 en el nivel principiante, superior a 18 en el intermedio, o igual a 20 en el avanzado, se valida la superación del nivel. Si no se alcanza la calificación requerida, el sistema redirige al estudiante al inicio del ciclo para reforzar los contenidos o reintentar la evaluación. 

A continuación, se presenta un diagrama que ilustra el flujo de aprendizaje adaptativo y secuencial, donde el o la estudiante toma un rol activo. Este modelo garantiza una progresión condicionada y permite que acceda a una variedad de recursos que se ajustan dinámicamente a su nivel de conocimientos. 

37 



<!-- Start of picture text -->
Tablero<br>de Temas<br>Escoge un Tema<br>Tablero de<br>Dificultades<br>Escoge<br>una dificultad<br>éNivel Nivel<br>Principiante Intermedia<br>Aprobado? Aprobado?<br>si| |.<br>Tablero de Tablero de Tablere de<br>Contenido —- Contenido —- Contenido —-<br>Principiante Intermedia Avanzada<br>Sei Seeley Responder Responder<br>Cuestionaria = = = -<br>Cuestionaria Cuestionario<br>Principiantes — - Intermedio - Avanzada<br>Calificacian Calificacion : ee_<br>> 15 > 18<br>Si |<br>Si No<br>Nivel - Nivel<br>Aprobada = Reprobado<br>Se<br><!-- End of picture text -->

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

Al integrar estos componentes técnicos y pedagógicos, la plataforma no solo cumple con la función de enseñar los contenidos de Algoritmos y Programación, sino que promueve una enseñanza innovadora donde la tecnología sirve como mediador directo para la construcción del conocimiento. Con la definición de esta estructura y el enfoque de las rutas personalizadas, se concluye la fase de diseño para dar paso a la fase de desarrollo de la aplicación. 

### 4.4.3 Fase de desarrollo 

Una vez finalizada la etapa de diseño, se dio inicio a la fase de desarrollo, cuyo propósito es la materialización técnica y pedagógica de la estructura curricular propuesta. En esta fase, se transformaron los lineamientos conceptuales en una plataforma funcional, orientada a la autogestión del conocimiento y la personalización de las rutas de aprendizaje para los estudiantes de Algoritmos y Programación. 

El núcleo de la plataforma se basa en la segmentación de la materia en unidades temáticas que permiten una progresión lógica y flexible. Cada tema fue desarrollado considerando los saberes asociados definidos anteriormente: 

- Propedéutico de Aritmética: Repaso de operaciones, fracciones y potencias; un módulo opcional de nivelación para reforzar las bases matemáticas. 

- Variables y Tipos de Datos: Introducción a la declaración, asignación y ámbito de variables, junto con el manejo de números, cadenas y booleanos. 

- Condicionales y Bucles: Estructuras para la toma de decisiones (if, else, switch) y la repetición de instrucciones (for, while, do-while). 

- Arreglos y Estructuras de Datos: Manejo de colecciones ordenadas y organizaciones complejas como pilas, colas y listas enlazadas. 

- Funciones: Creación de bloques de código reutilizables mediante parámetros y valores de retorno. 

- Programación Orientada a Objetos: Introducción a conceptos avanzados como clases, objetos, herencia, encapsulamiento y polimorfismo. 

Cada uno de estos temas se presenta en la plataforma bajo un modelo de aprendizaje versátil, integrando: 

- Recursos Audiovisuales: Explicaciones sintéticas de conceptos clave para facilitar la comprensión inicial. 

39 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

- Documentación Técnica: Guías conceptuales, bibliografía de referencia y mejores prácticas de codificación. 

- Gamificación y Retos: Actividades interactivas que motivan al estudiante y refuerzan el aprendizaje mediante la práctica. 

A diferencia de la dependencia de plataformas institucionales externas, se optó por el desarrollo de una solución a medida (Web y Móvil) para superar las limitaciones de flexibilidad de herramientas como Canvas LMS o Google Classroom. La arquitectura de la plataforma se compone de: 

- Panel Administrativo: Permite la gestión centralizada de los temas, la carga de recursos digitales (videos, documentos, juegos) y la configuración de los quizzes de evaluación. 

- Panel del Estudiante: Entorno intuitivo donde el alumno visualiza su propia ruta de aprendizaje, selecciona los temas de interés y accede a los contenidos de refuerzo. 

La implementación de este entorno virtual promueve una serie de beneficios alineados con las tendencias modernas de educación tecnológica: 

- Autonomía y Ritmo Propio: El estudiante abandona el rol pasivo y se convierte en protagonista de su proceso, decidiendo cuándo y cómo abordar los temas de la materia de acuerdo con su progreso personal. 

- Flexibilidad y Acceso: La eliminación de las barreras físicas y temporales permite que el estudiante acceda a su ruta de aprendizaje desde cualquier lugar, favoreciendo la autodisciplina. 

- Retroalimentación Inmediata: Gracias a la automatización de los quizzes, el estudiante conoce al instante su nivel de dominio, permitiendo una autorregulación efectiva de su estudio. 

- Enfoque Práctico: El uso constante de herramientas de programación y entornos de desarrollo dentro de la plataforma permite que el aprendizaje sea inmersivo y directamente aplicable a su formación profesional. 

La materialización de las rutas de aprendizaje personalizadas requiere de una arquitectura tecnológica capaz de responder con agilidad a las necesidades detectadas en el estudiantado, superando las limitaciones de flexibilidad y configuración impuestas por los sistemas de gestión del aprendizaje (LMS) convencionales. Ante este requerimiento, el 

40 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

presente apartado describe el proceso de diseño y desarrollo de una plataforma propia, concebida específicamente para el despliegue de trayectorias formativas adaptativas. 

#### 4.4.3.1 Arquitectura de software 

#### 4.4.3.1.1 Visión general 

La aplicación es una SPA de React (servida como estáticos por Vercel) que: 

- Renderizar páginas y componentes con React Router. 

- Guarda el progreso del estudiante en localStorage del navegador. 

- Lee y escribe cuestionarios, contenidos, resultados y métricas en Supabase (Postgres + RLS), con un respaldo local en JSON cuando Supabase no está configurado/disponible. 

- Embebe un chatbot de IA como servicio externo (Zapier). 

El principio transversal de todo el sistema es este: la capa de servicios es el único punto que habla con la persistencia. Ninguna página o componente llama a Supabase directamente; siempre pasa por un servicio, que decide de dónde vienen los datos. 

#### 4.4.3.1.2 Descripción general 

La plataforma está construida como una aplicación web de página única (Single Page Application, SPA), un estilo arquitectónico en el que toda la interfaz se ejecuta en el navegador del usuario y se comunica con los servicios externos únicamente para intercambiar datos, sin recargar la página completa en cada interacción. Esta decisión favorece una experiencia de navegación fluida, adecuada para un entorno educativo donde el estudiante avanza constantemente entre temas, niveles de dificultad, contenidos y cuestionarios. 

El sistema sigue una arquitectura por capas, en la que cada capa tiene una responsabilidad claramente delimitada y se comunica únicamente con las capas adyacentes. Esta organización favorece la mantenibilidad, facilita las pruebas y permite sustituir o modificar una capa sin afectar al resto del sistema. De abajo hacia arriba, las capas son: persistencia de datos, acceso a datos (servicios), lógica de dominio y estado, y presentación (interfaz de usuario). 

Además, la arquitectura incorpora un servicio externo de inteligencia artificial (el asistente conversacional "Algorimi") como apoyo pedagógico complementario, desacoplado del resto del sistema. 

41 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

#### 4.4.3.1.3 Capas de la arquitectura 

#### 4.4.3.1.4 Capa de presentación 

Es la capa con la que interactúa directamente el estudiante. Está compuesta por las distintas pantallas de la plataforma (bienvenida, cartelera de temas, contenidos, cuestionarios, retroalimentación de resultados y panel administrativo) y por los elementos de interfaz que se reutilizan entre ellas (tarjetas de tema, selector de dificultad, formulario de preguntas, indicadores de progreso, entre otros). 

Esta capa es responsable de mostrar la información al usuario y de capturar sus acciones (selección de un tema, respuesta a una pregunta, envío de un cuestionario), pero no contiene lógica de negocio ni accede directamente a la base de datos. Su función es delegar esas responsabilidades a las capas inferiores. 

#### 4.4.3.1.5 Capa de estado y lógica de dominio 

Esta capa concentra la información que debe estar disponible en toda la aplicación — como el progreso del estudiante, los niveles desbloqueados por tema y su nombre— así como las reglas del negocio educativo: cómo se califica un cuestionario, cuándo se considera aprobado un nivel, y cuándo un tema debe tratarse de forma especial (como el tema introductorio de aritmética, cuyos tres niveles están disponibles desde el inicio y no exige una calificación mínima, al tratarse de contenido de refuerzo y no de progresión). 

Al mantener esta lógica separada de la interfaz, las reglas de evaluación y desbloqueo de contenidos pueden modificarse sin necesidad de alterar las pantallas que las utilizan. 

#### 4.4.3.1.6 Capa de acceso a datos (servicios) 

Esta capa actúa como intermediaria entre la lógica de la aplicación y el origen real de los datos. Su particularidad es que abstrae el origen de la información: si el servicio de base de datos en la nube está disponible y configurado, los datos se obtienen desde allí; si no lo está, la aplicación recurre automáticamente a un conjunto de datos locales integrados en el propio código. 

Este diseño cumple dos propósitos. Primero, garantiza que la plataforma pueda ejecutarse y demostrarse aún sin conexión a un backend configurado, lo cual resulta valioso en un contexto académico. Segundo, aísla al resto de la aplicación de los detalles 

42 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

técnicos de la base de datos: si en el futuro se cambiara el proveedor del backend, 

únicamente esta capa tendría que modificarse. 

#### 4.4.3.1.7 Capa de persistencia 

La persistencia de la información se distribuye en dos ubicaciones según su naturaleza: 

- Base de datos en la nube (Supabase, sobre PostgreSQL): almacena la información que debe estar disponible de forma centralizada y ser consultada por el administrador o docente, como los cuestionarios, los contenidos educativos, los resultados de las evaluaciones y las métricas de uso de cada estudiante. 

- Almacenamiento local del navegador: guarda el progreso individual de cada estudiante (niveles desbloqueados, última ubicación visitada, nombre ingresado). Al no existir un sistema de autenticación de usuarios, este progreso se asocia al dispositivo y navegador utilizado, y no requiere sincronización con un servidor. 

#### 4.4.3.1.8 Servicio externo de apoyo pedagógico 

De forma independiente a las capas anteriores, la plataforma integra un asistente conversacional impulsado por inteligencia artificial, disponible en un panel lateral accesible desde cualquier pantalla. Este componente se comunica directamente con un proveedor externo especializado en chatbots, sin intervención de la capa de servicios ni de la base de datos propia del sistema, dado que su función es exclusivamente conversacional y de apoyo al aprendizaje, no de gestión de datos académicos. 

#### 4.4.3.2. Comunicación entre componentes 

La comunicación entre las capas sigue un flujo unidireccional y predecible: 

1. La interfaz de usuario captura una acción del estudiante (por ejemplo, responder un cuestionario o abrir un contenido). 

2. Esa acción se traduce en una solicitud hacia la capa de estado (si se trata de información que debe recordarse durante la sesión, como el progreso) o hacia la capa de servicios (si se trata de información que debe leerse o guardarse de forma persistente). 

43 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

3. La capa de servicios decide, de forma transparente para el resto del sistema, si la operación se realiza contra la base de datos en la nube o contra los datos locales de respaldo. 

4. El resultado de la operación regresa a la interfaz, que actualiza lo que el estudiante visualiza. 

Este patrón evita que las pantallas conozcan detalles de implementación de la base de datos y concentra en un único punto las decisiones sobre el origen de los datos, lo que simplifica el mantenimiento y reduce el acoplamiento entre componentes. 

#### 4.4.3.3 Flujos principales del sistema 

Ingreso a la plataforma. El estudiante ingresa a la plataforma y visualiza una pantalla explicativa de cómo navegar en la plataforma; ingresa su nombre y es enviado a la pantalla de temas donde puede escoger el tema de su interés. 

44 



<!-- Start of picture text -->
empiezas desde cero, aprenderds paso a paso; y si ya tienes<br>conocimientos previos, podras reforzar lo que sabes y avanzar justo en<br>las reas que sientas que te hacen falta<br>= zComo navegar?<br>Tienes total libertad para elegir los temas en el orden que prefieras. Cada<br>tema tiene tres niveles —principiante, intermedio y avanzado— con<br>esabes? contenidos para estudiar y un cuestionario para poner a prueba lo<br>aprendido.<br>éPrefieres no decidir? Sigue el flujo recomendado para principiantes<br>sin experiencia previa:<br>. 1) Variables 2) Tipos de datos 3) Condicionales 4 Bucles<br>5) Arreglos 6) Estructuras de datos 7) Funciones<br>for (tema : ruta) { 8) Programacién orientada a objetos<br>if (!dominas(tema))<br>.. hen bcd iNecesitasPropedéuticorepasarde aritmética.las matematicas basicas primero? Empieza por el tema 0,<br>Algoritmos y Programacion . ..<br>En cualquier momento puedes apoyarte en Algorimi, nuestro<br>> chatbot de IA, disponible en el panel lateral derecho para<br>resolver tus dudas.<br>2C6émo te llamas?<br>aremos tu nombre para guardar tu p t alta<br><!-- End of picture text -->



<!-- Start of picture text -->
Elige un tema para comenzar a aprender programacién.<br>Hola, heyzel -<br>Continuar donde lo dejaste<br>Propedéutico de aritmética - Principiante<br>Propedéutico de aritmética Variables Tipos de datos<br>Repaso de aritmética de educaci6n Declaraci6n, asignacién y ambito de Numeros, cadenas, booleanos y otros<br>primaria y secundaria: operaciones, variables en programaci6n. tipos primitivos y compuestos.<br>fracciones, potencias y més. Tema 0<br>opcional para reforzar las bases antes<br>de programar.<br>Condicionales Bucles Arreglos<br>Toma de decisiones con if, else y Repetici6n de instrucciones con for. Colecciones ordenadas de datos y sus<br>switch. while y do-while. operaciones basicas.<br>Estructuras de datos Funciones Programacion orientada a<br>Pilas, colas, listas enlazadas y otras Bloques de cdigo reutilizables, objetos<br>formas de organizar datos. pardmetros y valores de retorno. Clases, objetos, herencia,<br>encapsulamiento y polimorfismo. 4<br><!-- End of picture text -->



<!-- Start of picture text -->
Quiz - Variables - Principiante 6 Inicio<br>Responde todas las preguntas y envia el formulario para ver tu resultado.<br>1. En C++, una variable declarada con const debe inicializarse en el momento de<br>su declaraci6n.<br>@ Verdadero<br>@ Falso<br>2. En C++ es posible cambiar el tipo de una variable después de haberla<br>declarado.<br>@ Verdadero<br>@ Falso<br>3. El operador = se utiliza para asignar un valor a una variable en C++.<br>@ Verdadero<br>@ Falso<br>4. gCual es la forma correcta de declarar una variable entera en C++?<br>@ int edad = 25; @<br><!-- End of picture text -->



<!-- Start of picture text -->
Inicio<br>Declaracién, asignaci6n y 4mbito de variables en programaci6n.<br>Elige un nivel de dificultad<br>Principiante Intermedio Avanzado<br><!-- End of picture text -->



<!-- Start of picture text -->
Variables: - Principiante: ee oicio7<br>Revisa los siguientes contenidos y luego responde el quiz para avanzar de nivel<br>Si consideras que ya tienes los conocimientos para responder el quiz, te invitamos a hacerlo y avanzar<br>directamente al siguiente nivel<br>m Lectura<br>Variables en C++<br>Introduccién al concepto de variable en programacién<br>& Video<br>Programacién en C++ ff variables y tipos de datos con C++<br>Sintaxis basica con var, let y const.<br>i infografia<br>Variables en C++<br>Buenas prdcticas para nombrar variables.<br>@ Lectura<br>Operadores aritméticos en C++<br>Operaciones Basicas, Division Entera, Operadores de Asignacién y Compuestos, Operadores de Comparacién,<br>Operadores Légicos, Operadores Bit a Bity El Operador Ternario Condicional<br>Responder quiz ><br><!-- End of picture text -->



<!-- Start of picture text -->
Inicio<br>Acceso administrador<br>Ingresar<br><!-- End of picture text -->



<!-- Start of picture text -->
alnicio<br><!-- End of picture text -->

|Panel administrador|qunesii|
|---|---|
|Cuestionarios<br>Contenidos<br>Resultados<br>Estudiantes<br>Tema<br>Dificultad|Estado|
|Propedéutico de aritmética<br>Principiante|Sin crear (usa JSON local)|
|Propedéutico de aritmética<br>Intermedio<br>Propedéutico de aritmética<br>Avanzado|Sin crear (usa JSON local)<br>Sin crear (usa JSON local)|
|Variables<br>Principiante<br>Variables<br>Intermedio<br>Variables<br>Avanzado<br>  <br>|8preguntas<br>10preguntas<br>10 preguntas<br>|
|Tiposdedatos<br>Principiante<br>Tipos de datos<br>Intermedio<br>Tipos de datos<br>Avanzado<br>Condicionales<br>Principiante<br>Condicionales<br>Intermedio<br>Condicionales<br>Avanzado|8preguntas<br>10 preguntas<br>10 preguntas<br>8preguntas<br>10 preguntas<br>10preguntas|





<!-- Start of picture text -->
0 Inicio<br><!-- End of picture text -->

Panel administrador Cerrar sesién Cuestionarios Contenidos Resultados Estudiantes Nombre Tema Dificultad Nota Aprobado Fecha Federico variables Principiante 10/20 No 10/7/2026, 8:25:53 Federico tipos-datos Principiante 15/20 No 10/7/2026, 8:24:54 Pepito bucles Principiante 20/20 Sf 9/7/2026, 23:55:10 Valentina arreglos Principiante 20/20 Si 9/7/2026, 23:45:22 Heyzel tipos-datos Intermedio 8/20 No 8/7/2026, 0:48:54 



<!-- Start of picture text -->
4 Inicio<br>Variables. - Principiante. oe<br>Umbral de aprobaci6n (nota minima<br>sobre 20)<br>15<br>Preguntas (8)<br>Verdadero/Falso Enmomento C++, unade variablesu declaraci6n. declarada. con const debe inicializarse en el<br>Verdadero/Falso En C++ es posible cambiar el tipo de una variable después de haberla<br>declarado.<br>Verdadero/Falso El operador= se utiliza para asignar un valor a una variable en C++.<br>Seleccién simple 4 Cual es la forma correcta de declarar una variable entera en C++?<br>Seleccién simple {Qué palabra clave se usa para declarar una constante en C++?<br>Seleccién simple Cual es un identificador de variable valido en C++?<br>Seleccién multiple gCudles de las siguientes son declaraciones validas de variables en C++?<br><!-- End of picture text -->



<!-- Start of picture text -->
Selecci6n miltiple zCudles son reglas validas para nombrar variables en C++? 6 Inicio<br>Agregar nueva pregunta<br>Tipo de pregunta<br>Respuesta numérica<br>Enunciado<br>Fragmento de cédigo (opcional)<br>Respuesta correcta<br>(0)<br>Tolerancia (margen de error aceptado)<br>(¢)<br>Guardar cuestionario<br><!-- End of picture text -->



<!-- Start of picture text -->
Inicio<br>Variables - Principiante<br>Contenidos (2)<br>Titulo Descripcién Enlace<br>Variables en C++ Buenas prdcticas para nomb https://www-geeksforgeeks-o<br>Tipo<br>@ infografia<br>Titulo Descripcién Enlace<br>Operadores aritméticos en C Operaciones Basicas, Divisi¢ https://oregoom.com/cpp/ope<br>Tipo<br>fm Lectura<br>+ Agregar contenido Guardar contenidos<br><!-- End of picture text -->



<!-- Start of picture text -->
a Inicio<br><!-- End of picture text -->

Resultado del examen de suficiencia cindy, obtuviste 10/20 (12 de 24 correctas). 

Retroalimentacion 

Hola. Este examen de diagnéstico te permite conocer tu punto de partida actual para trazar una ruta de estudio efectiva en C++. 1. Temas a reforzar: Tipos de datos y Bucles. Es conveniente que comiences tu preparaci6n por aquf porque constituyen la base fundamental sobre la que se apoya la ldgica de cualquier programa. Un manejo preciso de los tipos de datos evita errores de almacenamiento, mientras que dominar las estructuras repetitivas te permitira procesar informaci6n de forma eficiente. 2. Temas con buen conocimiento: Variables, Condicionales, Arreglos y Funciones. Demuestras un manejo claro de los conceptos basicos en cada uno de estos bloques. Te animoa resolver problemas de nivel intermedio y avanzado para profundizar en el alcance de variables, la optimizaci6n de condiciones y el uso de funciones complejas. 3. Temas dominados: Estructuras de datos y Programaci6n orientada a objetos. Te felicito por haber superado con éxito todos los niveles de dificultad en estas areas avanzadas. Te invito a repasar estos contenidos de forma periddica para no perder la destreza adquirida mientras fortaleces tus bases. Recuerda que puedes consultar al tutor virtual Algorimi en el panel derecho de la pantalla. 

Nivel demostrado por tema Ya habias presentado el examen antes, as/ que esta vez no se desbloquearon niveles nuevos. Esto es solo un resumen de tu nivel actual en cada tema. © Variables: hasta Intermedio; 



<!-- Start of picture text -->
@<br><!-- End of picture text -->



<!-- Start of picture text -->
emtras que jar tas 5 ‘as repeutivas te pe proces. aclon Ge enicle<br>2. Temas con buen conocimiento: Variables, Condicionales, Arreglos y Funciones. Demuestras un alnicio<br>manejo claro de los conceptos basicos en cada uno de estos bloques. Te animo a resolver problemas<br>de nivel intermedio y avanzado para profundizar en el alcance de variables, la optimizaci6n de<br>condiciones y el uso de funciones complejas. 3. Temas dominados: Estructuras de datos y Programacién<br>orientada a objetos. Te felicito por haber superado con éxito todos los niveles de dificultad en estas<br>areas avanzadas. Te invito a repasar estos contenidos de forma periédica para no perder la destreza<br>adquirida mientras fortaleces tus bases. Recuerda que puedes consultar al tutor virtual Algorimi en el<br>panel derecho de la pantalla.<br>Nivel demostrado por tema<br>Ya habfas presentado el examen antes, asf que esta vez no se desbloquearon niveles nuevos. Esto es solo un<br>resumen de tu nivel actual en cada tema.<br>¢ Variables: hasta Intermedio<br>© Tipos de datos: hasta Intermedio<br>* Condicionales: hasta Intermedio<br>* Bucles: hasta Principiante<br>© Arreglos: hasta Intermedio<br>¢ Estructuras de datos: hasta Avanzado<br>© Funciones: hasta Avanzado<br>© Programaci6n orientada a objetos: hasta Avanzado<br>+= Volver a la cartelera<br><!-- End of picture text -->

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

Algoritmos y Programación. En este sentido, se utiliza la plataforma que desarrollamos y donde se realiza el montaje de la ruta de aprendizaje personalizada, integrando los recursos didácticos, los entornos de desarrollo y las evidencias de desempeño. 

A continuación, se presenta la descripción detallada de la primera unidad, explicando los momentos puestos en práctica durante la ejecución de las actividades de aprendizaje: 

En la primera sesión de inducción, se realizó un encuentro síncrono con los estudiantes para exponer el plan del curso y explicar la metodología de rutas de aprendizaje personalizado. En este espacio, se presentó el enfoque orientado a la lógica de programación y se detalló cómo el sistema de rutas permite atender los diferentes niveles de habilidades en pensamiento lógico de cada estudiante. Durante esta sesión, se resolvieron dudas sobre los entornos de desarrollo a utilizar, así como los criterios de evaluación de los algoritmos y la estructura general del curso. 

La segunda sesión se desarrolló de manera asíncrona, centrada en el monitoreo y la revisión del progreso individual de los estudiantes en sus respectivas rutas. En esta etapa, el propósito principal fue verificar que cada estudiante estuviera avanzando correctamente en el diseño y estructuración de algoritmos básicos, asegurando la comprensión de los conceptos fundamentales. 

A continuación se detalla el proceso de implementación de la plataforma y configuración de la ruta de aprendizaje personalizada. 

El código fuente de la plataforma se gestionó mediante el sistema de control de versiones Git, con el repositorio alojado en Github. Este enfoque permitió mantener un historial trazable de los cambios realizados durante el desarrollo. El proyecto se estructuró de forma que fuera directamente compatible con un entorno de hospedaje estático moderno: se definieron los scripts de construcción (npm run build, basado en Vite) y se incluyó un archivo de configuración específico para el proveedor de hospedaje (vercel.json). El proceso de despliegue de la plataforma se realizó a través de Vercel y fue el siguiente: 

1. Conexión del repositorio: se vinculó la cuenta de Vercel con el repositorio de Github que contiene el proyecto, autorizando el acceso de lectura necesario para que la plataforma pudiera clonar el código de cada despliegue. 

2. Configuración de variables de entorno: dado que el código fuente no incluye credenciales por razones de seguridad, fue necesario declarar las variables 

53 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

definidas localmente en el panel de variables de entorno de Vercel, la URL y la clave anónima del proyecto de Supabase, la contraseña de acceso al panel administrativo, el identificador del chatbot de Zapier y la clave de la API de Google Gemini. 

3. Primer despliegue y verificación: Una vez configuradas las variables de entorno, se ejecutó el primer despliegue. Vercel generó una URL pública de producción y una serie de URLs de vista previa asociada a cada rama y commit, lo que permitió validar cambios antes de promoverlos a producción. 

4. Despliegue continuo: A partir de ese momento, cada git push a la rama principal del repositorio dispara automáticamente un nuevo build y despliegue en Vercel, sin intervención manual adicional. Esto permitió que las actualizaciones de código, correcciones, nuevas funcionalidades o ajustes de interfaz quedaran reflejadas en producción en cuestión de minutos tras cada integración. 

El despliegue del código en Vercel resuelve únicamente la disponibilidad de la aplicación; la información pedagógica (contenidos educativos, cuestionarios y sus preguntas) reside en una base de datos independiente, gestionada mediante Supabase sobre PostgreSQL. Por ello, tras el primer despliegue fue necesario completar una etapa adicional de configuración de datos: 

1. Creación del esquema de base de datos: desde el editor SQL del panel de Supabase se ejecutó el script que crea las tablas: cuestionarios, contenidos y resultados. 

2. Carga inicial de datos: se ejecutaron scripts de llenado de tablas (npm run seed:cuestionarios, npm run seed:contenidos), que toman los cuestionarios y contenidos definidos originalmente como datos locales en el código y los insertan en las tablas correspondientes de Supabase. 

3. Gestión posterior mediante el panel administrativo: Una vez poblada la base de datos, la edición de contenidos y cuestionarios ya no requiere modificar el código ni volver a desplegar la aplicación: se realiza a través del panel de administrador en la ruta “/admin”, protegido por la contraseña definida en las variables de entorno. Desde este panel, se crean, editan o eliminan contenidos y cuestionarios por tema y dificultad según las necesidades de la ruta de aprendizaje personalizada, así como también consultar los resultados de los estudiantes y sus métricas de uso (número de intentos, calificación, promedio, mejor calificación y 

54 

Capítulo IV. Desarrollo del Trabajo Especial de Grado 

contenidos consultados). Esta separación entre el código desplegado y los datos gestionables permite que la actualización pedagógica de la plataforma sea independiente de su ciclo de despliegue técnico. 

De este modo la fase de implementación comprendió dos procesos principales complementarios pero independientes: por un lado, el despliegue continuo del código a través de Vercel, orientado a la disponibilidad y evolución técnica de la aplicación; por otro lado, la configuración y mantenimiento del contenido educativo a través del panel administrativo. 

### 4.4.5 Fase de evaluación 

La fase de evaluación se ha estructurado para valorar el cumplimiento de los objetivos de aprendizaje desde un enfoque constructivista, donde el estudiante es el protagonista de su propio desarrollo y la plataforma actúa como un entorno mediado por tecnología que facilita la construcción de conocimiento significativo. Para ello, se revisó la alineación entre los objetivos planteados en la fase de análisis identificar conocimientos previos, evaluar el uso de herramientas digitales y desarrollar recursos educativos que fomenten el pensamiento lógico con el diseño de las rutas de aprendizaje personalizadas. Bajo el modelo ADDIE, esta evaluación se ejecutó de forma continua, integrando una valoración inicial, procesual y final que permitió ajustar las estrategias didácticas según las necesidades evidenciadas en los estudiantes de Algoritmos y Programación. 

55 

Capítulo V. Reflexiones 

Capítulo V. Reflexiones y Recomendaciones del Trabajo Especial de Grado 

56 

Referencias Bibliográficas 

# Referencias Bibliográficas 

- Albor Chadid, L. I. & Rodríguez Burgos, K. (2022). Estudios aplicados de la teoría de la autodeterminación en estudiantes y profesores, y sus implicaciones en la motivación, el bienestar psicosocial y subjetivo. Revista Eleuthera, 24(1), 56-85. http://doi.org/10.17151/eleu.2022.24.1.4 

- Anderson, L. W., Krathwohl, D. R., Airasian, (et al.) (2001). A taxonomy for learning, teaching, and assessing: A revision of Bloom’s taxonomy of educational objectives (Abridged Edition). Longman. https://eclass.uoa.gr/modules/document/file.php/PPP242/Lorin%20W. %20Anderson%2C%20David%20R.%20Krathwohl%20%20A%20taxonomy%20for%20learning%20teaching%20and%20assessing_%20a%20re vision%20of%20Bloom%60s%20taxonomy%20of%20educational%20objetivesLongman%20%282001%29.pdf 

AWS. (2026). _¿Qué es una base de datos SQL?_ . Amazon Web Services. https://aws.amazon.com/es/what-is/sql-database/ <mark>(base de datos)</mark> 

- Bajracharya, J. R. (2019). Instructional design and models: Assure and kemp. Journal of Education and Research, 9(2), 1-8. https://doi.org/10.3126/jer.v9i2.30459 

- Barros Reyes, Y. P. (2008). Perfil profesional y pedagógico del docente del área de tecnología e informática de las escuelas oficiales de la unidad administrativa nº 3 de santa marta [Tesis de pregrado, Universidad del Magdalena]. Slideshare. https://es.slideshare.net/slideshow/perfil-profesional-y-pedaggico-del-docente-del-rea-detecnologa-e-informtica-de-las-esceoficiales-de-la-unidad-administrativa-n-3-de-santamarta/5218734 

- Bloom, B. S. (1956). Taxonomy of educational objetives. David McKay Company, Inc. https://ia800508.us.archive.org/24/items/bloometaltaxonomyofeducationalobjectives/ Bloom%20et%20al%20-Taxonomy%20of%20Educational%20Objectives.pdf 

- Borja Paredes, M. J., & Velasco Currillo, E. A. (2025). La Pedagogía Tradicional en Latinoamérica: Impacto y Desafíos en la Educación Actual. Ciencia y Reflexión, 4(1), 20172029. https://doi.org/10.70747/cr.v4i1.153 

- Cabrera, M. A. (2022). La inteligencia artificial: Un complemento en la educación. Revista Neuronum, 8(4), 133–135. 

https://eduneuro.com/revista/index.php/revistaneuronum/article/view/481/544 

- Cárdenas, R. A. (2024). Análisis de los sistemas de aprendizaje personalizado impulsado por inteligencia artificial y su implementación en contextos educativos. Ciudad de México, México: Ciencia Latina Internacional. 

https://ciencialatina.org/index.php/cienciala/article/view/14358/20543 

57 

Referencias Bibliográficas 

- Carroll, D. J. (2015). Bloom’s taxonomy of cognitive learning objectives. Advances in Physiology Education, 39(4), 436. https://doi.org/10.1152/advan.00138.2015 

- Castillo Herrera, M. E. (2024). Impacto del aprendizaje personalizado en el rendimiento académico de los alumnos de Bachillerato: Un estudio desde los Entornos Virtuales de Aprendizaje [Universidad Católica Andrés Bello]. https://api-saber.ucab.edu.ve/server/api/core/bitstreams/7572400d-4735-483d-943543776a44bf1b/content 

- Cevallos, A., Latorre, L., Alicandro, G., Wanner, Z., Cerrato, I., Zarate, J. D., Alvarez, J., Villacreses, K., Pfeifer, M., Gutierrez, M., Villanueva, V., Rivera-Fournier, A., Riobó, A., Pombo, C., Puerto, F., & Rodriguez Breuning, J. (2023). Tech report: Generative ai. InterAmerican Development Bank. https://doi.org/10.18235/0005105 

- Chacón, E. (6 de Agosto de 2024). Modelo ADDIE: La fórmula ideal para la creación de contenidos e-learning. Obtenido de iseazy: https://www.iseazy.com/es/blog/modelo-addie/ 

- Cisneros Vásquez, E., Nevárez Loza, R., Farez Cherrez, A., & Torres Montes, R. (2024). Uso de la inteligencia artificial en la personalización del aprendizaje. Conocimiento Global, 9(1), 75-83. https://doi.org/10.70165/cglobal.v9i1.339 

- Cubillos Vanegas, S. I. (2020). Aprendizaje basado en la resolución de problemas: Los cinco principios de la instrucción propuestos por MERRIL. http://hdl.handle.net/11396/6077 

Datadog. (2025). _Vercel — Documentación de integración_ . https://docs.datadoghq.com/es/integrations/vercel/ <mark>(vercel)</mark> 

- De Benito, B., Moreno García, J., & Villatoro Moral, S. (2020). Entornos tecnológicos en el codiseño de itinerarios personalizados de aprendizaje en la enseñanza superior. Edutec. Revista Electrónica de Tecnología Educativa, 74, 73-93. https://doi.org/10.21556/edutec.2020.74.1843 

- De la Fuente Arias, J.,  (2004). Perspectivas recientes  en el estudio de la motivación:  la Teoría de la Orientación de Meta. Electronic Journal of Research in Educational Psychology, 2(1),35-61.[fecha de Consulta 2 de Octubre de 2025]. ISSN https://www.redalyc.org/articulo.oa?id=293152878003 

Educación con Innovación. (2024, 1 de agosto). La relevancia del estándar LTI en el eLearning y los LMS. https://educacionconinnovacion.com/2024/08/01/la-relevancia-del-estandar-ltien-el-elearning-y-los-lms 

Edutechnica. (2021). 9th Annual LMS Data Update. Edutechnica. https://edutechnica.com/2021/11/05/9th-annual-lms-data-update/ 

58 

Referencias Bibliográficas 

- Falcón, J. C., & Herrera C., R. (2005, marzo). Análisis del dato estadístico. https://www.studocu.com/latam/document/universidad-nacional-experimental-franciscode-miranda/biologia/analisis-del-dato-estadistico/25959751 

- Faraldo, P., & Pateiro, B. (2012). Estadística y metodología de la investigación. Universidad de Santiago de Compostela. http://eio.usc.es/eipc1/BASE/BASEMASTER/FORMULARIOSPHP-DPTO/MATERIALES/Mat_G2021103105_Presentación_Tema1.pdf 

- Gagné, R. M. (1975). Principios básicos del aprendizaje para la instrucción. Diana. https://books.google.co.ve/books/about/Principios_básicos_del_aprendizaje_para.html? id=3MsQAAAAYAAJ&redir_esc=y 

- García Pilimur, D. A. (2024). Desarrollo de rutas de aprendizaje personalizadas para el apoyo en el aprendizaje de programación en la Universidad de los Andes. https://hdl.handle.net/1992/75484 

- Garrido, A., Kujat, K., Onaindía, E., & Oscar, S. (2009). Planificación inteligente de rutas de aprendizaje personalizadas. JENUI. https://aenui.org/actas/pdf/JENUI_2009_018.pdf 

- Gary W. Houchens, T.-A. C. (2014). Personalized Learning: A Theoretical Review and Implications for Assessing kid-FRIENDLy Student Outcomes. Knoxville, Tennessee: Western Kentucky University. https://www.wku.edu/rocksolid/documents/personalized_learning_a_theoretical_review_a nd_implications_for_assessing_kidfriendly_student_outcomes_houchens_et_al_2014.pdf 

- George Reyes, C. E. (2020). Pruebas estandarizadas y calidad de la educación en México, sexenio 2012-2018. Revista Universidad y Sociedad, 12(4), 418-425 http://scielo.sld.cu/pdf/rus/v12n4/2218-3620-rus-12-04-418.pdf 

- Górriz, J. M., Ramírez, J., Ortíz, A., Martínez-murcia, F. J., et al.. (2020). Artificial intelligence within the interplay between natural and artificial computation: Advances in data science, trends and applications. Neurocomputing, 410, 237-270. https://doi.org/10.1016/j.neucom.2020.05.078 

- Guzmán Nariño, V. F. (2025). Impacto de los proyectos pedagógicos en la reducción de la violencia escolar y la mejora de la convivencia estudiantil: Un enfoque cuantitativo correlacional y causal. Revista Científica de Salud y Desarrollo Humano, 6(1), 1864-1881. https://doi.org/10.61368/r.s.d.h.v6i1.566 

- Heinich, R., Molenda, M., Russel, J. D., & Smaldino, S. E. (1999). Instructional media and technologies for learning (Seventh Edition). Merrill/Prentice Hall. https://www.scribd.com/document/596568620/0-Instructional-Media-and-Technologies-forLearning-7th-Edition-by-Robert-Heinich-Michael-Molenda-James-D-Russell-Sharon-ESmaldino-Z-lib-org 

59 

Referencias Bibliográficas 

Henao, L., & Herrera, V. (2023). Estrategias didácticas mediadas por tecnologías educativas adaptativas para un aprendizaje personalizado en educación básica y media. Barranquilla. https://repositorio.cuc.edu.co/server/api/core/bitstreams/26d811d9-8bbb-4514-8bc0d63a784b0d87/content 

Hernández, R. (2018). Metodología de la investigación: Las rutas cuantitativa, cualitativa y mixta. McGraw Hill. http://www.biblioteca.cij.gob.mx/Archivos/Materiales_de_consulta/Drogas_de_Abuso/ Articulos/SampieriLasRutas.pdf 

Hernández Sampieri, R., Fernandez Collado, C., & Baptista Lucio, P. (2014). Metodología de la Investigación (6a ed.). McGraw Hill Education. https://apiperiodico.jalisco.gob.mx/api/sites/periodicooficial.jalisco.gob.mx/files/ metodologia_de_la_investigacion_-_roberto_hernandez_sampieri.pdf 

Holguín, R. G., Navarrete, S., & Delgado, J. (2024). Integración de la Inteligencia Artificial en la Educación Universitaria: Avances, Desafíos y Perspectivas. Dominio de las Ciencias. 

Instructure. (2021, 14 de julio). ¿Cómo agrego requisitos a un módulo?. Canvas Community. https://community.canvaslms.com/t5/Guía-del-Instructor/Cómo-agrego-requisitos-a-unmódulo/ta-p/473001 

- Instructure. (2020, 10 de septiembre). What are MasteryPaths?. Canvas Community. https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Mastery-Paths/tap/404483 

IONOS Digital Guide. (2023). _¿Qué es Backend as a Service (BaaS)?_ . https://www.ionos.com/es-us/digitalguide/servidores/know-how/backend-as-a-servicebaas/ 

- Jardines Garza, F. J. (2011). Revisión de los principales modelos de diseño instruccional. Innovaciones de Negocios, 8(16), 357–389. http://eprints.uanl.mx/8115/1/j1_2.pdf 

Kinsta. (2025). _Qué es Node.js y por qué deberías usarlo_ . https://kinsta.com/es/blog/quees-node-js/ <mark>(nodejs)</mark> 

Kwid, G., Sarty, N., & Yang, D. (2024). A review of ai tools: Definitions, functions, and applications for k-12 education. AI, Computer Science and Robotics Technology, 3. https://doi.org/10.5772/acrt.20240048 

Levin, R. I., & Rubin, D. S. (1996). Estadística para administradores (6ª ed., A. H. Flores Samaniego, Trad.). Pearson Educación. https://profefily.com/wp-content/uploads/2017/12/Estadística-para-administración-yeconomia-Richard-I.-Levin.pdf 

60 

Referencias Bibliográficas 

López Ibáñez, K., & Cardenasso Carrasco, V. (2022). Enfoques pedagógicos y estrategias didácticas en educación de personas jóvenes y adultas. Revista Realidad Educativa, 2(2), 122-154. https://doi.org/10.38123/rre.v2i2.241 

- Lozada Núñez, D. I., Peralta Montiel, O. J., & Guzmán Barquet, E. A. (2023, Diciembre). Efectos de la experiencia de flujo durante el uso de plataformas educativas en línea. 8, 16. 10.23857/pc.v8i12.6414 

- Luna Rizo, M., Ayala Ramírez, S., & Rosas Chávez, P. (2021). El Diseño Instruccional. Elemento clave para la innovación en el aprendizaje: Modelos y Enfoques (Primera edición). Astra Ediciones S.A. 

https://mta.udg.mx/sites/default/files/adjuntos/el_diseno_instruccional_interactivo.pdf 

MDN Web Docs. (2025). _SPA (Single-page application) — Glossary_ . Mozilla. https://developer.mozilla.org/en-US/docs/Glossary/SPA <mark>(SPA)</mark> 

- Monge Vera, M. M., Villamagua Jiménez, G. M., Aroca Izurieta, C. E., Chico Guzmán, B. A., & López Velazco, J. E. (2024). Personalización del proceso de aprendizaje mediante inteligencia artificial. LATAM Revista Latinoamericana de Ciencias Sociales y Humanidades 5 (3), 772 – 785. https://doi.org/10.56712/latam.v5i3.2076 

- Montero, M. V., Zermeño, M. G. G., & Tijerina, R. F. Á. (2015). Evaluación de la plataforma virtual epic lms como sistema de gestión de aprendizaje según estándares de calidad tecnológica y usabilidad. REICE. Revista Iberoamericana sobre Calidad, Eficacia y Cambio en Educación, 13(2), 51-65. https://www.redalyc.org/articulo.oa?id=55138743003 

- Morillo, L., & Del Carmen, M. (2016). Aprendizaje Adaptativo. Obtenido de UVADOC: http://uvadoc.uva.es/handle/10324/21000 

Muñoz Reinoso, G. A. (s.f.). _Estudio del stack tecnológico para el desarrollo de un proyecto fin de carrera_ [Proyecto Fin de Carrera, Universidad Carlos III de Madrid]. e-Archivo UC3M. https://e-archivo.uc3m.es/bitstream/handle/10016/27780/PFC_GiancarloAlfredo_Munoz_ Reinoso.pdf <mark>(stack tecnologico)</mark> 

- Núñez, A. (2022). 6 razones por las que es importante crear rutas de aprendizaje personalizadas. Obtenido de Griky: https://conocimiento.griky.co/blog/rutas-aprendizaje-personalizadas? utm_source=chatgpt.com 

- PostgreSQL Global Development Group. (2026). _PostgreSQL: The world's most advanced open source database_ . Recuperado de https://www.postgresql.org <mark>(postgresql)</mark> 

- OIE-UNESCO. (2017). Herramientas de formación para el desarrollo curricular. Obtenido de UNESDOC Digital Library: https://unesdoc.unesco.org/ark:/48223/pf0000250057_spa 

61 

Referencias Bibliográficas 

Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura (UNESCO). (s.f.). Lo que hay que saber sobre la educación digital. https://www.unesco.org/es/digitaleducation/need-know 

- Rangel F., A. L. (2008). Nuevas habilidades en nuevos contextos: TIC y formación docente . Vol. XXVII, 58-77. http://www.ucv.ve/uploads/media/Psicologia_2008_2__Completa__se.pdf 

Revista Abierta de Informática Aplicada. (2022). _Computación en la Nube: Fundamentos, Críticas y Desafíos_ , 6(2), 3-30. https://raia.revistasuai.ar/index.php/raia/article/download/2/32/32 <mark>(la nube)</mark> 

Sabino, C. A. (1992). El proceso de investigación. Lumen-Humanitas. https://paginas.ufm.edu/sabino/ingles/book/proceso_investigacion.pdf 

Salinas, G. C.-V. (2024). Los Desafíos de la Inteligencia Artificial en la Educación en un Mundo Tecnologizado. European Public & Social Innovation Review,9, 1-15. https://doi.org/10.31637/epsir-2024-905 

- Serrano, J. M. & Pons, R. M. (2011). El constructivismo hoy: enfoques constructivistas en educación. Revista Electrónica de Investigación Educativa, 13(1). https://redie.uabc.mx/redie/article/view/268 

Tamayo y Tamayo, M. (2001). El proceso de la investigación científica (4. ed.). Limusa : Noriega Editores. https://es.scribd.com/document/97038812/Tamayo-y-Tamayo-Mario-ElProceso-de-La-Investigacion-Cientific 

Trejo, N. (2007). Students expectations of teachers: the case of students at a Mexican university English department. MEXTESOL Journal, 32/4, 57-64. https://www.uv.mx/apps/bdh/investigacion/unidad3/encuesta.html 

- UNESCO. (s.f.). La inteligencia artificial en la educación. <u>https://www.unesco.org/es/digital-</u> education/artificial-intelligence 

- Vasiliki. (2024, 1 de junio). How to design personalized learning pathways in education. Genius Learning Path. https://geniuslearningpath.com/how-to-design-personalized-learningpathways-in-education/ 

- Velasco, G., Fonseca, I., Sanclemente, P., Guerrero, M., & Basantes, J. (2023). La Educación Personalizada. Un Enfoque Efectivo Para el Aprendizaje. Ciencia Latina Internacional. 

Veliz Castro, C. M. (2022). Fundamentos del enfoque constructivista para la Atención Educativa de los niños y niñas de tres años [Pontificia Universidad Católica del Perú]. https://tesis.pucp.edu.pe/server/api/core/bitstreams/807a2bcc-c854-4c26-8bb9304c873bb23f/content 

62 

Referencias Bibliográficas 

Vite. (s.f.). _Introducción | Guía de Vite_ (documentación oficial en español). https://es.vite.dev/guide/ <mark>(vite)</mark> 

Welson Vda. De Calderón, M. M., Castañeda Castañeda, I. A., & Chuquinaira Sama, H. (2025). Retroalimentación en la evaluación formativa: Retos y Desafíos. Revista Científica UISRAEL, 12(2), 13-29. <u>https://doi.org/10.35290/rcui.v12n2.2025.1287</u> 

63 

