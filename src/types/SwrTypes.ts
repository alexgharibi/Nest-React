export type GetResponse<TResults> = {
  results: TResults[];
};

export type Users = {
  id: number;
  fullName: string;
  newValue: string | null;
  previousValue: string | null;
  timestamp: string | null;
  userName: string | null;
};
