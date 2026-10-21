export interface DemoUploadRecord {
  id: string;
  name: string;
  client: string;
  kind: string;
  date: string;
  amount: number;
  status: string;
  ext: string;
  color: string;
}

/** Creates local-only rows; it does not upload or persist the file bytes. */
export function mapDemoUploadFiles(
  files: FileList,
  isClient: boolean
): DemoUploadRecord[] {
  return Array.from(files).map((file, index) => ({
    id: `EV-${Date.now() + index}`,
    name: file.name,
    client: isClient ? "Mavi Kıyı Tasarım" : "Yeni müşteri",
    kind: file.type.includes("image") ? "Gider Fişi" : "Yüklenen Evrak",
    date: "Az önce",
    amount: 0,
    status: "İnceleme bekliyor",
    ext: file.name.split(".").pop()?.toUpperCase() || "FILE",
    color: file.type.includes("image") ? "amber" : "blue",
  }));
}
