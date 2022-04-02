import { Vector2, Math } from 'simple-game-math';

export function isCircleVsCircleCollision(
  pos1: Vector2.IVector2,
  pos2: Vector2.IVector2,
  radius1: number,
  radius2: number,
): boolean {
  const radiiSum = radius1 + radius2;
  const distance = Vector2.distance(pos1, pos2);
  return distance < radiiSum;
}

/**
 * @returns the value of pos1 after the collision has been resolved.
 */
export function resolveCircleVsCircleCollision(
  pos1: Vector2.IVector2,
  pos2: Vector2.IVector2,
  radius1: number,
  radius2: number,
): Vector2.IVector2 {
  const distance = Vector2.distance(pos2, pos1);
  const radiiSum = radius1 + radius2;
  const xDiff = pos1.x - pos2.x;
  const yDiff = pos1.y - pos2.y;
  const xUnit = xDiff / distance;
  const yUnit = yDiff / distance;

  return {
    x: pos2.x + radiiSum * xUnit,
    y: pos2.y + radiiSum * yUnit,
  };
}

export function isCircleVsRectangleCollision(
  circlePos: Vector2.IVector2,
  circleRadius: number,
  rectPos: Vector2.IVector2,
  rectSize: Vector2.IVector2,
): boolean {
  const nearestPoint = {
    x: Math.clamp(circlePos.x, rectPos.x, rectPos.x + rectSize.x),
    y: Math.clamp(circlePos.y, rectPos.y, rectPos.y + rectSize.y),
  };
  const rayToNearest = Vector2.subtract(nearestPoint, circlePos);
  const overlap = circleRadius - Vector2.mag(rayToNearest);

  return overlap > 0;
}

/**
 * @returns the position of the circle after the collision has been resolved.
 */
export function resolveCircleVsRectangleCollision(
  circlePos: Vector2.IVector2,
  circleRadius: number,
  rectPos: Vector2.IVector2,
  rectSize: Vector2.IVector2,
): Vector2.IVector2 {
  const nearestPoint = {
    x: Math.clamp(circlePos.x, rectPos.x, rectPos.x + rectSize.x),
    y: Math.clamp(circlePos.y, rectPos.y, rectPos.y + rectSize.y),
  };

  const rayToNearest = Vector2.subtract(nearestPoint, circlePos);
  const overlap = circleRadius - Vector2.mag(rayToNearest);

  const temp = Vector2.normalize(rayToNearest);
  temp.x = temp.x * overlap;
  temp.y = temp.y * overlap;

  const finalPos = Vector2.subtract(circlePos, temp);
  return finalPos;
}

export function resolveRectangleVsCircleCollision(
  rectPos: Vector2.IVector2,
  rectSize: Vector2.IVector2,
  circlePos: Vector2.IVector2,
  circleRadius: number,
): Vector2.IVector2 {
  const nearestPoint = {
    x: Math.clamp(circlePos.x, rectPos.x, rectPos.x + rectSize.x),
    y: Math.clamp(circlePos.y, rectPos.y, rectPos.y + rectSize.y),
  };

  const rayToNearest = Vector2.subtract(nearestPoint, rectPos);
  const overlap = circleRadius - Vector2.mag(rayToNearest);

  const temp = Vector2.normalize(rayToNearest);
  temp.x = temp.x * overlap;
  temp.y = temp.y * overlap;

  const finalPos = Vector2.subtract(rectPos, temp);
  return finalPos;
}
