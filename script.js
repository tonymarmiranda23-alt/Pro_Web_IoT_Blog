'use strict';

/* ================================================================
   DATOS: DISPOSITIVOS Y CONSEJOS
================================================================ */
const DEVICE_DATA = {
  android: {
    name: 'Android',
    icon: 'fa-brands fa-android',
    color: '#3ddc84',
    desc: 'Smartphone Android',
    tips: [
      { type: 'risk', icon: 'fa-solid fa-key', badge: 'Riesgo común', text: 'Las contraseñas por defecto (PIN 0000 o 1234) son el vector de ataque más frecuente en dispositivos Android. Cámbialas al activar el equipo y usa un gestor de contraseñas.', ref: 'OWASP I1 — Weak/Guessable Passwords · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-lock', badge: 'Buena práctica', text: 'Activa el cifrado completo del almacenamiento interno (Ajustes → Seguridad → Cifrar dispositivo). Esto protege tus datos ante robo o pérdida del terminal.', ref: 'OWASP I7 — Insufficient Data Protection · CIA: Confidencialidad' },
      { type: 'risk', icon: 'fa-brands fa-bluetooth', badge: 'Riesgo común', text: 'Bluetooth y WiFi siempre activos exponen el dispositivo a ataques MITM y BlueBorne. Desactívalos cuando no estén en uso.', ref: 'OWASP I2 — Servicios de red innecesarios · INCIBE · CIA: Disponibilidad' },
      { type: 'good', icon: 'fa-solid fa-arrows-rotate', badge: 'Buena práctica', text: 'Mantén el firmware y las apps actualizados. Los parches de seguridad mensuales de Android corrigen CVEs críticos. Activa actualizaciones automáticas (OWASP I5).', ref: 'OWASP I5 — Uso de componentes desactualizados · NIST IR 8228 · CIA: Integridad' },
      { type: 'risk', icon: 'fa-solid fa-shield-halved', badge: 'Riesgo común', text: 'Las apps con permisos excesivos (cámara, micrófono, ubicación sin justificación) violan el principio de minimización de datos del GDPR. Revisa permisos regularmente.', ref: 'GDPR Art.5 — Minimización de datos · OWASP I6 — Privacy Concerns' },
      { type: 'good', icon: 'fa-solid fa-network-wired', badge: 'Buena práctica', text: 'Usa conexiones TLS 1.2 o superior. Evita redes WiFi públicas sin VPN, ya que el tráfico no cifrado puede interceptarse.', ref: 'OWASP I9 — Configuraciones inseguras por defecto · Kaspersky · CIA: Integridad' },
    ]
  },
  iphone: {
    name: 'iPhone', icon: 'fa-brands fa-apple', color: '#555555', desc: 'Apple iPhone / iOS',
    tips: [
      { type: 'good', icon: 'fa-solid fa-cloud', badge: 'Buena práctica', text: 'Activa el cifrado de extremo a extremo en iCloud para mensajes, fotos y copias de seguridad. Desde iOS 16.2 existe la "Protección de datos avanzada".', ref: 'OWASP I7 — Insufficient Data Protection · CIA: Confidencialidad' },
      { type: 'risk', icon: 'fa-solid fa-location-dot', badge: 'Riesgo común', text: 'Los servicios de ubicación siempre activos permiten rastreo continuo. Configura la ubicación como "Al usar la app" en Ajustes → Privacidad → Localización.', ref: 'GDPR Art.6 — Consentimiento · OWASP I6 · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-arrows-rotate', badge: 'Buena práctica', text: 'iOS distribuye parches de seguridad críticos fuera de ciclo. Activa actualizaciones automáticas (Ajustes → General → Actualización de software).', ref: 'OWASP I5 — Componentes desactualizados · NIST IR 8228 · CIA: Integridad' },
      { type: 'risk', icon: 'fa-solid fa-cast', badge: 'Riesgo común', text: 'AirDrop configurado para "Todos" permite transferencias no autorizadas. Configúralo como "Solo Contactos" en Ajustes → General → AirDrop.', ref: 'OWASP I2 — Servicios de red innecesarios · CIA: Disponibilidad' },
      { type: 'good', icon: 'fa-solid fa-face-id', badge: 'Buena práctica', text: 'Face ID y Touch ID agregan autenticación biométrica robusta. Complementa con un código de acceso alfanumérico de al menos 6 caracteres.', ref: 'OWASP I1 — Autenticación insegura · INCIBE · CIA: Confidencialidad' },
      { type: 'risk', icon: 'fa-solid fa-store', badge: 'Riesgo común', text: 'El sideloading de apps fuera de App Store (especialmente tras iOS 17 en la UE) aumenta el riesgo de malware. Verifica el desarrollador antes de instalar.', ref: 'OWASP I8 — Falta de endurecimiento del dispositivo · Kaspersky · CIA: Integridad' },
    ]
  },
  tablet: {
    name: 'Tablet', icon: 'fa-solid fa-tablet-screen-button', color: '#6366f1', desc: 'Tablet genérica (Android/Windows)',
    tips: [
      { type: 'risk', icon: 'fa-solid fa-wifi', badge: 'Riesgo común', text: 'Las tablets se conectan frecuentemente a redes WiFi abiertas. El tráfico no cifrado puede ser capturado (ataque eavesdropping). Usa siempre una VPN de confianza.', ref: 'OWASP I9 — Configuraciones inseguras por defecto · Kaspersky · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-mobile-screen', badge: 'Buena práctica', text: 'Revisa los permisos de cada app instalada. Las tablets tienen acceso a cámara frontal/trasera, micrófono y almacenamiento que apps maliciosas pueden explotar.', ref: 'GDPR Art.5 — Minimización de datos · OWASP I6 · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-shield-check', badge: 'Buena práctica', text: 'Habilita la autenticación en dos factores (2FA) para todas las cuentas asociadas al dispositivo. El 2FA reduce en un 99.9% los intentos de acceso no autorizados.', ref: 'OWASP I1 — Autenticación insegura · INCIBE · CIA: Confidencialidad' },
      { type: 'risk', icon: 'fa-solid fa-tablet', badge: 'Riesgo común', text: 'El hurto físico de una tablet sin cifrado expone todos los datos. Activa cifrado de disco completo y bloqueo automático en menos de 1 minuto de inactividad.', ref: 'OWASP I7 — Insufficient Data Protection · NIST IR 8228 · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-arrows-rotate', badge: 'Buena práctica', text: 'Activa actualizaciones automáticas del SO y las aplicaciones. Los dispositivos con firmware desactualizado son blancos preferentes de botnets IoT (Mirai y derivados).', ref: 'OWASP I5 — Componentes desactualizados · Check Point Botnet · CIA: Integridad' },
      { type: 'risk', icon: 'fa-solid fa-plug', badge: 'Riesgo común', text: 'La carga mediante USB público (Juice Jacking) puede instalar malware o exfiltrar datos. Usa adaptadores USB que bloqueen datos o cargadores propios.', ref: 'OWASP I4 — Falta de mecanismos de actualización segura · CIA: Integridad' },
    ]
  },
  smartwatch: {
    name: 'Smartwatch', icon: 'fa-solid fa-clock', color: '#f59e0b', desc: 'Wearable / Smartwatch IoT',
    tips: [
      { type: 'risk', icon: 'fa-solid fa-wifi', badge: 'Riesgo común', text: 'Los smartwatches con WiFi en modo auto-connect se unen a redes conocidas sin verificar su autenticidad, exponiendo las comunicaciones a redes falsas (Evil Twin).', ref: 'OWASP I2 — Servicios de red innecesarios · CIA: Disponibilidad' },
      { type: 'good', icon: 'fa-solid fa-key', badge: 'Buena práctica', text: 'Configura un PIN o código de emparejamiento fuerte para el enlace Bluetooth con el smartphone. Sin este mecanismo, cualquier dispositivo cercano puede intentar conectarse.', ref: 'OWASP I1 — Autenticación insegura · CIA: Confidencialidad' },
      { type: 'risk', icon: 'fa-solid fa-heart-pulse', badge: 'Riesgo común', text: 'Los datos de salud (frecuencia cardíaca, sueño, GPS, SpO2) son datos sensibles protegidos por el GDPR Art.9. Verifica qué datos comparte el fabricante con terceros.', ref: 'GDPR Art.9 — Datos sensibles de salud · OWASP I6 — Privacy Concerns · CIA: Confidencialidad' },
      { type: 'good', icon: 'fa-solid fa-arrows-rotate', badge: 'Buena práctica', text: 'Aplica actualizaciones de firmware del smartwatch tan pronto como estén disponibles. Muchos wearables corren versiones RTOS vulnerables que solo se parchean OTA.', ref: 'OWASP I5 — Componentes desactualizados · NIST IR 8228 · CIA: Integridad' },
      { type: 'risk', icon: 'fa-brands fa-bluetooth', badge: 'Riesgo común', text: 'El protocolo BLE tiene vulnerabilidades como BLESA (2020) que permiten reconexiones falsas. Un atacante puede suplantar el smartphone legítimo y extraer datos del reloj.', ref: 'OWASP I2 — Servicios inseguros · Kaspersky · CIA: Integridad' },
      { type: 'good', icon: 'fa-solid fa-location-arrow', badge: 'Buena práctica', text: 'Deshabilita la función GPS permanente y actívala solo al hacer ejercicio. El rastreo continuo puede revelar patrones de comportamiento muy detallados del usuario.', ref: 'GDPR Art.5 — Minimización de datos · OWASP I6 · CIA: Confidencialidad' },
    ]
  }
};

/* ================================================================
   DATOS: PREGUNTAS ESPECÍFICAS POR DISPOSITIVO
================================================================ */
const DEVICE_QUESTIONS = {
  android: [
    { id: 'q6', text: '¿Tienes activada la instalación de apps desde fuentes desconocidas (fuera de Google Play Store)?', ref: 'OWASP I8 — Falta de endurecimiento del dispositivo · Android Security · CIA: Integridad', weight: 15 },
    { id: 'q7', text: '¿Tu Android tiene el "Modo desarrollador" (ADB) activado sin usarlo profesionalmente?', ref: 'OWASP I3 — Interfaces de gestión inseguras · NIST IR 8228 · CIA: Confidencialidad', weight: 10 }
  ],
  iphone: [
    { id: 'q6', text: '¿Tu iPhone tiene o ha tenido jailbreak aplicado, o lo usa alguien más sin tu supervisión?', ref: 'OWASP I8 — Firmware inseguro · Apple Platform Security · CIA: Integridad', weight: 15 },
    { id: 'q7', text: '¿Permites que apps de terceros accedan a tu cuenta de iCloud sin revisar periódicamente los permisos?', ref: 'GDPR Art.5 — Minimización de datos · OWASP I6 — Privacy Concerns · CIA: Confidencialidad', weight: 10 }
  ],
  tablet: [
    { id: 'q6', text: '¿Conectas tu tablet a redes WiFi públicas (cafeterías, aeropuertos, hoteles) sin usar una VPN?', ref: 'OWASP I9 — Configuración insegura por defecto · Kaspersky · CIA: Confidencialidad', weight: 15 },
    { id: 'q7', text: '¿La tablet es compartida por varias personas sin perfiles de usuario separados y contraseñas distintas?', ref: 'GDPR Art.5 — Minimización · OWASP I1 — Autenticación insegura · CIA: Confidencialidad', weight: 10 }
  ],
  smartwatch: [
    { id: 'q6', text: '¿Sincronizas datos de salud (frecuencia cardíaca, sueño, SpO2) con apps de terceros sin revisar su política de privacidad?', ref: 'GDPR Art.9 — Datos sensibles de salud · OWASP I6 — Privacy Concerns · CIA: Confidencialidad', weight: 15 },
    { id: 'q7', text: '¿Tienes el GPS del smartwatch en modo "siempre activo" incluso cuando no realizas actividad física?', ref: 'GDPR Art.5 — Minimización de datos · OWASP I2 — Servicios innecesarios · CIA: Disponibilidad', weight: 10 }
  ]
};

/* ================================================================
   DATOS: VIDEOS EDUCATIVOS
================================================================ */
const VIDEOS = [
  { id: 'v1', youtubeId: 'LlhmzVL5bm8', title: '¿Qué es la Seguridad IoT?', desc: 'Introducción a los riesgos de los dispositivos conectados.', tag: 'General · OWASP', gradient: 'linear-gradient(135deg, #064e3b, #10b981)', icon: 'fa-solid fa-shield-halved', dot: '#10b981' },
  { id: 'v2', youtubeId: 'SqbVHFLj9tc', title: 'OWASP IoT Top 10 Explicado', desc: 'Las 10 vulnerabilidades críticas más comunes en IoT.', tag: 'OWASP · Vulnerabilidades', gradient: 'linear-gradient(135deg, #7f1d1d, #ef4444)', icon: 'fa-solid fa-bug', dot: '#ef4444' },
  { id: 'v3', youtubeId: 'UBcjGEBm3TY', title: 'Seguridad en Smartphones', desc: 'Cómo proteger tu Android o iPhone de vulnerabilidades.', tag: 'Android · iOS · Móvil', gradient: 'linear-gradient(135deg, #14532d, #3ddc84)', icon: 'fa-solid fa-mobile-screen-button', dot: '#3ddc84' },
  { id: 'v4', youtubeId: 'sCOJ8_FLY9k', title: 'Peligros del Bluetooth y WiFi', desc: 'Ataques MITM, BlueBorne y Evil Twin para usuarios finales.', tag: 'Bluetooth · Redes · Ataques', gradient: 'linear-gradient(135deg, #1e1b4b, #6366f1)', icon: 'fa-brands fa-bluetooth', dot: '#6366f1' },
  { id: 'v5', youtubeId: '7NkNxkCGCbI', title: 'Privacidad y Datos en Wearables', desc: 'GDPR, datos de salud y cómo proteger tu smartwatch.', tag: 'GDPR · Privacidad · Wearable', gradient: 'linear-gradient(135deg, #78350f, #f59e0b)', icon: 'fa-solid fa-user-shield', dot: '#f59e0b' }
];

/* ================================================================
   DATOS: FUENTES BIBLIOGRÁFICAS
================================================================ */
const SOURCES = [
  {
    id: 'owasp',
    icon: 'fa-solid fa-shield',
    name: 'OWASP IoT Top 10',
    url: 'https://owasp.org/www-project-internet-of-things/',
    summary: 'El OWASP IoT Top 10 (2018) es la lista de referencia mundial que clasifica las diez vulnerabilidades más críticas presentes en dispositivos conectados. Cubre desde contraseñas débiles por defecto (I1) e interfaces de red inseguras (I2), hasta el uso de componentes desactualizados (I5), problemas de privacidad (I6) y transferencia de datos sin cifrar (I9). Cada categoría incluye vectores de ataque reales, ejemplos de explotación y contramedidas recomendadas para fabricantes y usuarios. Es el estándar de facto que organismos como NIST, ENISA e INCIBE adoptan como base para sus propias guías de seguridad IoT.',
    translation: 'Este proyecto estructura todos sus consejos de seguridad, preguntas del test y referencias directamente sobre las categorías OWASP I1–I10. Si quieres comprender en profundidad por qué cada recomendación existe —con casos reales de dispositivos comprometidos— la fuente original es imprescindible. El sitio incluye además hojas de datos descargables y un repositorio activo con actualizaciones de la comunidad.'
  },
  {
    id: 'incibe',
    icon: 'fa-solid fa-building-shield',
    name: 'INCIBE — IoT y sus riesgos',
    url: 'https://www.incibe.es/ciudadania/blog/la-ciberseguridad-es-una-responsabilidad-de-todos-el-iot-y-sus-riesgos',
    summary: 'El Instituto Nacional de Ciberseguridad de España (INCIBE) publica esta guía dirigida a ciudadanos y empresas, explicando cómo el crecimiento exponencial de dispositivos IoT amplía la superficie de ataque doméstica y corporativa. Describe amenazas concretas como el secuestro de cámaras IP, termostatos inteligentes convertidos en puertas de entrada a redes privadas, y el uso de wearables para recopilar datos personales sin consentimiento. INCIBE proporciona además un servicio gratuito de respuesta a incidentes (CERT) para ciudadanos afectados por brechas de seguridad en dispositivos conectados.',
    translation: 'Al ser una fuente oficial del gobierno español, sus recomendaciones tienen validez jurídica dentro del marco del Esquema Nacional de Seguridad (ENS) y están alineadas con la regulación europea. Para quienes utilizan dispositivos IoT en España o Latinoamérica, esta guía ofrece el contexto legal y técnico local que los estándares internacionales no siempre cubren. Visita el enlace para acceder también a infografías y fichas prácticas descargables en español.'
  },
  {
    id: 'nist',
    icon: 'fa-solid fa-file-shield',
    name: 'NIST IR 8228',
    url: 'https://nvlpubs.nist.gov/nistpubs/IR/2020/NIST.IR.8228.pdf',
    summary: 'El NIST Interagency Report 8228 (2020) es el documento técnico más completo del Instituto Nacional de Estándares y Tecnología de EE. UU. sobre gestión de riesgos IoT. Identifica tres grandes desafíos: la incapacidad de parchear dispositivos en campo, la dificultad de aplicar controles de acceso tradicionales, y la falta de visibilidad sobre el comportamiento del dispositivo en red. El informe propone un ciclo de vida de seguridad en tres fases —identificación de riesgos, protección y detección— y define 27 categorías de capacidades de ciberseguridad que deben evaluarse antes de desplegar cualquier dispositivo IoT en entornos críticos.',
    translation: 'El NIST IR 8228 es la base técnica que justifica las preguntas del test de este proyecto relacionadas con actualizaciones de firmware y gestión de permisos. Su lectura completa (53 páginas) es altamente recomendada para estudiantes de ingeniería en sistemas o ciberseguridad, ya que ofrece el nivel de detalle técnico que los documentos divulgativos omiten. El PDF es de acceso gratuito y representa el estándar que el gobierno federal de EE. UU. exige en sus contratos de adquisición de tecnología IoT.'
  },
  {
    id: 'iso',
    icon: 'fa-solid fa-certificate',
    name: 'ISO 30141',
    url: 'https://www.iso.org/standard/65662.html',
    summary: 'ISO/IEC 30141:2018 es el primer estándar internacional de arquitectura de referencia para el Internet de las Cosas, desarrollado conjuntamente por la Organización Internacional de Normalización (ISO) y la Comisión Electrotécnica Internacional (IEC). Define una ontología común para describir sistemas IoT mediante seis capas funcionales: percepción, conectividad, procesamiento, servicios, aplicación y negocio. Establece también los principios de confianza (Trustworthiness) que todo sistema IoT debe cumplir: seguridad, privacidad, protección, fiabilidad, resiliencia y disponibilidad. Este marco es utilizado por fabricantes, integradores de sistemas y reguladores como base de certificación de productos.',
    translation: 'La arquitectura en capas del ISO 30141 explica por qué las vulnerabilidades IoT no son solo un problema del dispositivo individual, sino del ecosistema completo que lo rodea. Comprender este modelo permite al lector identificar en qué capa ocurre cada tipo de ataque descrito en este proyecto. Aunque el estándar completo requiere suscripción, la página oficial de ISO ofrece una vista previa gratuita del alcance y los objetivos que resulta suficiente para contextualizar el marco teórico.'
  },
  {
    id: 'kaspersky',
    icon: 'fa-solid fa-bug-slash',
    name: 'Kaspersky — ¿Qué es IoT?',
    url: 'https://latam.kaspersky.com/resource-center/definitions/what-is-iot',
    summary: 'El centro de recursos de Kaspersky para Latinoamérica define el IoT como el ecosistema de dispositivos físicos embebidos con sensores, software y conectividad que intercambian datos sin intervención humana directa. El artículo describe los vectores de ataque más frecuentes observados en telemetría real de millones de dispositivos: ataques de fuerza bruta sobre Telnet y SSH, explotación de puertos abiertos no documentados, y la proliferación de variantes de la botnet Mirai. Incluye estadísticas actualizadas sobre el crecimiento de incidentes IoT y una sección específica sobre amenazas a dispositivos domésticos como routers, cámaras y asistentes de voz.',
    translation: 'Kaspersky aporta a este proyecto la perspectiva forense de una empresa que analiza malware IoT en tiempo real a escala global. Sus datos de telemetría respaldan con evidencia empírica los riesgos descritos en las tarjetas de dispositivo, especialmente los relacionados con Bluetooth (BLESA), WiFi (Evil Twin) y botnets. El artículo está redactado en español latinoamericano, es gratuito y accesible sin registro, lo que lo convierte en un excelente punto de entrada para lectores sin formación técnica previa.'
  },
  {
    id: 'gdpr',
    icon: 'fa-solid fa-scale-balanced',
    name: 'GDPR — Comisión Europea',
    url: 'https://commission.europa.eu/law/topic/data-protection',
    summary: 'El Reglamento General de Protección de Datos (GDPR, Reglamento UE 2016/679) es el marco legal europeo que regula el tratamiento de datos personales de ciudadanos de la UE, independientemente de donde operen las empresas que los procesan. Sus artículos más relevantes para IoT son: Art. 5 (principios de minimización de datos y limitación de propósito), Art. 6 (base legal para el tratamiento), Art. 9 (datos sensibles de salud, aplicable a wearables y smartwatches) y Art. 25 (privacidad desde el diseño). El incumplimiento puede derivar en multas de hasta 20 millones de euros o el 4% de la facturación global anual de la empresa infractora.',
    translation: 'El GDPR es especialmente relevante para los usuarios de smartwatches y tablets de este proyecto, ya que estos dispositivos recopilan categorías de datos explícitamente protegidos: ubicación, biometría, patrones de sueño y frecuencia cardíaca. Conocer tus derechos bajo el GDPR —acceso, rectificación, supresión y portabilidad— te permite exigir a los fabricantes transparencia sobre qué datos recopilan y con quién los comparten. El portal de la Comisión Europea ofrece guías gratuitas en todos los idiomas oficiales de la UE.'
  },
  {
    id: 'enisa',
    icon: 'fa-solid fa-earth-europe',
    name: 'ENISA Baseline IoT',
    url: 'https://www.enisa.europa.eu/topics/iot-and-smart-infrastructures/iot',
    summary: 'La Agencia de la Unión Europea para la Ciberseguridad (ENISA) publicó sus directrices de seguridad de referencia para IoT identificando 113 medidas de seguridad agrupadas en 10 dominios: seguridad del software, autenticación, criptografía, gestión de actualizaciones, privacidad, resiliencia física, entre otros. El informe diferencia entre requisitos de seguridad para fabricantes de dispositivos, proveedores de plataformas IoT y operadores de red, reconociendo que la responsabilidad es compartida. ENISA actualiza periódicamente sus directrices en respuesta a nuevas amenazas y las alinea con la Ley de Ciberresiliencia (CRA) de la UE, que entrará en vigor progresivamente hasta 2027.',
    translation: 'Las directrices de ENISA representan el nivel de seguridad mínimo exigible a cualquier dispositivo IoT comercializado en Europa a partir de 2025. Para este proyecto, el dominio de gestión de actualizaciones y el de autenticación son los que mayor correspondencia tienen con las preguntas del test. Si planeas diseñar, comprar o desplegar dispositivos IoT en un entorno profesional o académico, el portal de ENISA ofrece acceso gratuito a todos sus informes técnicos, incluidos casos de estudio por sector industrial.'
  },
  {
    id: 'checkpoint',
    icon: 'fa-solid fa-network-wired',
    name: 'Check Point — IoT Botnet',
    url: 'https://blog.checkpoint.com/research/new-iot-botnet-storm-coming/',
    summary: 'Check Point Research documentó en este informe la emergencia de una nueva generación de botnets IoT —sucesor evolutivo de Mirai— con capacidad para reclutar dispositivos domésticos (routers, DVRs, cámaras IP) y usarlos para lanzar ataques DDoS de más de 30 Gbps contra infraestructuras críticas. El análisis técnico incluye ingeniería inversa del código del malware, mapa de distribución geográfica de dispositivos infectados y la identificación de vulnerabilidades específicas explotadas en dispositivos Realtek y Huawei. Check Point detectó más de 400,000 intentos de infección en los primeros días tras el descubrimiento, con picos de actividad en regiones de América Latina.',
    translation: 'Este informe aporta al proyecto la evidencia más contundente de por qué mantener el firmware actualizado y deshabilitar servicios de red innecesarios no es una recomendación teórica, sino una necesidad urgente: los dispositivos vulnerables son reclutados en cuestión de minutos tras conectarse a internet. El blog de Check Point Research es de acceso gratuito, incluye indicadores de compromiso (IoCs) y se actualiza con nuevas investigaciones semanalmente, convirtiéndolo en una fuente de inteligencia de amenazas de primer nivel.'
  }
];

/* ================================================================
   VARIABLES DEL TEST
================================================================ */
const answers = { q1: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null };
const weights = { q1: 15, q2: 20, q3: 15, q4: 15, q5: 10, q6: 15, q7: 10 };
let deviceQuestionsVisible = false;

/* ================================================================
   RENDER: VIDEOS (tarjetas)
================================================================ */
function renderVideos() {
  const container = document.getElementById('video-list');
  if (!container) return;
  container.innerHTML = VIDEOS.map(v => `
    <div class="video-card" data-video-id="${v.youtubeId}">
      <div class="video-thumb" style="background:${v.gradient}">
        <i class="video-thumb-bg-icon ${v.icon}"></i>
        <div class="video-play-overlay">
          <div class="video-play-circle"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-label-bar">
          <span class="video-label-dot" style="background:${v.dot}"></span>
          <span class="video-label-text">${v.tag}</span>
        </div>
      </div>
      <div class="video-info">
        <div class="video-title-text">${v.title}</div>
        <div class="video-desc-text">${v.desc}</div>
      </div>
    </div>
  `).join('');

  // Añadir evento de clic a cada tarjeta para abrir modal
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const youtubeId = card.dataset.videoId;
      if (youtubeId) openVideoModal(youtubeId);
    });
  });
}

/* ================================================================
   MODAL DE VIDEOS
================================================================ */
function openVideoModal(youtubeId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-modal-iframe');
  if (!modal || !iframe) return;
  iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-modal-iframe');
  if (!modal) return;
  modal.classList.remove('open');
  if (iframe) iframe.src = ''; // detener reproducción
  document.body.style.overflow = '';
}

/* ================================================================
   RENDER: FUENTES
================================================================ */
function renderSources() {
  const container = document.getElementById('sources-list');
  if (!container) return;
  container.innerHTML = SOURCES.map(src => `
    <div class="source-item">
      <div class="source-header">
        <div class="source-icon"><i class="${src.icon}"></i></div>
        <div class="source-name">${src.name}</div>
      </div>
      <button class="btn-source-summary" data-source="${src.id}"><i class="fa-solid fa-magnifying-glass"></i> Ver resumen</button>
    </div>
  `).join('');
  container.querySelectorAll('.btn-source-summary').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.source));
  });
}

/* ================================================================
   MODAL PARA DOCUMENTOS
================================================================ */
function openModal(sourceId) {
  const src = SOURCES.find(s => s.id === sourceId);
  if (!src) return;
  const modal = document.getElementById('modal');
  if (!modal) return;
  document.getElementById('modal-icon').innerHTML = `<i class="${src.icon}"></i>`;
  document.getElementById('modal-title').textContent = src.name;
  const linkEl = document.getElementById('modal-link');
  linkEl.href = src.url;
  linkEl.textContent = src.url;
  document.getElementById('modal-summary').textContent = src.summary;
  document.getElementById('modal-translation').textContent = src.translation;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ================================================================
   CONSEJOS POR DISPOSITIVO
================================================================ */
function renderTips(deviceKey) {
  const data = DEVICE_DATA[deviceKey];
  const panel = document.getElementById('tips-panel');
  const tipsList = document.getElementById('tips-list');
  const placeholder = document.getElementById('tips-placeholder');
  if (!panel || !tipsList || !placeholder) return;

  let header = panel.querySelector('.panel-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'panel-header';
    panel.insertBefore(header, tipsList);
  }
  header.innerHTML = `
    <div class="panel-icon" style="background:${data.color}18; color:${data.color}"><i class="${data.icon}"></i></div>
    <div><h2>${data.name}</h2><p>${data.desc} — ${data.tips.length} consejos de seguridad</p></div>`;
  tipsList.innerHTML = data.tips.map((tip, i) => `
    <li class="tip-item ${tip.type}" style="animation-delay:${i * 0.06}s">
      <div class="tip-icon"><i class="${tip.icon}"></i></div>
      <div class="tip-content">
        <span class="tip-badge">${tip.badge}</span>
        <p class="tip-text">${tip.text}</p>
        <p class="tip-ref"><i class="fa-solid fa-tag" style="font-size:0.6rem"></i> ${tip.ref}</p>
      </div>
    </li>`).join('');
  placeholder.style.display = 'none';
  tipsList.style.display = 'flex';
}

/* ================================================================
   PREGUNTAS ESPECÍFICAS DEL DISPOSITIVO
================================================================ */
function renderDeviceQuestions(deviceKey) {
  const dqs = DEVICE_QUESTIONS[deviceKey];
  const data = DEVICE_DATA[deviceKey];
  const header = document.getElementById('device-q-header');
  const block6 = document.getElementById('block-q6');
  const block7 = document.getElementById('block-q7');
  if (!header || !block6 || !block7) return;
  answers.q6 = null; answers.q7 = null;
  document.querySelectorAll('.btn-answer[data-q="q6"], .btn-answer[data-q="q7"]').forEach(b => b.classList.remove('selected-yes', 'selected-no'));
  header.classList.add('visible');
  document.getElementById('device-q-label').innerHTML = `<i class="${data.icon}"></i> &nbsp;Preguntas específicas — ${data.name}`;
  document.getElementById('text-q6').textContent = dqs[0].text;
  document.getElementById('ref-q6').innerHTML = `<i class="fa-solid fa-tag"></i> ${dqs[0].ref}`;
  block6.style.display = 'block';
  document.getElementById('text-q7').textContent = dqs[1].text;
  document.getElementById('ref-q7').innerHTML = `<i class="fa-solid fa-tag"></i> ${dqs[1].ref}`;
  block7.style.display = 'block';
  deviceQuestionsVisible = true;
  updateQuestionCount();
  updateRiskUI();
}

function updateQuestionCount() {
  const total = deviceQuestionsVisible ? 7 : 5;
  const answered = Object.entries(answers).filter(([k, v]) => {
    if (!deviceQuestionsVisible && (k === 'q6' || k === 'q7')) return false;
    return v !== null;
  }).length;
  const span = document.getElementById('risk-question-count');
  if (span) span.textContent = `${answered}/${total} respondidas`;
}

/* ================================================================
   CÁLCULO DE RIESGO
================================================================ */
function calcRisk() {
  let total = 0;
  Object.entries(answers).forEach(([q, val]) => {
    if (!deviceQuestionsVisible && (q === 'q6' || q === 'q7')) return;
    if (val === 'yes') total += weights[q];
  });
  return total;
}

function updateRiskUI() {
  const pct = calcRisk();
  const bar = document.getElementById('risk-bar');
  const label = document.getElementById('risk-label');
  const desc = document.getElementById('risk-desc');
  const result = document.getElementById('risk-result');
  if (!bar || !label || !desc || !result) return;
  const activeAnswers = Object.entries(answers).filter(([k, v]) => {
    if (!deviceQuestionsVisible && (k === 'q6' || k === 'q7')) return false;
    return v !== null;
  });
  bar.style.width = Math.min(pct, 100) + '%';
  if (activeAnswers.length === 0) {
    bar.style.backgroundColor = 'var(--color-border)';
    label.textContent = '—';
    desc.textContent = 'Responde las preguntas para calcular tu nivel de riesgo';
    result.style.borderColor = 'var(--color-border)';
    result.style.background = '';  // CSS endstone texture takes over
    label.style.color = 'var(--color-muted)';
    return;
  }
  if (pct >= 50) {
    bar.style.backgroundColor = 'var(--color-danger)';
    label.textContent = '🔴 Riesgo ALTO';
    label.style.color = 'var(--color-danger)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. Tu dispositivo tiene configuraciones que lo ponen en riesgo grave. Actúa ahora.`;
    result.style.borderColor = 'var(--color-danger)';
    result.style.background = 'rgba(180,40,30,0.45)';
  } else if (pct >= 20) {
    bar.style.backgroundColor = 'var(--color-warn)';
    label.textContent = '🟠 Riesgo MEDIO';
    label.style.color = 'var(--color-warn)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. Hay aspectos de seguridad que mejorar. Consulta los consejos del dispositivo.`;
    result.style.borderColor = 'var(--color-warn)';
    result.style.background = 'rgba(200,120,20,0.45)';
  } else {
    bar.style.backgroundColor = 'var(--color-accent)';
    label.textContent = '🟢 Riesgo BAJO';
    label.style.color = 'var(--color-accent)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. ¡Bien! Sigues buenas prácticas de seguridad IoT. Sigue así.`;
    result.style.borderColor = 'var(--color-accent)';
    result.style.background = 'rgba(30,120,60,0.45)';
  }
  updateQuestionCount();
}

/* ================================================================
   EVENTOS: RESPUESTAS DEL TEST
================================================================ */
function initAnswerButtons() {
  document.querySelectorAll('.btn-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      const val = btn.dataset.val;
      document.querySelectorAll(`.btn-answer[data-q="${q}"]`).forEach(b => b.classList.remove('selected-yes', 'selected-no'));
      answers[q] = val;
      btn.classList.add(val === 'yes' ? 'selected-yes' : 'selected-no');
      updateRiskUI();
    });
  });
}

/* ================================================================
   SELECTOR DE DISPOSITIVO
================================================================ */
function initDeviceSelector() {
  const grid = document.getElementById('device-grid');
  if (!grid) return;
  grid.querySelectorAll('.device-card').forEach(card => {
    const select = () => {
      document.querySelectorAll('.device-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const deviceKey = card.dataset.device;
      renderTips(deviceKey);
      renderDeviceQuestions(deviceKey);
    };
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') select(); });
  });
}

/* ================================================================
   TOGGLES SIDEBAR (MÓVIL)
================================================================ */
function initToggles() {
  const videoToggleBtn = document.getElementById('video-sidebar-toggle');
  const videoSidebarContent = document.getElementById('video-sidebar-content');
  const videoToggleIcon = document.getElementById('video-toggle-icon');
  if (videoToggleBtn && videoSidebarContent && videoToggleIcon) {
    videoToggleBtn.addEventListener('click', () => {
      const isOpen = videoSidebarContent.classList.toggle('open');
      videoToggleIcon.style.transform = isOpen ? 'rotate(180deg)' : '';
      videoToggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebarContent = document.getElementById('sidebar-content');
  const toggleIcon = document.getElementById('toggle-icon');
  if (toggleBtn && sidebarContent && toggleIcon) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = sidebarContent.classList.toggle('open');
      toggleIcon.style.transform = isOpen ? 'rotate(180deg)' : '';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    const sidebarContent = document.getElementById('sidebar-content');
    const videoSidebarContent = document.getElementById('video-sidebar-content');
    if (sidebarContent) sidebarContent.classList.add('open');
    if (videoSidebarContent) videoSidebarContent.classList.add('open');
  }
}

/* ================================================================
   COLAPSAR SIDEBARS (versión definitiva)
================================================================ */
function initCollapse() {
  const videoSidebar = document.getElementById('video-sidebar');
  const mainSidebar = document.getElementById('sidebar');
  const collapseVideoBtn = document.getElementById('collapse-video-btn');
  const collapseMainBtn = document.getElementById('collapse-main-btn');

  if (collapseVideoBtn && videoSidebar) {
    collapseVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      videoSidebar.classList.toggle('collapsed');
      localStorage.setItem('videoSidebarCollapsed', videoSidebar.classList.contains('collapsed'));
    });
  }
  if (collapseMainBtn && mainSidebar) {
    collapseMainBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mainSidebar.classList.toggle('collapsed');
      localStorage.setItem('mainSidebarCollapsed', mainSidebar.classList.contains('collapsed'));
    });
  }
  // Restaurar estados
  if (localStorage.getItem('videoSidebarCollapsed') === 'true' && videoSidebar) {
    videoSidebar.classList.add('collapsed');
  }
  if (localStorage.getItem('mainSidebarCollapsed') === 'true' && mainSidebar) {
    mainSidebar.classList.add('collapsed');
  }
}

/* ================================================================
   INICIALIZACIÓN PRINCIPAL
================================================================ */

/* ================================================================
   BÚSQUEDA DE DISPOSITIVOS — "Aprende más"
================================================================ */
function buildSearchLinks(query) {
  const q = encodeURIComponent(query);
  const qPlain = query.trim();
  return [
    {
      label: 'Vulnerabilidades en NVD (NIST)',
      url: `https://nvd.nist.gov/vuln/search/results?query=${q}&results_type=overview`,
      icon: 'fa-solid fa-file-shield',
      section: 'vuln'
    },
    {
      label: 'CVEs registrados — MITRE',
      url: `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${q}`,
      icon: 'fa-solid fa-bug',
      section: 'vuln'
    },
    {
      label: 'Noticias de seguridad recientes',
      url: `https://news.google.com/search?q=${q}+seguridad+vulnerabilidad&hl=es`,
      icon: 'fa-solid fa-newspaper',
      section: 'update'
    },
    {
      label: 'Actualizaciones del fabricante',
      url: `https://www.google.com/search?q=${q}+actualizacion+firmware+seguridad+site:${qPlain.split(' ')[0].toLowerCase()}.com`,
      icon: 'fa-solid fa-arrows-rotate',
      section: 'update'
    },
    {
      label: 'Ficha técnica — GSMArena',
      url: `https://www.gsmarena.com/search.php3?sQuickSearch=1&sName=${q}`,
      icon: 'fa-solid fa-mobile-screen-button',
      section: 'link'
    },
    {
      label: 'Exploit Database',
      url: `https://www.exploit-db.com/search?q=${q}`,
      icon: 'fa-solid fa-terminal',
      section: 'vuln'
    },
    {
      label: 'Shodan — dispositivos expuestos',
      url: `https://www.shodan.io/search?query=${q}`,
      icon: 'fa-solid fa-network-wired',
      section: 'link'
    },
    {
      label: 'Guía OWASP IoT aplicada',
      url: `https://owasp.org/www-project-internet-of-things/`,
      icon: 'fa-solid fa-shield',
      section: 'link'
    }
  ];
}

function renderSearchResults(query) {
  const container = document.getElementById('search-results');
  if (!container) return;
  const links = buildSearchLinks(query);

  const sections = {
    vuln:   { title: '🔴 Vulnerabilidades & CVEs',         cls: 'vuln' },
    update: { title: '🟢 Actualizaciones & Noticias',      cls: 'update' },
    link:   { title: '🔵 Recursos & Herramientas',         cls: 'link' }
  };

  const bySection = {};
  links.forEach(l => {
    if (!bySection[l.section]) bySection[l.section] = [];
    bySection[l.section].push(l);
  });

  let html = `<div style="font-size:0.82rem;color:var(--color-muted);margin-bottom:0.5rem;">
    Resultados para: <strong style="color:var(--color-accent)">${query}</strong>
    &nbsp;·&nbsp; Haz clic para abrir en nueva pestaña
  </div>`;

  Object.entries(sections).forEach(([key, sec]) => {
    if (!bySection[key]) return;
    html += `<div class="search-section">
      <div class="search-section-title ${sec.cls}">
        ${sec.title}
      </div>`;
    bySection[key].forEach(link => {
      html += `<a class="search-link-item" href="${link.url}" target="_blank" rel="noopener noreferrer">
        <i class="${link.icon}"></i>
        <span class="search-link-label">${link.label}</span>
        <i class="fa-solid fa-arrow-up-right-from-square search-link-arrow"></i>
      </a>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('search-device-input');
      if (input) input.focus();
    }, 100);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initSearchModal() {
  const btnOpen  = document.getElementById('btn-learn-more');
  const btnClose = document.getElementById('search-modal-close');
  const btnSearch = document.getElementById('search-device-btn');
  const input    = document.getElementById('search-device-input');
  const overlay  = document.getElementById('search-modal');

  if (btnOpen)  btnOpen.addEventListener('click', openSearchModal);
  if (btnClose) btnClose.addEventListener('click', closeSearchModal);
  if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearchModal(); });

  function doSearch() {
    const query = input ? input.value.trim() : '';
    if (!query) {
      input.style.borderColor = 'var(--color-danger)';
      setTimeout(() => input.style.borderColor = '', 800);
      return;
    }
    renderSearchResults(query);
  }

  if (btnSearch) btnSearch.addEventListener('click', doSearch);
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch();
    });
  }
}

/* ================================================================
   SIDEBARS MÓVIL — Drawer behavior
================================================================ */
function initMobileDrawers() {
  if (window.innerWidth > 768) return;

  const videoSidebar = document.getElementById('video-sidebar');
  const mainSidebar  = document.getElementById('sidebar');
  const backdrop     = document.getElementById('sidebar-backdrop');

  function openDrawer(sidebar) {
    sidebar.classList.add('mobile-open');
    sidebar.classList.remove('collapsed');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeAll() {
    if (videoSidebar) videoSidebar.classList.remove('mobile-open');
    if (mainSidebar)  mainSidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  const collapseVideoBtn = document.getElementById('collapse-video-btn');
  const collapseMainBtn  = document.getElementById('collapse-main-btn');

  if (collapseVideoBtn) {
    collapseVideoBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (videoSidebar.classList.contains('mobile-open')) { closeAll(); }
      else { closeAll(); openDrawer(videoSidebar); }
    });
  }
  if (collapseMainBtn) {
    collapseMainBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (mainSidebar.classList.contains('mobile-open')) { closeAll(); }
      else { closeAll(); openDrawer(mainSidebar); }
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeAll);

  // ESC cierra drawers
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
}


document.addEventListener('DOMContentLoaded', () => {
  renderVideos();
  renderSources();
  initAnswerButtons();
  initDeviceSelector();
  initToggles();
  handleResize();
  window.addEventListener('resize', handleResize);
  initCollapse();

  // Modal de videos: cerrar con X, click fuera o ESC
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('video-modal-close');
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', closeVideoModal);
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeModal();
    }
  });

  // Modal de documentos
  const modal = document.getElementById('modal');
  if (modal) {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }

  updateRiskUI();
  updateQuestionCount();
  initSearchModal();
  initMobileDrawers();
});