import { useState, useMemo } from 'react';
import { TRewardItem } from '@/type/types';

export type SortOption = 'location' | 'points-asc' | 'points-desc';

interface UserLocation {
  latitude: number;
  longitude: number;
}

// Mock location data for brands
const brandLocations: Record<string, { latitude: number; longitude: number; distance?: number }> = {
  'KFC': { latitude: 6.5244, longitude: 3.3792 }, // Victoria Island, Lagos
  'Dominos': { latitude: 6.4698, longitude: 3.5852 }, // Lekki, Lagos
  'Nike': { latitude: 6.5355, longitude: 3.3087 }, // Ikeja, Lagos
  'Adidas': { latitude: 6.5795, longitude: 3.3211 }, // Surulere, Lagos
  'McDonalds': { latitude: 6.4541, longitude: 3.3947 }, // Ikoyi, Lagos
  'Starbucks': { latitude: 6.6018, longitude: 3.3515 }, // Yaba, Lagos
  'H&M': { latitude: 6.5244, longitude: 3.3792 }, // Victoria Island, Lagos
  'Zara': { latitude: 6.4698, longitude: 3.5852 }, // Lekki, Lagos
};

const DEFAULT_USER_LOCATION: UserLocation = {
  latitude: 6.4531,
  longitude: 3.3958
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return Math.round(distance * 10) / 10; 
}

function enrichRewardsWithDistance(
  rewards: TRewardItem[],
  userLocation: UserLocation
): (TRewardItem & { distance: number })[] {
  return rewards.map(reward => {
    const brandLocation = brandLocations[reward.brand.name];
    let distance = 999; 
    
    if (brandLocation) {
      distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        brandLocation.latitude,
        brandLocation.longitude
      );
    }
    
    return {
      ...reward,
      distance
    };
  });
}

interface UseRewardOrderingReturn {
  sortedRewards: TRewardItem[];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  userLocation: UserLocation;
  setUserLocation: (location: UserLocation) => void;
  getRewardDistance: (rewardId: number | string) => number;
}

export function useRewardOrdering(
  rewards: TRewardItem[]
): UseRewardOrderingReturn {
  const [sortOption, setSortOption] = useState<SortOption>('location');
  const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_USER_LOCATION);

  const enrichedRewards = useMemo(() => 
    enrichRewardsWithDistance(rewards, userLocation),
    [rewards, userLocation]
  );

  const sortedRewards = useMemo(() => {
    const rewardsToSort = [...enrichedRewards];
    
    switch (sortOption) {
      case 'location':
        return rewardsToSort.sort((a, b) => a.distance - b.distance);
      
      case 'points-asc':
        return rewardsToSort.sort((a, b) => a.points - b.points);
      
      case 'points-desc':
        return rewardsToSort.sort((a, b) => b.points - a.points);
      
      default:
        return rewardsToSort;
    }
  }, [enrichedRewards, sortOption]);

  const getRewardDistance = (rewardId: number | string): number => {
    const reward = enrichedRewards.find(r => Number(r.id) === Number(rewardId));
    return reward?.distance || 999;
  };

  return {
    sortedRewards: sortedRewards.map(({ distance, ...reward }) => reward),
    sortOption,
    setSortOption,
    userLocation,
    setUserLocation,
    getRewardDistance,
  };
}