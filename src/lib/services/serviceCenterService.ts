import { httpClient } from '../httpClient'
import { config } from '../config'
import type { ServiceCentersResponse, ServiceCenter, ServiceCenterFilters } from '@/types/service-center'

export class ServiceCenterService {
  constructor() {
    console.log('🏗️  ServiceCenterService initialized');
    console.log('   📋 Config apiBaseUrl:', config.apiBaseUrl);
  }

  /**
   * Fetch all service centers
   */
  async getServiceCenters(filters?: ServiceCenterFilters): Promise<ServiceCentersResponse> {
    try {
      console.log('\n🏢 ServiceCenterService.getServiceCenters() called');
      console.log('   🔍 Filters:', filters);
      console.log('   📋 Config apiBaseUrl:', config.apiBaseUrl);
      
      let endpoint = `${config.apiBaseUrl}/service-centers`
      console.log('   🎯 Base endpoint constructed:', endpoint);
      
      const searchParams = new URLSearchParams()
      
      // Add query parameters if filters are provided
      if (filters?.search) {
        searchParams.append('search', filters.search)
        console.log('   🔍 Added search filter:', filters.search);
      }
      if (filters?.location) {
        searchParams.append('location', filters.location)
        console.log('   📍 Added location filter:', filters.location);
      }
      if (filters?.services && filters.services.length > 0) {
        searchParams.append('services', filters.services.join(','))
        console.log('   ⚙️  Added services filter:', filters.services);
      }

      if (searchParams.toString()) {
        endpoint += `?${searchParams.toString()}`
        console.log('   🔗 Query params added:', searchParams.toString());
      }

      console.log('   🎯 Final endpoint URL:', endpoint);
      console.log('   📡 Making request via httpClient...');

      const response = await httpClient.get(endpoint)
      
      console.log('   📈 Response received in service:');
      console.log('      Status:', response.status);
      console.log('      OK:', response.ok);
      
      if (!response.ok) {
        const errorMessage = `Failed to fetch service centers: ${response.status}`;
        console.error('   ❌ Request failed:', errorMessage);
        throw new Error(errorMessage);
      }

      console.log('   📊 Parsing JSON response...');
      const data = await response.json()
      console.log('   ✅ Service centers fetched successfully, count:', data?.data?.length || 'unknown');
      return data
    } catch (error) {
      console.error('❌ ServiceCenterService.getServiceCenters() failed:', error);
      console.log('   Error type:', typeof error);
      console.log('   Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.log('   Error stack:', error instanceof Error ? error.stack : 'No stack');
      throw error
    }
  }

  /**
   * Get a specific service center by ID
   */
  async getServiceCenter(id: string): Promise<ServiceCenter> {
    try {
      console.log('\n🏢 ServiceCenterService.getServiceCenter() called with ID:', id);
      const endpoint = `${config.apiBaseUrl}/service-centers/${id}`;
      console.log('   🎯 Endpoint:', endpoint);
      
      const response = await httpClient.get(endpoint)
      
      console.log('   📈 Response status:', response.status);
      
      if (!response.ok) {
        const errorMessage = `Failed to fetch service center: ${response.status}`;
        console.error('   ❌ Request failed:', errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json()
      console.log('   ✅ Service center fetched successfully');
      return data.data
    } catch (error) {
      console.error('❌ ServiceCenterService.getServiceCenter() failed:', error);
      throw error
    }
  }

  /**
   * Search service centers by location
   */
  async searchServiceCentersByLocation(lat: number, lng: number, radius: number = 10): Promise<ServiceCentersResponse> {
    try {
      console.log('\n🏢 ServiceCenterService.searchServiceCentersByLocation() called');
      console.log('   📍 Coordinates:', { lat, lng, radius });
      
      const searchParams = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString()
      })

      const endpoint = `${config.apiBaseUrl}/service-centers/search?${searchParams.toString()}`;
      console.log('   🎯 Endpoint:', endpoint);

      const response = await httpClient.get(endpoint)
      
      console.log('   📈 Response status:', response.status);
      
      if (!response.ok) {
        const errorMessage = `Failed to search service centers: ${response.status}`;
        console.error('   ❌ Request failed:', errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json()
      console.log('   ✅ Service centers search completed successfully');
      return data
    } catch (error) {
      console.error('❌ ServiceCenterService.searchServiceCentersByLocation() failed:', error);
      throw error
    }
  }
}

// Export a singleton instance
export const serviceCenterService = new ServiceCenterService() 