import { Injectable } from '@angular/core';
import {DailyAmountReport} from "../model/summary.model";
import {getActiveColor, getLightColor} from "../utils/app.stock-color-changes";
import {Colors} from "../shared/app.colors";

@Injectable({
  providedIn: 'root'
})
export class ColorChangerService {

  public changeSelectedData(sds: DailyAmountReport, selectedStock: DailyAmountReport | null): DailyAmountReport | null {
    if (sds.index === selectedStock?.index) {
      this.resetSelectedStock(selectedStock);
      return null;
    }
    this.resetSelectedStock(selectedStock);
    if (sds.index !== selectedStock?.index) {
      selectedStock = sds;
      selectedStock.color = getActiveColor(selectedStock.color as Colors);
    }
    return selectedStock;
  }

  public resetSelectedStock(selectedStock: DailyAmountReport | null) {
    if (selectedStock) {
      selectedStock.color = getLightColor(selectedStock.color as Colors);
    }
  }
}
