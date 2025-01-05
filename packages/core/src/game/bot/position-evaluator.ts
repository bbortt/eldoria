import { Character, Specialization } from '../../stats';
import { MAX_GRID_SIZE } from '../constants';
import { GameGrid } from '../game-grid';

interface CenterZone {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface SpecializationPreference {
  frontline: boolean;
  preferredDistance: number;
  description: string;
  edgeTolerance?: number;
  backlineBonus?: number;
  flankingBonus?: number;
  centralBonus?: number;
  cornerTolerance?: number;
  allyProximity?: boolean;
}

export class PositionEvaluator {
  private readonly centerX: number;
  private readonly centerY: number;
  private readonly centerZone: CenterZone;
  private readonly pathsToCenter: number[][];
  private readonly specializationPreferences: Record<string, SpecializationPreference>;

  constructor() {
    this.centerX = Math.floor(MAX_GRID_SIZE / 2);
    this.centerY = Math.floor(MAX_GRID_SIZE / 2);

    // Center zone is the 2x2 area in the middle where CELL_TYPE_CORE cells are
    this.centerZone = {
      minX: this.centerX - 1,
      maxX: this.centerX,
      minY: this.centerY - 1,
      maxY: this.centerY,
    };

    this.pathsToCenter = this.calculatePathsToCenter();
    this.specializationPreferences = this.initializeSpecializationPreferences();
  }

  private initializeSpecializationPreferences(): Record<string, SpecializationPreference> {
    return {
      [Specialization.GUARDIAN.label]: {
        frontline: true,
        preferredDistance: 1,
        edgeTolerance: 0.5,
        description: 'Prefers front-line positions to protect allies',
      },
      [Specialization.CHAMPION.label]: {
        frontline: true,
        preferredDistance: 2,
        centralBonus: 1.5,
        description: 'Seeks aggressive forward positions',
      },
      [Specialization.ROGUE.label]: {
        frontline: false,
        preferredDistance: 3,
        flankingBonus: 2.0,
        description: 'Favors flanking positions with escape routes',
      },
      [Specialization.SHARPSHOOTER.label]: {
        frontline: false,
        preferredDistance: 4,
        backlineBonus: 2.0,
        description: 'Seeks elevated or protected backline positions',
      },
      [Specialization.ARCANIST.label]: {
        frontline: false,
        preferredDistance: 3,
        centralBonus: 1.5,
        description: 'Prefers central positions with good coverage',
      },
      [Specialization.NECROMANCER.label]: {
        frontline: false,
        preferredDistance: 3,
        cornerTolerance: 1.0,
        description: 'Seeks positions with space for summons',
      },
      [Specialization.PALADIN.label]: {
        frontline: true,
        preferredDistance: 1,
        centralBonus: 1.0,
        description: 'Favors central, front-line positions',
      },
      [Specialization.LUMINARY.label]: {
        frontline: false,
        preferredDistance: 2,
        allyProximity: true,
        description: 'Positions near allies but protected',
      },
      [Specialization.MYSTIC_HERALD.label]: {
        frontline: false,
        preferredDistance: 2,
        allyProximity: true,
        description: 'Central positions with good ally access',
      },
    };
  }

  public isValidInitialPosition(x: number, y: number): boolean {
    const distanceFromCenter = Math.max(Math.abs(x - this.centerX), Math.abs(y - this.centerY));

    return distanceFromCenter > Math.floor(MAX_GRID_SIZE / 4);
  }

  private calculatePathsToCenter(): number[][] {
    const paths: number[][] = Array(MAX_GRID_SIZE)
      .fill(null)
      .map(() => Array(MAX_GRID_SIZE).fill(Infinity));

    for (let x = 0; x < MAX_GRID_SIZE; x++) {
      for (let y = 0; y < MAX_GRID_SIZE; y++) {
        paths[x]![y] = this.getDistanceToCenterZone(x, y);
      }
    }

    return paths;
  }

  private getDistanceToCenterZone(x: number, y: number): number {
    const distX = Math.min(Math.abs(x - this.centerZone.minX), Math.abs(x - this.centerZone.maxX));
    const distY = Math.min(Math.abs(y - this.centerZone.minY), Math.abs(y - this.centerZone.maxY));
    return Math.max(distX, distY);
  }

  public evaluateInitialPosition(x: number, y: number, grid: GameGrid, character: Character): number {
    if (!this.isValidInitialPosition(x, y)) {
      return -1000;
    }

    // Check if position is already occupied
    if (grid.cells[y] && grid.cells[y][x] && grid.cells[y][x].content) {
      return -1000;
    }

    let score = 10;
    const preference = this.specializationPreferences[character.specialization];
    if (!preference) {
      return score;
    }

    const pathToCenter = this.pathsToCenter[x]![y]!;
    score += this.evaluatePathToCenter(pathToCenter, character);
    score += this.evaluateSpecializationPosition(x, y, character, pathToCenter);

    return score;
  }

  private evaluatePathToCenter(distance: number, character: Character): number {
    let score = 0;

    switch (character.specialization) {
      case Specialization.CHAMPION.label:
      case Specialization.PALADIN.label:
        score -= distance * 2;
        break;
      case Specialization.ROGUE.label:
        score -= distance * 1.2;
        break;
      case Specialization.SHARPSHOOTER.label:
        score -= Math.abs(distance - 4) * 1.5;
        break;
      case Specialization.ARCANIST.label:
      case Specialization.NECROMANCER.label:
        score -= distance * 1.5;
        break;
      default:
        score -= distance * 1.8;
    }

    return score;
  }

  private evaluateSpecializationPosition(x: number, y: number, character: Character, pathToCenter: number): number {
    let score = 0;
    const preference = this.specializationPreferences[character.specialization];
    if (!preference) {
      return score;
    }

    if (preference.frontline) {
      score += pathToCenter < 6 ? 3 : 1;
    }

    if (preference.backlineBonus) {
      score += this.evaluateBacklinePosition(x, y) * preference.backlineBonus;
    }

    if (preference.flankingBonus) {
      score += this.evaluateFlankingOptions(x, y) * preference.flankingBonus;
    }

    if (preference.centralBonus) {
      const centerProximity = MAX_GRID_SIZE - this.getDistanceToCenterZone(x, y);
      score += centerProximity * preference.centralBonus;
    }

    return score;
  }

  private evaluateBacklinePosition(x: number, y: number): number {
    return this.pathsToCenter[x]![y]! >= 4 ? 2 : 0;
  }

  private evaluateFlankingOptions(x: number, y: number): number {
    const diagonals = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    return diagonals.filter(([dx, dy]) => this.isValidPosition(x + dx!, y + dy!)).length * 0.5;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < MAX_GRID_SIZE && y >= 0 && y < MAX_GRID_SIZE;
  }

  public findBestPosition(grid: GameGrid, character: Character): { x: number; y: number } | null {
    let bestScore = -Infinity;
    let bestPosition: { x: number; y: number } | null = null;

    for (let x = 0; x < MAX_GRID_SIZE; x++) {
      for (let y = 0; y < MAX_GRID_SIZE; y++) {
        const score = this.evaluateInitialPosition(x, y, grid, character);
        if (score > bestScore) {
          bestScore = score;
          bestPosition = { x, y };
        }
      }
    }

    return bestPosition;
  }
}

export default PositionEvaluator;
