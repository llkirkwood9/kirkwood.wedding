export enum Status {
    Unknown = 0,
    Attending = 1,
    NotAttending = 2,
    Maybe = 3,
}

export type Rsvp = {
    id?: number;
    guestId?: number;
    eventId?: number;
    rsvpStatus?: Status;
};
