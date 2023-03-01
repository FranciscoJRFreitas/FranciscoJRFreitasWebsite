precision mediump float;

attribute vec2 vPosition; // Position of the particle
attribute float vAge; // Age of the particle
attribute float vLife; // Life of the particle
attribute vec2 vVelocity; // Velociry of the particle

varying float fTotal; // Total life time of particle
varying float fLeft; // Current life time of particle
uniform vec2 uScale; // Scale

void main() {
  gl_PointSize = 2.0;
  gl_Position = vec4(vPosition / uScale, 0.0, 1.0);
  fLeft = vAge;
  fTotal = vLife;
}