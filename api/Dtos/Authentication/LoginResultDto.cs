namespace api.Dtos.Authentication
{
    public class LoginResultDto
    {
        /// <summary>
        /// Returned JWT token
        /// </summary>
        public required string Token { get; set; }

        /// <summary>
        /// Returned refresh token
        /// </summary>
        public required string RefreshToken { get; set; }
    }
}
