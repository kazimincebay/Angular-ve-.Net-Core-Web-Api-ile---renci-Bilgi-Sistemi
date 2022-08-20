using Microsoft.EntityFrameworkCore;

namespace Ogrenci.API.DataModels
{
    public class StudentAdminContext : DbContext
    {

        public StudentAdminContext(DbContextOptions<StudentAdminContext> options) : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Adress> Address { get; set; }










    }
}
