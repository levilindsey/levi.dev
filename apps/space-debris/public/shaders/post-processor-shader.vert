/**
 * A vertex shader for common post-processing shaders that process the entire, 2D scene frame.
 */

attribute mediump vec2 aVertexPosition;

varying mediump vec2 vTextureCoord;

void main(void)
{
  vec2 clipSpacePosition = aVertexPosition * 2.0 - 1.0;
  gl_Position = vec4(clipSpacePosition, 0.0, 1.0);
  vTextureCoord = aVertexPosition;
}
