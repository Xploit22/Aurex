
export interface Website {
  id: string;
  name: string;
  url: string;
  imageUrl?: string;
  createdAt: number;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
