
using System.Security.Claims;
using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signinManager, ITokenService tokenService, IMapper mapper)
        {
            _signinManager = signinManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        // Get current user based on the stored token.
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            AppUser user = await _userManager.FindByEmailAsync(email);
            return new UserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckIfEmailExists([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {
            AppUser user = await _userManager.FindUserByClaimsPrincipalWithAddress(User);
            return _mapper.Map<Address, AddressDTO>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO newAddressDTO)
        {
            AppUser user = await _userManager.FindUserByClaimsPrincipalWithAddress(User);
            user.Address = _mapper.Map<AddressDTO, Address>(newAddressDTO);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded){
                return _mapper.Map<Address, AddressDTO>(user.Address);
            }
            return BadRequest(new ApiResponse(400, "Could not update user address"));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            AppUser user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }
            var signInResult = await _signinManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (!signInResult.Succeeded)
            {
                return Unauthorized(new ApiResponse(401));
            }
            return new UserDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }
            return new UserDTO
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}