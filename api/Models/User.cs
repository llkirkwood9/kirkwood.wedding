using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class User
    {
        /// <summary>
        /// Primary Key - ID of user
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User First Name
        /// </summary>
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// User Last Name
        /// </summary>
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// User Email Address
        /// </summary>
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Token used for refresh
        /// </summary>
        [MaxLength(100)]
        public string? RefreshToken { get; set; } = string.Empty;

        /// <summary>
        /// Refresh token expiration
        /// </summary>
        public DateTime? RefreshTokenExpiry { get; set; } = DateTime.MinValue;
    }
}
