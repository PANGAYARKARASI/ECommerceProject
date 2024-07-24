using ECommerceLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public interface IOrderRepo
    {
        Task<List<Order>> GetAllOrders();
        Task<Order> GetOrderById(int orderid);
        Task<List<Order>> GetOrderByUser(int userid);
        Task<List<Order>> GetOrderByProduct(int productid);
        Task InsertOrder(Order order);
        Task UpdateOrder(int orderid, Order order);
        Task DeleteOrder(int orderid);
    }
}
