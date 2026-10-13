import { Assets } from "../types/asset/AssetDetailType";

export const distributeEvenAllocations = (assetsList: Assets[]): Assets[] => {
  const count = assetsList.length;
  if (count === 0) return [];

  const baseUnits = Math.floor(100 / count);
  const remainderUnits = 100 % count;

  return assetsList.map((item, index) => {
    const units = index < remainderUnits ? baseUnits + 1 : baseUnits;
    return {
      ...item,
      allocation: units / 100
    };
  });
};