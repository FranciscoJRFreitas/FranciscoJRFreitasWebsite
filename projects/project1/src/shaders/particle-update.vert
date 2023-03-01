precision highp float;

const int MAX_PLANETS = 10; // Maximum number of planets that can be drawn
const float G_CONSTANT = 0.0000000000667; // Value of universal gravity constant
const float DIST_SCALE = 6371000.0; // Factor scale
const float PI = 3.14159265358979; // Value of PI


uniform float uDeltaTime;  // Number of seconds (possibly fractional) that has passed since the lastupdate step
uniform vec2 uMouseLocation; // Mouse Location
uniform float uBeamAngle; // Beta angle
uniform float uBeamOpen; // Alpha angle
uniform float uMass[MAX_PLANETS]; // Vector who stores the mass of the planets
uniform vec2 uPosition[MAX_PLANETS]; // Vector who stores the position of the planets
uniform float uMinVelocity; // Minimun velocity of the velocity
uniform float uMaxVelocity; // Maximun velocity of the velocity
uniform float uMinLife; // Minimun life of the particle
uniform float uMaxLife; // Maximun life of the particle
uniform int uBlackHole; // Black Hole

/* Inputs. These reflect the state of a single particle before the update. */

attribute vec2 vPosition;              // actual position
attribute float vAge;                  // actual age (in seconds)
attribute float vLife;                 // when it is supposed to die
attribute vec2 vVelocity;              // actual speed

/* Outputs. These mirror the inputs. These values will be captured into our transform feedback buffer! */
varying vec2 vPositionOut;  // Next instant position
varying float vAgeOut;  // Next instant age
varying float vLifeOut; // Next instant life
varying vec2 vVelocityOut; // Next instant velocity


// generates a pseudo random number that is a function of the argument. The argument needs to be constantly changing from call to call to generate different results
highp float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec2 net_force(vec2 vPosition) {
   vec2 gfSum = vec2(0.0);
   float totalMass = 0.0;
   for(int i = 0; i < MAX_PLANETS; i++) {
      vec2 part_planet_vec = vec2(uPosition[i].x - vPosition.x, uPosition[i].y - vPosition.y);
      gfSum += normalize(part_planet_vec) * G_CONSTANT * uMass[i] / (pow(length(part_planet_vec)*DIST_SCALE, 2.0));
   }
   if(uBlackHole == 1)
      gfSum = -gfSum; //Close to the black hole center, the particles get repelled.
   return gfSum;
}

void main() {

   /* Update parameters according to our simple rules.*/
   vPositionOut = vPosition + vVelocity * uDeltaTime; //p(t+h) = p(t) + v(t) * h 
   vAgeOut = vAge + uDeltaTime;
   vLifeOut = uMinLife + rand(vPosition * uDeltaTime) * (uMaxLife - uMinLife);

   vVelocityOut = vVelocity + net_force(vPosition) * uDeltaTime; // v(t+h) = v(t) + F(t)/m1 * h

   float minAngle = (-uBeamAngle + uBeamOpen);
   float maxAngle = (uBeamAngle + uBeamOpen);
   float uAngle = minAngle + rand(vPosition) * (maxAngle - minAngle); // (-beta + alpha), (beta + alpha)

   if (vAgeOut >= vLife) {
      vPositionOut = uMouseLocation;
      vAgeOut = 0.0;
      vLifeOut = uMinLife + rand(vPosition) * (uMaxLife - uMinLife);
      float velocity = uMinVelocity + rand(vPosition * uDeltaTime) * (uMaxVelocity - uMinVelocity);
      vVelocityOut = vec2(velocity * cos(uAngle), velocity * sin(uAngle));
   }

}