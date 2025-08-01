export type TLogin = {
  email: string;
  password: string;
};


export type TLoginResponseData = {
  message: string;
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    dialing_code: string;
    country_code: string;
    token: string;
  };
};

export type TRewardItem = {
  id: string;
  brand: {
    id: number;
    name: string;
    logo: string;
    address: string;
  };
  points: number;
  description: string;
  claimed: boolean;
};

export type TRewardsResponse = {
  customer_points: number;
  rewards: TRewardItem[];
};

export type TClaimRewardResponse = {
  customer_points: number;
  rewards: TRewardItem[];
};
