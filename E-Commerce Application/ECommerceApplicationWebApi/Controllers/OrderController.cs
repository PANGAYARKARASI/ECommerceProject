using ECommerceLibrary.Model;
using ECommerceLibrary.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderRepo repo;
        public OrderController(IOrderRepo orderRepo)
        {
            repo = orderRepo;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllOrderDetails()
        {
            List<Order> orders = await repo.GetAllOrders();
            return Ok(orders);
        }
        [HttpGet("ByOrderId/{orderid}")]
        public async Task<ActionResult> GetOne(int orderid)
        {
            try
            {
                Order order = await repo.GetOrderById(orderid);
                return Ok(order);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("ByUserId/{userid}")]
        public async Task<ActionResult> GetByUser(int userid)
        {
            try
            {
                List<Order> order = await repo.GetOrderByUser(userid);
                return Ok(order);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("ByProductId/{id}")]
        public async Task<ActionResult> GetByProduct(int id)
        {
            try
            {
                List<Order> order = await repo.GetOrderByProduct(id);
                return Ok(order);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Insert(Order order)
        {
            try
            {
                await repo.InsertOrder(order);
                return Created($"api/Order/{order.OrderId}", order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{orderid}")]
        public async Task<ActionResult> Update(int orderid, Order order)
        {
            try
            {
                await repo.UpdateOrder(orderid, order);
                return Ok(order);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }

        [HttpDelete("{orderid}")]
        public async Task<ActionResult> Delete(int orderid)
        {
            try
            {
                await repo.DeleteOrder(orderid);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
