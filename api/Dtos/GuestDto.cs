namespace api.Dtos
{
    public class GuestDto
    {
        /// <summary>
        /// Primary Key - ID of guest
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// Guest First Name
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// Guest Last Name
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// Guest Street Address
        /// </summary>
        public string? StreetAddress { get; set; }

        /// <summary>
        /// Guest City
        /// </summary>
        public string? City { get; set; }

        /// <summary>
        /// Guest State
        /// </summary>
        public string? State { get; set; }

        /// <summary>
        /// Guest Zip Code
        /// </summary>
        public string? ZipCode { get; set; }
    }
}
