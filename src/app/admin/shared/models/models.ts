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
   contact: string;
   course: string;
}

export interface IRegistration {
   idNumber: number;
   name: string;
   contact: string;
   course: string;
   status: string;
   createdDate: string;
   createdTime: string;
   task: any[];
   id: string;
}

export enum ERegistrationStatus {
   saralanmagan = 'saralanmagan',
   qaytaaloqa = 'qaytaaloqa',
   qoshildi = 'qoshildi',
   ikkinchi_tarif = '2-tarif',
   probniy = 'probniy',
   tolovqilgan = '' + `to'lovqilgan`
}
