import { DataInterface } from "../../types/Interfaces";
import { DateObjectInterface } from "../../types/Interfaces";

export default function getDataFormat(data: Array<DataInterface>) {
  let newDataObjectArr = [{}];
  data.forEach((el) => {
    let newDateObj: DateObjectInterface = { date: 0, visits: 0 };
    {
      (newDateObj.date = new Date(el.date).getTime()),
        (newDateObj.visits = el.visits);
    }
    newDataObjectArr.push(newDateObj);
  });

  return newDataObjectArr;
}
