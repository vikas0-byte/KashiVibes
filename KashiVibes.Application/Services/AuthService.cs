using KashiVibes.Application.DTOs;
using KashiVibes.Core.Entities;
using KashiVibes.Core.Interfaces;
using KashiVibes.Infrastructure.Services;

namespace KashiVibes.Application.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginRequestDto loginRequest);
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto registerRequest);
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto loginRequest)
        {
            var user = await _userRepository.GetByEmailAsync(loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            if (!user.IsActive)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Account is deactivated"
                };
            }

            var token = _tokenService.GenerateToken(user);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Mobile = user.Mobile,
                    Avatar = user.Avatar,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                }
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Passwords do not match"
                };
            }

            if (await _userRepository.UserExistsAsync(registerRequest.Email))
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "User with this email already exists"
                };
            }

            var user = new User
            {
                Name = registerRequest.Name,
                Email = registerRequest.Email,
                Mobile = registerRequest.Mobile,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password),
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.AddAsync(user);
            var token = _tokenService.GenerateToken(createdUser);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                User = new UserDto
                {
                    Id = createdUser.Id,
                    Name = createdUser.Name,
                    Email = createdUser.Email,
                    Mobile = createdUser.Mobile,
                    Role = createdUser.Role,
                    CreatedAt = createdUser.CreatedAt
                }
            };
        }
    }
}