export type ActionResponse =
  | { success: true }
  | { success: false; errorMessage: string };
