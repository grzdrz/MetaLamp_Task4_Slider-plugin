import constants from '../utils/constants';
import ViewManager from './ViewManager';

class ViewDataValidator {
  public viewManager: ViewManager;

  constructor(viewManager: ViewManager) {
    this.viewManager = viewManager;
  }

  public validateAngle(angle: number): number {
    if (angle > constants.MAX_ANGLE) return constants.MAX_ANGLE;
    if (angle < constants.MIN_ANGLE || angle === undefined) return constants.MIN_ANGLE;
    return angle;
  }

  public validateMaxSegmentsCount(maxSegmentsCount: number): number {
    if (maxSegmentsCount < 1) return 1;
    return maxSegmentsCount;
  }
}

export default ViewDataValidator;
