import { useMemo, useRef, useState } from "react";
import {
  FileText,
  FileImage,
  UploadCloud,
  Search,
  SlidersHorizontal,
  Download,
  Check,
  X,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  Sparkles,
  Camera,
  ListFilter,
} from "lucide-react";
import { documents as initial, fmt } from "@/data/demo";
import type { Role } from "@/App";
import { TablePagination } from "@/components/TablePagination";
import { mapDemoUploadFiles } from "@/services/demoFileService";

const monthOrder: Record<string, number> = {
  Oca: 0,
  Şub: 1,
  Mar: 2,
  Nis: 3,
  May: 4,
  Haz: 5,
  Tem: 6,
  Ağu: 7,
  Eyl: 8,
  Eki: 9,
  Kas: 10,
  Ara: 11,
};
const dateValue = (value: string) => {
  if (value === "Az önce") return Date.now();
  const [day, month, year] = value.split(" ");
  if (monthOrder[month] === undefined) return 0;
  return new Date(Number(year), monthOrder[month], Number(day)).getTime();
};

export function Documents({ role }: { role: Role }) {
  const [rows, setRows] = useState(() =>
    role === "client"
      ? initial.filter(item => item.client === "Mavi Kıyı Tasarım")
      : initial
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [sort, setSort] = useState<{
    key: "date" | "amount";
    descending: boolean;
  }>({ key: "date", descending: true });
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const visible = useMemo(
    () =>
      rows
        .filter(r => role !== "client" || r.client === "Mavi Kıyı Tasarım")
        .filter(
          r =>
            (filter === "Tümü" || r.status === filter) &&
            `${r.name} ${r.client} ${r.kind}`
              .toLocaleLowerCase("tr")
              .includes(query.toLocaleLowerCase("tr"))
        )
        .sort((a, b) => {
          const delta =
            sort.key === "date"
              ? dateValue(a.date) - dateValue(b.date)
              : a.amount - b.amount;
          return sort.descending ? -delta : delta;
        }),
    [rows, filter, query, sort, role]
  );
  const pageRows = visible.slice((page - 1) * 5, page * 5);
  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const added = mapDemoUploadFiles(files, role === "client");
    setRows(r => [...added, ...r]);
    setNotice(`${added.length} evrak demo listesine eklendi.`);
    setTimeout(() => setNotice(""), 3000);
  };
  const update = (id: string, status: string) =>
    setRows(r => r.map(x => (x.id === id ? { ...x, status } : x)));
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> BELGE YÖNETİMİ
          </div>
          <h1>{role === "client" ? "Evraklarım" : "Evrak merkezi"}</h1>
          <p>
            {role === "client"
              ? "Fiş ve faturalarınızı demo arayüzünde listeleyip durumlarını takip edin."
              : "Müşterilerden gelen örnek belgeleri inceleyin ve durumlarını yönetin."}
          </p>
        </div>
        <button className="button-primary" onClick={() => ref.current?.click()}>
          <Plus size={16} />
          {role === "client" ? "Evrak yükle" : "Belge ekle"}
        </button>
        <input
          ref={ref}
          type="file"
          multiple
          accept="image/*,.pdf"
          capture="environment"
          hidden
          onChange={e => addFiles(e.target.files)}
        />
      </div>
      {notice && (
        <div className="toast-demo">
          <Check size={16} />
          {notice}
        </div>
      )}
      {role === "client" && (
        <div
          className="upload-drop"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => ref.current?.click()}
        >
          <div className="upload-icon">
            <UploadCloud size={23} />
          </div>
          <div>
            <b>
              Fişlerinizi buraya bırakın veya <u>dosya seçin</u>
            </b>
            <span>JPG, PNG veya PDF · Toplu yükleme desteklenir</span>
          </div>
          <span className="camera-hint">
            <Camera size={16} /> Mobil cihazda kamera ile çekebilirsiniz
          </span>
        </div>
      )}
      <div className="doc-stats">
        <div>
          <span className="stat-dot blue-dot" />
          <b>{rows.length}</b>
          <small>Toplam evrak</small>
        </div>
        <div>
          <span className="stat-dot amber-dot" />
          <b>{rows.filter(x => x.status === "İnceleme bekliyor").length}</b>
          <small>İnceleme bekliyor</small>
        </div>
        <div>
          <span className="stat-dot green-dot" />
          <b>{rows.filter(x => x.status === "Onaylandı").length}</b>
          <small>Onaylandı</small>
        </div>
        <div>
          <span className="stat-dot violet-dot" />
          <b>{rows.filter(x => x.status === "İşlendi").length}</b>
          <small>İşlendi</small>
        </div>
      </div>
      <section className="panel documents-table-panel">
        <div className="table-toolbar">
          <div className="filter-tabs">
            {[
              "Tümü",
              "İnceleme bekliyor",
              "Onaylandı",
              "İşlendi",
              "Reddedildi",
            ].map(t => (
              <button
                key={t}
                className={filter === t ? "selected" : ""}
                onClick={() => {
                  setFilter(t);
                  setPage(1);
                }}
              >
                {t}
                {t === "İnceleme bekliyor" && (
                  <i>{rows.filter(x => x.status === t).length}</i>
                )}
              </button>
            ))}
          </div>
          <div className="table-actions">
            <label className="table-search">
              <Search size={15} />
              <input
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Evrak veya müşteri ara..."
              />
            </label>
            <button
              className="icon-btn filter-button"
              onClick={() =>
                setSort(current => ({
                  key: "amount",
                  descending:
                    current.key === "amount" ? !current.descending : true,
                }))
              }
              title="Tutarı sırala"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
        <div className="data-table-wrap">
          <table className="data-table documents-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" aria-label="Tümünü seç" />
                </th>
                <th>EVRAK ADI</th>
                <th>MÜŞTERİ</th>
                <th>
                  TARİH{" "}
                  <button
                    className="sort-button"
                    onClick={() =>
                      setSort(current => ({
                        key: "date",
                        descending:
                          current.key === "date" ? !current.descending : true,
                      }))
                    }
                  >
                    {sort.key === "date" ? (sort.descending ? "↓" : "↑") : "↕"}
                  </button>
                </th>
                <th>
                  TUTAR{" "}
                  <button
                    className="sort-button"
                    onClick={() =>
                      setSort(current => ({
                        key: "amount",
                        descending:
                          current.key === "amount" ? !current.descending : true,
                      }))
                    }
                  >
                    {sort.key === "amount"
                      ? sort.descending
                        ? "↓"
                        : "↑"
                      : "↕"}
                  </button>
                </th>
                <th>DURUM</th>
                <th>AKSİYON</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(d => (
                <tr key={d.id}>
                  <td>
                    <input type="checkbox" aria-label={`${d.name} seç`} />
                  </td>
                  <td>
                    <span className={`file-icon ${d.color}`}>
                      {d.ext === "JPG" ? (
                        <FileImage size={16} />
                      ) : (
                        <FileText size={16} />
                      )}
                    </span>
                    <span className="table-primary">
                      {d.name}
                      <small>
                        {d.kind} · {d.id}
                      </small>
                    </span>
                  </td>
                  <td>
                    <span className="client-cell">
                      <span className="tiny-avatar">
                        {d.client.slice(0, 1)}
                      </span>
                      {d.client}
                    </span>
                  </td>
                  <td>{d.date}</td>
                  <td className="money-cell">{fmt(d.amount)}</td>
                  <td>
                    <span
                      className={`status-pill ${d.status === "İnceleme bekliyor" ? "status-amber" : d.status === "İşlendi" ? "status-green" : "status-blue"}`}
                    >
                      <i />
                      {d.status}
                    </span>
                  </td>
                  <td>
                    {d.status === "İnceleme bekliyor" &&
                    role === "accountant" ? (
                      <div className="row-actions">
                        <button
                          className="approve-btn"
                          title="Onayla"
                          onClick={() => update(d.id, "Onaylandı")}
                        >
                          <Check size={15} />
                        </button>
                        <button
                          className="reject-btn"
                          title="Reddet"
                          onClick={() => update(d.id, "Reddedildi")}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="download-btn"
                        title="İndir"
                        onClick={() => setNotice("Demo dosyası indirme akışı.")}
                      >
                        <Download size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <div className="empty-state">
              <ListFilter size={23} />
              <b>Bu filtreyle eşleşen evrak yok</b>
              <span>
                Arama metnini veya durum filtresini değiştirebilirsiniz.
              </span>
            </div>
          )}
        </div>
        <TablePagination
          total={visible.length}
          page={page}
          pageSize={5}
          onPageChange={setPage}
        />
      </section>
      <div className="ocr-note">
        <Sparkles size={15} />
        <span>
          <b>Akıllı evrak tanıma</b> · OCR ile fiş tutarı ve tarihi otomatik
          tanıma akışı demo ekranında gösterilmektedir.
        </span>
        <button
          onClick={() =>
            setNotice("OCR akışı prototipte örnek olarak gösterilir.")
          }
        >
          Nasıl çalışır?
        </button>
      </div>
    </div>
  );
}
