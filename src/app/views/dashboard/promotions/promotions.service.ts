import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface PersonalInfo {
    location: string,
    title: string,
    birthday: string,
    phoneNumber: string,
    facebook: string,
    twitter: string,
    instagram: string,
    site: string,
}

interface Users {
    id: string,
    name: string;
    email: string;
    img: string;
    role: string;
    lastOnline: number;
    status: string,
    personalInfo: PersonalInfo
}
 
@Injectable({
    providedIn: 'root'
})
export class PromotionsService {
    getUsersApiUrl = `http://localhost:5000/getUsers`;
 
    constructor(private http: HttpClient) {}
 
    public getUsers() {
        return this.http.get<Array<any>>(this.getUsersApiUrl);
    }

    public viewUser(userId) {
        return this.http.get<Array<any>>(`http://localhost:5000/getUser?userId=${userId}`)
    }


    public createUser(data) {
        let requestBody = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        }
        let token = localStorage.getItem("token")
        let headers = new HttpHeaders();
    
        headers = headers.set('auth-token', token)
        return this.http.post(`http://localhost:5000/createUser`, requestBody, {headers: headers})
      }


    // update user details API
    public updateUserDetails(data, user) {
        let requestBody = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
        // password: data.password
        }
        return this.http.put(
        `http://localhost:5000/editUser/${user}`, requestBody)
    }


     // deleteUser API
    public deleteUser(user) {
        return this.http.delete(`http://localhost:5000/deleteUser/${user._id}`)
    }


    // toggle user
  public toggleUser(data, user) {
    let requestBody = {
      isActive: data.isActive,
    }
    return this.http.put(
      `http://localhost:5000/deactivateUser/?userId=${user._id}`, requestBody
    )
  }  
}