precision highp float;

const int MAX_PLANETS = 10; // Maximum number of planets that can be drawn
const float G_CONSTANT = 0.0000000000667; // Value of universal gravity constant
const float DIST_SCALE = 6371000.0; // Factor scale
const float PI = 3.14159265358979; // Value of PI

varying vec2 fPosition; // Field position
uniform float uMass[MAX_PLANETS]; // Vector who stores the mass of the planets
uniform vec2 uPosition[MAX_PLANETS]; // Vector who stores the position of the planets
uniform int uBlackHole; // Black holes

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec2 net_force(vec2 vPosition) {
   vec2 gfSum = vec2(0.0);
   for(int i = 0; i < MAX_PLANETS; i++) {
      vec2 part_planet_vec = vec2(uPosition[i].x - vPosition.x, uPosition[i].y - vPosition.y);
      gfSum += normalize(part_planet_vec) * G_CONSTANT * uMass[i] / (pow(length(part_planet_vec)*DIST_SCALE, 2.0));
   }
   return gfSum;
}

void main() {
    vec2 netForce = net_force(fPosition);
    float h = atan(netForce.y, netForce.x) / (2.0 * PI);
    vec3 rgb = hsv2rgb(vec3(h,1.0,1.0));
    float gravityLines = mod(log(length(netForce)),1.0);
    if(gravityLines < 0.1)
      netForce = vec2(0.0);
    if(uBlackHole == 1)
      gl_FragColor = vec4(0.0,0.0,0.0, length(netForce));
    else
      gl_FragColor = vec4(rgb, length(netForce));
}