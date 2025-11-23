using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="options"></param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        #endregion

        #region DbSets

        /// <summary>
        /// Collection of Users in the Database
        /// </summary>
        public DbSet<User> Users { get; set; }

        #endregion

        #region Method Overrides

        /// <summary>
        /// Configures the model for the context by defining entity relationships, constraints, and other mapping
        /// settings.
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // TODO: Add relationships and constraints here
        }

        #endregion
    }
}
