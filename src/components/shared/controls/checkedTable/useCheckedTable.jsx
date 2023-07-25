import { useEffect, useMemo, useState } from "react";

export const useCheckedTable = (rawList) => {
  const [dataList, setDataList] = useState(rawList);

  useEffect(() => {
    if (!dataList.length) {
      throw "Data list is not an array";
    }

    if (!dataList.every((item) => "isChecked" in item)) {
      throw "Some data from datalist does not have isChecked property";
    }
  }, [dataList]);

  const isAllChecked = useMemo(() => {
    return dataList.every((item) => !!item.isChecked);
  }, [dataList]);

  const onCheckAll = () => {
    console.log(isAllChecked);

    setDataList(
      dataList.map((item) => {
        item.isChecked = !isAllChecked;
        return item;
      })
    );
  };

  const onCheck = (index, checked) => {
    setDataList(
      dataList.map((item, itemIndex) => {
        if (itemIndex === index) {
          item.isChecked = checked;
        }

        return item;
      })
    );
  };

  return { dataList, isAllChecked, onCheckAll, onCheck };
};
