/* eslint-disable class-methods-use-this */
import type { AxiosResponse } from 'axios';

import { authInstance, baseInstance } from './axiosCreator';

class API {
  async signup(data: ISignUpdata): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post('/admins/signup', data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(data: ILoginData): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post('/admins/signin', data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async forgotPassword(data: { email: string }): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.post('/admins/forgotpassword', data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getInstitutions(data: {
    name?: string;
    country: string;
    offset?: string;
    limit?: string;
  }): Promise<AxiosResponse<{ message: string; institution: { docs: Institution[] } }>> {
    const queryString = data
      ? Object.entries(data)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      : '';
    try {
      const response = await authInstance.get(
        `/institutions/get-all${queryString ? `?${queryString}` : ''}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addInstitution(data: Omit<Institution, '__v' | '_id'>) {
    try {
      const response = await authInstance.post(`/institutions/create`, data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateInstitution(data: {
    id: string;
    payload: Partial<{
      name: string;
      country: string;
      institutionCharge: string;
      ourCharge: string;
      transcriptFee: string;
    }>;
  }) {
    try {
      const response = await authInstance.put(`/institutions/update/${data.id}`, data.payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteInstitution(id: string) {
    try {
      const response = await authInstance.delete(`/institutions/delete/${id}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getHistory() {
    try {
      const response = await authInstance.get(`/institutions/create`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getTranscripts(
    data: Partial<{ offset: string; limit: string; status: string }> | null
  ): Promise<AxiosResponse<{ message: string; transcripts: ITranscript[] }>> {
    const queryString = data
      ? Object.entries(data)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      : '';
    try {
      const response = await authInstance.get(
        `/transcripts/get-all${queryString ? `?${queryString}` : ''}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateTranscriptStatus(data: {
    id: string;
    payload: { transcriptStatus: string; updatedBy: string; userEmail: string; comment?: string };
  }) {
    try {
      const response = await authInstance.put(
        `/transcripts/update-status/${data?.id}`,
        data.payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getEducationVerification(
    status: string
  ): Promise<AxiosResponse<{ message: string; verifications: IEducation[] }>> {
    try {
      const response = await authInstance.get(
        `/verifications/get-verifications-by-status/${status}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateEducationVerification(data: {
    id: string;
    email: string;
    payload: FormData;
  }): Promise<AxiosResponse<{ message: string; verifications: IEducation[] }>> {
    try {
      const response = await authInstance.put(
        `/verifications/update-status/${data.id}/${data.email}`,
        data.payload,
        {
          headers: {
            'Content-Type': 'multipart/formdata',
          },
        }
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async sendMessage(data: {
    requester: string;
    email: string;
    payload: { message: string; subject: string; institution: string; name: string; id: string };
  }): Promise<AxiosResponse<{ message: string; verifications: IEducation[] }>> {
    try {
      const response = await authInstance.post(
        `/verifications/sendemail/${data.email}/${data.requester}`,
        data.payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAdmins(): Promise<AxiosResponse<{ message: string; admins: IAdmin[] }>> {
    try {
      const response = await authInstance.get(`/admins/getAllAdmins`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteAdmin(id: string): Promise<
    AxiosResponse<{
      message: string;
    }>
  > {
    try {
      const response = await authInstance.delete(`/admins/removeAdmin/${id}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
const Api = new API();
export default Api;
