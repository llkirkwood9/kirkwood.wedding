namespace api.Models
{
    public class Rsvp
    {
        public enum Status
        {
            Unknown,
            Attending,
            NotAttending,
            Maybe
        }

        /// <summary>
        /// ID of the RSVP - Primary Key
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// ID of the event the guest is RSVPing to
        /// </summary>
        public int EventId { get; set; }

        /// <summary>
        /// ID of the guest who is RSVPing
        /// </summary>
        public int GuestId { get; set; }

        /// <summary>
        /// Event associated with the RSVP
        /// </summary>
        public Event? Event { get; set; }

        /// <summary>
        /// Guest associated with the RSVP
        /// </summary>
        public Guest? Guest { get; set; }

        /// <summary>
        /// RSVP Status of the guest for the event
        /// </summary>
        public Status RsvpStatus { get; set; } = Status.Unknown;
    }
}
