import { Profile } from '../types/profile';
import yaml from 'js-yaml';

// Import all YAML files from the profiles directory
const profileModules = import.meta.glob('/profiles/*.yml', { as: 'raw', eager: true });

export const loadProfiles = async (): Promise<Profile[]> => {
  const profiles: Profile[] = [];
  
  try {
    // Process each YAML file
    for (const [path, content] of Object.entries(profileModules)) {
      try {
        // Parse YAML content
        const profileData = yaml.load(content as string) as any;
        
        // Validate required fields
        if (!profileData.slug || !profileData.name || !profileData.type) {
          console.warn(`Skipping invalid profile: ${path} - missing required fields`);
          continue;
        }
        
        // Ensure required arrays exist
        profileData.services = profileData.services || [];
        profileData.tags = profileData.tags || [];
        
        // Ensure contact object exists
        if (!profileData.contact || !profileData.contact.email) {
          console.warn(`Skipping profile: ${path} - missing contact email`);
          continue;
        }
        
        profiles.push(profileData as Profile);
      } catch (error) {
        console.error(`Error parsing profile ${path}:`, error);
      }
    }
    
    console.log(`Loaded ${profiles.length} profiles from YAML files`);
    return profiles;
  } catch (error) {
    console.error('Error loading profiles:', error);
    return [];
  }
};

export const loadProfile = async (slug: string): Promise<Profile | null> => {
  const profiles = await loadProfiles();
  return profiles.find(profile => profile.slug === slug) || null;
};

// Helper function to get all available profile slugs
export const getProfileSlugs = async (): Promise<string[]> => {
  const profiles = await loadProfiles();
  return profiles.map(profile => profile.slug);
};

// Helper function to get profiles by type
export const getProfilesByType = async (type: 'professional' | 'company'): Promise<Profile[]> => {
  const profiles = await loadProfiles();
  return profiles.filter(profile => profile.type === type);
};