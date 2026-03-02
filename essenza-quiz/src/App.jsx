import { useState, useEffect } from "react";

const C = {
  oxford: "#002952",
  powder: "#FAFAF5",
  azure: "#EBFCFF",
  silver: "#D4C4C7",
  shadows: "#A89C9E",
  dark: "#1A0D1A",
  nickel: "#667978",
  rhythm: "#666B87",
};

// Logo as inline SVG-style text image (base64 encoded from uploaded file)
// We'll use the logo as a text element styled to match the brand font
const LOGO_URL = "/mnt/user-data/uploads/essenza_babypowder.png";

const PROFILES = {
  contemporaneo: {
    name: "Contemporáneo",
    tagline: "Vives el presente con criterio y claridad.",
    icon: "◻",
    keywords: ["Actualidad", "Criterio", "Limpieza"],
    description:
      "Tu mirada sobre el espacio es precisa y actual. No sigues modas — las interpretas. Buscas ambientes que funcionen hoy y sigan funcionando mañana: líneas claras, materiales honestos, tecnología integrada sin que se note. Tu estilo es urbano, sofisticado y profundamente práctico.",
    insights: [
      "Valoras los espacios que evolucionan contigo sin perder coherencia",
      "Buscas materiales de calidad que no requieran mantenimiento complejo",
      "El equilibrio entre estética y funcionalidad es innegociable para ti",
    ],
    tension:
      "El desafío no resuelto: cómo lograr que lo contemporáneo tenga alma — que no se sienta como un showroom vacío. Esa calidez dentro de la limpieza es exactamente donde trabaja Essenza.",
    cta: "Tu próximo paso es una Consulta de Concepto con Essenza: definimos el lenguaje visual que hace que tu espacio sea contemporáneo y completamente tuyo.",
    palette: ["#2C3E50", "#ECF0F1", "#BDC3C7", "#E8D5B7", "#95A5A6"],
    paletteNames: ["Grafito", "Blanco roto", "Gris claro", "Arena cálida", "Plata"],
    materials: ["Concreto pulido", "Madera de tono medio", "Vidrio templado", "Acero cepillado", "Textiles técnicos"],
    materialImages: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&q=80",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
    ],
    proportions: [
      "60% fondos neutros (blanco roto, gris claro)",
      "30% materiales con textura (madera, concreto)",
      "10% acentos de color o metal",
    ],
    avoid: [
      "Mezclar demasiados metales distintos en el mismo espacio",
      "Mobiliario con patas muy ornamentadas — rompen la línea contemporánea",
      "Textiles con estampados muy llamativos como protagonistas",
      "Iluminación cálida exclusiva: se necesita equilibrio con luz neutra",
    ],
  },
  natural: {
    name: "Natural",
    tagline: "Tu espacio respira — y tú también.",
    icon: "◯",
    keywords: ["Orgánico", "Luz", "Bienestar"],
    description:
      "Para ti, un espacio bien diseñado es uno que conecta con algo más grande que sí mismo. La luz natural, los materiales orgánicos, las plantas, la textura real de las cosas — no son detalles decorativos, son el corazón de tu estética. Vives el diseño como un acto de cuidado: hacia ti, hacia quienes te rodean, hacia el entorno.",
    insights: [
      "Buscas materiales con historia: madera recuperada, arcilla, fibras naturales",
      "La luz — natural o artificial — es lo primero que evalúas al entrar a un espacio",
      "El bienestar no es un extra en tu diseño: es el objetivo principal",
    ],
    tension:
      "Lo que todavía no resolviste: cómo lograr que ese mundo orgánico se sienta sofisticado y no rústico. La elegancia natural tiene su propio lenguaje — y Essenza lo habla con fluidez.",
    cta: "Tu próximo paso es una Consulta Biofílica con Essenza: diseñamos un espacio que cuida tu energía y se ve extraordinariamente bien al mismo tiempo.",
    palette: ["#5C4033", "#A8C5A0", "#F5F0E8", "#D4A574", "#8B9E77"],
    paletteNames: ["Tierra", "Salvia", "Marfil cálido", "Terracota", "Verde musgo"],
    materials: ["Madera maciza sin tratar", "Lino y algodón orgánico", "Piedra natural", "Cerámica artesanal", "Ratán y mimbre"],
    materialImages: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
    ],
    proportions: [
      "50% neutros cálidos (marfil, beige, blanco hueso)",
      "30% texturas naturales (madera, piedra, fibra)",
      "20% verde vegetal y tonos tierra",
    ],
    avoid: [
      "Plásticos o materiales sintéticos como protagonistas del espacio",
      "Iluminación fría (luz blanca azulada) — destruye la calidez orgánica",
      "Exceso de plantas sin criterio de composición — genera desorden visual",
      "Mezclar demasiados tonos terrosos sin un neutro que los unifique",
    ],
  },
  japandi: {
    name: "Japandi",
    tagline: "La belleza está en lo que decides no poner.",
    icon: "◑",
    keywords: ["Wabi-sabi", "Serenidad", "Esencia"],
    description:
      "Japandi no es una tendencia para ti — es una filosofía. La fusión entre la sobriedad japonesa y el funcionalismo nórdico resuena contigo porque entiendes que la belleza verdadera no se agrega: se revela al quitar. Cada objeto en tu espacio existe con intención. El vacío no te incomoda — lo cultivas.",
    insights: [
      "Prefieres un solo objeto extraordinario a diez objetos decorativos ordinarios",
      "La imperfección natural de los materiales te parece más bella que la perfección industrial",
      "El silencio visual es para ti tan importante como el silencio sonoro",
    ],
    tension:
      "El reto que enfrentas: que el Japandi se sienta habitado y vivo, no como una instalación de museo. Esa tensión entre austeridad y calidez es donde Essenza construye sus mejores espacios.",
    cta: "Tu próximo paso es una Sesión de Edición Espacial con Essenza: analizamos lo que tienes, eliminamos lo que sobra y potenciamos lo que permanece.",
    palette: ["#3D3530", "#C8B89A", "#F2EDE4", "#7A8B7F", "#B5A99A"],
    paletteNames: ["Sombra cálida", "Bambú", "Papel de arroz", "Celadón", "Piedra pómez"],
    materials: ["Madera de roble o fresno claro", "Lino sin teñir", "Bambú", "Cerámica con esmalte mate irregular", "Papel de arroz (shoji)"],
    materialImages: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    ],
    proportions: [
      "70% fondo neutro muy claro (papel de arroz, blanco cálido)",
      "20% madera y fibra natural de tono medio",
      "10% acento oscuro (negro, carbón, cobre oxidado)",
    ],
    avoid: [
      "Colores saturados o llamativos — rompen la serenidad cromática del conjunto",
      "Objetos decorativos sin función — cada pieza debe tener un propósito",
      "Iluminación excesiva: la penumbra estratégica es parte del diseño",
      "Superficies muy brillantes o lacadas — se prefiere textura mate y opaca",
    ],
  },
  industrial: {
    name: "Industrial",
    tagline: "La estructura es parte del diseño.",
    icon: "⬡",
    keywords: ["Rawness", "Carácter", "Contraste"],
    description:
      "Ves belleza donde otros ven inacabado. Las vigas expuestas, el concreto sin revestir, el metal sin pulir — para ti son lenguaje, no defecto. Tu estética celebra la honestidad estructural: lo que sostiene también decora. Tus espacios tienen carácter porque no temen mostrar de qué están hechos.",
    insights: [
      "Prefieres lo auténtico sobre lo perfecto — la pátina del tiempo te atrae",
      "Los contrastes fuertes (rugoso/suave, metal/madera) definen tu gusto",
      "Aprecias los espacios que cuentan su historia constructiva",
    ],
    tension:
      "El peligro del industrial mal ejecutado: que se sienta frío, inhóspito, más fábrica que hogar. Humanizar esa rudeza sin quitarle carácter es el arte — y es territorio de Essenza.",
    cta: "Tu próximo paso es una Consulta de Contraste con Essenza: definimos cómo equilibrar la dureza industrial con la calidez que hace un espacio verdaderamente habitable.",
    palette: ["#2B2B2B", "#8C7B6B", "#D9D0C7", "#C1440E", "#4A4A4A"],
    paletteNames: ["Carbón", "Óxido suave", "Cemento claro", "Ladrillo", "Hierro"],
    materials: ["Concreto aparente", "Acero negro o corten", "Madera recuperada", "Ladrillo visto", "Cuero natural resistente"],
    materialImages: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
    ],
    proportions: [
      "50% neutros oscuros y medios (gris, carbón, cemento)",
      "30% madera y elementos cálidos que contrasten",
      "20% metal y acentos de color intenso",
    ],
    avoid: [
      "Telas delicadas o muy ornamentadas — contradicen la estética raw",
      "Exceso de elementos decorativos — el estilo industrial respira con espacio",
      "Colores pasteles o muy suaves como protagonistas del ambiente",
      "Iluminación únicamente difusa: las bombillas expuestas son esenciales",
    ],
  },
  minimalista: {
    name: "Minimalista",
    tagline: "Tu espacio habla en silencio — y lo dice todo.",
    icon: "▣",
    keywords: ["Orden", "Presencia", "Nobleza"],
    description:
      "Eres de los que creen que la elegancia no se agrega — se revela. Tus espacios son depuración pura: cada pieza tiene un por qué y lo que no lo tiene, desaparece. No es frialdad, es precisión. Vives el minimalismo como filosofía de vida, no como tendencia pasajera.",
    insights: [
      "Tus espacios proyectan autoridad sin esfuerzo aparente",
      "Gravitas hacia materiales nobles: piedra, lino, madera sin tratar",
      "El orden es tu lenguaje — no tu obsesión",
    ],
    tension:
      "Lo que todavía no resolviste: cómo lograr que el minimalismo se sienta vivo y cálido, y no como un hotel de diseño sin alma. Esa diferencia tiene nombre — y es donde Essenza entra.",
    cta: "Tu próximo paso es una Sesión de Diagnóstico de Espacios con Essenza: 90 minutos donde definimos exactamente qué le falta a tu espacio para que sea verdaderamente tuyo.",
    palette: ["#1C1C1C", "#FFFFFF", "#E8E4DE", "#C9B99A", "#8A8A8A"],
    paletteNames: ["Negro profundo", "Blanco puro", "Blanco cálido", "Beige tostado", "Gris medio"],
    materials: ["Mármol o piedra natural", "Madera de grano fino", "Lino y algodón natural", "Vidrio claro", "Metales en acabado mate"],
    materialImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80",
    ],
    proportions: [
      "70% blanco o neutro muy claro como base",
      "20% un material noble con textura visible",
      "10% acento oscuro o metálico puntual",
    ],
    avoid: [
      "Más de 3 materiales o texturas protagonistas en el mismo ambiente",
      "Objetos sin función — cada pieza debe justificar su presencia visual",
      "Patrones o estampados como elementos principales del espacio",
      "Almacenamiento visible — el orden debe ser parte del diseño",
    ],
  },
};

const QUESTIONS = [
  {
    id: 1,
    text: "Cuando entras a un espacio por primera vez, lo primero que notas es:",
    options: [
      { letter: "A", text: "Si el espacio tiene orden y coherencia visual.", profile: "minimalista" },
      { letter: "B", text: "La luz y si hay naturaleza en el espacio.", profile: "natural" },
      { letter: "C", text: "Si es moderno y funcional.", profile: "contemporaneo" },
      { letter: "D", text: "Si tiene carácter, con elementos diferenciadores.", profile: "industrial" },
      { letter: "E", text: "Si es un espacio que invita a relajarse, a estar en calma.", profile: "japandi" },
    ],
  },
  {
    id: 2,
    text: "Para ti, el lujo en un espacio es:",
    options: [
      { letter: "A", text: "Que nada sobre y nada falte.", profile: "minimalista" },
      { letter: "B", text: "Aire limpio, luz natural, plantas.", profile: "natural" },
      { letter: "C", text: "Que todo sea funcional y práctico.", profile: "contemporaneo" },
      { letter: "D", text: "Un espacio que represente carácter y personalidad.", profile: "industrial" },
      { letter: "E", text: "El orden visual, que cada objeto tenga sentido.", profile: "japandi" },
    ],
  },
  {
    id: 3,
    text: "Si tuvieras que describir tu espacio ideal en una imagen, sería:",
    options: [
      { letter: "A", text: "Una mesa de mármol blanco con una sola vela encima.", profile: "minimalista" },
      { letter: "B", text: "Una habitación con plantas, madera natural y luz suave.", profile: "natural" },
      { letter: "C", text: "Un loft con tecnología integrada, líneas limpias y muy bien iluminado.", profile: "contemporaneo" },
      { letter: "D", text: "Vigas de metal expuestas, ladrillo visto y madera recuperada.", profile: "industrial" },
      { letter: "E", text: "Un espacio casi vacío donde cada objeto merece toda tu atención.", profile: "japandi" },
    ],
  },
  {
    id: 4,
    text: "Tu mayor miedo al diseñar o decorar un espacio es:",
    options: [
      { letter: "A", text: "Que quede recargado o sin coherencia visual.", profile: "minimalista" },
      { letter: "B", text: "Usar materiales que se vean artificiales o de baja calidad.", profile: "natural" },
      { letter: "C", text: "Que no sea práctico o parezca pasado de moda pronto.", profile: "contemporaneo" },
      { letter: "D", text: "Que quede genérico y sin personalidad real.", profile: "industrial" },
      { letter: "E", text: "Que haya demasiados objetos sin propósito que rompan la armonía.", profile: "japandi" },
    ],
  },
  {
    id: 5,
    text: "¿Cómo describirías tu relación con los objetos y la decoración?",
    options: [
      { letter: "A", text: "Prefiero muy pocas cosas, pero que cada una sea perfecta.", profile: "minimalista" },
      { letter: "B", text: "Me gustan los objetos con historia natural o artesanal.", profile: "natural" },
      { letter: "C", text: "Elijo lo que funciona y se integra sin protagonismos.", profile: "contemporaneo" },
      { letter: "D", text: "Me atraen los materiales nobles: madera, acero, cuero.", profile: "industrial" },
      { letter: "E", text: "Prefiero un solo objeto extraordinario a diez ordinarios.", profile: "japandi" },
    ],
  },
  {
    id: 6,
    text: "Cuando llegas a casa después de un día largo, necesitas que tu espacio te dé:",
    options: [
      { letter: "A", text: "Orden absoluto. Que todo esté en su lugar.", profile: "minimalista" },
      { letter: "B", text: "Paz. Luz suave, tener plantas, silencio.", profile: "natural" },
      { letter: "C", text: "Comodidad y practicidad.", profile: "contemporaneo" },
      { letter: "D", text: "Carácter. Que el espacio se sienta propio e intenso.", profile: "industrial" },
      { letter: "E", text: "Serenidad profunda. Un espacio que libera la mente.", profile: "japandi" },
    ],
  },
  {
    id: 7,
    text: "¿Cómo sueles descubrir o inspirarte en tendencias de diseño?",
    options: [
      { letter: "A", text: "Busco referencias en Pinterest o Instagram y guardo lo que me llama la atención.", profile: "contemporaneo" },
      { letter: "B", text: "Me inspiro en lo que veo en cafés, hoteles o tiendas que me gustan.", profile: "natural" },
      { letter: "C", text: "Sigo cuentas de diseño o interiorismo que admiro.", profile: "japandi" },
      { letter: "D", text: "Me baso en lo que ya tengo y busco mejorar desde ahí.", profile: "minimalista" },
      { letter: "E", text: "Prefiero explorar tiendas o ferias de diseño y descubrir cosas en persona.", profile: "industrial" },
    ],
  },
];

const SPACE_OPTS = {
  tipo: ["Apartamento", "Casa", "Oficina", "Local comercial", "Otro"],
  intervencion: [
    "Ajustes menores (textiles, iluminación, piezas clave)",
    "Renovación Parcial (mobiliario principal + ajustes)",
    "Transformación Completa del Espacio",
  ],
  formas: ["Rectas y geométricas", "Curvas y orgánicas", "Mixtas"],
  sensacion: ["Calma y serenidad", "Energía y dinamismo", "Calidez y confort", "Lujo y sofisticación"],
  foco: ["Funcionalidad", "Estética", "Sostenibilidad", "Otro"],
};

function getProfile(answers) {
  const count = {};
  answers.forEach((a) => {
    count[a] = (count[a] || 0) + 1;
  });
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

async function generateAI(profileKey, sd) {
  const p = PROFILES[profileKey];
  const prompt = `Eres un interiorista senior de Essenza Studio. Genera una propuesta conceptual personalizada y concreta.

Estilo dominante: ${p.name}
Tipo de espacio: ${sd.tipo}
Metros cuadrados: ${sd.m2}
Nivel de intervención: ${sd.intervencion}
Formas preferidas: ${sd.formas}
Paleta de referencia: ${p.paletteNames.join(", ")}
Sensación deseada: ${sd.sensacion}
Prioridad del cliente: ${sd.foco === "Otro" ? sd.focoOtro || "No especificado" : sd.foco}

Responde con estos 7 títulos exactos en mayúsculas, seguidos de su contenido. Sé específico, evita frases genéricas. Máximo 1000 tokens en total.

CONCEPTO GENERAL
MATERIALES RECOMENDADOS
PALETA DE COLOR
MOBILIARIO CLAVE
ILUMINACIÓN
TRES ELEMENTOS DIFERENCIALES
SÍNTESIS FINAL

Tono: profesional, elegante, directo. Español neutro.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  return data.content?.map((b) => b.text || "").join("\n") || "";
}

function generatePDF(pk, sd, ai) {
  const p = PROFILES[pk];

  const formatAI = (text) => {
    if (!text) return "";
    return text
      .split("\n\n")
      .filter((s) => s.trim())
      .map((block) => {
        const lines = block.trim().split("\n");
        const heading = lines[0].replace(/\*+/g, "").trim();
        const body = lines.slice(1).join("<br>").replace(/\*+/g, "").trim();
        if (!body) {
          return `<p style="font-weight:300;font-size:9pt;line-height:1.7;color:#3A2E30;margin-bottom:4mm">${heading}</p>`;
        }
        return `<div style="margin-bottom:5mm">
          <div style="font-weight:500;color:#002952;font-size:7pt;letter-spacing:4px;text-transform:uppercase;margin-bottom:2.5mm;padding-bottom:2mm;border-bottom:.5px solid #D4C4C7">${heading}</div>
          <div style="font-weight:300;color:#3A2E30;font-size:9pt;line-height:1.7">${body}</div>
        </div>`;
      })
      .join("");
  };

  const divider = `<div style="display:flex;align-items:center;gap:3mm;margin:7mm 0">
    <div style="flex:1;border-top:1px dashed #D4C4C7"></div>
  </div>`;

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Plan Base Essenza — ${p.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Jost', sans-serif; width: 210mm; background: #FAFAF5; }
.pg { width: 210mm; min-height: 297mm; page-break-after: always; display: flex; flex-direction: column; overflow: hidden; }
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="pg" style="background:#002952; justify-content:space-between;">
  <div style="padding:14mm 14mm 0">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;color:#FAFAF5;font-size:13pt;letter-spacing:5px">essenza®</div>
    <div style="font-weight:300;color:#667978;font-size:7pt;letter-spacing:5px;text-transform:uppercase;margin-top:3mm">Plan Base de Interiorismo · Diagnóstico de Estilo</div>
  </div>
  <div style="padding:0 14mm;flex:1;display:flex;flex-direction:column;justify-content:center;">
    <div style="font-weight:300;color:#667978;font-size:7pt;letter-spacing:5px;text-transform:uppercase;margin-bottom:5mm">Tu perfil es</div>
    <div style="font-size:50pt;color:#FAFAF5;opacity:.1;line-height:1;margin-bottom:3mm">${p.icon}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-weight:300;color:#FAFAF5;font-size:38pt;line-height:1.1;margin-bottom:5mm">${p.name}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#A89C9E;font-size:14pt;line-height:1.4">${p.tagline}</div>
    <div style="display:flex;gap:4mm;margin-top:10mm;flex-wrap:wrap">
      ${p.keywords.map((k) => `<div style="border:.5px solid #667978;padding:2mm 5mm;font-size:7pt;color:#667978;letter-spacing:3px;text-transform:uppercase">${k}</div>`).join("")}
    </div>
  </div>
  <div style="padding:8mm 14mm;border-top:.5px solid #1A3A5C;display:flex;justify-content:space-between;">
    <div style="font-size:7pt;color:#667978;letter-spacing:2px">Plan Base · ${new Date().getFullYear()}</div>
    <div style="font-size:7pt;color:#667978;letter-spacing:2px">essenza.co</div>
  </div>
</div>

<!-- PAGE 2: PROFILE -->
<div class="pg" style="background:#FAFAF5;padding:14mm;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12mm;padding-bottom:4mm;border-bottom:.5px solid #D4C4C7">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;color:#002952;font-size:11pt;letter-spacing:3px">essenza®</div>
    <div style="font-weight:300;color:#A89C9E;font-size:7pt;letter-spacing:4px;text-transform:uppercase">Diagnóstico de estilo</div>
  </div>
  <div style="font-weight:300;color:#D4C4C7;font-size:28pt;line-height:1;margin-bottom:1mm">01</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:17pt;margin-bottom:5mm">Así es tu relación con el espacio</div>
  <div style="font-weight:300;color:#3A2E30;font-size:9.5pt;line-height:1.75;margin-bottom:7mm">${p.description}</div>
  ${divider}
  <div style="font-weight:300;color:#D4C4C7;font-size:22pt;line-height:1;margin-bottom:1mm">02</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:14pt;margin-bottom:5mm">Lo que tu estilo revela</div>
  ${p.insights.map((i) => `<div style="display:flex;gap:8mm;padding:3mm 0 3mm 7mm;border-bottom:.5px solid #EBFCFF;position:relative"><span style="position:absolute;left:0;color:#667978">—</span><span style="font-weight:300;font-size:9pt;color:#002952;line-height:1.5">${i}</span></div>`).join("")}
  <div style="background:#002952;padding:8mm;margin-top:auto;">
    <div style="font-size:7pt;color:#667978;letter-spacing:4px;text-transform:uppercase;margin-bottom:3mm">Tu tensión creativa</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12pt;color:#FAFAF5;line-height:1.65">${p.tension}</div>
  </div>
</div>

<!-- PAGE 3: STYLE GUIDE -->
<div class="pg" style="background:#FAFAF5;padding:14mm;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12mm;padding-bottom:4mm;border-bottom:.5px solid #D4C4C7">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;color:#002952;font-size:11pt;letter-spacing:3px">essenza®</div>
    <div style="font-weight:300;color:#A89C9E;font-size:7pt;letter-spacing:4px;text-transform:uppercase">Guía de estilo</div>
  </div>
  <div style="font-weight:300;color:#D4C4C7;font-size:26pt;line-height:1;margin-bottom:1mm">03</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:16pt;margin-bottom:4mm">Tu paleta de color</div>
  <div style="display:flex;gap:4mm;margin:5mm 0 8mm">
    ${p.palette.map((col, i) => `<div style="flex:1"><div style="height:14mm;background:${col};border-radius:2px"></div><div style="font-size:6pt;color:#A89C9E;letter-spacing:2px;text-transform:uppercase;margin-top:2mm;text-align:center">${p.paletteNames[i]}</div></div>`).join("")}
  </div>
  ${divider}
  <div style="font-weight:300;color:#D4C4C7;font-size:22pt;line-height:1;margin-bottom:1mm">04</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:13pt;margin-bottom:3mm">Proporciones cromáticas ideales</div>
  ${p.proportions.map((pr) => `<div style="display:flex;gap:8mm;padding:3mm 0 3mm 7mm;border-bottom:.5px solid #EBFCFF;position:relative"><span style="position:absolute;left:0;color:#667978">—</span><span style="font-weight:300;font-size:9pt;color:#002952;line-height:1.5">${pr}</span></div>`).join("")}
  ${divider}
  <div style="font-weight:300;color:#D4C4C7;font-size:22pt;line-height:1;margin-bottom:1mm">05</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:13pt;margin-bottom:3mm">Materiales recomendados</div>
  <div style="display:flex;gap:4mm;margin-bottom:6mm">
    ${p.materialImages.slice(0, 5).map((img, i) => `<div style="flex:1;text-align:center"><img src="${img}" style="width:100%;height:20mm;object-fit:cover;border-radius:2px" /><div style="font-size:5.5pt;color:#A89C9E;letter-spacing:1px;text-transform:uppercase;margin-top:2mm;line-height:1.3">${p.materials[i]}</div></div>`).join("")}
  </div>
  ${divider}
  <div style="font-weight:300;color:#D4C4C7;font-size:22pt;line-height:1;margin-bottom:1mm">06</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:13pt;margin-bottom:3mm">Errores que debes evitar</div>
  ${p.avoid.map((a) => `<div style="display:flex;gap:8mm;padding:3mm 0 3mm 7mm;border-bottom:.5px solid #FFE8E8;position:relative"><span style="position:absolute;left:0;color:#C1440E;font-weight:400">✕</span><span style="font-weight:300;font-size:9pt;color:#3A2E30;line-height:1.5">${a}</span></div>`).join("")}
</div>

<!-- PAGE 4: AI PROPOSAL -->
<div class="pg" style="background:#FAFAF5;padding:14mm;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12mm;padding-bottom:4mm;border-bottom:.5px solid #D4C4C7">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;color:#002952;font-size:11pt;letter-spacing:3px">essenza®</div>
    <div style="font-weight:300;color:#A89C9E;font-size:7pt;letter-spacing:4px;text-transform:uppercase">Propuesta personalizada</div>
  </div>
  <div style="font-weight:300;color:#D4C4C7;font-size:26pt;line-height:1;margin-bottom:1mm">07</div>
  <div style="font-family:'Cormorant Garamond',serif;font-weight:600;color:#002952;font-size:16pt;margin-bottom:5mm">Tu espacio, diseñado por Essenza</div>
  <div style="background:#EBFCFF;padding:8mm;border-left:3px solid #002952;margin-bottom:8mm">
    <div style="font-weight:300;color:#002952;font-size:9pt;line-height:1.6">Perfil <strong>${p.name}</strong> · ${sd.m2} m² · ${sd.tipo} · ${sd.sensacion}</div>
  </div>
  ${formatAI(ai)}
  <div style="background:#002952;padding:8mm;margin-top:auto;">
    <div style="font-size:7pt;color:#667978;letter-spacing:4px;text-transform:uppercase;margin-bottom:3mm">Tu próximo paso</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11pt;color:#FAFAF5;line-height:1.65">${p.cta}</div>
  </div>
</div>

<!-- PAGE 5: CLOSING -->
<div class="pg" style="background:#1A0D1A;justify-content:space-between;padding:14mm;">
  <div>
    <div style="font-size:7pt;color:#667978;letter-spacing:5px;text-transform:uppercase;margin-bottom:8mm">Los 5 perfiles Essenza</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm">
      ${Object.entries(PROFILES)
        .map(
          ([key, prof]) => `
        <div style="background:${key === pk ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)"};border:.5px solid ${key === pk ? "#667978" : "#2A1D2A"};padding:6mm">
          <div style="font-size:16pt;color:#667978;margin-bottom:2mm;opacity:${key === pk ? 1 : 0.4}">${prof.icon}</div>
          <div style="font-family:'Cormorant Garamond',serif;font-weight:300;color:#FAFAF5;font-size:12pt;margin-bottom:2mm">${prof.name}${key === pk ? " ✦" : ""}</div>
          <div style="font-size:7pt;color:#667978;letter-spacing:2px;text-transform:uppercase">${prof.keywords[0]}</div>
        </div>`
        )
        .join("")}
    </div>
  </div>
  <div style="border-top:.5px solid #2A1D2A;padding-top:8mm">
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;color:#FAFAF5;font-size:16pt;letter-spacing:4px;margin-bottom:3mm">essenza®</div>
    <div style="font-size:7pt;color:#667978;letter-spacing:3px;text-transform:uppercase;margin-bottom:5mm">Espacios para poder ser.</div>
    <div style="font-size:8pt;color:#A89C9E;line-height:1.8">Somos creadoras de espacios que potencian el ser de cada persona.<br>hello@essenza.co · essenza.co</div>
  </div>
</div>

</body>
</html>`);
  win.document.close();
  setTimeout(() => win.print(), 900);
}

// ─── FONTS ────────────────────────────────────────────────
const GF = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`;

// ─── LOGO COMPONENT ───────────────────────────────────────
const LOGO_B64 = "data:image/png;base64,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qT2eePzRLzdv2kBkKUGSiRjRNYXYlkGkZJyoikQMXSWJeIn3c8vUia4p+1zJRIxoqkwIsQghFrEtg2iqTEqKC8nGDevIVVddcWcm+l9eueaaq0csWrSAEGIRTVOIZRneZZo60XWVqKpMZDlJJClBbMsghq4S09C850//Tr8XRU4SQ5eJaShESpYQWYoR29KIZapk3do15JWXX5x27jndr872WOvVrdPsugHXjHx0zEOfzJo53Uyd85qaJLalEUIMomsSUeQ40TXJex/oexIrLiF333nX69nue0Vk4MABD/722xxiGBqxLIMkk3GiaQqR5SRRFIkYhkZs2/TmomFohBCLyFKCJOIlxLYMYlsGScRLSDIR8955VZGIpiaJqiQIsXVCiEEK9+wgW7dsIK+PfXXmZb0vGZ6tMV43oN+ob77+cuvOHdsIIZY3n0xDcd+PuNtfmZiGRohtEsvUiaGr3ruVeum6SiQpQVR3jTMMjcTjJSSRiBHLMgghFpk4ccKSM8/sdHG2xujzTy677NKbli1bQhRFIgl3bmqaQhLxEqIq0j7rpyIn9/n+k4kYScSLiKHLRNcksvbvP8kLzz895YxOHS7IRF/btW3d7bVXX/51+7YtRFUkQohFpGTc24N1TSHENommyt5cNXTV+7vtzjtdU7zfNQ2NGLrq3W/azz9KXTqfcVBrvM9eBlx3zci/1qwihqmQktgeIsnOXkUIIbt27SJnn3121vbP0047rdecOXOIYTh7u64pjoxlm5484KxtKomVFJE//1hJJrz15oLzevUYkIn+1Ktbq+kdt9/80pLF8719W5GThNgmIcQilqkTTZW9S5GT3jsmSQlHjnE/axgakeUk0TSFGIZGTFMnsVgxue++EW9lou9lmREj7n7TMDRysMv0r1JeShm9nP7R92jrlk0HyEWTW06qU6vx62NfnilLMUJs3dsnCTEcWc/WiWkoRJZiJJkoJromEUIMYlsqkZIl3l5F97BkIkYsUyerVq4g77/3zoquXc7sXbvWCQ0z1f82rVt0efaZJ75btXIZIcQgqpJwx6B65yf6XVA5UJGTRJYS3rk2Vf6j53pJSnj/pigSkaQEmTTpu92d/T237HDjjTc8vnLlCmJZhneo1l2hXpHjxDJVYlsa0dSkt7HRQ7ShyyRWsocQohPTkMlnn374d9cup2f1yx10/XUP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";

function Logo({ light, size = 28 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <img
        src={LOGO_B64}
        alt="essenza"
        style={{
          height: size,
          width: "auto",
          filter: light ? "none" : "invert(1)",
        }}
      />
      <sup
        style={{
          fontSize: size * 0.38,
          color: light ? C.powder : C.oxford,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          marginTop: -(size * 0.5),
          letterSpacing: 0,
        }}
      >
        ®
      </sup>
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────
function Btn({ children, onClick, light, disabled }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle = {
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
    fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    padding: "15px 40px",
    cursor: disabled ? "default" : "pointer",
    border: "1px solid",
    transition: "all .3s",
    opacity: disabled ? 0.45 : 1,
  };
  const colorStyle = light
    ? {
        background: hovered ? C.powder : "transparent",
        color: hovered ? C.oxford : C.powder,
        borderColor: C.powder,
      }
    : {
        background: hovered ? "#1A3A5C" : C.oxford,
        color: C.powder,
        borderColor: C.oxford,
      };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...baseStyle, ...colorStyle }}
    >
      {children}
    </button>
  );
}

function TopBar({ label }) {
  return (
    <div
      style={{
        background: C.oxford,
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Logo light size={20} />
      <div
        style={{
          fontWeight: 300,
          color: C.nickel,
          fontSize: 9,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "28px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          borderTop: "1px dashed",
          borderColor: C.silver,
          opacity: 0.6,
        }}
      />
    </div>
  );
}

// ─── SCREENS ──────────────────────────────────────────────
function Intro({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.oxford,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 24px",
        fontFamily: "'Jost', sans-serif",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.1s",
      }}
    >
      <style>{GF}</style>
      <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "center" }}>
          <Logo light size={36} />
        </div>
        <div
          style={{
            width: 28,
            height: 0.5,
            background: C.nickel,
            margin: "0 auto 44px",
          }}
        />
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: C.powder,
            fontSize: "clamp(26px, 4vw, 38px)",
            lineHeight: 1.25,
            marginBottom: 20,
          }}
        >
          Descubre tu estilo
        </h1>
        <p
          style={{
            fontWeight: 300,
            color: C.shadows,
            fontSize: 14,
            lineHeight: 1.9,
            marginBottom: 44,
          }}
        >
          Obtén tu diagnóstico y Plan Base en PDF
        </p>
        <Btn onClick={onStart} light>
          Comenzar
        </Btn>
      </div>
    </div>
  );
}

function Quiz({ question, total, current, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setSelected(null);
    setAnim(false);
    setTimeout(() => setAnim(true), 60);
  }, [question.id]);

  const handle = (opt) => {
    if (selected) return;
    setSelected(opt.letter);
    setTimeout(() => onAnswer(opt.profile), 440);
  };

  const progress = ((current - 1) / total) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.powder,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Jost', sans-serif",
        opacity: anim ? 1 : 0,
        transition: "opacity .5s",
      }}
    >
      <style>{GF}</style>
      <TopBar label={`${current} / ${total}`} />
      <div style={{ height: 2, background: C.azure }}>
        <div
          style={{
            height: "100%",
            background: C.oxford,
            width: `${progress}%`,
            transition: "width .4s",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "36px 28px",
          maxWidth: 580,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            fontWeight: 300,
            color: C.shadows,
            fontSize: 9,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Pregunta {current}
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: C.oxford,
            fontSize: "clamp(18px, 3.2vw, 26px)",
            lineHeight: 1.4,
            marginBottom: 30,
          }}
        >
          {question.text}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt) => {
            const isSelected = selected === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => handle(opt)}
                onMouseEnter={(e) => {
                  if (!selected) e.currentTarget.style.borderColor = C.oxford;
                }}
                onMouseLeave={(e) => {
                  if (!selected && !isSelected)
                    e.currentTarget.style.borderColor = C.silver;
                }}
                style={{
                  background: isSelected ? C.oxford : "#fff",
                  border: `1px solid ${isSelected ? C.oxford : C.silver}`,
                  padding: "13px 16px",
                  cursor: selected ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textAlign: "left",
                  transition: "all .3s",
                  transform: isSelected ? "translateX(5px)" : "none",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    background: isSelected ? C.powder : C.oxford,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 9,
                    color: isSelected ? C.oxford : C.powder,
                    flexShrink: 0,
                    transition: "all .3s",
                  }}
                >
                  {opt.letter}
                </div>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: 13,
                    color: isSelected ? C.powder : C.dark,
                    lineHeight: 1.5,
                  }}
                >
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Form({ profileKey, onSubmit }) {
  const p = PROFILES[profileKey];
  const [form, setForm] = useState({
    tipo: "",
    m2: "",
    intervencion: "",
    formas: "",
    sensacion: "",
    foco: "",
    focoOtro: "",
  });
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnim(true), 80);
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const requiredFilled =
    form.tipo &&
    form.m2.trim() &&
    form.intervencion &&
    form.formas &&
    form.sensacion &&
    form.foco &&
    (form.foco !== "Otro" || form.focoOtro.trim());

  const Chips = ({ field, opts }) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {opts.map((o) => {
        const active = form[field] === o;
        return (
          <button
            key={o}
            onClick={() => set(field, o)}
            style={{
              background: active ? C.oxford : "#fff",
              border: `1px solid ${active ? C.oxford : C.silver}`,
              padding: "9px 16px",
              cursor: "pointer",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: active ? C.powder : C.dark,
              transition: "all .25s",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );

  const Lbl = ({ t }) => (
    <div
      style={{
        fontWeight: 300,
        color: C.shadows,
        fontSize: 9,
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 10,
        marginTop: 22,
      }}
    >
      {t}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.powder,
        fontFamily: "'Jost', sans-serif",
        opacity: anim ? 1 : 0,
        transition: "opacity .6s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{GF}</style>
      <TopBar label="Tu espacio" />
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "40px 28px 60px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: C.oxford,
            fontSize: "clamp(22px, 3.5vw, 32px)",
            lineHeight: 1.3,
            marginBottom: 10,
          }}
        >
          Cuéntanos sobre
          <br />
          tu espacio
        </div>
        <p
          style={{
            fontWeight: 300,
            color: C.shadows,
            fontSize: 13,
            lineHeight: 1.75,
            marginBottom: 28,
          }}
        >
          Con esta información generamos tu propuesta conceptual personalizada.
        </p>
        <div
          style={{
            background: C.azure,
            padding: "12px 18px",
            borderLeft: `3px solid ${C.oxford}`,
            marginBottom: 6,
          }}
        >
          <div style={{ fontWeight: 300, color: C.oxford, fontSize: 12 }}>
            Tu perfil: <strong style={{ fontWeight: 500 }}>{p.name}</strong>
          </div>
        </div>

        <Lbl t="Tipo de espacio" />
        <Chips field="tipo" opts={SPACE_OPTS.tipo} />

        <Lbl t="Metros cuadrados aproximados" />
        <input
          value={form.m2}
          onChange={(e) => set("m2", e.target.value)}
          placeholder="Ej: 65"
          style={{
            width: "100%",
            padding: "12px 14px",
            border: `1px solid ${C.silver}`,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: C.dark,
            background: "#fff",
            outline: "none",
          }}
        />

        <Lbl t="Nivel de intervención" />
        <Chips field="intervencion" opts={SPACE_OPTS.intervencion} />

        <Lbl t="Tipo de formas que prefieres" />
        <Chips field="formas" opts={SPACE_OPTS.formas} />

        <Lbl t="Sensación que quieres lograr" />
        <Chips field="sensacion" opts={SPACE_OPTS.sensacion} />

        <Lbl t="Lo más importante para ti" />
        <Chips field="foco" opts={SPACE_OPTS.foco} />
        {form.foco === "Otro" && (
          <input
            value={form.focoOtro}
            onChange={(e) => set("focoOtro", e.target.value)}
            placeholder="Cuéntanos qué es lo más importante para ti..."
            style={{
              width: "100%",
              padding: "12px 14px",
              border: `1px solid ${C.silver}`,
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: C.dark,
              background: "#fff",
              outline: "none",
              marginTop: 10,
            }}
          />
        )}

        <div style={{ marginTop: 36, textAlign: "center" }}>
          <Btn onClick={() => onSubmit(form)} disabled={!requiredFilled}>
            Generar mi Plan Base
          </Btn>
          {!requiredFilled && (
            <p
              style={{
                fontWeight: 300,
                color: C.shadows,
                fontSize: 11,
                marginTop: 12,
              }}
            >
              Completa todos los campos para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Loading() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d >= 3 ? 1 : d + 1)), 500);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.oxford,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <style>{GF}</style>
      <div style={{ marginBottom: 40 }}>
        <Logo light size={32} />
      </div>
      <div
        style={{
          fontWeight: 300,
          color: C.nickel,
          fontSize: 10,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        Preparando tu diagnóstico{"·".repeat(dots)}
      </div>
    </div>
  );
}

function Result({ profileKey, spaceData, aiProposal, onRestart }) {
  const p = PROFILES[profileKey];
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const renderAI = () => {
    if (!aiProposal) return null;
    return aiProposal
      .split("\n\n")
      .filter((s) => s.trim())
      .map((sec, i) => {
        const lines = sec.trim().split("\n");
        const heading = lines[0].replace(/\*+/g, "").trim();
        const body = lines.slice(1).join("\n").replace(/\*+/g, "").trim();
        if (!body) {
          return (
            <p key={i} style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: "#3A2E30", marginBottom: 14 }}>
              {heading}
            </p>
          );
        }
        return (
          <div key={i} style={{ marginBottom: 22 }}>
            <div
              style={{
                fontWeight: 400,
                color: C.oxford,
                fontSize: 9,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 8,
                paddingBottom: 6,
                borderBottom: `.5px solid ${C.silver}`,
              }}
            >
              {heading}
            </div>
            <p style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: "#3A2E30", whiteSpace: "pre-line" }}>
              {body}
            </p>
          </div>
        );
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.powder,
        fontFamily: "'Jost', sans-serif",
        opacity: visible ? 1 : 0,
        transition: "opacity .8s",
      }}
    >
      <style>{GF}</style>

      {/* Hero */}
      <div style={{ background: C.oxford, padding: "clamp(44px, 7vw, 72px) 28px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <Logo light size={18} />
        </div>
        <div style={{ fontWeight: 300, color: C.nickel, fontSize: 9, letterSpacing: 6, textTransform: "uppercase", marginBottom: 14 }}>
          Tu perfil es
        </div>
        <div style={{ fontSize: 44, opacity: 0.15, marginBottom: 8 }}>{p.icon}</div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: C.powder,
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          {p.name}
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: C.shadows,
            fontSize: "clamp(13px, 2.2vw, 17px)",
            marginBottom: 24,
          }}
        >
          {p.tagline}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {p.keywords.map((k) => (
            <span key={k} style={{ border: `.5px solid ${C.nickel}`, padding: "5px 14px", fontWeight: 300, color: C.nickel, fontSize: 9, letterSpacing: 4, textTransform: "uppercase" }}>
              {k}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "52px 28px 60px" }}>
        {/* 01 */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>01</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
            Así es tu relación con el espacio
          </div>
          <p style={{ fontWeight: 300, color: "#3A2E30", fontSize: 14, lineHeight: 1.85 }}>{p.description}</p>
        </div>
        <Divider />

        {/* 02 */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>02</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
            Lo que tu estilo revela
          </div>
          {p.insights.map((ins, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "13px 0", borderBottom: `.5px solid ${C.azure}` }}>
              <span style={{ color: C.nickel, flexShrink: 0 }}>—</span>
              <span style={{ fontWeight: 300, color: C.oxford, fontSize: 14, lineHeight: 1.6 }}>{ins}</span>
            </div>
          ))}
        </div>
        <Divider />

        {/* 03 Palette */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>03</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
            Tu paleta de color
          </div>
          <div style={{ display: "flex", gap: 10, margin: "12px 0 18px" }}>
            {p.palette.map((col, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 56, background: col, borderRadius: 2 }} />
                <div style={{ fontWeight: 300, color: C.shadows, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", marginTop: 7, textAlign: "center" }}>
                  {p.paletteNames[i]}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.azure, padding: "16px 20px", borderLeft: `3px solid ${C.oxford}` }}>
            <div style={{ fontWeight: 300, color: C.oxford, fontSize: 9, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>
              Proporciones ideales
            </div>
            {p.proportions.map((pr, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "8px 0", borderBottom: i < p.proportions.length - 1 ? `.5px solid #C8DDEF` : "none" }}>
                <span style={{ color: C.nickel, flexShrink: 0 }}>—</span>
                <span style={{ fontWeight: 300, color: C.oxford, fontSize: 13 }}>{pr}</span>
              </div>
            ))}
          </div>
        </div>
        <Divider />

        {/* 04 Materials */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>04</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
            Materiales recomendados
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
            {p.materialImages.map((img, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 4,
                    background: C.azure,
                  }}
                >
                  <img
                    src={img}
                    alt={p.materials[i]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div style={{ fontWeight: 300, color: C.shadows, fontSize: 9, letterSpacing: 1, marginTop: 6, lineHeight: 1.3, textAlign: "center" }}>
                  {p.materials[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider />

        {/* 05 Avoid */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>05</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
            Errores que debes evitar
          </div>
          {p.avoid.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "13px 0", borderBottom: `.5px solid #FFE8E8` }}>
              <span style={{ color: "#C1440E", flexShrink: 0, fontWeight: 400 }}>✕</span>
              <span style={{ fontWeight: 300, color: "#3A2E30", fontSize: 13, lineHeight: 1.65 }}>{a}</span>
            </div>
          ))}
        </div>
        <Divider />

        {/* Tension */}
        <div style={{ background: C.oxford, padding: "26px 30px", marginBottom: 36 }}>
          <div style={{ fontWeight: 300, color: C.nickel, fontSize: 9, letterSpacing: 5, textTransform: "uppercase", marginBottom: 12 }}>
            Tu tensión creativa
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.powder, fontSize: 16, lineHeight: 1.7 }}>
            {p.tension}
          </p>
        </div>

        {/* 06 AI */}
        {aiProposal && (
          <>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 300, color: C.silver, fontSize: 24, lineHeight: 1, marginBottom: 2 }}>06</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: C.oxford, fontSize: 18, marginBottom: 16 }}>
                Tu propuesta conceptual
              </div>
              <div style={{ background: "#fff", border: `.5px solid ${C.silver}`, padding: "26px", marginTop: 8 }}>
                <div style={{ fontWeight: 300, color: C.shadows, fontSize: 10, marginBottom: 18, paddingBottom: 14, borderBottom: `.5px solid ${C.azure}` }}>
                  {p.name} · {spaceData.m2} m² · {spaceData.tipo} · {spaceData.sensacion}
                </div>
                {renderAI()}
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* CTA */}
        <div style={{ background: C.azure, padding: "24px 28px", borderLeft: `3px solid ${C.oxford}`, marginBottom: 44 }}>
          <div style={{ fontWeight: 300, color: C.oxford, fontSize: 9, letterSpacing: 5, textTransform: "uppercase", marginBottom: 12 }}>
            Tu próximo paso
          </div>
          <p style={{ fontWeight: 300, color: C.oxford, fontSize: 14, lineHeight: 1.8 }}>{p.cta}</p>
        </div>

        {/* Download */}
        <div style={{ textAlign: "center", padding: "36px 0", borderTop: `.5px solid ${C.silver}`, borderBottom: `.5px solid ${C.silver}`, marginBottom: 44 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.nickel, fontSize: 14, marginBottom: 22 }}>
            Espacios para poder ser.
          </div>
          <Btn onClick={() => generatePDF(profileKey, spaceData, aiProposal)}>
            Descargar Plan Base (PDF)
          </Btn>
          <p style={{ fontWeight: 300, color: C.shadows, fontSize: 11, marginTop: 12 }}>
            5 páginas · diagnóstico completo + propuesta personalizada
          </p>
        </div>

        {/* Profile grid */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 300, color: C.shadows, fontSize: 9, letterSpacing: 5, textTransform: "uppercase", marginBottom: 20 }}>
            Los 5 perfiles Essenza
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.entries(PROFILES).map(([key, prof]) => (
              <div
                key={key}
                style={{
                  padding: "14px 18px",
                  border: `1px solid ${key === profileKey ? C.oxford : C.silver}`,
                  background: key === profileKey ? C.oxford : "transparent",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 5, opacity: key === profileKey ? 1 : 0.35 }}>{prof.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 14, color: key === profileKey ? C.powder : C.oxford, marginBottom: 4 }}>
                  {prof.name}
                </div>
                <div style={{ fontWeight: 300, fontSize: 9, color: key === profileKey ? C.nickel : C.shadows, letterSpacing: 2, textTransform: "uppercase" }}>
                  {prof.keywords[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onRestart}
            style={{
              background: "transparent",
              border: `1px solid ${C.silver}`,
              color: C.shadows,
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 9,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: "11px 28px",
              cursor: "pointer",
            }}
          >
            Volver a empezar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [profileKey, setProfileKey] = useState(null);
  const [spaceData, setSpaceData] = useState(null);
  const [aiProposal, setAIProposal] = useState(null);

  const handleAnswer = (profile) => {
    const next = [...answers, profile];
    setAnswers(next);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setProfileKey(getProfile(next));
      setStep("form");
    }
  };

  const handleForm = async (data) => {
    setSpaceData(data);
    setStep("loading");
    try {
      const proposal = await generateAI(profileKey, data);
      setAIProposal(proposal);
    } catch (e) {
      setAIProposal("No fue posible generar la propuesta en este momento.");
    }
    setStep("result");
  };

  const restart = () => {
    setStep("intro");
    setCurrent(0);
    setAnswers([]);
    setProfileKey(null);
    setSpaceData(null);
    setAIProposal(null);
  };

  if (step === "intro") return <Intro onStart={() => setStep("quiz")} />;
  if (step === "quiz")
    return (
      <Quiz
        question={QUESTIONS[current]}
        total={QUESTIONS.length}
        current={current + 1}
        onAnswer={handleAnswer}
      />
    );
  if (step === "form") return <Form profileKey={profileKey} onSubmit={handleForm} />;
  if (step === "loading") return <Loading />;
  if (step === "result")
    return (
      <Result
        profileKey={profileKey}
        spaceData={spaceData}
        aiProposal={aiProposal}
        onRestart={restart}
      />
    );
}
