/**
 * A vertex shader for flat-colored objects.
 */

attribute mediump vec3 aVertexPosition;

uniform mediump mat4 uMVMatrix;
uniform mediump mat4 uPMatrix;

void main(void)
{
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
