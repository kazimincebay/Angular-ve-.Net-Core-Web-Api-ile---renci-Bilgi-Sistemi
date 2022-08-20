using AutoMapper;
using DataModels=Ogrenci.API.DataModels;
using Ogrenci.API.DomainModels;
using Ogrenci.API.Profiles.AfterMaps;

namespace Ogrenci.API.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DataModels.Student, Student>().ReverseMap();
            CreateMap<DataModels.Gender, Gender>().ReverseMap();
            CreateMap<DataModels.Adress, Adress>().ReverseMap();
            CreateMap<UpdateStudentRequest,DataModels.Student>().AfterMap<UpdateStudentRequestAfterMap>();
            CreateMap<AddStudentRequest, DataModels.Student>().AfterMap<AddStudentRequestAfterMap>();
        }
    }
}
