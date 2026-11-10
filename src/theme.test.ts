import { describe, expect, it } from 'vitest'
import css from './index.css?raw'

// Citește culorile din tema reală: la design-ul 1.0, testul verifică automat noile valori.
const rootBlock = /:root\s*{([^}]*)}/.exec(css)?.[1] ?? ''
const tokens = new Map(
  [...rootBlock.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map(([, name, hex]) => [name, hex]),
)

function color(name: string): string {
  const hex = tokens.get(name)
  if (!hex) throw new Error(`Culoarea --${name} lipsește din :root (sau nu e hex #rrggbb)`)
  return hex
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r = 0, g = 0, b = 0] = channels.map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastHex(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05)
}

const contrast = (a: string, b: string) => contrastHex(color(a), color(b))

/** Culoarea `name` peste alb, la opacitatea `alpha` (de ex. bg-destructive/10). */
function tintOverWhite(name: string, alpha: number): string {
  const channels = [1, 3, 5].map((i) => parseInt(color(name).slice(i, i + 2), 16))
  const mixed = channels.map((c) => Math.round(255 - alpha * (255 - c)))
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

const TEXT = 4.5 // WCAG AA, text normal
const UI = 3 // WCAG 1.4.11, chenare de componente și focus

describe('tema respectă contrastul WCAG AA', () => {
  it('citește culorile din :root (altfel testele de mai jos n-ar verifica nimic)', () => {
    expect(tokens.size).toBeGreaterThanOrEqual(20)
  })

  it.each([
    ['foreground', 'background'],
    ['card-foreground', 'card'],
    ['muted-foreground', 'background'],
    ['muted-foreground', 'card'],
    ['muted-foreground', 'muted'],
    ['primary-foreground', 'primary'],
    ['primary', 'background'],
    ['highlight-foreground', 'highlight'],
    ['secondary-foreground', 'secondary'],
    ['accent-foreground', 'accent'],
    ['success-foreground', 'success'],
    ['destructive', 'card'],
    ['destructive', 'background'],
    ['destructive', 'muted'],
    ['popover-foreground', 'popover'],
  ])('text --%s pe --%s', (text, surface) => {
    expect(contrast(text, surface)).toBeGreaterThanOrEqual(TEXT)
  })

  it.each([0.1, 0.2])('text --destructive pe fundalul lui transparent %s', (alpha) => {
    expect(
      contrastHex(color('destructive'), tintOverWhite('destructive', alpha)),
    ).toBeGreaterThanOrEqual(TEXT)
  })

  it.each([
    ['input', 'card'],
    ['input', 'background'],
    ['input', 'muted'],
    ['ring', 'card'],
    ['ring', 'background'],
  ])('element de interfață --%s pe --%s', (element, surface) => {
    expect(contrast(element, surface)).toBeGreaterThanOrEqual(UI)
  })
})
