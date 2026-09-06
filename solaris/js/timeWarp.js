/* ============================================================
   ORBITA // TIME WARP SIMULATION ENGINE
   Smooth Interpolated Acceleration: 1x -> 10x -> 100x -> 500x
   ============================================================ */

class TimeWarpEngine {
  constructor() {
    this.rates = [1, 10, 100, 500];
    this.currentRateIndex = 0;
    this.targetMultiplier = 1.0;
    this.currentMultiplier = 1.0;

    // Astronomical Mission Clock
    this.simulatedDate = new Date();
    this.listeners = [];
  }

  setRate(multiplier) {
    if (!this.rates.includes(multiplier)) return;
    this.targetMultiplier = multiplier;
    this.currentRateIndex = this.rates.indexOf(multiplier);
    this.notifyListeners();
  }

  cycleRate() {
    this.currentRateIndex = (this.currentRateIndex + 1) % this.rates.length;
    this.targetMultiplier = this.rates[this.currentRateIndex];
    this.notifyListeners();
  }

  update(deltaSeconds) {
    // Smooth logarithmic-linear lerp between rate changes
    this.currentMultiplier += (this.targetMultiplier - this.currentMultiplier) * 0.08;

    // Advance simulated astronomical UTC time
    // At 1x: 1 real second = 1 sim day / 60
    // At 500x: accelerated proportionally
    const simMilliseconds = deltaSeconds * 1000 * this.currentMultiplier;
    this.simulatedDate = new Date(this.simulatedDate.getTime() + simMilliseconds);

    return this.currentMultiplier;
  }

  getSimulatedDate() {
    return this.simulatedDate;
  }

  getJulianDate() {
    // Standard Julian Date formula from UTC
    const time = this.simulatedDate.getTime();
    return (time / 86400000) + 2440587.5;
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.targetMultiplier));
  }
}
