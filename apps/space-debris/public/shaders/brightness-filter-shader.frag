/**
 * A fragment shader for processing an image to render only the bright areas.
 */

varying lowp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void)
{
  lowp vec4 texelColor = texture2D(uSampler, vTextureCoord);
  lowp float brightness = dot(texelColor.rgb, vec3(0.325, 0.45, 0.225));
  // Only render the fragments that are bright enough.
  // TODO: Adjust this.
  if (brightness > 0.8) {
    gl_FragColor = texelColor;
  }
}
