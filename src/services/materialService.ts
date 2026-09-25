import { StartupMaterial, MaterialCategory } from '../types/startup';

class MaterialService {
  private materialsBySession: Map<string, StartupMaterial[]> = new Map();

  async uploadMaterial(
    sessionId: string,
    file: File,
    category: MaterialCategory = 'pitch_deck'
  ): Promise<StartupMaterial> {
    // Simulated upload latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newMaterial: StartupMaterial = {
      id: `mat-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      category,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'ready',
      url: URL.createObjectURL(file)
    };

    const current = this.materialsBySession.get(sessionId) || [];
    current.push(newMaterial);
    this.materialsBySession.set(sessionId, current);

    return newMaterial;
  }

  async removeMaterial(sessionId: string, materialId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const current = this.materialsBySession.get(sessionId) || [];
    const updated = current.filter((m) => m.id !== materialId);
    this.materialsBySession.set(sessionId, updated);
    return true;
  }

  async getSessionMaterials(sessionId: string): Promise<StartupMaterial[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.materialsBySession.get(sessionId) || [];
  }
}

export const materialService = new MaterialService();
