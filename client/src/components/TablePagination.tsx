import { ArrowLeft, ArrowRight } from "lucide-react";

export function TablePagination({
  total,
  page,
  pageSize,
  onPageChange,
}: {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);
  return (
    <div className="table-pagination">
      <span>
        Toplam <b>{total}</b> kayıttan{" "}
        <b>
          {start}–{end}
        </b>{" "}
        arası gösteriliyor
      </span>
      <div>
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ArrowLeft size={12} /> Önceki
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          item => (
            <button
              key={item}
              className={item === page ? "page-number" : ""}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          )
        )}
        <button
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Sonraki <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
