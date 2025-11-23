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

        /// <summary>
        /// Collection of Guests in the Database
        /// </summary>
        public DbSet<Guest> Guests { get; set; }

        /// <summary>
        /// Collection of Events in the Database
        /// </summary>
        public DbSet<Event> Events { get; set; }

        /// <summary>
        /// Collection of RSVPs in the Database
        /// </summary>
        public DbSet<Rsvp> Rsvps { get; set; }

        #endregion

        #region Method Overrides

        /// <summary>
        /// Configures the model for the context by defining entity relationships, constraints, and other mapping
        /// settings.
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // RSVP (many-to-many between Event and Guest)
            modelBuilder.Entity<Rsvp>()
                .HasOne(r => r.Event)
                .WithMany(e => e.Rsvps)
                .HasForeignKey(r => r.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Rsvp>()
                .HasOne(r => r.Guest)
                .WithMany(g => g.Rsvps)
                .HasForeignKey(r => r.GuestId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        #endregion
    }
}
