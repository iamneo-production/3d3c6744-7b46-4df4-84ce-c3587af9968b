using ACServiceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ACServiceAPI.Data
{
    public class ACServiceDbContext: DbContext
    {
        public ACServiceDbContext(DbContextOptions<ACServiceDbContext> options) : base(options)
        {

        }

        public DbSet<UserModel> User { get; set; }

        public DbSet<AdminModel> Admin { get; set; }

        public DbSet<ProductModel> Product { get; set; }

        public DbSet<ServiceCenterModel> ServiceCenter { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("User");

            modelBuilder.Entity<AdminModel>().ToTable("Admin");

            modelBuilder.Entity<ProductModel>().ToTable("Product");

            modelBuilder.Entity<ServiceCenterModel>().ToTable("ServiceCenter");


        }
    }
}
