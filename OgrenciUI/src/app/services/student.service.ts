import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addStudentRequest } from '../models/api-models/addStudentRequest.model';
import { Student } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/updateStudentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:7147';

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students/');
  }

  getStudent(studentId: string | null) {
    return this.httpClient.get<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: addStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAdress: studentRequest.adress.physicalAdress,
      postalAdress: studentRequest.adress.postalAdress,
    };
    return this.httpClient.post<Student>(
      this.baseApiUrl + '/students/add',
      addStudentRequest
    );
  }

  updateStudent(
    studentId: string,
    studentRequest: Student
  ): Observable<Student> {
    const updateStudentRequest: updateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAdress: studentRequest.adress.physicalAdress,
      postalAdress: studentRequest.adress.postalAdress,
    };
    return this.httpClient.put<Student>(
      this.baseApiUrl + '/students/' + studentId,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string | null) {
    return this.httpClient.delete<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('profileImage', file);

    return this.httpClient.post(
      this.baseApiUrl + '/students/' + studentId + '/uploadImage',
      formData,
      {
        responseType: 'text',
      }
    );
  }
}
