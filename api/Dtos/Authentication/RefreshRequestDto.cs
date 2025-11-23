using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Authentication
{
    public class RefreshRequestDto
    {
        /// <summary>
        /// Token to refresh
        /// </summary>
        [Required]
        public required string RefreshToken { get; set; }
    }
}
