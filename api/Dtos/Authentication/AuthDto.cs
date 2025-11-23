using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Authentication
{
    public class AuthDto
    {
        /// <summary>
        /// Google token for authentication
        /// </summary>
        [Required]
        public required string Token { get; set; }
    }
}
