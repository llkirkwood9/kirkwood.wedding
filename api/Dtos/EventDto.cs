namespace api.Dtos
{
    public class EventDto
    {
        /// <summary>
        /// Primary Key - ID of event
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// Name of the event
        /// </summary>
        public string? Name { get; set; } 

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
        public string? StreetAddress { get; set; } 

        /// <summary>
        /// Event City
        /// </summary>
        public string? City { get; set; } 

        /// <summary>
        /// Event State
        /// </summary>
        public string? State { get; set; } 

        /// <summary>
        /// Event Zip Code
        /// </summary>
        public string? ZipCode { get; set; } 

        /// <summary>
        /// Number of guests invited
        /// </summary>
        public int? InvitedGuests { get; set; }
    }
}
