namespace Ogrenci.API.DataModels
{
    public class Gender
    {

        public Guid Id { get; set; }
        public string Description { get; set; }

        internal bool Any()
        {
            throw new NotImplementedException();
        }
    }
}
