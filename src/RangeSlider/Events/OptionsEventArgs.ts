import EventArgs from "./EventArgs";
import Options from "../MVP/Model/Options";

class OptionsEventArgs extends EventArgs {
    public options: Options | undefined = undefined;
}
export default OptionsEventArgs;
