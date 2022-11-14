export interface IHeader {
   id: string;
   phoneNumber: number;
   students: number;
   teachers: number;
   lessons: number;
   youtube: string;
}

export interface IFaq {
   id?: string;
   question: string;
   answer: string;
}

export interface IIntroLesson {
   id?: string;
   name: string;
}

export interface IEmployedStudent {
   name: string;
   image: string;
   profession: string;
   workplace: string;
   comment: string;
   id: string;
}
