import { OptionsToUpdateEventArgs, EventArgs } from "./EventArgs"

interface EventHandler {
    (args: EventArgs): void;
}

class Event {
    private handlers: EventHandler[] = new Array<EventHandler>();
    /* public publisher: Object; */

    constructor(/* public publisher: Object */) {
    }

    invoke(args?: EventArgs) {
        this.handlers.forEach(eh => {
            if (args) {
                eh(args);
            }
            else {
                eh(new EventArgs());//можно издавать ивенты не требовательные к входным данным
            }
        });
    }

    subscribe(handler: EventHandler) {
        this.handlers.push(handler);
    }
}

export { Event };

//концепт ивентов позаимствовал из с#(правда пока не полностью)