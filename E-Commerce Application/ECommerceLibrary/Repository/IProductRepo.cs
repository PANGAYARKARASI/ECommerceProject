using ECommerceLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public interface IProductRepo
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<Product> GetByName(string name);
        Task InsertProduct(Product product);
        Task UpdateProduct(int id, Product product);
        Task DeleteProduct(int id);
    }
}
