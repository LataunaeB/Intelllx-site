/**
 * Global TypeScript Definitions
 * 
 * Extends the Window interface with third-party integrations
 */

declare global {
  interface Window {
    /**
     * HubSpot analytics queue
     * Used for tracking events and identifying users
     */
    _hsq?: Array<
      | [string, Record<string, unknown>]
      | [string, string]
      | [string]
    >;

    /**
     * HubSpot API object
     * Provides access to forms, meetings, and other HubSpot features
     */
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: () => void;
          onFormSubmit?: () => void;
          onFormSubmitted?: () => void;
        }) => void;
      };
      meetings?: Record<string, unknown>;
      cta?: Record<string, unknown>;
    };

    /**
     * HubSpot Conversations (Chat Widget) settings
     */
    hsConversationsSettings?: {
      loadImmediately?: boolean;
      inlineEmbedSelector?: string;
      enableWidgetCookieBanner?: boolean;
      disableAttachment?: boolean;
    };

    /**
     * HubSpot Conversations API
     * Available after the chat widget loads
     */
    HubSpotConversations?: {
      widget: {
        load: () => void;
        open: () => void;
        close: () => void;
        remove: () => void;
        status: () => { loaded: boolean };
      };
      on: (event: string, callback: () => void) => void;
      off: (event: string, callback: () => void) => void;
    };
  }
}

export {};

