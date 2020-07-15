import EventArgs from "./EventArgs";
import ModelData from "../MVP/Model/ModelData";

class OptionsEventArgs extends EventArgs {
    public data: ModelData | undefined = undefined;
}
export default OptionsEventArgs;
