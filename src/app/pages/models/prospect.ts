export class prospect {
    prospect_id:number;
    prospect_name:string;
    prospect_lastname: string;
    prospect_birthday: Date;
    city_id: number;
    country_id: string;
    prospect_address: string;
    prospect_phonenumber: string;
    prospect_cv: string;
    prospect_photo: string;
    prospect_link: string;
    prospect_salary: number;
    experience_level: number;
    experience_years: number;
    title_id: number;
    email: string;
    referral_name: string;
    commentary: string;
    prospect_status: string;
    codigoMoneda: string;
    age: number;
    software_Prospect: [
      {
        software_id: number,
        prospect_id: number,
        software_name: string
      }
    ]
}