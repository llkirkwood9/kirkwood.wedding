using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Authentication
{
    public class UserDto
    {
        /// <summary>
        /// User First Name
        /// </summary>
        [MaxLength(100)]
        public string? FirstName { get; set; }

        /// <summary>
        /// User Last Name
        /// </summary>
        [MaxLength(100)]
        public string? LastName { get; set; }

        /// <summary>
        /// User Email Address
        /// </summary>
        [MaxLength(100)]
        public string? Email { get; set; }
    }
}
