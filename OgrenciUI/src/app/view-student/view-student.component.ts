import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Gender } from '../models/ui-models/gender.model';
import { Student } from '../models/ui-models/student.model';
import { GenderService } from '../services/gender.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageURL: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    adress: {
      id: '',
      physicalAdress: '',
      postalAdress: '',
    },
  };
  genderList: Gender[] = [];
  isNewStudent = false;
  header = '';
  displayProfileImageUrl="";

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId === 'add') {
        this.isNewStudent = true;
        this.header = 'Öğrenci Ekle ';
        this.setImage();
      } else {
        this.isNewStudent = false;
        this.header = 'Öğrenci Detay ';
        this.studentService.getStudent(this.studentId).subscribe(
          (success) => {
            this.student = success;
            this.setImage();
          },
          (error) => {
            this.setImage();
          }
        );
      }

      this.genderService.getGenders().subscribe(
        (success) => {
          this.genderList = success;
        },
        (error) => {}
      );
    });
  }

  updateStudent() {
    console.log(this.student.id);
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (success) => {
        this.router.navigateByUrl('students');
        this.snackbar.open(
          'Öğrenci Başarılı Bir Şekilde Güncellendi!',
          undefined,
          {
            duration: 2000,
          }
        );
      },
      (error) => {
        this.snackbar.open('Öğrenci Güncellenemedi', undefined, {
          duration: 2000,
        });
      }
    );
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (success) => {
        this.snackbar.open('Öğrenci Başarılı Bir Şekilde Silindi!', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },
      (error) => {
        this.snackbar.open('Öğrenci Silinemedi!', undefined, {
          duration: 2000,
        });
      }
    );
  }

  addStudent() {
    this.studentService.addStudent(this.student).subscribe(
      (success) => {
        this.snackbar.open('Öğrenci Başarılı Bir Şekilde Eklendi!', undefined, {
          duration: 2000,
        });
        setTimeout(() => {
          this.router.navigateByUrl(`students/${success.id}`);
        }, 2000);
      },
      (error) => {
        this.snackbar.open('Öğrenci Eklenemedi!', undefined, {
          duration: 2000,
        });
      }
    );
  }


  setImage(){
    if(this.student.profileImageURL){
      this.displayProfileImageUrl=this.studentService.getImagePath(this.student.profileImageURL);

    }
    else{
      this.displayProfileImageUrl="/assets/user.png" ;
    }
  }


  uploadImage(event:any){
if(this.studentId){
  const file:File=event.target.files[0];
this.studentService.uploadImage(this.student.id,file).subscribe(
  (success)=>{
    this.student.profileImageURL=success;
    this.setImage();
    this.snackbar.open('Öğrenci Resmi Başarılı Bir Şekilde Düzenlendi!', undefined, {
      duration: 2000,
    });
  },
  (error)=>{
    this.snackbar.open('Öğrenci Resmi Düzenlenemedi!', undefined, {
      duration: 2000,
    });
  }
)
}
  }
}
