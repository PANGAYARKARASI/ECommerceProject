
using ECommerceLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public interface IUserRepo
    {
        Task InsertUser(User user);
        Task DeleteUser(string email);

        Task<User> GetByEmail(string email);

        Task<(bool IsSuccess, string Message, int UserId, string UserName, string Role)> IsLogin(string email, string password);
        Task<(bool IsSuccess, string Message, string Role)> SignUp(User account);
        
    }
}
