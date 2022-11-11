export interface ILoginRequest {
   email: string;
   password: string;
}

export interface ILoginResponse {
   status: number;
   token: string;
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

export interface IEnrollCourse {
   id?: string;
   createdAt?: string;
   name: string;
   phone: string;
   course: string;
}
