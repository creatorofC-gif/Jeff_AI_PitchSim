import { AvatarConfig } from '../types/avatar';
import { InvestorPersonality } from '../types/investor';

export interface AvatarProvider {
  id: string;
  name: string;
  getConfig(personality: InvestorPersonality): AvatarConfig;
}

export class LocalGlbAvatarProvider implements AvatarProvider {
  id = 'local-glb';
  name = 'Local GLTF/GLB Engine';

  getConfig(personality: InvestorPersonality): AvatarConfig {
    const isFemale = personality === 'angel_investor' || personality === 'corporate_investor';
    return {
      id: `avatar-${personality}`,
      name: personality,
      // Default to bundled GLB path or public model
      modelUrl: isFemale ? '/models/investor-female.glb' : '/models/investor-male.glb',
      provider: 'local',
      gender: isFemale ? 'female' : 'male',
      scale: 1.0,
      position: [0, -1.2, 0],
      rotation: [0, 0, 0]
    };
  }
}

export class ReadyPlayerMeAvatarProvider implements AvatarProvider {
  id = 'ready-player-me';
  name = 'Ready Player Me Cloud Avatar';

  getConfig(personality: InvestorPersonality): AvatarConfig {
    const isFemale = personality === 'angel_investor' || personality === 'corporate_investor';
    // Ready Player Me public sample models
    const femaleUrl = 'https://models.readyplayer.me/64b53ef1215b3e10db35a127.glb';
    const maleUrl = 'https://models.readyplayer.me/6460d1ba880a9108a706b47c.glb';

    return {
      id: `rpm-${personality}`,
      name: personality,
      modelUrl: isFemale ? femaleUrl : maleUrl,
      provider: 'readyplayerme',
      gender: isFemale ? 'female' : 'male',
      scale: 1.0,
      position: [0, -1.2, 0],
      rotation: [0, 0, 0]
    };
  }
}

class AvatarService {
  private activeProvider: AvatarProvider = new LocalGlbAvatarProvider();
  private providers: Map<string, AvatarProvider> = new Map();

  constructor() {
    this.registerProvider(new LocalGlbAvatarProvider());
    this.registerProvider(new ReadyPlayerMeAvatarProvider());
  }

  registerProvider(provider: AvatarProvider) {
    this.providers.set(provider.id, provider);
  }

  setProvider(providerId: string) {
    const provider = this.providers.get(providerId);
    if (provider) {
      this.activeProvider = provider;
    }
  }

  getAvatarConfig(personality: InvestorPersonality): AvatarConfig {
    return this.activeProvider.getConfig(personality);
  }

  getActiveProviderName(): string {
    return this.activeProvider.name;
  }
}

export const avatarService = new AvatarService();
