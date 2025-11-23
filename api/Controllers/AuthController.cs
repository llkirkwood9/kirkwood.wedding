using api.Data;
using api.Dtos.Authentication;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="db"></param>
        /// <param name="httpClientFactory"></param>
        /// <param name="config"></param>
        /// <param name="logger"></param>
        /// <param name="tokenService"></param>
        public AuthController(ApplicationDbContext db, IHttpClientFactory httpClientFactory, IConfiguration config, ILogger<AuthController> logger, TokenService tokenService)
        {
            _Db = db;
            _HttpClientFactory = httpClientFactory;
            _Config = config;
            _Logger = logger;
            _TokenService = tokenService;
        }

        #endregion

        #region Private Fields

        /// <summary>
        /// Database Context
        /// </summary>
        private readonly ApplicationDbContext _Db;

        /// <summary>
        /// HTTP Client Factory
        /// </summary>
        private readonly IHttpClientFactory _HttpClientFactory;

        /// <summary>
        /// Access to AppSettings file
        /// </summary>
        private readonly IConfiguration _Config;

        /// <summary>
        /// Logger for auth controller
        /// </summary>
        private readonly ILogger<AuthController> _Logger;

        /// <summary>
        /// JWT Token Service
        /// </summary>
        private readonly TokenService _TokenService;

        #endregion

        #region POST Methods

        /// <summary>
        /// Authenticate given token with Google
        /// </summary>
        /// <param name="auth"></param>
        /// <returns></returns>
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] AuthDto auth)
        {
            try
            {
                // Exchange the code for token at Google
                var tokenResponse = await _HttpClientFactory.CreateClient().PostAsync(
                    "https://oauth2.googleapis.com/token",
                    new FormUrlEncodedContent(new Dictionary<string, string>
                    {
                        ["code"] = auth.Token,
                        ["client_id"] = _Config["GoogleClientId"]!,
                        ["client_secret"] = _Config["GoogleClientSecret"]!,
                        ["redirect_uri"] = _Config["GoogleRedirectUri"]!,
                        ["grant_type"] = "authorization_code"
                    })
                );

                if (!tokenResponse.IsSuccessStatusCode)
                {
                    var text = await tokenResponse.Content.ReadAsStringAsync();
                    return BadRequest(new { error = "Google token exchange failed", details = text });
                }

                var payload = await tokenResponse.Content.ReadFromJsonAsync<GoogleTokenResponse>();
                if (payload?.Id_Token == null || payload.Access_Token == null)
                {
                    return BadRequest(new { error = "Failed to authenticate" });
                }

                // Get the email from the ID token
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(payload.Id_Token);
                payload.Email = jwt.Claims.First(c => c.Type == "email").Value;

                // Check if user exists in the database
                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == payload.Email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {payload.Email} not found.");
                    return NotFound(new { error = "User not found" });
                }

                // Generate refresh token and store if user is found
                var refreshToken = _TokenService.GenerateRefreshToken();
                foundUser.RefreshToken = refreshToken;
                foundUser.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                // Update user in the database
                _Db.Users.Update(foundUser);
                await _Db.SaveChangesAsync();

                // Create result
                var result = new LoginResultDto
                {
                    Token = _TokenService.GenerateToken(foundUser),
                    RefreshToken = refreshToken,
                };
                return Ok(result);
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.RegisterUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred during Google login.", exception = e.Message });
            }
        }

        /// <summary>
        /// Refresh token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto request)
        {
            try
            {
                // Get user by refresh token
                var user = await _Db.Users.FirstOrDefaultAsync(x => x.RefreshToken == request.RefreshToken);
                if (user == null)
                {
                    _Logger.Log(LogLevel.Warning, "User not found.");
                    return NotFound(new { error = "User not found." });
                }

                if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiry <= DateTime.UtcNow)
                    return Unauthorized(new { error = "Refresh token is invalid or expired." });

                var newAccessToken = _TokenService.GenerateToken(user);
                var newRefreshToken = _TokenService.GenerateRefreshToken();

                // Update DB with new refresh token
                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                // Update user in the database
                _Db.Users.Update(user);
                await _Db.SaveChangesAsync();

                var result = new LoginResultDto
                {
                    RefreshToken = newRefreshToken,
                    Token = newAccessToken
                };

                return Ok(result);
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.RegisterUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred during token refresh.", exception = e.Message });
            }
        }

        /// <summary>
        /// Adds new unregistered user
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("user")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddUser([FromBody] UserDto request)
        {
            try
            {
                // Check if user already exists
                if (await _Db.Users.AnyAsync(x => x.Email == request.Email))
                {
                    _Logger.Log(LogLevel.Warning, "User already exists.");
                    return BadRequest(new { error = "User already exists." });
                }

                var email = User.FindFirst(ClaimTypes.Email)?.Value;

                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {email} not found.");
                    return NotFound(new { error = "User not found." });
                }

                if (request.Email == null || request.FirstName == null || request.LastName == null)
                {
                    _Logger.Log(LogLevel.Warning, "Missing parameter.");
                    return BadRequest(new { error = "Missing parameter." });
                }

                if (request.Email.Length > 100 || request.FirstName.Length > 100 || request.LastName.Length > 100)
                {
                    _Logger.Log(LogLevel.Warning, "Invalid parameter.");
                    return BadRequest(new { error = "Invalid parameter." });
                }

                // Create new user
                var newUser = new User
                {
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName
                };

                // Save user to DB
                _Db.Users.Add(newUser);
                await _Db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.AddUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred while adding user.", exception = e.Message });
            }
        }

        #endregion

        #region GET Methods

        /// <summary>
        /// Get current user information
        /// </summary>
        /// <returns></returns>
        [HttpGet("me")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;

                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {email} not found.");
                    return NotFound(new { error = "User not found." });
                }

                var result = new UserDto
                {
                    Email = foundUser.Email,
                    FirstName = foundUser.FirstName,
                    LastName = foundUser.LastName
                };

                return Ok(result);
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.RegisterUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred while retrieving user info.", exception = e.Message });
            }
        }

        /// <summary>
        /// Gets all available users
        /// </summary>
        /// <returns></returns>
        [HttpGet("users")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;

                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {email} not found.");
                    return NotFound(new { error = "User not found." });
                }

                var result = _Db.Users.Select(x => new UserDto
                {
                    Email = x.Email,
                    FirstName = x.FirstName,
                    LastName = x.LastName
                }).Where(x => x.Email != foundUser.Email).ToList();

                return Ok(result);
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.RegisterUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred while retrieving users.", exception = e.Message });
            }
        }

        #endregion

        #region PATCH Methods

        /// <summary>
        /// Update information about current user
        /// </summary>
        /// <param name="updateData"></param>
        /// <returns></returns>
        [HttpPatch("me")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateMe([FromBody] UserDto updateData)
        {
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;

                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {email} not found.");
                    return NotFound(new { error = "User not found." });
                }

                if (updateData.FirstName == null || updateData.LastName == null)
                {
                    _Logger.Log(LogLevel.Warning, "First name or last name not provided.");
                    return BadRequest(new { error = "First name or last name not provided." });
                }

                if (updateData.FirstName.Length > 100 ||
                    updateData.LastName.Length > 100)
                {
                    _Logger.Log(LogLevel.Warning, "First name or last name too long.");
                    return BadRequest(new { error = "First name or last name too long." });
                }

                foundUser.FirstName = updateData.FirstName;
                foundUser.LastName = updateData.LastName;

                // Update user in the database
                _Db.Users.Update(foundUser);
                await _Db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.UpdateMe - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred while updating user info.", exception = e.Message });
            }
        }

        #endregion

        #region DELETE Methods

        /// <summary>
        /// Delete given user
        /// </summary>
        /// <param name="deleteData"></param>
        /// <returns></returns>
        [HttpDelete("user")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> DeleteUser([FromBody] UserDto deleteData)
        {
            try
            {
                // Current user email
                var email = User.FindFirst(ClaimTypes.Email)?.Value;

                // Get current user
                var foundUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (foundUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {email} not found.");
                    return NotFound(new { error = "Current user not found." });
                }

                // Get user to delete
                var deleteUser = await _Db.Users.FirstOrDefaultAsync(x => x.Email == deleteData.Email);
                if (deleteUser == null)
                {
                    _Logger.Log(LogLevel.Warning, $"User {deleteData.Email} not found.");
                    return NotFound(new { error = "User to delete not found." });
                }

                // Ensure user is not deleting themselves
                if (foundUser.Email == deleteUser.Email)
                {
                    _Logger.Log(LogLevel.Warning, "User attempted to delete themselves.");
                    return BadRequest(new { error = "You cannot delete your own user account." });
                }

                // Remove user from the list
                _Db.Users.Remove(deleteUser);

                // Save to DB
                await _Db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                _Logger.Log(LogLevel.Critical, "Exception - AuthController.DeleteUser - {EMessage}", e.Message);
                return StatusCode(500, new { error = "Internal error occurred while deleting user.", exception = e.Message });
            }
        }

        #endregion

        #region Private Class


        public class GoogleTokenResponse
        {
            // ReSharper disable once InconsistentNaming
            public string? Id_Token { get; set; }

            // ReSharper disable once InconsistentNaming
            public string? Access_Token { get; set; }

            public string? Email { get; set; }
        }

        #endregion
    }
}
