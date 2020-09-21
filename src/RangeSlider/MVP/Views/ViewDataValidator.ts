import ViewManager from './ViewManager';
import constants from '../../utils/constants';

class ViewDataValidator {
  public viewManager: ViewManager;

  constructor(viewManager: ViewManager) {
    this.viewManager = viewManager;
  }

  public validateFilledStrips(filledStrips: boolean[]): boolean[] {
    const modelData = this.viewManager.getModelData();
    const { values } = modelData;
    const newFilledStrips = new Array<boolean>();
    for (let i = 0; i < values.length + 1; i += 1) {
      if (i < filledStrips.length) {
        newFilledStrips.push(filledStrips[i]);
      } else {
        newFilledStrips.push(false);
      }
    }
    return newFilledStrips;
  }

  public validateAngle(angle: number): number {
    if (angle > constants.MAX_ANGLE) return 90;
    if (angle < constants.MIN_ANGLE || angle === undefined) return 0;
    return angle;
  }

  public validateMaxSegmentsCount(maxSegmentsCount: number): number {
    if (maxSegmentsCount < 1) return 1;
    return maxSegmentsCount;
  }
}

export default ViewDataValidator;
