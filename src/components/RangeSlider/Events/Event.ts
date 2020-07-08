import { EventArgs } from "./EventArgs"

class EventHandler {
    public handler: (args: EventArgs) => void;

    constructor(handler: (args: EventArgs) => void) {
        this.handler = handler;
    }
}

class Event {
    public handlers: EventHandler[] = new Array<EventHandler>();
    /* public publisher: Object; */

    constructor(/* public publisher: Object */) {
    }

    invoke(args?: EventArgs) {
        this.handlers.forEach(eh => {
            if (args) {
                eh.handler(args);
            }
            else {
                eh.handler(new EventArgs());//можно издавать ивенты не требовательные к входным данным
            }
        });
    }

    subscribe(handler: EventHandler) {
        this.handlers.push(handler);
    }
}

export { Event };