import IMouseData from './IMouseData';
import ViewData from './ViewData';

interface IHandleData extends IMouseData {
  viewData: ViewData;
  countNumber?: number;
}

export default IHandleData;
