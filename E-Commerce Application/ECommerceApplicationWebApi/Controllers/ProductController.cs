using ECommerceLibrary.Model;
using ECommerceLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductRepo repo;
        public ProductController(IProductRepo productRepo)
        {
            repo = productRepo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProductDetails()
        {
            List<Product> products = await repo.GetAllProducts();
            return Ok(products);
        }
        [HttpGet("ById/{id}")]
        public async Task<ActionResult> GetOne(int id)
        {
            try
            {
                Product product = await repo.GetProductById(id);
                return Ok(product);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("ByName/{name}")]
        public async Task<ActionResult> GetByName(string name)
        {
            try
            {
                Product product = await repo.GetByName(name);
                return Ok(product);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Insert(Product product)
        {
            try
            {
                await repo.InsertProduct(product);
                return Created($"api/Product/{product.Id}", product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Product product)
        {
            try
            {
                await repo.UpdateProduct(id, product);
                return Ok(product);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await repo.DeleteProduct(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
