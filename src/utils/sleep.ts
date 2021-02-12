// Helper function to wait for some time
export const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
}