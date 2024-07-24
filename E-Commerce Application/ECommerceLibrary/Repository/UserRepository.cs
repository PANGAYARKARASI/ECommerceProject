
using ECommerceLibrary.Model;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public class UserRepository : IUserRepo
    {
        ECommerceDBContext dbContext;

        public UserRepository(ECommerceDBContext userRepo)
        {
            dbContext = userRepo;
        }

        public async Task DeleteUser(string email)
        {
            try
            {
                User user = await GetByEmail(email);
                if (user.Role != "Admin" ) {
                    dbContext.Users.Remove(user);
                    await dbContext.SaveChangesAsync();
                }
                
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> GetByEmail(string email)
        {
            try
            {
                User user = await(from u in dbContext.Users where u.Email == email select u).FirstAsync();
                return user;
            }
            catch (Exception)
            {
                throw new Exception("User does not exists");
            }
        }

        public async Task InsertUser(User user)
        {
            try
            {
                await dbContext.Users.AddAsync(user);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<(bool IsSuccess, string Message, int UserId, string UserName, string Role)> IsLogin(string email, string password)
        {
            User account = await GetByEmail(email);
            if (account == null)
            {
                return (false, "No such user", 0, "", "");
            }
            else
            {
                if (account.Password == password)
                {
                    return (true, "Login successful", account.UserId, account.Name, account.Role);
                }
                else
                {
                    return (false, "Password does not match", 0, "", "");
                }
            }
        }

        public async Task<(bool IsSuccess, string Message, string Role)> SignUp(User account)
        {
            try
            {
                User acc = await GetByEmail(account.Email);
                return (false, "User already exists", "");
            }
            catch (Exception ex)
            {
                await InsertUser(account);
                return (true, "Account created successfully", account.Role);
            }
        }


    }
}
