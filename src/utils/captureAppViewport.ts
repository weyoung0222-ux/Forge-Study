import html2canvas from 'html2canvas';

function defaultFilename(): string {
  const d = new Date();
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `forge-screen-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
}

/** Integer scale avoids subpixel rounding that often shifts text vs on-screen layout. */
function captureScale(): number {
  const dpr = window.devicePixelRatio || 1;
  return Math.min(2, Math.max(1, Math.round(dpr)));
}

/**
 * Captures the React app root (`#root`) — tab content below the browser chrome — as a PNG download.
 * Renders the full scrollable height of the root node.
 *
 * Note: html2canvas re-implements layout; it will never match the browser pixel-perfectly (flex/grid,
 * web fonts timing, transforms). We wait for `document.fonts`, stabilize layout, and prefer
 * `foreignObjectRendering` so the engine can delegate more drawing to the browser.
 */
export async function captureAppRootToPngDownload(filename?: string): Promise<void> {
  const root = document.getElementById('root');
  if (!root) {
    console.warn('captureAppRootToPngDownload: #root not found');
    return;
  }

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  } catch {
    /* ignore */
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  const scale = captureScale();
  const bg =
    typeof getComputedStyle !== 'undefined'
      ? getComputedStyle(document.body).backgroundColor || '#ffffff'
      : '#ffffff';

  const baseOptions = {
    useCORS: true,
    allowTaint: false,
    logging: false,
    scale,
    backgroundColor: bg,
    imageTimeout: 15000,
    /** Do not set windowWidth/windowHeight — wrong values break text/layout vs real document size. */
  } as const;

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(root, {
      ...baseOptions,
      foreignObjectRendering: true,
    });
  } catch {
    canvas = await html2canvas(root, {
      ...baseOptions,
      foreignObjectRendering: false,
    });
  }

  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? defaultFilename();
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
