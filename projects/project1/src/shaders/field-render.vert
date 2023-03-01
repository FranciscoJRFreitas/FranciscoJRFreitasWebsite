precision highp float;

const int MAX_PLANETS=10; // Maximum number of planets that can be drawn
const float AVG_DENSITY = 5510.0; // Value of the average density
const float G_CONSTANT = 0.0000000000667; // Value of universal gravity constant
const float DIST_SCALE = 6371000.0; // Factor scale
const float PI = 3.14159265358979; // Value of PI

uniform float uMass[MAX_PLANETS]; // Vector who stores the mass of the planets
uniform vec2 uPosition[MAX_PLANETS]; // Vector who stores the position of the planets
uniform vec2 uScale; // Scale
attribute vec2 vPosition; // Vertex position in World Coordinates
varying vec2 fPosition; // Field position

void main()
{
    gl_Position = vec4(vPosition, 0.0, 1.0);
    fPosition = vPosition * uScale;
    
}