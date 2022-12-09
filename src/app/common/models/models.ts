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
   open?: boolean;
}

export interface IEmployedStudent {
   name: string;
   image: string;
   profession: string;
   workplace: string;
   comment: string;
   id: string;
   showComment?: boolean;
}

export interface ICompany {
   id: string;
   link: string;
   companyLogo: string;
}

export interface IMentor {
   id: string;
   name: string;
   position: string;
   workplace: string;
   information: string[];
   image: string;
}

export interface IStudentProject {
   id: string;
   name: string;
   projectImage: string;
   studentImage: string;
   projectLink: string;
   group: string;
}

export interface IRecordedIntroLesson {
   id: string;
   posterImage: string;
   videoTitle: string;
   youtube: string;
   themes: string[];
   duration: string;
   name: string;
   teacherImage: string;
   playerShow?: boolean;
}

export interface IContact {
   id?: string;
   createdDate?: string;
   createdTime?: string;
   name: string;
   phone: number;
   message: string;
}

export interface ICourse {
   courseName: string;
   courseImage: string;
   courseSubtitle: string;
   courseTitle: string;
   courseDescription: string;
   coursePageImage: string;
   courseDetails: string[];
   courseSkills: string[];
   listOfTopics: string[];
   whyThisCourseTitle: string;
   whyThisCourse: string[];
   courseProjectsList: string[];
   id: string;
   comments: IComment[];
}

export interface IComment {
   commentTitle: string;
   commentDescription: string;
   name: string;
   phone: string;
   image: string;
   course: ICourse;
   id: string;
}

