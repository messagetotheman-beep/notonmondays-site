import { useState, useRef, useEffect } from 'react'

// --- Noise builders ---
// Each returns { source, output } where output connects to the gain node.
// Source is the raw BufferSourceNode so we can stop it later.

function buildRain(ctx) {
  const sr = ctx.sampleRate
  const buf = ctx.createBuffer(1, 2 * sr, sr)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1
  }
  const source = ctx.createBufferSource()
  source.buffer = buf
  source.loop = true

  // Cut low rumble, boost the "hiss" band around 1200 Hz
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 320

  const peak = ctx.createBiquadFilter()
  peak.type = 'peaking'
  peak.frequency.value = 1200
  peak.Q.value = 0.7
  peak.gain.value = 5

  source.connect(hp)
  hp.connect(peak)
  return { source, output: peak }
}

function buildBrown(ctx) {
  const sr = ctx.sampleRate
  const buf = ctx.createBuffer(1, 4 * sr, sr)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    data[i] = (last + 0.02 * white) / 1.02
    last = data[i]
    data[i] *= 3.5
  }
  const source = ctx.createBufferSource()
  source.buffer = buf
  source.loop = true
  return { source, output: source }
}

function buildDark(ctx) {
  const sr = ctx.sampleRate
  const buf = ctx.createBuffer(1, 4 * sr, sr)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    // Very slow drift = very deep, almost subsonic
    data[i] = (last + 0.004 * white) / 1.004
    last = data[i]
    data[i] *= 10
  }
  const source = ctx.createBufferSource()
  source.buffer = buf
  source.loop = true

  // Hard lowpass to keep only the deep rumble
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 180

  source.connect(lp)
  return { source, output: lp }
}

const BUILDERS = {
  rain: buildRain,
  brown: buildBrown,
  dark: buildDark,
}

// --- Hook ---

export function useAmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const gainRef = useRef(null)
  const sourceRef = useRef(null)

  function stopSource() {
    if (sourceRef.current) {
      try { sourceRef.current.stop() } catch (_) {}
      sourceRef.current = null
    }
  }

  function play(soundKey, vol) {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    stopSource()

    const gain = ctx.createGain()
    gain.gain.value = vol
    gain.connect(ctx.destination)
    gainRef.current = gain

    const builder = BUILDERS[soundKey] ?? BUILDERS.brown
    const { source, output } = builder(ctx)
    output.connect(gain)
    source.start()
    sourceRef.current = source
    setPlaying(true)
  }

  function pause() {
    stopSource()
    setPlaying(false)
  }

  function updateVolume(vol) {
    if (gainRef.current) gainRef.current.gain.value = vol
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSource()
      if (ctxRef.current) {
        try { ctxRef.current.close() } catch (_) {}
      }
    }
  }, [])

  return { playing, play, pause, updateVolume }
}
