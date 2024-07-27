import { Injectable } from '@angular/core';
import {DailyAmountReport} from "../model/api-model/summary.model";
import {Colors} from "../shared/app.colors";
import {DAILY_AMOUNT_STACK_COLORS_CHANGE} from "../shared/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ColorChangerService {

  public changeSelectedData(sds: DailyAmountReport, selectedStock: DailyAmountReport | null): DailyAmountReport | null {
    if (this.isSameIndex(sds, selectedStock)) {
      this.resetSelectedStock(selectedStock);
      return null;
    }
    this.resetSelectedStock(selectedStock);
    if (!this.isSameIndex(sds, selectedStock)) {
      sds.color = this.getActiveColor(sds.color as Colors);
    }
    return sds;
  }

  private resetSelectedStock(selectedStock: DailyAmountReport | null) {
    if (selectedStock) {
      selectedStock.color = this.getLightColor(selectedStock.color as Colors);
    }
  }

  private getActiveColor(color: Colors): Colors {
    return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
  }

  private getLightColor(color: Colors): Colors {
    return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
  }

  private isSameIndex(sds: DailyAmountReport, selectedStock: DailyAmountReport | null) {
    return sds.index === selectedStock?.index;
  }
}
