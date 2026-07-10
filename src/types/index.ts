export type TransportType = "TCP" | "UDP" | "TCP/UDP";
export type TransportFilter = "all" | TransportType;
export type SortKey = "port" | "name" | "category";
export type SortDir = "asc" | "desc";
export type ViewMode = "card" | "table";
export type Lang = "fa" | "en";

export interface TransportColorSet {
  active: string;
  dot: string;
  inactive: string;
}