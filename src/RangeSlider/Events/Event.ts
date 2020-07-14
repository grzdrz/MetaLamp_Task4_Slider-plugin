import { OptionsToUpdateEventArgs, IEventArgs } from "./EventArgs"

interface EventHandler {
    (args: IEventArgs): void;
}

class Event {
    private handlers: EventHandler[] = new Array<EventHandler>();
    /* public publisher: Object; */

    constructor(/* public publisher: Object */) {
    }

    invoke(args: IEventArgs) {
        this.handlers.forEach(eventHandler => eventHandler(args));
    }

    subscribe(handler: EventHandler) {
        this.handlers.push(handler);
    }
}

export { Event };

//концепт ивентов позаимствовал из с#(правда пока не полностью)