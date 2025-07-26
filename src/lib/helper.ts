export function formatPopulation(population: string): string {
  if (population.includes("unknown")) {
    return "Unknown";
  }

  const num = Number(population);

  if (isNaN(num)) {
    return population;
  }

  return num.toLocaleString();
}

export function formatCredits(credits: string): string {
  if (credits.includes("unknown")) {
    return "Unknown";
  }

  const num = Number(credits.replace(/,/g, ""));

  if (isNaN(num)) {
    return credits;
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getTotalPages(total: number, pageSize = 10): number {
  return Math.ceil(total / pageSize);
}
