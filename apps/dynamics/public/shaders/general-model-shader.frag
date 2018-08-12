/**
 * The fragment shader for the main models.
 */

varying lowp vec2 vTextureCoord;
varying lowp vec3 vLighting;

uniform sampler2D uSampler;

// TODO: Add Blinn-Phong shading

void main(void)
{
  lowp vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

  gl_FragColor = vec4(texelColor.rgb * vLighting * 0.5, texelColor.a);
}
