import { cn } from '../../utils';

export function Table({ columns, data, onRowClick, className }) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800/60">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn('px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-slate-100 dark:border-slate-800/40 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40',
              )}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className={cn('px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300', col.className)}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
