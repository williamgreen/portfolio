// Tiny synthesized "tick" used as tactile feedback when scrubbing the
// contribution graph. Browsers can't drive the MacBook Force Touch trackpad
// motor, so this pairs a short click sound with navigator.vibrate where
// supported (Android).

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (audioContext) return audioContext;
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  try {
    audioContext = new Ctor();
  } catch {
    return null;
  }
  return audioContext;
}

function envelope(ctx: AudioContext, start: number, attack: number, decay: number, peak: number) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(1e-4, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(1e-4, start + attack + decay);
  return gain;
}

function playTick(ctx: AudioContext) {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.4;
  master.connect(ctx.destination);

  // Band-passed noise burst
  const noiseLength = 0.001 + 0.018 + 0.05;
  const frames = Math.max(1, Math.floor(noiseLength * ctx.sampleRate));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 5400;
  filter.Q.value = 1.8;
  noise.connect(filter).connect(envelope(ctx, now, 0.001, 0.018, 0.14)).connect(master);
  noise.start(now);
  noise.stop(now + noiseLength);

  // Short sine ping
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(2600, now);
  osc.connect(envelope(ctx, now, 0.001, 0.012, 0.018)).connect(master);
  osc.start(now);
  osc.stop(now + 0.063);

  setTimeout(() => master.disconnect(), 200);
}

export function tick() {
  if (typeof navigator !== "undefined") {
    navigator.vibrate?.(8);
    // Audio can only start after the user has interacted with the page.
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  }
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "running") playTick(ctx);
  else ctx.resume().then(() => ctx.state === "running" && playTick(ctx), () => {});
}
