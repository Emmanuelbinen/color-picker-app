// This function converts a RGB color to a HSL color
export function rgbToHsl(r, g, b) { 
    // with this we will get a value between 0 to 1 because the HSL color values must be between 0 to 1
    r/=255; g=g/255; b/=255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if(max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
 }

 // This Next function converts a HSL color to an RGB color
 export function hslToRgb(h, s, l) { 
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if(s == 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1/3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1/3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
  }