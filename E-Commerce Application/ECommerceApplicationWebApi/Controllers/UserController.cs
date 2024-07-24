using ECommerceLibrary.Model;
using ECommerceLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserRepo repo;
        public UserController(IUserRepo userRepo)
        {
            repo = userRepo;
        }
       
        [HttpGet("ByEmail/{email}")]
        public async Task<IActionResult> GetOne(string email)
        {
            try
            {
                User user = await repo.GetByEmail(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("{email}")]
        public async Task<ActionResult> Delete(string email)
        {
            try
            {
                await repo.DeleteUser(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Login/{email}/{password}")]
        public async Task<ActionResult> Login(string email, string password)
        {
            try
            {
                var response = await repo.IsLogin(email, password);
                return Ok(new { isSuccess = response.IsSuccess, message = response.Message, userId = response.UserId, name = response.UserName, role = response.Role });
            }
            catch (Exception ex)
            {
                return Ok(new { isSuccess = false, message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(User account)
        {
            try
            {
               
                var response = await repo.SignUp(account);
                return Ok(new { isSuccess = response.IsSuccess, message = response.Message, role = response.Role});
            }
            catch (Exception ex)
            {
                return Ok(new { isSuccess = false, message = ex.Message, role = ex.Message });
            }
        }
    }
}
