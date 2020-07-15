import EventArgs from "./EventArgs";

interface EventHandler {
    (args: EventArgs): void;
}

class Event {
    private handlers: EventHandler[] = new Array<EventHandler>();
    /* public publisher: Object; */

    invoke(args: EventArgs): void {
        this.handlers.forEach((eventHandler) => eventHandler(args));
    }

    subscribe(handler: EventHandler): void {
        this.handlers.push(handler);
    }
}

export default Event;
