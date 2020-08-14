import EventArgs from "./EventArgs";
import EventHandler from "./EventHandler";

class Event<TData> {
    private handlers: EventHandler<TData>[];

    constructor() {
        this.handlers = new Array<EventHandler<TData>>();

        this.invoke = this.invoke.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    public invoke(args: EventArgs<TData>): void {
        this.handlers.forEach((eventHandler) => eventHandler(args));
    }

    public subscribe(handler: EventHandler<TData>): void {
        this.handlers.push(handler);
    }
}
export default Event;
