using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Model
{
    public class ECommerceDBContext :DbContext
    {
        public ECommerceDBContext()
        {

        }
        public ECommerceDBContext(DbContextOptions<ECommerceDBContext> options) : base(options)
        {

        }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"server=(localdb)\MSSQLLocalDB; database=ECommerceDB; integrated security=true");
        }

    }
}

