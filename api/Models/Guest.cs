using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Guest
    {
        /// <summary>
        /// Primary Key - ID of guest
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Guest First Name
        /// </summary>
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// Guest Last Name
        /// </summary>
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// Guest Street Address
        /// </summary>
        [MaxLength(100)]
        public string StreetAddress { get; set; } = string.Empty;

        /// <summary>
        /// Guest City
        /// </summary>
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// Guest State
        /// </summary>
        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Guest Zip Code
        /// </summary>
        [MaxLength(20)]
        public string ZipCode { get; set; } = string.Empty;

        /// <summary>
        /// List of RSVPs for this guest
        /// </summary>
        public List<Rsvp> Rsvps { get; set; } = new();
    }
}
