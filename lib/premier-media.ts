/**
 * Image URLs from premierentertainment.events (HighLevel / LeadConnector CDN).
 * Same assets the live site uses in CSS backgrounds and picture elements.
 */
const r900 = (filesafePath: string) =>
  `https://images.leadconnectorhq.com/image/f_webp/q_80/r_900/u_https://assets.cdn.filesafe.space/${filesafePath}`;

export const premierMedia = {
  /** Brand / hero graphic (ICs24gRmF4omo1wutNh4) */
  brandGraphic: r900('ICs24gRmF4omo1wutNh4/media/66994c8f0dd12468713d3f90.png'),
  /** Owner spotlight image provided for this demo */
  jaronPortrait: '/jaron-owner.png',
  /** Card 2: LEO LUX — DJ (sunglasses headshot) */
  leoLux: r900('n4lLPqZ3Dv19TQTebcB6/media/67201dab40adeb8684b742d5.png'),
  /** Card 3: Ennis One Man Band — headset / live rig */
  ennisOneManBand: r900('c3cmUrbBhdgs54adfIYP/media/666136581848ae65069c5b9f.jpeg'),
  /** Card 4: Craig & Ennis — duo */
  craigAndEnnis: r900('c5aZFOg9pQRhTyS4o5e5/media/69a98c8736702f69cfe45386.png'),
} as const;
