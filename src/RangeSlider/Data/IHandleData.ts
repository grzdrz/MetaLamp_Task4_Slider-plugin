import IMouseData from './IMouseData';
import ViewData from './ViewData';

interface IHandleData extends IMouseData {
  viewData: ViewData;
  id?: number;
}

export default IHandleData;
