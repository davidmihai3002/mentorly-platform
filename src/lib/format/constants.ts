/** Limba interfeței. Aplicația este doar în română (documentul de cerințe, §3). */
export const APP_LOCALE = 'ro-RO'

/**
 * Fusul orar în care afișăm toate datele și orele. Piața este exclusiv românească
 * (documentul de cerințe, §3). Timestamp-urile vin de la API în UTC.
 */
export const APP_TIME_ZONE = 'Europe/Bucharest'

/**
 * Eticheta fusului orar afișată utilizatorului. Abrevierile Intl („EET” / „EEST”)
 * se schimbă vara și nu spun nimic unui utilizator obișnuit.
 */
export const TIME_ZONE_LABEL = 'ora României'

/** Unitatea monetară afișată. Sumele vin de la API în bani (1 leu = 100 de bani). */
export const CURRENCY_LABEL = 'lei'
export const BANI_PER_LEU = 100
