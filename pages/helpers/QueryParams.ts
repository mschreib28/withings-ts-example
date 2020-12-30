import { DataFieldParams, QueryData, StartEndDate, StartEndYMD } from "./DataTypes";

export const oneDayInSeconds: number = 24 * 60 * 60;

// Withings requires SECONDS not miliseconds from epoch.
export const defaultStartDateTime: number = Math.floor((Date.now() - 2 * 24 * 60 * 60 * 1000) / 1000);
export const defaultEndDateTime: number = Math.floor(Date.now() / 1000);

export const addMeasureParams = (): DataFieldParams => {
  const data_fields: string[] = ["steps", "elevation", "calories", "distance", "duration", "heart_rate", "spo2_auto"];
  return { data_fields: data_fields.join(",") };
};

export const addStartEndDate = (startDate: number, endDate: number): StartEndDate => {
  return { startdate: startDate, enddate: endDate };
};

export const getYMD = (date: number): string => {
  const d: Date = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const addStartEndYMD = (startDateYMD: string, endDateYMD: string): StartEndYMD => {
  return { startdateymd: startDateYMD, enddateymd: endDateYMD };
};

export const addSleepParams = (): DataFieldParams => {
  const data_fields: string[] = ["hr", "rr", "snoring"];
  return { data_fields: data_fields.join(",") };
};

export const getQueryData = (action: string, startDateYMD: string, endDateYMD: string): QueryData => {
  return {
    action: action,
    startDate: startDateYMD,
    endDate: endDateYMD,
  };
};
