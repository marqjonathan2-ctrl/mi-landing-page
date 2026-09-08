export default function Tools() {
  const tools = ['Python', 'SQLite', 'Excel Avanzado', 'Google Sheets', 'Jupyter / Notebooks', 'Informes Ejecutivos Automatizados']
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-xl font-semibold">Nuestro stack & herramientas</h3>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map(t => (
          <div key={t} className="p-3 metallic rounded-md text-sm text-silver">{t}</div>
        ))}
      </div>
    </div>
  )
}