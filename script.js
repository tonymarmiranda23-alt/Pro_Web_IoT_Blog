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
  { id: 'owasp', icon: 'fa-solid fa-shield', name: 'OWASP IoT Top 10', url: 'https://owasp.org/www-project-internet-of-things/', summary: 'El OWASP IoT Top 10 (2018) enumera las diez vulnerabilidades críticas...', translation: 'Proporciona el marco central de este proyecto...' },
  { id: 'incibe', icon: 'fa-solid fa-building-shield', name: 'INCIBE — IoT y sus riesgos', url: 'https://www.incibe.es/ciudadania/blog/la-ciberseguridad-es-una-responsabilidad-de-todos-el-iot-y-sus-riesgos', summary: 'El Instituto Nacional de Ciberseguridad de España (INCIBE) publica guías...', translation: 'Fuente oficial en español que respalda las recomendaciones...' },
  { id: 'nist', icon: 'fa-solid fa-file-shield', name: 'NIST IR 8228', url: 'https://nvlpubs.nist.gov/nistpubs/IR/2020/NIST.IR.8228.pdf', summary: 'NIST Interagency Report 8228 establece un marco para la gestión de riesgos...', translation: 'El NIST IR 8228 proporciona recomendaciones técnicas...' },
  { id: 'iso', icon: 'fa-solid fa-certificate', name: 'ISO 30141', url: 'https://www.iso.org/standard/65662.html', summary: 'ISO/IEC 30141 es el estándar internacional de arquitectura de referencia...', translation: 'Estándar ISO que estructura la arquitectura IoT en capas...' },
  { id: 'kaspersky', icon: 'fa-solid fa-bug-slash', name: 'Kaspersky — ¿Qué es IoT?', url: 'https://latam.kaspersky.com/resource-center/definitions/what-is-iot', summary: 'Kaspersky define el IoT como el ecosistema de dispositivos físicos...', translation: 'La investigación de Kaspersky aporta evidencia empírica...' },
  { id: 'gdpr', icon: 'fa-solid fa-scale-balanced', name: 'GDPR — Comisión Europea', url: 'https://commission.europa.eu/law/topic/data-protection', summary: 'El Reglamento General de Protección de Datos (GDPR, 2016/679)...', translation: 'El GDPR es especialmente relevante para smartwatches...' },
  { id: 'enisa', icon: 'fa-solid fa-earth-europe', name: 'ENISA Baseline IoT', url: 'https://www.enisa.europa.eu/topics/iot-and-smart-infrastructures/iot', summary: 'La Agencia de la UE para la Ciberseguridad (ENISA) publicó directrices...', translation: 'ENISA proporciona el marco regulatorio europeo...' },
  { id: 'checkpoint', icon: 'fa-solid fa-network-wired', name: 'Check Point — IoT Botnet', url: 'https://blog.checkpoint.com/research/new-iot-botnet-storm-coming/', summary: 'Check Point Research documentó la emergencia de botnets IoT...', translation: 'Este informe de Check Point ilustra con evidencia forense...' }
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
    result.style.background = '#f8fafc';
    label.style.color = 'var(--color-muted)';
    return;
  }
  if (pct >= 50) {
    bar.style.backgroundColor = 'var(--color-danger)';
    label.textContent = '🔴 Riesgo ALTO';
    label.style.color = 'var(--color-danger)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. Tu dispositivo tiene configuraciones que lo ponen en riesgo grave. Actúa ahora.`;
    result.style.borderColor = 'var(--color-danger)';
    result.style.background = 'rgba(239,68,68,0.05)';
  } else if (pct >= 20) {
    bar.style.backgroundColor = 'var(--color-warn)';
    label.textContent = '🟠 Riesgo MEDIO';
    label.style.color = 'var(--color-warn)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. Hay aspectos de seguridad que mejorar. Consulta los consejos del dispositivo.`;
    result.style.borderColor = 'var(--color-warn)';
    result.style.background = 'rgba(245,158,11,0.05)';
  } else {
    bar.style.backgroundColor = 'var(--color-accent)';
    label.textContent = '🟢 Riesgo BAJO';
    label.style.color = 'var(--color-accent)';
    desc.textContent = `Puntuación de exposición: ${pct}/100. ¡Bien! Sigues buenas prácticas de seguridad IoT. Sigue así.`;
    result.style.borderColor = 'var(--color-accent)';
    result.style.background = 'rgba(16,185,129,0.05)';
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
});