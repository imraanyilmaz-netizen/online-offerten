/** Werte für quotes.cleaning_area_sqm – Liste: „60 m²“; geschlossenes Feld: „Wohnungsfläche: 70 m²“ (CleaningAreaSelect) */

export const CLEANING_AREA_SELECT_OPTIONS = [
  { value: 'sqm_40', listLabel: '40 m²' },
  { value: 'sqm_60', listLabel: '60 m²' },
  { value: 'sqm_70', listLabel: '70 m²' },
  { value: 'sqm_80', listLabel: '80 m²' },
  { value: 'sqm_90', listLabel: '90 m²' },
  { value: 'sqm_100', listLabel: '100 m²' },
  { value: 'sqm_120', listLabel: '120 m²' },
  { value: 'sqm_150_plus', listLabel: '150+ m²' },
];

const NEW_KEY_LABELS = {
  sqm_40: '40 m²',
  sqm_60: '60 m²',
  sqm_70: '70 m²',
  sqm_80: '80 m²',
  sqm_90: '90 m²',
  sqm_100: '100 m²',
  sqm_120: '120 m²',
  sqm_150_plus: '150+ m²',
};

/** Alte gespeicherte Werte (Bereiche) */
const LEGACY_KEY_LABELS = {
  bis_40: 'bis 40 m²',
  '40_60': '40 – 60 m²',
  '60_80': '60 – 80 m²',
  '80_100': '80 – 100 m²',
  '100_120': '100 – 120 m²',
  '120_140': '120 – 140 m²',
  ueber_140: 'über 140 m²',
};

/** Anzeige in E-Mails, Admin, Partner-Panel */
export function getCleaningAreaSqmLabel(value) {
  if (!value) return '';
  if (NEW_KEY_LABELS[value]) return NEW_KEY_LABELS[value];
  if (LEGACY_KEY_LABELS[value]) return LEGACY_KEY_LABELS[value];
  return String(value);
}

export const CLEANING_AREA_TYPES_WITH_FIELD = [
  'wohnungsreinigung',
  'hausreinigung',
  'grundreinigung',
  'buero',
  'umzugsreinigung',
];

/** Admin-Bearbeitung: neue Werte + alte gespeicherte Schlüssel */
export const CLEANING_AREA_LEGACY_SELECT_OPTIONS = [
  { value: 'bis_40', label: 'bis 40 m²' },
  { value: '40_60', label: '40 – 60 m²' },
  { value: '60_80', label: '60 – 80 m²' },
  { value: '80_100', label: '80 – 100 m²' },
  { value: '100_120', label: '100 – 120 m²' },
  { value: '120_140', label: '120 – 140 m²' },
  { value: 'ueber_140', label: 'über 140 m²' },
];
