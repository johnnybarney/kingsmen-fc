export default function AdminPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Admin Guide</h1>

      <p className="text-gray-700 mb-4">
        To edit players:
      </p>

      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        <li>Open <code>app/players/playersData.ts</code></li>
        <li>Edit player details (name, number, position)</li>
        <li>Save the file</li>
        <li>Refresh the website</li>
      </ol>
    </section>
  );
}
