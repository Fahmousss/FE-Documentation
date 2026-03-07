export interface IUser {
  id: string;
  name: string;
  nrp: string;
  role_id: string;
  role_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserForm {
  id: string;
  name: string;
  nrp: string;
  role_id: string;
}

export interface UserBody extends Omit<UserForm, 'id'> {
  id?: string;
}
