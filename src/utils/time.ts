import dayjs from "dayjs";

export const calculateDuration = (start: Date, end: Date | null) => {
  if (!end) return "00:00:00";

  const duration = dayjs(end).diff(dayjs(start), "seconds");
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
