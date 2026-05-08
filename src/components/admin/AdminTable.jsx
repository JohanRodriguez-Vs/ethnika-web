function AdminTable({ data = [], columns = [] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          {columns.map((col, idx) => <th key={idx} style={{ padding: '1rem', textAlign: 'left' }}>{col.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={columns.length} style={{ padding: '1rem', textAlign: 'center' }}>No hay datos</td></tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
              {columns.map((col, j) => <td key={j} style={{ padding: '1rem' }}>{row[col.accessor]}</td>)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AdminTable;
