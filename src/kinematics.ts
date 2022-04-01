import { Vector2, Math } from 'simple-game-math';

export function applyAcceleration(
  velocity: Vector2.IVector2,
  acceleration: Vector2.IVector2,
  deltaTime: number,
): Vector2.IVector2 {
  return {
    x: velocity.x + acceleration.x * deltaTime,
    y: velocity.y + acceleration.y * deltaTime,
  };
}

export function applyVelocity(
  position: Vector2.IVector2,
  velocity: Vector2.IVector2,
  deltaTime: number,
): Vector2.IVector2 {
  return {
    x: position.x + velocity.x * deltaTime,
    y: position.y + velocity.y * deltaTime,
  };
}

export function applyDrag(velocity: Vector2.IVector2, terminalVelocity: number, deltaTime: number): Vector2.IVector2 {
  const drag = Vector2.mag(velocity) / terminalVelocity;
  return {
    x: Math.moveTowards(velocity.x, 0, velocity.x * drag * deltaTime),
    y: Math.moveTowards(velocity.y, 0, velocity.y * drag * deltaTime),
  };
}
