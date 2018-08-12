/**
 * A fragment shader for processing an image to blur it horizontally.
 */

varying lowp vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform mediump vec2 uSamplerSize;

const mediump float WEIGHT_0 = 0.2270270270;
const mediump float WEIGHT_1 = 0.1945945946;
const mediump float WEIGHT_2 = 0.1216216216;
const mediump float WEIGHT_3 = 0.0540540541;
const mediump float WEIGHT_4 = 0.0162162162;

const lowp float BOOST_FACTOR = 1.1;

void main() {
  mediump vec2 pixelWidth = vec2(1.0, 0.0) / uSamplerSize;

  // Add the contribution of the current pixel.
  lowp vec3 result = texture2D(uSampler, vTextureCoord).rgb * WEIGHT_0;

  // Add the contributions of the nearby pixels.
  result += texture2D(uSampler, vTextureCoord + pixelWidth * 1.0).rgb * WEIGHT_1;
  result += texture2D(uSampler, vTextureCoord - pixelWidth * 1.0).rgb * WEIGHT_1;
  result += texture2D(uSampler, vTextureCoord + pixelWidth * 2.0).rgb * WEIGHT_2;
  result += texture2D(uSampler, vTextureCoord - pixelWidth * 2.0).rgb * WEIGHT_2;
  result += texture2D(uSampler, vTextureCoord + pixelWidth * 3.0).rgb * WEIGHT_3;
  result += texture2D(uSampler, vTextureCoord - pixelWidth * 3.0).rgb * WEIGHT_3;
  result += texture2D(uSampler, vTextureCoord + pixelWidth * 4.0).rgb * WEIGHT_4;
  result += texture2D(uSampler, vTextureCoord - pixelWidth * 4.0).rgb * WEIGHT_4;

  // This strengthens the blur. This won't make the blur bigger, but it will make it brighter.
  result *= BOOST_FACTOR;

  gl_FragColor = vec4(result, 1.0);
}
