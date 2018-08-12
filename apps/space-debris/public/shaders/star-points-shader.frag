/**
 * A fragment shader for the stars.
 */

varying lowp vec3 vColor;

void main(void)
{
  // Calculate the distance squared from the current fragment to the center of the point.
  lowp vec2 pointCenter = vec2(0.5, 0.5);
  lowp float deltaX = pointCenter.x - gl_PointCoord.x;
  lowp float deltaY = pointCenter.y - gl_PointCoord.y;
  lowp float distanceSquared = deltaX * deltaX + deltaY * deltaY;

  // Only render fragments that lie within the radius of a circle.
  if (distanceSquared < 0.25)
  {
    // Create an exponential gradient.
    lowp float opacity = 1.0 - distanceSquared * 4.0;

    gl_FragColor = vec4(vColor, opacity);
  }
  else
  {
    discard;
  }
}
