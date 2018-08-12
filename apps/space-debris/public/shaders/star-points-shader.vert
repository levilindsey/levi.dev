/**
 * A vertex shader for the stars.
 */

attribute lowp vec3 aPosition;
attribute lowp vec3 aColor;
attribute lowp float aSize;

uniform lowp vec3 uCameraPosition;
uniform lowp mat4 uPMatrix;
uniform lowp mat4 uMVMatrix;

varying lowp vec3 vColor;

// Keep this value correlated with sceneConfig.renderDistance and cameraConfig._zFar. This should be
// just greater than them.
const lowp float MAX_DISTANCE_FROM_CAMERA = 2451.0;

void main(void)
{
  lowp float distanceFromCamera = distance(uCameraPosition, aPosition);
  gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);
  gl_PointSize = aSize * (1.0 - distanceFromCamera / MAX_DISTANCE_FROM_CAMERA);
  vColor = aColor;
}
