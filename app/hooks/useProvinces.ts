import { provincesData } from '../constants/data';

const useProvinces = () => {
  const getAll = () => provincesData;

  const getByValue = (value: string) => {
    return provincesData.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useProvinces;
