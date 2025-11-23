export type Event = {
    id?: number;
    name?: string;
    eventStart: Date;
    eventEnd: Date;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    invitedGuests?: number;
};
