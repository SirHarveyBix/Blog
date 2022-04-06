export interface UserAuth {
  signIn: (args: any) => Promise<{}>;
  error: string;
}
