import { Character, newCharacter, Race, Specialization } from '../../stats';

interface TeamComposition {
  frontline: number;
  backline: number;
  support: number;
}

export class AICharacterGenerator {
  private usedNames: Set<string>;
  private teamComp: TeamComposition;

  constructor() {
    this.usedNames = new Set();
    this.teamComp = {
      frontline: 0,
      backline: 0,
      support: 0,
    };
  }

  private generateAIName(): string {
    const prefixes = ['Shadow', 'Dark', 'Steel', 'Iron', 'Storm', 'Frost', 'Blood', 'Night', 'Fire', 'Wind'];
    const suffixes = ['blade', 'heart', 'soul', 'mind', 'fist', 'strike', 'walker', 'hunter', 'weaver', 'guard'];

    let name: string;
    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      name = `${prefix}${suffix}`;
    } while (this.usedNames.has(name));

    this.usedNames.add(name);
    return name;
  }

  private getSpecializationType(spec: Specialization): keyof TeamComposition {
    switch (spec.label) {
      case Specialization.GUARDIAN.label:
      case Specialization.CHAMPION.label:
      case Specialization.PALADIN.label:
        return 'frontline';
      case Specialization.SHARPSHOOTER.label:
      case Specialization.ARCANIST.label:
      case Specialization.NECROMANCER.label:
      case Specialization.ROGUE.label:
        return 'backline';
      case Specialization.LUMINARY.label:
      case Specialization.MYSTIC_HERALD.label:
        return 'support';
      default:
        return 'backline';
    }
  }

  private selectSpecialization(): Specialization {
    // Define ideal team composition ratios
    const idealComp = {
      frontline: 0.4, // 40% frontline
      backline: 0.4, // 40% backline
      support: 0.2, // 20% support
    };

    // Calculate current team composition ratios
    const total = this.teamComp.frontline + this.teamComp.backline + this.teamComp.support;
    const currentRatios = {
      frontline: this.teamComp.frontline / (total || 1),
      backline: this.teamComp.backline / (total || 1),
      support: this.teamComp.support / (total || 1),
    };

    // Calculate weights for each specialization
    const weights = Specialization.ALL_SPECIALIZATIONS.map(spec => {
      const type = this.getSpecializationType(spec);
      const currentRatio = currentRatios[type];
      const idealRatio = idealComp[type];

      // Higher weight if we need more of this type
      return {
        spec,
        weight: 1 + Math.max(0, idealRatio - currentRatio) * 2,
      };
    });

    // Select specialization based on weights
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;

    for (const { spec, weight } of weights) {
      random -= weight;
      if (random <= 0) {
        // Update team composition
        this.teamComp[this.getSpecializationType(spec)]++;
        return spec;
      }
    }

    return Specialization.ALL_SPECIALIZATIONS[0]!; // Fallback
  }

  private selectRace(): Race {
    // Simple random selection for race
    return Race.ALL_RACES[Math.floor(Math.random() * Race.ALL_RACES.length)]!;
  }

  public generateCharacter(): Character {
    const name = this.generateAIName();
    const race = this.selectRace();
    const specialization = this.selectSpecialization();

    return newCharacter(name, race, specialization);
  }

  public generateTeam(size: number): Character[] {
    // Reset team composition
    this.teamComp = {
      frontline: 0,
      backline: 0,
      support: 0,
    };

    const team: Character[] = [];
    for (let i = 0; i < size; i++) {
      team.push(this.generateCharacter());
    }
    return team;
  }
}

export const createAIOpponent = (teamSize = 5): Character[] => {
  const generator = new AICharacterGenerator();
  return generator.generateTeam(teamSize);
};
