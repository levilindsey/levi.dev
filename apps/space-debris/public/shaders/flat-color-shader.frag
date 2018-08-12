/**
 * A fragment shader for flat-colored objects.
 */

uniform lowp vec4 uColor;

void main(void)
{
  gl_FragColor = uColor;
}
