﻿using FluentValidation;
using Ogrenci.API.DomainModels;
using Ogrenci.API.Repositories;

namespace Ogrenci.API.Validators
{
    public class AddStudentRequestValidator : AbstractValidator<AddStudentRequest>
    {
        public AddStudentRequestValidator(IStudentRepository studentRepository)
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.DateOfBirth).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Mobile).GreaterThan(99999).LessThan(10000000000);
            RuleFor(x => x.GenderId).NotEmpty().Must(id =>
            {
                var gender = studentRepository.GetGendersAsync().Result.ToList().FirstOrDefault(x => x.Id == id);

                if (gender != null)
                {
                    return true;
                }
                return false;
            }).WithMessage("Lütfen Geçerli Bir Cinsiyet Seçiniz");
            RuleFor(x => x.PhysicalAdress).NotEmpty();
            RuleFor(x => x.PostalAdress).NotEmpty();

        }
    }
}
