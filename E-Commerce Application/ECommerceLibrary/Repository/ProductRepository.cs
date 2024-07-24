using ECommerceLibrary.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Repository
{
    public class ProductRepository : IProductRepo
    {
        ECommerceDBContext dbContext;

        public ProductRepository(ECommerceDBContext productRepo)
        {
            dbContext = productRepo;
        }
        public async Task DeleteProduct(int id)
        {
            try
            {
                Product producttodelete = await GetProductById(id);
                dbContext.Products.Remove(producttodelete);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Product>> GetAllProducts()
        {
            try
            {
                List<Product> products = await dbContext.Products.ToListAsync<Product>();
                return products;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Product> GetByName(string name)
        {
            try
            {
                Product product = await(from p in dbContext.Products where p.Name == name select p).FirstAsync();
                return product;
            }
            catch (Exception)
            {
                throw new Exception("Product does not exists");
            }
        }

        public async Task<Product> GetProductById(int id)
        {
            try
            {
                Product product = await (from p in dbContext.Products where p.Id == id select p).FirstAsync();
                return product;
            }
            catch (Exception)
            {
                throw new Exception("Product does not exists");
            }
        }

        public async Task InsertProduct(Product product)
        {
            try
            {
                await dbContext.Products.AddAsync(product);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateProduct(int id, Product product)
        {
            try
            {
                Product producttoup = await GetProductById(id);
                producttoup.Name = product.Name;
                producttoup.Description = product.Description;
                producttoup.Price = product.Price;
                producttoup.ImageUrl = product.ImageUrl;
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
