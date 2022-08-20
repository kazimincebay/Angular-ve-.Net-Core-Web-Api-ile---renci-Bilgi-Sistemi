using Microsoft.EntityFrameworkCore;
using Ogrenci.API.DataModels;

namespace Ogrenci.API.Repositories
{
    public class SqlStudentRepository : IStudentRepository
    {
        private readonly StudentAdminContext context;
        public SqlStudentRepository(StudentAdminContext context)
        {
            this.context = context;
        }
        public async Task<List<Student>> GetStudentsAsync()
        {
            return await context.Student.Include(nameof(Gender)).Include(nameof(Adress)).ToListAsync();
        }

        public async Task<Student> GetStudentAsync(Guid studentId)
        {
            return await context.Student.Include(nameof(Gender)).Include(nameof(Adress)).FirstOrDefaultAsync(x=>x.Id==studentId);
        }

        public async Task<List<Gender>> GetGendersAsync()
        {
            return await context.Gender.ToListAsync();
        }

        public async Task<bool> Exists(Guid studentId)
        {
           return await context.Student.AnyAsync(x=>x.Id==studentId);
        }
        
        public async Task<Student> AddStudent(Student request)
        {
            var student = await context.Student.AddAsync(request);

            
                await context.SaveChangesAsync();
                return student.Entity;
            }
            

        public async Task<Student> UpdateStudent(Guid studentId, Student student)
        {
            var existingStudent = await GetStudentAsync(studentId);

            if (existingStudent != null)
            {
                existingStudent.FirstName = student.FirstName;
                existingStudent.LastName = student.LastName;
                existingStudent.DateOfBirth = student.DateOfBirth;
                existingStudent.Email = student.Email;
                existingStudent.Mobile = student.Mobile;
                existingStudent.GenderId = student.GenderId;
                existingStudent.Adress.PhysicalAdress = student.Adress.PhysicalAdress;
                existingStudent.Adress.PostalAdress = student.Adress.PostalAdress;

                await context.SaveChangesAsync();
                return existingStudent;
            }
            return null;
        }

        public async Task<Student> DeleteStudentAsync(Guid studentId)
        {
            var existingStudent = await GetStudentAsync(studentId);

            if (existingStudent != null)
            {
                context.Student.Remove(existingStudent);
                await context.SaveChangesAsync();
                return existingStudent;
            }
            return null;

        }

        public async Task<bool> UpdateProfileImage(Guid studentId, string profileImageUrl)
        {
            var student = await GetStudentAsync(studentId);
            if (student!=null) {
                student.ProfileImageURL = profileImageUrl;
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
