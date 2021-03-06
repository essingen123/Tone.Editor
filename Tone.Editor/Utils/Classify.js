// Get the Tone classes of any Tone object

define( function() {

  // Instances of Tone.AMSynth inherit both Instrument and AMSynth
  var Classes = {
    Instrument: ["AMSynth", "DuoSynth", "FMSynth", "MembraneSynth", "MetalSynth", "MonoSynth", "Monophonic", "NoiseSynth", "PluckSynth", "PolySynth", "Sampler", "Synth"],
    Effect: ["AutoFilter", "AutoPanner", "AutoWah", "BitCrusher", "Chebyshev", "Chorus", "Convolver", "Distortion", "FeedbackDelay", "FeedbackEffect", "Freeverb", "JCReverb", "MidSideEffect", "Phaser", "PingPongDelay", "PitchShift", "StereoEffect", "StereoFeedbackEffect", "StereoWidener", "StereoXFeedbackEffect", "Tremolo", "Vibrato"],
    Source: ["AMOscillator", "BufferSource", "FMOscillator", "FatOscillator", "GrainPlayer", "MultiPlayer", "Noise", "OmniOscillator", "Oscillator", "PWMOscillator", "Player", "PulseOscillator", "UserMedia"],
    Event: [ "Loop", "Part", "Pattern", "Sequence"]
  }

  // instances of the rest only inherit Tone
  var extras = []

  // add Component category
  extras.push("AmplitudeEnvelope", "Analyser", "Compressor", "CrossFade", "EQ3", "Envelope", "FeedbackCombFilter", "Filter", "Follower", "FrequencyEnvelope", "Gate", "LFO", "Limiter", "LowpassCombFilter", "Merge", "Meter", "MidSideCompressor", "MidSideMerge", "MidSideSplit", "Mono", "MultibandCompressor", "MultibandSplit", "PanVol", "Panner", "Panner3D", "ScaledEnvelope", "Split", "Volume")

  // add Signal category
  extras.push("Abs", "Add", "AudioToGain", "EqualPowerGain", "Expr", "GainToAudio", "GreaterThan", "GreaterThanZero", "Modulo", "Multiply", "Negate", "Normalize", "Pow", "Scale", "ScaleExp", "Signal", "SignalBase", "Subtract", "TimelineSignal", "WaveShaper", "Zero")

  function classify( toneComponent ) {
    var heritage = []
    for (var categoryName in Classes) {
      if (toneComponent instanceof Tone[categoryName]) {
        heritage.push(categoryName)

        for (var i=0; i<Classes[categoryName].length; i++) {
          if (toneComponent instanceof Tone[Classes[categoryName][i]] ) {
            heritage.push( Classes[categoryName][i] )
          }
        }
      }
    }

    // fallback: check extras
    if (heritage.length === 0) {
      for (var i = 0; i<extras.length; i++) {
        if (toneComponent instanceof Tone[extras[i]]) {
          heritage.push(extras[i])
        }
      }

    }

    if (heritage.length === 0) {
      if (toneComponent === Tone.Transport) {
        heritage = ['Transport']
      } else if (toneComponent === Tone.Master) {
        heritage = ['Master']
      }

    }
    return heritage
  }

  module.exports = classify
})
