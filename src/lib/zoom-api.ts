import axios from 'axios';

interface ZoomMeeting {
  id: string;
  join_url: string;
  start_url: string;
  password?: string;
}

interface ZoomMeetingRequest {
  topic: string;
  type: number; // 2 = scheduled meeting
  start_time: string;
  duration: number;
  timezone: string;
  agenda?: string;
  settings: {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: number;
    audio: string;
    auto_recording: string;
  };
}

class ZoomAPI {
  private accountId: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.accountId = process.env.ZOOM_ACCOUNT_ID || '';
    this.clientId = process.env.ZOOM_CLIENT_ID || '';
    this.clientSecret = process.env.ZOOM_CLIENT_SECRET || '';
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // Try the correct Zoom Server-to-Server OAuth endpoint
      const response = await axios.post('https://zoom.us/oauth/token', 
        new URLSearchParams({
          grant_type: 'account_credentials',
          account_id: this.accountId,
        }),
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 minute buffer

      return this.accessToken;
    } catch (error: unknown) {
      console.error('Failed to get Zoom access token:', error);
      const errorData = error as { response?: { data?: unknown } };
      console.error('Error details:', errorData.response?.data);
      throw new Error('Failed to authenticate with Zoom API');
    }
  }

  async createMeeting(meetingData: {
    topic: string;
    startTime: string;
    duration: number;
    timezone?: string;
    agenda?: string;
  }): Promise<ZoomMeeting> {
    try {
      const accessToken = await this.getAccessToken();

      const meetingRequest: ZoomMeetingRequest = {
        topic: meetingData.topic,
        type: 2, // Scheduled meeting
        start_time: meetingData.startTime,
        duration: meetingData.duration,
        timezone: meetingData.timezone || 'America/Los_Angeles',
        agenda: meetingData.agenda || 'Discovery Call',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0, // Automatically approve
          audio: 'both',
          auto_recording: 'none',
        },
      };

      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        meetingRequest,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        id: response.data.id,
        join_url: response.data.join_url,
        start_url: response.data.start_url,
        password: response.data.password,
      };
    } catch (error) {
      console.error('Failed to create Zoom meeting:', error);
      throw new Error('Failed to create Zoom meeting');
    }
  }

  async getMeeting(meetingId: string): Promise<ZoomMeeting> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      return {
        id: response.data.id,
        join_url: response.data.join_url,
        start_url: response.data.start_url,
        password: response.data.password,
      };
    } catch (error) {
      console.error('Failed to get Zoom meeting:', error);
      throw new Error('Failed to retrieve Zoom meeting');
    }
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();

      await axios.delete(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Failed to delete Zoom meeting:', error);
      throw new Error('Failed to delete Zoom meeting');
    }
  }
}

export const zoomAPI = new ZoomAPI();
export type { ZoomMeeting, ZoomMeetingRequest };
