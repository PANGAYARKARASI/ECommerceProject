using ECommerceLibrary.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public class OrderRepository : IOrderRepo
    {
        ECommerceDBContext dbContext;
        public OrderRepository(ECommerceDBContext orderRepo)
        {
            dbContext = orderRepo;
        }
        public async Task DeleteOrder(int orderid)
        {
            try
            {
                Order ordertodelete = await GetOrderById(orderid);
                dbContext.Orders.Remove(ordertodelete);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Order>> GetAllOrders()
        {
            try
            {
                List<Order> orders = await dbContext.Orders.Include(order => order.User).Include(order => order.Product).ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Order> GetOrderById(int orderid)
        {
            try
            {
                Order order = await (from o in dbContext.Orders.Include(order => order.User).Include(order => order.Product) where o.OrderId == orderid select o).FirstAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("User Id not Exists");
            }
        }

        public async Task<List<Order>> GetOrderByProduct(int id)
        {
            try
            {
                List<Order> order = await(from o in dbContext.Orders.Include(order => order.User).Include(order => order.Product) where o.Id == id select o).ToListAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("Role Id not Exists");
            }
        }

        public async Task<List<Order>> GetOrderByUser(int userid)
        {
            try
            {
                List<Order> order = await(from o in dbContext.Orders.Include(order => order.User).Include(order => order.Product) where o.UserId == userid select o).ToListAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("Role Id not Exists");
            }
        }

        public async Task InsertOrder(Order order)
        {
            try
            {
                await dbContext.Orders.AddAsync(order);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateOrder(int orderid, Order order)
        {
           
        }
    }
}
