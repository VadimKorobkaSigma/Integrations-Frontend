export type Repository =
    | {
          id: string;
          name: string;
          webhookEnabled: false;
      }
    | {
          id: string;
          name: string;
          webhookEnabled: true;
          webhookId: string;
      };
