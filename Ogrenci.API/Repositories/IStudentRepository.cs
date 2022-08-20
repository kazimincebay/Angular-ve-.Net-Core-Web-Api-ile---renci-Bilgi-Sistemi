﻿using System.Threading.Tasks;
using Ogrenci.API.DataModels;
namespace Ogrenci.API.Repositories
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetStudentsAsync();

        Task<Student> GetStudentAsync(Guid studentId);

        Task<List<Gender>> GetGendersAsync();

        Task<bool> Exists(Guid studentId);

        Task<Student> UpdateStudent(Guid studentId,Student student);

        Task<Student> AddStudent(Student student);

        Task<Student> DeleteStudentAsync(Guid studentId);

        Task<bool> UpdateProfileImage(Guid studentId, string profileImageUrl);

    }
}
