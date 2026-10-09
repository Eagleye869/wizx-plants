const CREDIT = "The image-based plant species identification service used, is based on the Pl@ntNet recognition API, regularly updated and accessible through the site https://my.plantnet.org/";
const DAILY_LIMIT = 500;
const $ = (id) => document.getElementById(id);

const CARE = [
  { names: ["epipremnum aureum", "pothos", "devil's ivy"], waterEveryDays: 10, light: "medium", soil: "A potting mix that drains. Empty the saucer after watering.", care: "Water when the top of the soil is dry. Yellow leaves often mean the soil stayed wet too long.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["monstera deliciosa", "monstera", "swiss cheese plant"], waterEveryDays: 7, light: "bright", soil: "A chunky mix that drains.", care: "Bright indirect light. Water when the top inch of soil is dry. A leaf with no splits can mean it wants more light." },
  { names: ["dracaena trifasciata", "sansevieria trifasciata", "snake plant"], waterEveryDays: 21, light: "medium", soil: "A cactus or draining mix.", care: "Let the soil dry through before you water again. Wet soil in a cool room is the usual way these rot.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["spathiphyllum", "peace lily"], waterEveryDays: 7, light: "medium", soil: "A potting mix that stays lightly moist, not soggy.", care: "It droops when it is thirsty and usually stands back up after a drink. Do not leave it standing in water.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["zamioculcas zamiifolia", "zz plant"], waterEveryDays: 21, light: "low", soil: "A draining mix.", care: "Water deeply, then wait until the soil is dry. It tolerates a dim corner better than wet soil.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["chlorophytum comosum", "spider plant"], waterEveryDays: 7, light: "bright", soil: "Ordinary potting mix.", care: "Water when the top of the soil is dry. Brown tips often mean the soil dried out hard, or the water is heavy with salts." },
  { names: ["ficus lyrata", "fiddle leaf fig"], waterEveryDays: 8, light: "bright", soil: "A draining potting mix.", care: "Bright light and a steady spot. Water when the top inch is dry. Moving it often makes it drop leaves." },
  { names: ["ficus elastica", "rubber plant"], waterEveryDays: 10, light: "bright", soil: "A draining potting mix.", care: "Water when the top of the soil is dry. Wipe the leaves so they can take in light." },
  { names: ["aloe vera", "aloe"], waterEveryDays: 18, light: "bright", soil: "A cactus mix.", care: "Bright light. Let the soil dry before watering. Soft, pale leaves can mean too little light or too much water.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["crassula ovata", "jade plant"], waterEveryDays: 14, light: "bright", soil: "A cactus mix.", care: "Bright light. Water when the leaves start to feel less firm and the soil is dry." },
  { names: ["hedera helix", "english ivy", "ivy"], waterEveryDays: 7, light: "medium", soil: "Potting mix that drains.", care: "Keep the soil lightly moist, then let the surface dry. It likes cooler air more than a hot dry room.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["pilea peperomioides", "chinese money plant"], waterEveryDays: 8, light: "bright", soil: "A draining potting mix.", care: "Bright indirect light. Water when the top inch is dry. Turn the pot now and then so it does not lean." },
  { names: ["phalaenopsis", "moth orchid"], waterEveryDays: 7, light: "medium", soil: "Bark mix, not ordinary soil.", care: "Water when the bark is nearly dry. Do not let water sit in the crown of the leaves. Bright indirect light." },
  { names: ["nephrolepis exaltata", "boston fern"], waterEveryDays: 4, light: "medium", soil: "A mix that holds some moisture.", care: "Keep the soil from drying out completely. Dry air browns the fronds. A bathroom with light often suits it." },
  { names: ["lavandula angustifolia", "lavender"], waterEveryDays: 8, light: "bright", soil: "A gritty mix that dries.", care: "Full sun. Water when the soil is dry. Constantly wet soil rots the crown." },
  { names: ["ocimum basilicum", "basil"], waterEveryDays: 3, light: "bright", soil: "Rich potting mix.", care: "Bright light. Check the soil every couple of days and water when the surface is dry. Pinch flowers off if you want more leaves." },
  { names: ["mentha", "mint"], waterEveryDays: 3, light: "bright", soil: "Potting mix that does not dry out hard.", care: "It drinks more than most herbs. Water when the surface is dry. A pot keeps it from taking over a bed." },
  { names: ["salvia rosmarinus", "rosmarinus officinalis", "rosemary"], waterEveryDays: 8, light: "bright", soil: "A gritty mix.", care: "Full sun and air around the leaves. Let the soil dry between waterings." },
  { names: ["solanum lycopersicum", "tomato"], waterEveryDays: 2, light: "bright", soil: "Rich soil or a deep pot of potting mix.", care: "Full sun. In a pot, check the soil every day in warm weather and water when the top is dry. Uneven watering splits the fruit." },
  { names: ["rosa", "rose"], waterEveryDays: 4, light: "bright", soil: "Soil that drains.", care: "Sun most of the day. Water the soil, not the leaves, when the top is dry. Morning water gives the leaves time to dry." },
  { names: ["hosta"], waterEveryDays: 4, light: "medium", soil: "Soil that holds some moisture.", care: "Shade or morning sun. Water when the surface is dry. Slugs like the leaves, so check under them." },
  { names: ["hydrangea"], waterEveryDays: 3, light: "medium", soil: "Soil that stays evenly moist.", care: "Morning sun and afternoon shade in hot places. Water when the top is dry. Do not let a pot dry out on a hot day." },
  { names: ["dieffenbachia", "dumb cane"], waterEveryDays: 8, light: "medium", soil: "A draining potting mix.", care: "Water when the top inch is dry. Keep it out of harsh midday sun.", pet: "Often reported as harmful to cats and dogs if chewed. Confirm with a veterinarian." },
  { names: ["lilium", "lily"], waterEveryDays: 4, light: "bright", soil: "Soil that drains.", care: "Sun and soil that is moist, not soggy. This note is for true lilies.", pet: "True lilies are widely reported as dangerous to cats, even in small amounts. Keep them away from cats and confirm with a veterinarian." },
  { names: ["nerium oleander", "oleander"], waterEveryDays: 7, light: "bright", soil: "Soil that drains.", care: "Full sun. Water when the soil is dry. Wash your hands after handling it.", pet: "Widely reported as poisonous to people and pets. Confirm with a veterinarian or poison center before you keep it where they can reach it." },
];

let db = null;
let plants = [];
let screen = "today";
let filter = "all";
let draft = null;
let draftPhotos = [];
let shots = [];
let busy = false;
const photoUrls = new Map();

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
}

function norm(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchCare(scientific, commons) {
  const wanted = new Set([norm(scientific), ...(commons || []).map(norm)].filter(Boolean));
  let best = null;
  let general = false;
  for (const row of CARE) {
    for (const name of row.names) {
      if (!wanted.has(name)) continue;
      const broad = !name.includes(" ");
      if (!best || (general && !broad)) {
        best = row;
        general = broad && !row.names.includes(norm(scientific));
      }
    }
  }
  if (best) return { row: best, general };
  const genus = norm(scientific).split(" ")[0];
  if (!genus) return null;
  const genusHit = CARE.find((row) => row.names.includes(genus));
  if (!genusHit) return null;
  return { row: genusHit, general: true };
}

function isoDate(date) {
  const d = date || new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function addDays(iso, days) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + Number(days) || 0);
  return isoDate(d);
}

function prettyDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function waterEvery(plant) {
  const n = Number(plant.waterEveryDays);
  if (!n || n < 1) return 7;
  return Math.min(60, Math.round(n));
}

function nextWater(plant) {
  if (!plant.lastWatered) return null;
  return addDays(plant.lastWatered, waterEvery(plant));
}

function waterState(plant) {
  const next = nextWater(plant);
  const today = isoDate();
  if (!next || next <= today) return "due";
  if (next === addDays(today, 1)) return "soon";
  return "ok";
}

function waterLabel(plant) {
  const next = nextWater(plant);
  if (!plant.lastWatered) return "No watering saved yet. Water if the top of the soil is dry.";
  if (waterState(plant) === "due") return "Due now. Water if the top of the soil is dry.";
  if (waterState(plant) === "soon") return "Due " + prettyDate(next) + ". Check the soil tomorrow.";
  return "Next water " + prettyDate(next) + ".";
}

function quota() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem("plants-quota") || "null"); } catch { raw = null; }
  const day = isoDate();
  if (!raw || raw.day !== day) return { day, sent: 0, remaining: null };
  return raw;
}

function saveQuota(entry) {
  localStorage.setItem("plants-quota", JSON.stringify(entry));
}

function identificationsLeft() {
  const entry = quota();
  const localLeft = Math.max(0, DAILY_LIMIT - (Number(entry.sent) || 0));
  if (entry.remaining == null) return localLeft;
  return Math.max(0, Math.min(localLeft, Number(entry.remaining)));
}

function cleanKey(value) {
  let key = String(value || "").replace(/[\uFEFF\u200B-\u200D]/g, "").trim();
  key = key.replace(/^api-key\s*[:=]\s*/i, "");
  key = key.replace(/^["']+|["']+$/g, "").trim();
  const parts = key.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    parts.sort((a, b) => b.length - a.length);
    return parts[0];
  }
  return key;
}

function apiKey() {
  return cleanKey(localStorage.getItem("plants-api-key") || "");
}

function say(text) {
  $("status").textContent = text || "";
}

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("wizx-plants", 1);
    req.onupgradeneeded = () => {
      const base = req.result;
      if (!base.objectStoreNames.contains("plants")) base.createObjectStore("plants", { keyPath: "id" });
      if (!base.objectStoreNames.contains("photos")) base.createObjectStore("photos");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbAll(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbPut(store, value, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    if (key === undefined) tx.objectStore(store).put(value);
    else tx.objectStore(store).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function idbDelete(store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function photoUrl(id) {
  if (!id) return "";
  if (photoUrls.has(id)) return photoUrls.get(id);
  const blob = await idbGet("photos", id);
  if (!blob) return "";
  const url = URL.createObjectURL(blob);
  photoUrls.set(id, url);
  return url;
}

function blankPlant() {
  return {
    id: uid(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    commonName: "",
    scientificName: "",
    family: "",
    score: null,
    gbifId: "",
    identifiedBy: "me",
    photoIds: [],
    place: "",
    light: "medium",
    waterEveryDays: 7,
    lastWatered: null,
    soil: "",
    care: "Set a watering rhythm that fits this plant, then change it after you see how the soil feels.",
    pet: "",
    notes: "",
    saved: false,
  };
}

function suggestCareFromNames() {
  if (!draft || screen !== "plant") return;
  const current = $("plant-care").value.trim();
  if (current && !current.startsWith("Set a watering rhythm") && !current.includes("This is a starting point")) return;
  const common = $("plant-common").value.trim();
  const scientific = $("plant-scientific").value.trim();
  const hit = matchCare(scientific, [common]);
  if (!hit) return;
  applyCare(draft, scientific, [common, scientific]);
  $("plant-light").value = draft.light;
  $("plant-every").value = draft.waterEveryDays;
  $("plant-soil").value = draft.soil;
  $("plant-care").value = draft.care;
  $("plant-pet").value = draft.pet;
  $("plant-next").textContent = waterLabel(readPlantForm(false));
  say("Filled a starting care note. Change it if it does not fit this plant.");
}

function applyCare(plant, scientific, commons) {
  const hit = matchCare(scientific, commons);
  if (!hit) return plant;
  plant.waterEveryDays = hit.row.waterEveryDays;
  plant.light = hit.row.light;
  plant.soil = hit.row.soil;
  plant.care = (hit.general ? "This is a general note for this group of plants. " : "") + hit.row.care + " This is a starting point. Change it to fit your home.";
  plant.pet = hit.row.pet || "";
  return plant;
}

function show(name) {
  screen = name;
  document.querySelectorAll(".screen").forEach((el) => {
    el.hidden = el.dataset.screen !== name;
  });
  document.querySelectorAll(".nav button").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.go === name);
  });
  if (name === "today") renderToday();
  if (name === "collection") renderCollection();
  if (name === "identify") renderIdentify();
  if (name === "guide") renderGuide();
  if (name === "plant") renderPlant();
}

async function renderToday() {
  const host = $("today-list");
  const due = plants.filter((plant) => waterState(plant) !== "ok");
  host.replaceChildren();
  if (!plants.length) {
    $("today-lead").textContent = "Save a plant and its watering rhythm will show up here.";
    host.append(noteCard("No plants saved yet. Identify one, or add one by name."));
    return;
  }
  $("today-lead").textContent = due.length
    ? due.length + (due.length === 1 ? " plant needs a look today." : " plants need a look today.")
    : "Nothing is due today. You can still check a pot if the room is hot.";
  if (!due.length) {
    host.append(noteCard("Every saved plant is inside its watering rhythm."));
    return;
  }
  for (const plant of due) {
    const row = document.createElement("article");
    row.className = "due";
    const img = document.createElement("img");
    img.alt = "";
    img.src = await photoUrl(plant.photoIds[0]) || "";
    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = plant.commonName || plant.scientificName || "Unnamed plant";
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = waterLabel(plant);
    text.append(title, meta);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn solid";
    button.textContent = "Watered";
    button.addEventListener("click", () => markWatered(plant.id));
    row.append(img, text, button);
    row.addEventListener("click", (event) => {
      if (event.target === button) return;
      openPlant(plant.id);
    });
    host.append(row);
  }
}

function noteCard(text) {
  const p = document.createElement("p");
  p.className = "hint";
  p.textContent = text;
  return p;
}

async function renderCollection() {
  const host = $("collection-list");
  const query = norm($("search").value);
  host.replaceChildren();
  const list = plants.filter((plant) => {
    if (filter === "thirsty" && waterState(plant) === "ok") return false;
    if (!query) return true;
    return norm([plant.commonName, plant.scientificName, plant.place, plant.family].join(" ")).includes(query);
  });
  if (!list.length) {
    host.append(noteCard(plants.length ? "No plants match." : "Your collection is empty."));
    return;
  }
  for (const plant of list) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    const img = document.createElement("img");
    img.alt = "";
    img.src = await photoUrl(plant.photoIds[0]) || "";
    const text = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = plant.commonName || plant.scientificName || "Unnamed plant";
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = [plant.place, waterLabel(plant)].filter(Boolean).join(" · ");
    text.append(title, meta);
    card.append(img, text);
    card.addEventListener("click", () => openPlant(plant.id));
    host.append(card);
  }
}

function renderIdentify() {
  const left = identificationsLeft();
  $("quota-line").textContent = "Free identifications left today: " + left + " of " + DAILY_LIMIT + ".";
  $("key-line").textContent = apiKey()
    ? "Key saved. " + apiKey().length + " characters, ending in " + apiKey().slice(-4) + "."
    : "Add your Pl@ntNet key in Guide before the first check.";
  const host = $("shot-list");
  host.replaceChildren();
  shots.forEach((shot, index) => {
    const wrap = document.createElement("div");
    wrap.className = "shot";
    const img = document.createElement("img");
    img.alt = shot.organ;
    img.src = shot.url;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      URL.revokeObjectURL(shot.url);
      shots.splice(index, 1);
      renderIdentify();
    });
    const label = document.createElement("p");
    label.className = "meta";
    label.textContent = organLabel(shot.organ);
    wrap.append(img, remove, label);
    host.append(wrap);
  });
  $("identify-go").disabled = busy || !shots.length || !apiKey() || left < 1;
}

function organLabel(organ) {
  if (organ === "leaf") return "Leaf";
  if (organ === "flower") return "Flower";
  if (organ === "fruit") return "Fruit";
  if (organ === "bark") return "Bark";
  return "Auto";
}

function renderGuide() {
  $("api-key").value = apiKey();
  $("allowed-domain").textContent = [location.origin, location.origin + "/wizx-plants", location.origin + "/wizx-plants/"].join("\n");
  $("guide-quota").textContent = "Free identifications left today: " + identificationsLeft() + " of " + DAILY_LIMIT + ".";
  $("credit-copy").textContent = CREDIT;
}

async function renderPlant() {
  if (!draft) return;
  $("plant-heading").textContent = draft.commonName || draft.scientificName || "Plant";
  $("plant-common").value = draft.commonName || "";
  $("plant-scientific").value = draft.scientificName || "";
  $("plant-family").value = draft.family || "";
  $("plant-place").value = draft.place || "";
  $("plant-light").value = draft.light || "medium";
  $("plant-every").value = waterEvery(draft);
  $("plant-soil").value = draft.soil || "";
  $("plant-care").value = draft.care || "";
  $("plant-pet").value = draft.pet || "";
  $("plant-notes").value = draft.notes || "";
  $("plant-score").textContent = draft.score == null
    ? (draft.identifiedBy === "plantnet" ? "" : "Added by you. No Pl@ntNet check was used.")
    : "Pl@ntNet score " + Math.round(draft.score * 100) + "%. A lower score means the names were less sure.";
  $("plant-next").textContent = waterLabel(readPlantForm(false));
  $("plant-undo-water").hidden = draft.lastWatered !== isoDate();
  const more = $("plant-more");
  more.replaceChildren();
  if (draft.gbifId) {
    const link = document.createElement("a");
    link.href = "https://www.gbif.org/species/" + encodeURIComponent(draft.gbifId);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "More about this name on GBIF";
    more.append(link);
  }
  const host = $("plant-photos");
  host.replaceChildren();
  const ids = draft.photoIds || [];
  for (const id of ids) {
    const img = document.createElement("img");
    img.className = "plant-photo";
    img.alt = draft.commonName || "Plant photo";
    img.src = await photoUrl(id);
    host.append(img);
  }
  for (const photo of draftPhotos) {
    const img = document.createElement("img");
    img.className = "plant-photo";
    img.alt = "New photo";
    img.src = photo.url;
    host.append(img);
  }
}

function readPlantForm(write) {
  const plant = draft;
  if (write) {
    plant.commonName = $("plant-common").value.trim();
    plant.scientificName = $("plant-scientific").value.trim();
    plant.family = $("plant-family").value.trim();
    plant.place = $("plant-place").value.trim();
    plant.light = $("plant-light").value;
    plant.waterEveryDays = waterEvery({ waterEveryDays: $("plant-every").value });
    plant.soil = $("plant-soil").value.trim();
    plant.care = $("plant-care").value.trim();
    plant.pet = $("plant-pet").value.trim();
    plant.notes = $("plant-notes").value.trim();
    plant.updatedAt = Date.now();
  } else {
    return {
      ...plant,
      waterEveryDays: waterEvery({ waterEveryDays: $("plant-every").value || plant.waterEveryDays }),
      lastWatered: plant.lastWatered,
    };
  }
  return plant;
}

function openPlant(id) {
  const found = plants.find((plant) => plant.id === id);
  draft = found ? JSON.parse(JSON.stringify(found)) : blankPlant();
  draft.saved = !!found;
  draftPhotos = [];
  show("plant");
}

async function savePlant() {
  if (!draft) return;
  readPlantForm(true);
  if (!draft.commonName && !draft.scientificName) {
    say("Give the plant a name before you save it.");
    return;
  }
  for (const photo of draftPhotos) {
    const id = uid();
    await idbPut("photos", photo.blob, id);
    draft.photoIds.push(id);
    photoUrls.set(id, photo.url);
  }
  draftPhotos = [];
  draft.saved = true;
  const copy = JSON.parse(JSON.stringify(draft));
  delete copy.saved;
  await idbPut("plants", copy);
  const index = plants.findIndex((plant) => plant.id === copy.id);
  if (index >= 0) plants[index] = copy;
  else plants.unshift(copy);
  draft = JSON.parse(JSON.stringify(copy));
  draft.saved = true;
  say("Saved " + (copy.commonName || copy.scientificName) + ".");
  renderPlant();
}

async function removePlant() {
  if (!draft || !draft.saved) {
    draft = null;
    show("collection");
    return;
  }
  const name = draft.commonName || draft.scientificName || "this plant";
  if (!window.confirm("Remove " + name + " from this phone?")) return;
  await idbDelete("plants", draft.id);
  for (const id of draft.photoIds || []) {
    await idbDelete("photos", id);
    if (photoUrls.has(id)) {
      URL.revokeObjectURL(photoUrls.get(id));
      photoUrls.delete(id);
    }
  }
  plants = plants.filter((plant) => plant.id !== draft.id);
  draft = null;
  say("Removed " + name + ".");
  show("collection");
}

async function markWatered(id) {
  const plant = plants.find((item) => item.id === id);
  if (!plant) return;
  plant.lastWatered = isoDate();
  plant.updatedAt = Date.now();
  await idbPut("plants", plant);
  if (draft && draft.id === id) {
    draft.lastWatered = plant.lastWatered;
    renderPlant();
  }
  say("Watered " + (plant.commonName || plant.scientificName || "the plant") + ". " + waterLabel(plant));
  if (screen === "today") renderToday();
  if (screen === "collection") renderCollection();
}

function undoWater() {
  if (!draft) return;
  draft.lastWatered = null;
  $("plant-next").textContent = waterLabel(draft);
  $("plant-undo-water").hidden = true;
  say("Cleared today's watering. Save the plant to keep that.");
}

function shrinkPhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (!blob) reject(new Error("photo"));
        else resolve(blob);
      }, "image/jpeg", 0.86);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("photo"));
    };
    img.src = url;
  });
}

async function addShot(file) {
  if (shots.length >= 5) {
    say("Five photos is the most for one check.");
    return;
  }
  try {
    const blob = await shrinkPhoto(file);
    shots.push({ blob, url: URL.createObjectURL(blob), organ: $("shot-organ").value || "auto" });
    $("match-list").replaceChildren();
    renderIdentify();
  } catch {
    say("That photo could not be opened. Use a JPG or PNG.");
  }
}

function noteQuotaFromResponse(data, status) {
  const entry = quota();
  entry.sent = Math.min(DAILY_LIMIT, (Number(entry.sent) || 0) + 1);
  if (data && typeof data.remainingIdentificationRequests === "number") entry.remaining = data.remainingIdentificationRequests;
  if (status === 429) {
    entry.remaining = 0;
    entry.sent = DAILY_LIMIT;
  }
  saveQuota(entry);
}

function reportKey(shortText, longText) {
  const line = $("key-result");
  if (line) line.textContent = longText || shortText || "";
  say(shortText || "");
}

function keySummary() {
  const key = apiKey();
  if (!key) return "No code is saved.";
  return "The saved code is " + key.length + " characters. It starts with " + key.slice(0, 4) + " and ends with " + key.slice(-4) + ".";
}

async function plantnetRequest(path, options) {
  const key = apiKey();
  const preferred = localStorage.getItem("plants-auth-style") === "bearer" ? "bearer" : "query";
  const styles = preferred === "bearer" ? ["bearer", "query"] : ["query", "bearer"];
  let last = null;
  for (const style of styles) {
    const headers = Object.assign({}, options && options.headers);
    let url = "https://my-api.plantnet.org" + path;
    if (style === "query") {
      url += (url.includes("?") ? "&" : "?") + "api-key=" + encodeURIComponent(key);
    } else {
      headers.Authorization = "Bearer " + key;
    }
    const response = await fetch(url, {
      method: (options && options.method) || "GET",
      body: options && options.body,
      headers,
      cache: "no-store",
      credentials: "omit",
    });
    const data = await response.json().catch(() => ({}));
    last = { status: response.status, data, style };
    if (response.status !== 401) {
      if (response.ok) localStorage.setItem("plants-auth-style", style);
      return last;
    }
  }
  return last;
}

async function checkAccess() {
  return plantnetRequest("/v2/languages");
}

function pageBlockedMessage() {
  return "Pl@ntNet is hiding the answer from this page. Turn on expose my API key, add " + location.origin + " under Authorized domains, then tap Update key settings.";
}

function explainAccess(status, data) {
  const said = data && data.message ? " Pl@ntNet said \"" + data.message + ".\"" : "";
  if (status === 200) return { short: "This page is allowed. The key works.", long: "This page is allowed. The key works." };
  if (status === 401) {
    const shape = apiKey().indexOf("2b10") === 0
      ? " That shape matches a Pl@ntNet key. Pl@ntNet uses this same refusal when the page is missing from Authorized domains."
      : " A Pl@ntNet key starts with 2b10. This saved text does not, so it is not the API key box.";
    const long = "Pl@ntNet refused the code." + said + " " + keySummary() + shape + " On the API key page, turn on expose my API key, put each line below under Authorized domains, then tap Update key settings.";
    return { short: "Pl@ntNet refused the code. See Guide.", long };
  }
  const long = pageBlockedMessage();
  return { short: "Pl@ntNet blocked this page. See Guide.", long };
}

async function identify() {
  if (busy) return;
  if (!apiKey()) {
    say("Add your Pl@ntNet key in Guide.");
    show("guide");
    return;
  }
  if (!shots.length) {
    say("Add a photo first.");
    return;
  }
  if (identificationsLeft() < 1) {
    say("The free 500 identifications for today are used. You can still add a plant by name.");
    renderIdentify();
    return;
  }
  busy = true;
  renderIdentify();
  say("Checking this page with Pl@ntNet...");
  try {
    let access;
    try {
      access = await checkAccess();
    } catch {
      reportKey("Pl@ntNet blocked this page. See Guide.", pageBlockedMessage());
      show("guide");
      return;
    }
    if (access.status !== 200) {
      const explained = explainAccess(access.status, access.data);
      reportKey(explained.short, explained.long);
      show("guide");
      return;
    }
    say("Asking Pl@ntNet...");
    const body = new FormData();
    for (const shot of shots) {
      const file = new File([shot.blob], "plant.jpg", { type: "image/jpeg" });
      body.append("images", file);
      body.append("organs", shot.organ || "auto");
    }
    const sent = await plantnetRequest("/v2/identify/all?lang=en&nb-results=5", { method: "POST", body });
    const data = sent.data || {};
    if (sent.status === 200 || sent.status === 429) noteQuotaFromResponse(data, sent.status);
    if (sent.status === 401 || sent.status === 403) {
      const explained = explainAccess(sent.status, sent.data);
      reportKey(explained.short, explained.long);
      show("guide");
      return;
    }
    if (sent.status === 429) {
      say("Pl@ntNet has no free identifications left today. Try again tomorrow.");
      return;
    }
    if (sent.status !== 200 || !data.results || !data.results.length) {
      say("Pl@ntNet did not return a plant. Try a closer photo of the leaf or flower, with one plant in the frame.");
      return;
    }
    say(data.results[0].score < 0.2
      ? "The match is weak. Compare the names, or add a photo of a different part of the plant."
      : "Pick the name that fits this plant.");
    renderMatches(data.results);
  } catch {
    say("The photo did not go through. Try one closer photo of a leaf or flower.");
  } finally {
    busy = false;
    renderIdentify();
  }
}

function renderMatches(results) {
  const host = $("match-list");
  host.replaceChildren();
  results.forEach((result) => {
    const species = result.species || {};
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card match";
    const text = document.createElement("span");
    const title = document.createElement("strong");
    const common = (species.commonNames && species.commonNames[0]) || species.scientificNameWithoutAuthor || "Unnamed";
    title.textContent = common;
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = [species.scientificNameWithoutAuthor, Math.round((result.score || 0) * 100) + "%"].filter(Boolean).join(" · ");
    text.append(title, meta);
    button.append(text);
    button.addEventListener("click", () => chooseMatch(result));
    host.append(button);
  });
}

function chooseMatch(result) {
  const species = result.species || {};
  const plant = blankPlant();
  plant.identifiedBy = "plantnet";
  plant.commonName = (species.commonNames && species.commonNames[0]) || "";
  plant.scientificName = species.scientificNameWithoutAuthor || "";
  plant.family = species.family ? species.family.scientificNameWithoutAuthor || "" : "";
  plant.score = result.score;
  plant.gbifId = result.gbif && result.gbif.id ? String(result.gbif.id) : "";
  applyCare(plant, plant.scientificName, species.commonNames || []);
  draft = plant;
  draft.saved = false;
  draftPhotos = shots.map((shot) => ({ blob: shot.blob, url: shot.url }));
  shots = [];
  $("match-list").replaceChildren();
  show("plant");
  say("Check the care note, set the watering days, then save. The photo stays on this phone.");
}

function bind() {
  document.querySelectorAll(".nav button").forEach((button) => {
    button.addEventListener("click", () => show(button.dataset.go));
  });
  $("search").addEventListener("input", () => renderCollection());
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((chip) => chip.classList.toggle("is-on", chip === button));
      renderCollection();
    });
  });
  $("add-manual").addEventListener("click", () => openPlant(null));
  $("shot-input").addEventListener("change", () => {
    const file = $("shot-input").files && $("shot-input").files[0];
    $("shot-input").value = "";
    if (file) addShot(file);
  });
  $("identify-go").addEventListener("click", () => identify());
  $("plant-back").addEventListener("click", () => {
    if (draft && !draft.saved && !window.confirm("Leave without saving this plant?")) return;
    show("collection");
  });
  $("plant-save").addEventListener("click", () => savePlant());
  $("plant-delete").addEventListener("click", () => removePlant());
  $("plant-water").addEventListener("click", () => {
    if (!draft) return;
    draft.lastWatered = isoDate();
    $("plant-next").textContent = waterLabel(readPlantForm(false));
    $("plant-undo-water").hidden = false;
    say("Marked as watered. Save the plant to keep it.");
  });
  $("plant-undo-water").addEventListener("click", () => undoWater());
  ["plant-every", "plant-common"].forEach((id) => {
    $(id).addEventListener("input", () => {
      if (!draft || screen !== "plant") return;
      if (id === "plant-common") $("plant-heading").textContent = $("plant-common").value.trim() || draft.scientificName || "Plant";
      const preview = readPlantForm(false);
      preview.lastWatered = draft.lastWatered;
      $("plant-next").textContent = waterLabel(preview);
    });
  });
  $("plant-common").addEventListener("change", () => suggestCareFromNames());
  $("plant-scientific").addEventListener("change", () => suggestCareFromNames());
  $("save-key").addEventListener("click", async () => {
    const key = cleanKey($("api-key").value);
    $("api-key").value = key;
    if (key) localStorage.setItem("plants-api-key", key);
    else localStorage.removeItem("plants-api-key");
    renderGuide();
    if (!key) {
      reportKey("Key removed from this phone.");
      return;
    }
    say("Checking this page with Pl@ntNet...");
    try {
      const access = await checkAccess();
      const explained = explainAccess(access.status, access.data);
      reportKey(explained.short, explained.long);
    } catch {
      reportKey("Pl@ntNet blocked this page. See Guide.", pageBlockedMessage());
    }
  });
  $("credit-footer").textContent = CREDIT;
}

async function boot() {
  try {
    db = await openDb();
    plants = await idbAll("plants");
    plants.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch {
    say("This phone could not open the plant collection.");
  }
  bind();
  show("today");
  const secure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (secure && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  } else if (location.protocol === "http:") {
    say("This copy is coming from the computer. It stops when that computer is off.");
  }
}

boot();
