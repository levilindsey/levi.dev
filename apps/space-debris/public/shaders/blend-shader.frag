/**
 * A fragment shader for combining two images together.
 */

varying lowp vec2 vTextureCoord;

uniform sampler2D uModelsSampler;
uniform sampler2D uBrightnessSampler;

void main(void)
{
  lowp vec4 modelsTexelColor = texture2D(uModelsSampler, vTextureCoord);
  lowp vec4 brightnessTexelColor = texture2D(uBrightnessSampler, vTextureCoord);
  gl_FragColor = modelsTexelColor + brightnessTexelColor;
}
