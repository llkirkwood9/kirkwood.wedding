using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Event
    {
        /// <summary>
        /// Primary Key - ID of event
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name of the event
        /// </summary>
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Start date and time of the event
        /// </summary>
        public DateTime? EventStart { get; set; }

        /// <summary>
        /// End date and time of the event
        /// </summary>
        public DateTime? EventEnd { get; set; }

        /// <summary>
        /// Event Street Address
        /// </summary>
        [MaxLength(100)]
        public string StreetAddress { get; set; } = string.Empty;

        /// <summary>
        /// Event City
        /// </summary>
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        /// <summary>
        /// Event State
        /// </summary>
        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        /// <summary>
        /// Event Zip Code
        /// </summary>
        [MaxLength(20)]
        public string ZipCode { get; set; } = string.Empty;

        /// <summary>
        /// List of RSVPs for this event
        /// </summary>
        public List<Rsvp> Rsvps { get; set; } = new();
    }
}
