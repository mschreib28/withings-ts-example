declare namespace withings {
  interface IDataResult {
    [string]: any;
  }

  type DataResult = IDataResult | void;

  interface IDataResult {
    type: string;
    [string]: any;
  }

  type DataResult = IDataResult | void;

  interface IAuthorization {
    string;
  }
  type Authorization = IAuthoriation | void;
}
