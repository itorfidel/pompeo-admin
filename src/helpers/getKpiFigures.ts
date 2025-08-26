import { formatCurrency } from "./formats";

export function getCurrentKpiFigure<T>(kpi: T, kpiFigureName: string) {
  return formatCurrency(
    (kpi as Record<string, unknown>)?.at(-1)?.[kpiFigureName].toString()
  ).split(",")[0];
}

export function getTotalKpiFigure<T>(kpi: T, kpiFigureName: string) {
  const totalKpiFigure = (kpi as Record<string, unknown>)?.reduce(
    (total: number, current: T) => {
      return total + current[kpiFigureName];
    },
    0
  );

  return formatCurrency(totalKpiFigure?.toString()).split(",")[0];
}
