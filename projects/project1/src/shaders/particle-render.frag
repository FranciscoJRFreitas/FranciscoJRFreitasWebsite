precision highp float;

varying float fTotal; // Total life time of particle
varying float fLeft; // Current life time of particle


void main() {
  gl_FragColor = vec4(0.99,0.75,0.55,(fTotal-fLeft)/fTotal);
}