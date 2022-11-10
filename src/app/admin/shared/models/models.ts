export interface ILoginRequest {
   email: string;
   password: string;
}

export interface ILoginResponse {
   status: number;
   token: string;
}

export interface ISuccessResponse {
   message: string;
   success: number;
}

export interface ICurrentUser {
   data: {
      email: string
      id: string
   };
   status: number;
}

export interface IAdmin {
   email: string;
   id: string;
}

export interface IChangePassword {
   currentPassword: string;
   newPassword: string;
}
