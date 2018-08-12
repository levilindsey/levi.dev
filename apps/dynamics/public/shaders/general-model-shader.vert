/**
 * The vertex shader for the main models.
 */

attribute lowp vec3 aVertexNormal;
attribute mediump vec3 aVertexPosition;
attribute lowp vec2 aTextureCoord;

uniform lowp mat4 uNormalMatrix;
uniform mediump mat4 uMVMatrix;
uniform mediump mat4 uPMatrix;

varying lowp vec2 vTextureCoord;
varying lowp vec3 vLighting;

// TODO: Add Blinn-Phong shading

void main(void)
{
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;

  // Apply a constant lighting effect.
  lowp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
  lowp vec3 directionalLightColor = vec3(0.6, 0.55, 0.5);
  lowp vec3 directionalVector = vec3(0.85, 0.8, 0.75);

  lowp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  lowp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = ambientLight + (directionalLightColor * directional);
  vLighting = max(vLighting, vec3(1.0, 1.0, 1.0));
}
